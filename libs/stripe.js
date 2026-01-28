import Stripe from "stripe";

// This is used to create a Stripe Checkout for one-time payments.
// It's usually triggered with the <ButtonCheckout /> component or the product detail page.
// Webhooks are used to update the user's state in the database.
export const createCheckout = async ({
  priceId,
  successUrl,
  cancelUrl,
  couponId,
  clientReferenceId,
  user,
  productId,
  preferences,
}) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const extraParams = {};

  // Build metadata object with product and preferences info
  const metadata = {};

  if (productId) {
    metadata.product_id = productId;
  }

  if (preferences) {
    metadata.preferences_vegan = preferences.vegan ? "true" : "false";
    metadata.preferences_allergies = preferences.allergies || "";
    metadata.preferences_other_notes = preferences.otherNotes || "";
    // Gift message fields
    metadata.is_gift = preferences.isGift ? "true" : "false";
    metadata.recipient_name = preferences.recipientName || "";
    metadata.gift_message = preferences.giftMessage || "";
  }

  if (user?.customerId) {
    extraParams.customer = user.customerId;
  } else {
    // Enable customer creation for guest checkout
    extraParams.customer_creation = "always";
    extraParams.payment_intent_data = {
      setup_future_usage: "on_session",
      metadata,
    };
    if (user?.email) {
      extraParams.customer_email = user.email;
    }
    extraParams.tax_id_collection = { enabled: true };
  }

  // Configure payment methods - Stripe Checkout automatically handles Apple Pay
  // when cards are enabled and the customer is on a supported device/browser
  const paymentMethodTypes = ["card"]; // Apple Pay is automatically included with card on supported devices

  const stripeSession = await stripe.checkout.sessions.create({
    mode: "payment",
    allow_promotion_codes: true,
    client_reference_id: clientReferenceId,
    payment_method_types: paymentMethodTypes,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    discounts: couponId
      ? [
          {
            coupon: couponId,
          },
        ]
      : [],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata, // Store metadata on the session itself
    shipping_address_collection: {
      allowed_countries: ["US", "CA"], // Add more countries as needed
    },
    billing_address_collection: "required",
    ...extraParams,
  });

  return stripeSession.url;
};

// This is used to create Customer Portal sessions, so users can manage their payment methods
export const createCustomerPortal = async ({ customerId, returnUrl }) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return portalSession.url;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// This is used to get the user checkout session and populate the data
export const findCheckoutSession = async (sessionId) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer"],
    });

    return session;
  } catch (e) {
    console.error(e);
    return null;
  }
};
