import configFile, { getProductById } from "@/config";
import { findCheckoutSession } from "@/libs/stripe";
import { sendEmail } from "@/libs/resend";
import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// This is where we receive Stripe webhook events
// It handles order creation and user management
// See more: https://shipfa.st/docs/features/payments
export async function POST(req) {
  // Check for required environment variables
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Missing required Stripe environment variables");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16",
  });
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  let eventType;
  let event;

  // Create a private supabase client using the secret service_role API key
  // Disable realtime to reduce Edge Runtime warnings
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
    realtime: { disabled: true },
  });

  // verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        // Payment is successful - create order and optionally grant access
        const stripeObject = event.data.object;

        const session = await findCheckoutSession(stripeObject.id);

        const customerId = session?.customer;
        const customerIdStr = typeof customerId === "string" ? customerId : customerId?.id;
        const priceId = session?.line_items?.data[0]?.price.id;
        const userId = stripeObject.client_reference_id;

        // Get customer email
        let customerEmail = stripeObject.customer_details?.email;
        if (!customerEmail && customerIdStr) {
          const customer = await stripe.customers.retrieve(customerIdStr);
          customerEmail = customer.email;
        }

        // Extract metadata (product and preferences)
        const metadata = stripeObject.metadata || session?.metadata || {};
        const productId = metadata.product_id;
        const preferences = {
          vegan: metadata.preferences_vegan === "true",
          allergies: metadata.preferences_allergies || "",
          otherNotes: metadata.preferences_other_notes || "",
        };

        // Get product info from config
        const product = productId ? getProductById(productId) : null;

        // All purchases are one-time
        const purchaseType = "one-time";

        // Get shipping address if available
        const shippingAddress = stripeObject.shipping_details || null;

        // Create order record
        if (productId && product) {
          const orderData = {
            stripe_session_id: stripeObject.id,
            stripe_customer_id: customerIdStr,
            stripe_payment_intent_id: stripeObject.payment_intent,
            user_id: userId || null,
            email: customerEmail,
            product_id: productId,
            product_name: product.name,
            category: product.category,
            tier: product.tier,
            price: product.price,
            purchase_type: purchaseType,
            preferences,
            status: "completed",
            shipping_address: shippingAddress,
          };

          const { error: orderError, data: insertedOrder } = await supabase
            .from("orders")
            .insert(orderData)
            .select()
            .single();

          if (orderError) {
            console.error("Failed to create order:", orderError);
            // Don't throw - we still want to process the payment
          } else {
            console.log("Order created successfully:", productId);

            // Send new order notification to admin
            try {
              await sendAdminOrderNotification({
                order: insertedOrder || { ...orderData, id: stripeObject.id },
                product,
                customerEmail,
                shippingAddress,
              });
              console.log("✅ Admin notification email sent successfully");
            } catch (adminEmailError) {
              console.error("❌ Failed to send admin notification email:", adminEmailError);
              // Don't throw - order is already created
            }
          }
        }

        // Handle user profile (optional - for logged-in users or if you want to track customers)
        // This is kept for backwards compatibility with the original SaaS logic
        const plan = configFile.stripe.plans.find((p) => p.priceId === priceId);

        if (plan && userId) {
          // Update profile for logged-in users with legacy plan-based access
          const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).single();

          if (profile) {
            await supabase
              .from("profiles")
              .update({
                customer_id: customerIdStr,
                price_id: priceId,
                has_access: true,
              })
              .eq("id", userId);
          }
        } else if (customerEmail && !userId) {
          // For guest checkout, optionally create a profile or just log
          console.log(`Guest order completed for: ${customerEmail}`);

          // Check if profile exists with this email
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", customerEmail)
            .single();

          if (existingProfile) {
            // Link order to existing profile if found
            await supabase
              .from("orders")
              .update({ user_id: existingProfile.id })
              .eq("stripe_session_id", stripeObject.id);
          }
        }

        break;
      }

      case "checkout.session.expired": {
        // User didn't complete the transaction
        // You can send an abandoned cart email here
        break;
      }

      default:
        // Unhandled event type
        console.log(`Unhandled event type: ${eventType}`);
    }
  } catch (e) {
    console.error("Stripe webhook error:", e.message);
  }

  return NextResponse.json({});
}

