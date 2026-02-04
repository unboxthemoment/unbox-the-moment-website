import Link from "next/link";

// Tier-specific value propositions and highlights
const tierValueProps = {
  essential: {
    tagline: "Great for trying us out",
    upgradeReason: null,
  },
  premium: {
    tagline: "Best value for your moment",
    upgradeReason: "+$10 for premium upgrades",
  },
  luxury: {
    tagline: "The ultimate experience",
    upgradeReason: "Our finest curation",
  },
};

// Comparison features to highlight across tiers
const comparisonFeatures = [
  {
    name: "Presentation",
    essential: "Beautiful packaging",
    premium: "Gift-ready packaging",
    luxury: "Luxury presentation box",
  },
];

// Checkmark icon component
const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
      clipRule="evenodd"
    />
  </svg>
);

// X icon component
const XIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
  </svg>
);

// Star icon for premium features
const StarIcon = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
      clipRule="evenodd"
    />
  </svg>
);

// Product comparison table for category pages
const ProductComparison = ({ products }) => {
  if (!products || products.length === 0) return null;

  // Sort products by price (tier order)
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);

  return (
    <section className="py-10 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-2 sm:mb-4">Compare All Tiers</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Find the perfect box for your needs</p>

          {/* Why Upgrade Callout - Hidden on smallest screens, simplified on mobile */}
          <div className="hidden sm:inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-2 text-sm">
            <StarIcon className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span className="text-gray-700">
              <span className="font-semibold text-[#D4AF37]">Why upgrade?</span> More items, premium brands & exclusive
              surprises
            </span>
          </div>
        </div>

        {/* Desktop Comparison Table */}
        <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-6 font-semibold text-gray-900 w-1/4">Feature</th>
                {sortedProducts.map((product, index) => (
                  <th
                    key={product.id}
                    className={`text-center p-6 relative ${
                      product.isFeatured ? "bg-[#D4AF37]/10" : product.tier === "luxury" ? "bg-gray-900/5" : ""
                    }`}
                  >
                    {/* Featured/Luxury column highlight border */}
                    {(product.isFeatured || product.tier === "luxury") && (
                      <div
                        className={`absolute top-0 left-0 right-0 h-1 ${
                          product.tier === "luxury" ? "bg-gray-900" : "bg-[#D4AF37]"
                        }`}
                      />
                    )}

                    <div className="space-y-2">
                      {/* Badges */}
                      <div className="flex flex-col items-center gap-1">
                        {product.isFeatured && (
                          <span className="inline-block bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                            Most Popular
                          </span>
                        )}
                        {product.tier === "premium" && !product.isFeatured && (
                          <span className="inline-block bg-[#D4AF37]/20 text-[#B8962C] text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                            Best Value
                          </span>
                        )}
                        {product.tier === "luxury" && (
                          <span className="inline-block bg-gray-900 text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                            Ultimate
                          </span>
                        )}
                      </div>

                      {/* Tier Badge */}
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                          product.tier === "luxury"
                            ? "bg-black text-white"
                            : product.tier === "premium"
                            ? "bg-[#D4AF37] text-black"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {product.tierName}
                      </div>

                      {/* Price */}
                      <div className="text-2xl font-bold text-black">${product.price}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Bonus Surprise Row */}
              <tr className="border-b border-gray-100">
                <td className="p-6 text-gray-700 font-medium">Bonus Surprise</td>
                {sortedProducts.map((product) => (
                  <td
                    key={product.id}
                    className={`p-6 text-center ${
                      product.isFeatured ? "bg-[#D4AF37]/10" : product.tier === "luxury" ? "bg-gray-900/5" : ""
                    }`}
                  >
                    {product.tier !== "essential" ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                        <CheckIcon className="w-4 h-4 text-green-600" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full">
                        <XIcon className="w-4 h-4 text-gray-400" />
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Keepsake Item Row */}
              <tr className="border-b border-gray-100">
                <td className="p-6 text-gray-700 font-medium">Keepsake Item</td>
                {sortedProducts.map((product) => (
                  <td
                    key={product.id}
                    className={`p-6 text-center ${
                      product.isFeatured ? "bg-[#D4AF37]/10" : product.tier === "luxury" ? "bg-gray-900/5" : ""
                    }`}
                  >
                    {product.tier === "luxury" ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                        <CheckIcon className="w-4 h-4 text-green-600" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full">
                        <XIcon className="w-4 h-4 text-gray-400" />
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Exclusive Surprises Row */}
              <tr className="border-b border-gray-100">
                <td className="p-6 text-gray-700 font-medium">Exclusive Surprises</td>
                {sortedProducts.map((product) => (
                  <td
                    key={product.id}
                    className={`p-6 text-center ${
                      product.isFeatured ? "bg-[#D4AF37]/10" : product.tier === "luxury" ? "bg-gray-900/5" : ""
                    }`}
                  >
                    {product.tier === "luxury" ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                        <CheckIcon className="w-4 h-4 text-green-600" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full">
                        <XIcon className="w-4 h-4 text-gray-400" />
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Presentation Row */}
              <tr className="border-b border-gray-100">
                <td className="p-6 text-gray-700 font-medium">Presentation</td>
                {sortedProducts.map((product) => (
                  <td
                    key={product.id}
                    className={`p-6 text-center text-sm ${
                      product.isFeatured ? "bg-[#D4AF37]/10" : product.tier === "luxury" ? "bg-gray-900/5" : ""
                    }`}
                  >
                    <span
                      className={
                        product.tier === "luxury"
                          ? "text-gray-900 font-medium"
                          : product.tier === "premium"
                          ? "text-[#B8962C]"
                          : "text-gray-600"
                      }
                    >
                      {comparisonFeatures.find((f) => f.name === "Presentation")?.[product.tier]}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Best For Row */}
              <tr className="border-b border-gray-100">
                <td className="p-6 text-gray-700 font-medium">Best For</td>
                {sortedProducts.map((product) => (
                  <td
                    key={product.id}
                    className={`p-6 text-center text-sm text-gray-600 ${
                      product.isFeatured ? "bg-[#D4AF37]/10" : product.tier === "luxury" ? "bg-gray-900/5" : ""
                    }`}
                  >
                    {product.bestFor || "Everyday moments"}
                  </td>
                ))}
              </tr>

              {/* Why Choose This Tier Row */}
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <td className="p-6 text-gray-700 font-medium">
                  <div className="flex items-center gap-2">
                    <StarIcon className="w-4 h-4 text-[#D4AF37]" />
                    <span>Why Choose</span>
                  </div>
                </td>
                {sortedProducts.map((product) => (
                  <td
                    key={product.id}
                    className={`p-6 text-center ${
                      product.isFeatured ? "bg-[#D4AF37]/10" : product.tier === "luxury" ? "bg-gray-900/5" : ""
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        product.tier === "luxury"
                          ? "text-gray-900"
                          : product.tier === "premium"
                          ? "text-[#B8962C]"
                          : "text-gray-600"
                      }`}
                    >
                      {tierValueProps[product.tier].tagline}
                    </p>
                  </td>
                ))}
              </tr>

              {/* CTA Row */}
              <tr>
                <td className="p-6"></td>
                {sortedProducts.map((product) => (
                  <td
                    key={product.id}
                    className={`p-6 text-center ${
                      product.isFeatured ? "bg-[#D4AF37]/10" : product.tier === "luxury" ? "bg-gray-900/5" : ""
                    }`}
                  >
                    <Link
                      href={`/products/${product.id}`}
                      className={`btn w-full ${
                        product.tier === "luxury"
                          ? "bg-gray-900 text-white hover:bg-gray-800"
                          : product.isFeatured
                          ? "btn-gold"
                          : "btn-gold-outline"
                      }`}
                    >
                      Select {product.tierName}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Comparison Cards - Completely redesigned for mobile */}
        <div className="md:hidden space-y-3">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className={`rounded-xl bg-white overflow-hidden ${
                product.isFeatured
                  ? "ring-2 ring-[#D4AF37] shadow-lg"
                  : product.tier === "luxury"
                  ? "ring-2 ring-gray-900 shadow-lg"
                  : "border border-gray-200"
              }`}
            >
              {/* Card Header with Tier + Price */}
              <div
                className={`px-4 py-3 ${
                  product.tier === "luxury" ? "bg-gray-900" : product.isFeatured ? "bg-[#D4AF37]" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-bold uppercase tracking-wide ${
                        product.tier === "luxury" || product.isFeatured ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {product.tierName}
                    </span>
                    {product.isFeatured && (
                      <span className="text-[10px] font-bold uppercase bg-white/20 text-white px-1.5 py-0.5 rounded">
                        Popular
                      </span>
                    )}
                    {product.tier === "luxury" && (
                      <span className="text-[10px] font-bold uppercase bg-white/20 text-white px-1.5 py-0.5 rounded">
                        Ultimate
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xl font-bold ${
                      product.tier === "luxury" || product.isFeatured ? "text-white" : "text-gray-900"
                    }`}
                  >
                    ${product.price}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-4 py-3">
                {/* Tagline */}
                <p className="text-sm text-gray-600 mb-3">{tierValueProps[product.tier].tagline}</p>

                {/* Features Grid - Compact 2-column layout */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    {product.tier !== "essential" ? (
                      <CheckIcon className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    ) : (
                      <XIcon className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                    )}
                    <span className={product.tier !== "essential" ? "text-gray-700" : "text-gray-400"}>
                      Bonus Surprise
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {product.tier === "luxury" ? (
                      <CheckIcon className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    ) : (
                      <XIcon className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                    )}
                    <span className={product.tier === "luxury" ? "text-gray-700" : "text-gray-400"}>Keepsake Item</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {product.tier === "luxury" ? (
                      <CheckIcon className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    ) : (
                      <XIcon className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                    )}
                    <span className={product.tier === "luxury" ? "text-gray-700" : "text-gray-400"}>
                      Exclusive Items
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckIcon className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    <span className="text-gray-700">Gift Packaging</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/products/${product.id}`}
                  className={`btn btn-sm w-full text-sm ${
                    product.tier === "luxury"
                      ? "bg-gray-900 text-white hover:bg-gray-800 border-gray-900"
                      : product.isFeatured
                      ? "btn-gold"
                      : "btn-gold-outline"
                  }`}
                >
                  Select {product.tierName}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout - Simplified for mobile */}
        <div className="mt-6 sm:mt-12 text-center">
          <p className="text-sm text-gray-600">
            Not sure? <span className="font-semibold text-[#D4AF37]">Premium</span> is our most popular choice.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductComparison;
