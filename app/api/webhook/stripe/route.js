import configFile, { getProductById } from "@/config";
import { findCheckoutSession } from "@/libs/stripe";
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

          const { error: orderError } = await supabase.from("orders").insert(orderData);

          if (orderError) {
            console.error("Failed to create order:", orderError);
            // Don't throw - we still want to process the payment
          } else {
            console.log("Order created successfully:", productId);
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