/**
 * Sends a new order notification email to the admin
 */
async function sendAdminOrderNotification({ order, product, customerEmail, shippingAddress }) {
  const adminEmail = "unboxthemoment1@gmail.com";

  const orderNumber = order.id || order.stripe_session_id?.slice(-12) || "N/A";
  const orderDate = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const shippingInfo = shippingAddress
    ? `${shippingAddress.name || "N/A"}
${shippingAddress.address?.line1 || ""}
${shippingAddress.address?.line2 || ""}
${shippingAddress.address?.city || ""}, ${shippingAddress.address?.state || ""} ${
        shippingAddress.address?.postal_code || ""
      }
${shippingAddress.address?.country || ""}`
    : "No shipping address provided";

  const preferencesInfo = order.preferences
    ? `Vegan: ${order.preferences.vegan ? "Yes" : "No"}
Allergies: ${order.preferences.allergies || "None"}
Other Notes: ${order.preferences.otherNotes || "None"}`
    : "No preferences specified";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Order - Unbox The Moment</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px; background: linear-gradient(135deg, #D4AF37, #F4D03F); padding: 20px; border-radius: 8px;">
          <h1 style="color: #fff; font-size: 28px; margin: 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">🎁 New Order Received!</h1>
        </div>

        <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
          <p style="margin: 0; font-size: 16px; color: #1e40af;">
            <strong>Order #${orderNumber}</strong><br>
            <span style="font-size: 14px; color: #6b7280;">${orderDate}</span>
          </p>
        </div>

        <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Order Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #666; border-bottom: 1px solid #eee;">Product:</td>
              <td style="padding: 10px 0; font-weight: bold; text-align: right; border-bottom: 1px solid #eee;">${
                product.name
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; border-bottom: 1px solid #eee;">Tier:</td>
              <td style="padding: 10px 0; font-weight: bold; text-align: right; border-bottom: 1px solid #eee;">${
                product.tierName || product.tier
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; border-bottom: 1px solid #eee;">Category:</td>
              <td style="padding: 10px 0; font-weight: bold; text-align: right; border-bottom: 1px solid #eee;">${
                product.category
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666;">Price:</td>
              <td style="padding: 10px 0; font-weight: bold; text-align: right; color: #16a34a; font-size: 18px;">$${
                product.price
              }</td>
            </tr>
          </table>
        </div>

        <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Customer Information</h2>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${customerEmail}" style="color: #3b82f6;">${customerEmail}</a></p>
        </div>

        <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Shipping Address</h2>
          <p style="margin: 10px 0; white-space: pre-line; color: #555;">${shippingInfo}</p>
        </div>

        <div style="background: #fef3c7; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: #92400e; font-size: 18px; margin-top: 0; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">Customer Preferences</h2>
          <p style="margin: 10px 0; white-space: pre-line; color: #78350f;">${preferencesInfo}</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="http://localhost:3000/admin" style="display: inline-block; background: #1a1a1a; color: #fff; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: 500;">View in Admin Dashboard</a>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px;">
            This is an automated notification from Unbox The Moment
          </p>
        </div>
      </body>
    </html>
  `;

  const text = `
🎁 NEW ORDER RECEIVED!

Order #${orderNumber}
Date: ${orderDate}

ORDER DETAILS
-------------
Product: ${product.name}
Tier: ${product.tierName || product.tier}
Category: ${product.category}
Price: $${product.price}

CUSTOMER INFORMATION
--------------------
Email: ${customerEmail}

SHIPPING ADDRESS
----------------
${shippingInfo}

CUSTOMER PREFERENCES
--------------------
${preferencesInfo}

---
View in Admin Dashboard: http://localhost:3000/admin
  `;

  console.log("Sending admin notification email to:", adminEmail);

  const result = await sendEmail({
    to: adminEmail,
    subject: `🎁 New Order: ${product.name} - $${product.price}`,
    html,
    text,
  });

  return result;
}
