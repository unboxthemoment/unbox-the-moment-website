"use client";

import Link from "next/link";
import Image from "next/image";
import config, { getProductsByCategory } from "@/config";

// RelatedProducts component - shows products from same category (different tier)
// and cross-sells from other categories
const RelatedProducts = ({ currentProductId, currentCategory }) => {
  // Get products from same category (different tier)
  const sameCategoryProducts = getProductsByCategory(currentCategory)
    .filter((p) => p.id !== currentProductId)
    .slice(0, 2);

  // Get featured products from other categories for cross-sell
  const otherCategoryProducts = config.products
    .filter((p) => p.category !== currentCategory && p.isFeatured)
    .slice(0, 2);

  const relatedProducts = [...sameCategoryProducts, ...otherCategoryProducts].slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-200">
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 text-center px-4">You Might Also Like</h3>
      <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8 px-4">
        Explore more curated experiences
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {relatedProducts.map((product) => (
          <RelatedProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

// Individual product card for related products
const RelatedProductCard = ({ product }) => {
  const category = config.categories.find((c) => c.slug === product.category);

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block"
    >
      <div className="card-luxury rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Product Image */}
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={`${product.name} - ${product.tierName}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-12 h-12 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </div>
          )}

          {/* Tier Badge */}
          <div className="absolute top-2 left-2 z-10">
            <span
              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
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
        <div className="p-3 sm:p-4">
          <p className="text-[#D4AF37] text-[10px] sm:text-xs font-medium uppercase tracking-wide mb-1">
            {category?.name || product.categoryName}
          </p>
          <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-1.5 sm:mb-2 group-hover:text-[#D4AF37] transition-colors">
            {product.tierName}
          </h4>
          <div className="flex items-center justify-between">
            <span className="font-bold text-base sm:text-lg">${product.price}</span>
            <span className="text-[10px] sm:text-xs text-[#D4AF37] font-medium group-hover:underline">View →</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RelatedProducts;
