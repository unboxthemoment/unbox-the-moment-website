"use client";

import { useState } from "react";

// This component is used to create Stripe Checkout Sessions
// It handles one-time payments only
// It also passes product preferences (vegan, allergies, notes) to the checkout
const ButtonCheckout = ({
  priceId,
  productId = null,
  preferences = {},
  buttonText = null,
  className = "btn btn-gold w-full",
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          mode: "payment",
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: window.location.href,
          productId,
          preferences,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        alert("Something went wrong. Please try again.");
      }
    } catch (e) {
      console.error("Checkout error:", e);
      alert("Something went wrong. Please try again.");
    }

    setIsLoading(false);
  };

  // Determine button text
  const displayText = buttonText || "Buy Now";

  return (
    <button
      className={className}
      onClick={handlePayment}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          {displayText}
        </>
      )}
    </button>
  );
};

export default ButtonCheckout;
