"use client";

import { useState, Suspense, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar, { ShippingBanner } from "@/components/TrustBar";
import RelatedProducts from "@/components/RelatedProducts";
import config, { getProductById, getProductsByCategory, getCategoryBySlug } from "@/config";

// Preferences form component with gift message option
const PreferencesForm = ({ preferences, setPreferences }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 mb-6 sm:mb-8">
      <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-[#D4AF37]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Customize Your Box
      </h3>
      <p className="text-sm text-gray-600 mb-6">Help us customize your box. All fields are optional.</p>

      {/* Gift Option Toggle */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-white">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.isGift || false}
            onChange={(e) => setPreferences({ ...preferences, isGift: e.target.checked })}
            className="checkbox checkbox-gold w-5 h-5 rounded border-gray-300 checked:bg-[#D4AF37] checked:border-[#D4AF37]"
          />
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#D4AF37"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            <span className="text-sm font-medium">This is a gift</span>
          </div>
        </label>

        {/* Gift Message Fields */}
        {preferences.isGift && (
          <div className="mt-4 space-y-4 pl-8 border-l-2 border-[#D4AF37]/30">
            <div>
              <label className="block text-sm font-medium mb-2">Recipient&apos;s Name</label>
              <input
                type="text"
                value={preferences.recipientName || ""}
                onChange={(e) => setPreferences({ ...preferences, recipientName: e.target.value })}
                placeholder="Who is this gift for?"
                className="input-luxury w-full px-4 py-3 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Gift Message</label>
              <textarea
                value={preferences.giftMessage || ""}
                onChange={(e) => setPreferences({ ...preferences, giftMessage: e.target.value })}
                placeholder="Add a personal message to include with the gift..."
                rows={3}
                maxLength={200}
                className="input-luxury w-full px-4 py-3 rounded-lg text-sm resize-none"
              />
              <p className="text-xs text-gray-400 mt-1 text-right">
                {(preferences.giftMessage || "").length}/200 characters
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Dietary Preferences Section */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Dietary Preferences</h4>

        {/* Vegan Checkbox */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.vegan}
              onChange={(e) => setPreferences({ ...preferences, vegan: e.target.checked })}
              className="checkbox checkbox-gold w-5 h-5 rounded border-gray-300 checked:bg-[#D4AF37] checked:border-[#D4AF37]"
            />
            <span className="text-sm font-medium">Vegan</span>
          </label>
        </div>

        {/* Allergies Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Allergies</label>
          <input
            type="text"
            value={preferences.allergies}
            onChange={(e) => setPreferences({ ...preferences, allergies: e.target.value })}
            placeholder="e.g., nuts, dairy, gluten"
            className="input-luxury w-full px-4 py-3 rounded-lg text-sm"
          />
        </div>

        {/* Other Notes */}
        <div>
          <label className="block text-sm font-medium mb-2">Other Notes</label>
          <textarea
            value={preferences.otherNotes}
            onChange={(e) => setPreferences({ ...preferences, otherNotes: e.target.value })}
            placeholder="Any other preferences or special requests..."
            rows={3}
            className="input-luxury w-full px-4 py-3 rounded-lg text-sm resize-none"
          />
        </div>
      </div>
    </div>
  );
};

// Product details client component
function ProductDetails({ productId }) {
  const product = getProductById(productId);
  const [preferences, setPreferences] = useState({
    vegan: false,
    allergies: "",
    otherNotes: "",
    isGift: false,
    recipientName: "",
    giftMessage: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!product) {
    notFound();
  }

  const categoryData = getCategoryBySlug(product.category);
  const categoryProducts = getProductsByCategory(product.category);

  const [checkoutError, setCheckoutError] = useState(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setCheckoutError(null);

    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: product.priceId,
          mode: "payment",
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: window.location.href,
          productId: product.id,
          preferences,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error, data.code);
        setCheckoutError(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      // Handle network errors specifically
      if (!navigator.onLine) {
        setCheckoutError("You appear to be offline. Please check your internet connection and try again.");
      } else {
        setCheckoutError("Connection error. Please check your internet and try again.");
      }
    }

    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm overflow-x-auto">
            <Link
              href="/"
              className="text-gray-500 hover:text-[#D4AF37] whitespace-nowrap"
            >
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link
              href={`/boxes/${product.category}`}
              className="text-gray-500 hover:text-[#D4AF37] whitespace-nowrap"
            >
              {categoryData?.name || product.categoryName}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-black whitespace-nowrap">{product.tierName}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 lg:gap-16">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden relative">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={`${product.name} - ${product.tierName}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      className="w-24 h-24 mx-auto text-gray-300 mb-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                    <p className="text-gray-400 text-sm">Surprise Box</p>
                  </div>
                </div>
              )}
            </div>

            {/* Tier Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  product.tier === "luxury"
                    ? "bg-black text-white"
                    : product.tier === "premium"
                      ? "bg-[#D4AF37] text-black"
                      : "bg-gray-100 text-gray-700"
                }`}
              >
                {product.tierName}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-5 sm:mb-6">
              <p className="text-[#D4AF37] uppercase tracking-widest text-xs sm:text-sm font-medium mb-2">
                {categoryData?.name || product.categoryName}
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3 sm:mb-4">
                {product.name} - {product.tierName}
              </h1>
              <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl font-bold">${product.price}</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Preferences Form */}
            <PreferencesForm
              preferences={preferences}
              setPreferences={setPreferences}
            />

            {/* Checkout Error Message */}
            {checkoutError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#ef4444"
                    className="w-5 h-5 shrink-0 mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                  </svg>
                  <div className="flex-1">
                    <p className="text-red-800 text-sm font-medium">{checkoutError}</p>
                    <button
                      onClick={() => setCheckoutError(null)}
                      className="text-red-600 text-xs underline mt-1 hover:text-red-800"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="btn btn-gold w-full py-3 sm:py-4 text-sm sm:text-base mb-4"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>Buy Now - ${product.price}</>
              )}
            </button>

            {/* Trust Badges - Compact */}
            <div className="mb-6">
              <TrustBar variant="compact" />
            </div>

            {/* Shipping Info Banner */}
            <ShippingBanner />

            {/* Other Tiers */}
            {categoryProducts.length > 1 && (
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Other Options</h3>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {categoryProducts
                    .filter((p) => p.id !== product.id)
                    .map((p) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.id}`}
                        className={`flex-1 p-3 rounded-lg border text-center transition-all hover:border-[#D4AF37] ${
                          p.isFeatured ? "border-[#D4AF37] bg-[#D4AF37]/5" : "border-gray-200"
                        }`}
                      >
                        <div className="font-semibold text-xs sm:text-sm">{p.tierName}</div>
                        <div className="text-base sm:text-lg font-bold">${p.price}</div>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts
          currentProductId={product.id}
          currentCategory={product.category}
        />

        {/* Unboxing Experience Gallery */}
        {config.unboxingImages && config.unboxingImages.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-black mb-6 text-center">The Unboxing Experience</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {config.unboxingImages.map((imagePath, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={imagePath}
                    alt={`Unboxing experience ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ProductPage({ params }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.productId;

  return (
    <>
      <Suspense>
        <Header />
      </Suspense>

      <ProductDetails productId={productId} />

      <Footer />
    </>
  );
}
