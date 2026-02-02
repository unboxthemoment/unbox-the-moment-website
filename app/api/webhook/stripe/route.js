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

            // Send order confirmation email
            if (customerEmail) {
              console.log("Attempting to send order confirmation email to:", customerEmail);
              try {
                await sendOrderConfirmationEmail({
                  email: customerEmail,
                  order: insertedOrder || { ...orderData, id: stripeObject.id },
                  product,
                  shippingAddress,
                });
                console.log("✅ Order confirmation email sent successfully to:", customerEmail);
              } catch (emailError) {
                console.error("❌ Failed to send order confirmation email:", emailError);
                console.error("Email error details:", {
                  message: emailError.message,
                  stack: emailError.stack,
                  email: customerEmail,
                });
                // Don't throw - order is already created
              }
            } else {
              console.warn("⚠️ No customer email found, skipping order confirmation email");
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
 * Sends an order confirmation email to the customer
 */
async function sendOrderConfirmationEmail({ email, order, product, shippingAddress }) {
  // In development/test mode, Resend requires domain verification or using test emails
  // For testing without domain verification, use Resend's test email: delivered@resend.dev
  // In production, you must verify your domain in Resend dashboard: https://resend.com/domains

  // For testing: Use Resend test email if domain is not verified
  // In production, use the actual customer email
  const isDevelopment = process.env.NODE_ENV === "development";
  const useTestEmail = isDevelopment && !process.env.RESEND_DOMAIN_VERIFIED;

  // If domain not verified, send to test email but log the real email
  const emailToSend = useTestEmail ? "delivered@resend.dev" : email;

  if (useTestEmail) {
    console.log(`⚠️ Domain not verified - sending test email to delivered@resend.dev instead of ${email}`);
    console.log(`   To receive real emails, verify your domain at https://resend.com/domains`);
  }

  const orderNumber = order.id || order.stripe_session_id?.slice(-12) || "N/A";
  const shippingInfo = shippingAddress
    ? `${shippingAddress.name}\n${shippingAddress.address?.line1}\n${shippingAddress.address?.city}, ${shippingAddress.address?.state} ${shippingAddress.address?.postal_code}`
    : "Will be provided when shipped";

  // Log the email being sent (for debugging)
  console.log("Preparing order confirmation email:", {
    to: emailToSend,
    originalEmail: email,
    orderNumber,
    productName: product.name,
  });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation - Unbox The Moment</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #D4AF37; font-size: 32px; margin: 0;">🎉 Thank You!</h1>
          <p style="font-size: 18px; color: #666; margin-top: 10px;">Your order has been confirmed</p>
        </div>

        <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: #333; font-size: 20px; margin-top: 0;">Order Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666;">Order Number:</td>
              <td style="padding: 8px 0; font-weight: bold; text-align: right;">#${orderNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Product:</td>
              <td style="padding: 8px 0; font-weight: bold; text-align: right;">${product.name} - ${
    product.tierName
  }</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Price:</td>
              <td style="padding: 8px 0; font-weight: bold; text-align: right;">$${product.price}</td>
            </tr>
          </table>
        </div>

        <div style="background: #fff3cd; border-left: 4px solid #D4AF37; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
          <h3 style="margin-top: 0; color: #856404;">What Happens Next?</h3>
          <ol style="margin: 10px 0; padding-left: 20px; color: #856404;">
            <li style="margin-bottom: 8px;">We're curating your surprise box with care</li>
            <li style="margin-bottom: 8px;">You'll receive a shipping notification with tracking</li>
            <li style="margin-bottom: 8px;">Your box will arrive in 3-5 business days</li>
          </ol>
        </div>

        ${
          shippingAddress
            ? `
        <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h3 style="color: #333; font-size: 18px; margin-top: 0;">Shipping Address</h3>
          <p style="margin: 5px 0; color: #666;">${shippingInfo.replace(/\n/g, "<br>")}</p>
        </div>
        `
            : ""
        }

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px; margin: 10px 0;">
            Questions? Reply to this email or contact us at 
            <a href="mailto:support@unboxthemoment.com" style="color: #D4AF37; text-decoration: none;">support@unboxthemoment.com</a>
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            We're so excited to help you create an unforgettable moment! ✨
          </p>
        </div>
      </body>
    </html>
  `;

  const text = `
Thank You for Your Order!

Order Number: #${orderNumber}
Product: ${product.name} - ${product.tierName}
Price: $${product.price}

What Happens Next?
1. We're curating your surprise box with care
2. You'll receive a shipping notification with tracking
3. Your box will arrive in 3-5 business days

${shippingAddress ? `Shipping Address:\n${shippingInfo}\n` : ""}

Questions? Contact us at support@unboxthemoment.com

We're so excited to help you create an unforgettable moment!
  `;

  console.log("Sending email via Resend:", {
    to: emailToSend,
    originalEmail: email,
    from: configFile.resend.fromAdmin,
    subject: `Order Confirmation - ${product.name}`,
  });

  try {
    const result = await sendEmail({
      to: emailToSend,
      subject: `Order Confirmation - ${product.name}`,
      html,
      text,
    });
    console.log("✅ Resend API response:", result);

    if (useTestEmail) {
      console.log(`📧 Test email sent successfully! Check delivered@resend.dev inbox.`);
      console.log(`   Real customer email (${email}) will receive emails once domain is verified.`);
    }

    return result;
  } catch (error) {
    console.error("❌ Resend API error:", {
      message: error.message,
      name: error.name,
      statusCode: error.statusCode,
    });

    // If domain verification error, provide helpful message
    if (error.statusCode === 403 && error.message?.includes("domain is not verified")) {
      console.error("\n💡 SOLUTION:");
      console.error("   1. Go to https://resend.com/domains");
      console.error("   2. Add and verify your domain: unboxthemoment.com");
      console.error("   3. Or set RESEND_DOMAIN_VERIFIED=true in .env.local after verification");
      console.error("   4. For testing, emails will go to delivered@resend.dev\n");
    }

    throw error;
  }
}
