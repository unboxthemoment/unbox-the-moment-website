"use client";

import { useState } from "react";
import config from "@/config";

// Waitlist signup component - shows email form when waitlist is active
// Can be used inline or as a replacement for checkout buttons
const WaitlistSignup = ({
  className = "",
  buttonClassName = "btn btn-gold w-full py-3 sm:py-4 text-sm sm:text-base",
  showMessage = true,
  compact = false,
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setEmail("");
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setIsLoading(false);
  };

  // Success state
  if (isSuccess) {
    return (
      <div className={`${className}`}>
        <div className={`bg-green-50 border border-green-200 rounded-lg ${compact ? "p-3" : "p-4 sm:p-6"}`}>
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#22c55e"
                className={compact ? "w-5 h-5" : "w-6 h-6"}
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className={`font-medium text-green-800 ${compact ? "text-sm" : "text-base"}`}>
                You&apos;re on the list!
              </p>
              <p className={`text-green-700 ${compact ? "text-xs" : "text-sm"}`}>
                We&apos;ll email you when we launch.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Pre-launch message */}
      {showMessage && (
        <div className={`bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg ${compact ? "p-3 mb-3" : "p-4 mb-4"}`}>
          <div className="flex items-start gap-3">
            <div className="shrink-0 mt-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#D4AF37"
                className={compact ? "w-4 h-4" : "w-5 h-5"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className={`font-medium text-[#1a1a1a] ${compact ? "text-sm" : "text-base"}`}>Coming Soon</p>
              <p className={`text-[#5c564d] ${compact ? "text-xs" : "text-sm"}`}>
                {config.waitlist?.launchMessage || "We're launching soon! Join our waitlist to be first in line."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Email signup form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        <div>
          <label
            htmlFor="waitlist-email"
            className="sr-only"
          >
            Email address
          </label>
          <input
            type="email"
            id="waitlist-email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="input-luxury w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className={buttonClassName}
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
                className="w-4 h-4 sm:w-5 sm:h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
              Join Waitlist
            </>
          )}
        </button>
      </form>

      <p className={`text-gray-500 text-center ${compact ? "text-xs mt-2" : "text-sm mt-3"}`}>
        No spam. We&apos;ll only email you when we launch.
      </p>
    </div>
  );
};

export default WaitlistSignup;
