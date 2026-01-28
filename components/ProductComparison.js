import Link from "next/link";

// Product comparison table for category pages
const ProductComparison = ({ products }) => {
  if (!products || products.length === 0) return null;

  // Sort products by price (tier order)
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-3 sm:mb-4 px-4">Compare All Tiers</h2>
          <p className="text-sm sm:text-base text-gray-600 px-4">Find the perfect box for your needs</p>
        </div>

        {/* Desktop Comparison Table */}
        <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-6 font-semibold text-gray-900">Feature</th>
                {sortedProducts.map((product) => (
                  <th
                    key={product.id}
                    className={`text-center p-6 ${product.isFeatured ? "bg-[#D4AF37]/5" : ""}`}
                  >
                    <div className="space-y-2">
                      {product.isFeatured && (
                        <span className="inline-block bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                          Most Popular
                        </span>
                      )}
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
                      <div className="text-2xl font-bold text-black">${product.price}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Best For Row */}
              <tr className="border-b border-gray-100">
                <td className="p-6 text-gray-700 font-medium">Best For</td>
                {sortedProducts.map((product) => (
                  <td
                    key={product.id}
                    className={`p-6 text-center text-sm text-gray-600 ${product.isFeatured ? "bg-[#D4AF37]/5" : ""}`}
                  >
                    {product.bestFor || "Everyday moments"}
                  </td>
                ))}
              </tr>

              {/* CTA Row */}
              <tr>
                <td className="p-6"></td>
                {sortedProducts.map((product) => (
                  <td
                    key={product.id}
                    className={`p-6 text-center ${product.isFeatured ? "bg-[#D4AF37]/5" : ""}`}
                  >
                    <Link
                      href={`/products/${product.id}`}
                      className={`btn w-full ${product.isFeatured ? "btn-gold" : "btn-gold-outline"}`}
                    >
                      Select {product.tierName}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Comparison Cards */}
        <div className="md:hidden space-y-4 sm:space-y-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className={`rounded-xl border-2 bg-white p-4 sm:p-5 md:p-6 ${
                product.isFeatured ? "border-[#D4AF37] ring-2 ring-[#D4AF37] ring-offset-2" : "border-gray-200"
              }`}
            >
              {product.isFeatured && (
                <div className="text-center mb-3 sm:mb-4">
                  <span className="bg-[#D4AF37] text-black text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span
                  className={`inline-block px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${
                    product.tier === "luxury"
                      ? "bg-black text-white"
                      : product.tier === "premium"
                        ? "bg-[#D4AF37] text-black"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {product.tierName}
                </span>
                <span className="text-xl sm:text-2xl font-bold">${product.price}</span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                <span className="font-medium text-gray-900">Best for:</span> {product.bestFor || "Everyday moments"}
              </p>

              <Link
                href={`/products/${product.id}`}
                className={`btn w-full text-sm sm:text-base ${product.isFeatured ? "btn-gold" : "btn-gold-outline"}`}
              >
                Select {product.tierName}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductComparison;
