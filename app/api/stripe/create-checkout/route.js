import { createCheckout } from "@/libs/stripe";
import { createClient } from "@/libs/supabase/server";
import { NextResponse } from "next/server";

// Error messages for different failure scenarios
const ERROR_MESSAGES = {
  MISSING_PRICE_ID: "Unable to process your order. Please refresh the page and try again.",
  MISSING_URLS: "Unable to process your order. Please refresh the page and try again.",
  STRIPE_NOT_CONFIGURED: "Payment system is temporarily unavailable. Please try again later.",
  STRIPE_INVALID_PRICE: "This product is currently unavailable. Please try a different option.",
  STRIPE_RATE_LIMIT: "Too many requests. Please wait a moment and try again.",
  STRIPE_CARD_ERROR: "There was an issue with your payment. Please try again.",
  NETWORK_ERROR: "Connection error. Please check your internet and try again.",
  DEFAULT: "Something went wrong. Please try again or contact support.",
};

// Map Stripe error codes to user-friendly messages
const getStripeErrorMessage = (error) => {
  const code = error?.code || error?.type;

  switch (code) {
    case "resource_missing":
    case "invalid_request_error":
      if (error?.message?.includes("price")) {
        return ERROR_MESSAGES.STRIPE_INVALID_PRICE;
      }
      return ERROR_MESSAGES.DEFAULT;
    case "rate_limit_error":
      return ERROR_MESSAGES.STRIPE_RATE_LIMIT;
    case "card_error":
      return ERROR_MESSAGES.STRIPE_CARD_ERROR;
    case "authentication_error":
    case "api_key_invalid":
      return ERROR_MESSAGES.STRIPE_NOT_CONFIGURED;
    default:
      return ERROR_MESSAGES.DEFAULT;
  }
};

// This function is used to create a Stripe Checkout Session for one-time payments
// It supports both authenticated users and guest checkout
// Preferences (vegan, allergies, notes, gift message) are passed to Stripe metadata
export async function POST(req) {
  let body;

  // Parse request body with error handling
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request. Please try again.", code: "INVALID_REQUEST" }, { status: 400 });
  }

  // Validate required fields
  if (!body.priceId || body.priceId.trim() === "") {
    console.error("Missing or empty priceId in request:", body);
    return NextResponse.json({ error: ERROR_MESSAGES.MISSING_PRICE_ID, code: "MISSING_PRICE_ID" }, { status: 400 });
  }

  // Validate priceId format
  if (!body.priceId.startsWith("price_")) {
    console.error("Invalid priceId format:", body.priceId);
    return NextResponse.json({ error: ERROR_MESSAGES.STRIPE_INVALID_PRICE, code: "INVALID_PRICE_ID" }, { status: 400 });
  }

  if (!body.successUrl || !body.cancelUrl) {
    return NextResponse.json({ error: ERROR_MESSAGES.MISSING_URLS, code: "MISSING_URLS" }, { status: 400 });
  }

  // Always use payment mode for one-time purchases (mode is set in createCheckout function)

  // Check Stripe configuration
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("Stripe secret key is not configured");
    return NextResponse.json(
      { error: ERROR_MESSAGES.STRIPE_NOT_CONFIGURED, code: "STRIPE_NOT_CONFIGURED" },
      { status: 503 }
    );
  }

  try {
    const supabase = await createClient();

    // Try to get the current user - this is optional for guest checkout
    let user = null;
    let profileData = null;

    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      user = authUser;

      if (user?.id) {
        const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
        profileData = data;
      }
    } catch {
      // User is not authenticated - this is fine for guest checkout
      console.log("Guest checkout - no authenticated user");
    }

    const { priceId, successUrl, cancelUrl, productId, preferences } = body;

    // Additional validation and logging
    console.log("Creating checkout session with:", {
      priceId,
      successUrl,
      cancelUrl,
      productId,
      hasPriceId: !!priceId,
      priceIdLength: priceId?.length,
      priceIdType: typeof priceId,
      hasSuccessUrl: !!successUrl,
      hasCancelUrl: !!cancelUrl,
    });

    if (!priceId || priceId.trim() === "") {
      console.error("Empty priceId received:", body);
      return NextResponse.json({ error: ERROR_MESSAGES.MISSING_PRICE_ID, code: "MISSING_PRICE_ID" }, { status: 400 });
    }

    if (!successUrl || successUrl.trim() === "") {
      console.error("Empty successUrl received:", body);
      return NextResponse.json({ error: ERROR_MESSAGES.MISSING_URLS, code: "MISSING_URLS" }, { status: 400 });
    }

    if (!cancelUrl || cancelUrl.trim() === "") {
      console.error("Empty cancelUrl received:", body);
      return NextResponse.json({ error: ERROR_MESSAGES.MISSING_URLS, code: "MISSING_URLS" }, { status: 400 });
    }

    const stripeSessionURL = await createCheckout({
      priceId: priceId.trim(),
      mode: "payment",
      successUrl,
      cancelUrl,
      // If user is logged in, pass the user ID to the Stripe Session
      // This can be retrieved in the webhook later
      clientReferenceId: user?.id || null,
      user: {
        email: profileData?.email || null,
        // If the user has already purchased, it will automatically prefill their credit card
        customerId: profileData?.customer_id || null,
      },
      // Product and preferences for order tracking (including gift message)
      productId,
      preferences: preferences || {},
      // If you send coupons from the frontend, you can pass it here
      // couponId: body.couponId,
    });

    if (!stripeSessionURL) {
      return NextResponse.json({ error: ERROR_MESSAGES.DEFAULT, code: "NO_SESSION_URL" }, { status: 500 });
    }

    return NextResponse.json({ url: stripeSessionURL });
  } catch (error) {
    console.error("Checkout error:", error);

    // Determine the appropriate error message based on the error type
    const errorMessage = getStripeErrorMessage(error);
    const statusCode = error?.statusCode || 500;

    return NextResponse.json(
      {
        error: errorMessage,
        code: error?.code || "CHECKOUT_ERROR",
        // Only include detailed message in development
        ...(process.env.NODE_ENV === "development" && { details: error?.message }),
      },
      { status: statusCode }
    );
  }
}
