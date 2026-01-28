import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductComparison from "@/components/ProductComparison";
import config, { getCategoryBySlug, getProductsByCategory } from "@/config";
import { getSEOTags } from "@/libs/seo";

export async function generateMetadata({ params }) {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);

  if (!categoryData) {
    return getSEOTags({
      title: "Category Not Found",
    });
  }

  return getSEOTags({
    title: `${categoryData.name} | ${config.appName}`,
    description: categoryData.description,
    canonicalUrlRelative: `/boxes/${category}`,
  });
}

export async function generateStaticParams() {
  return config.categories.map((category) => ({
    category: category.slug,
  }));
}

// Product tier card component - Hims-inspired style
const TierCard = ({ product }) => {
  const tierStyles = {
    essential: {
      badge: "bg-white text-[#1a1a1a]",
    },
    premium: {
      badge: "bg-[#1a1a1a] text-white",
    },
    luxury: {
      badge: "bg-[#c9a96e] text-[#1a1a1a]",
    },
  };

  const style = tierStyles[product.tier] || tierStyles.essential;

  return (
    <div
      className={`bg-[#f5f0eb] rounded-2xl relative ${
        product.isFeatured ? "ring-2 ring-[#1a1a1a] ring-offset-4 ring-offset-[#faf8f5]" : ""
      }`}
    >
      {product.isFeatured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="bg-[#1a1a1a] text-white text-xs font-medium px-4 py-1.5 rounded-full">Most popular</span>
        </div>
      )}

      {/* Product Image */}
      {product.image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ebe4db]">
          <Image
            src={product.image}
            alt={`${product.name} - ${product.tierName}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Tier Badge Overlay */}
          <div className="absolute top-4 left-4">
            <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-medium ${style.badge}`}>
              {product.tierName}
            </span>
          </div>
        </div>
      )}

      <div className="p-4 sm:p-5 md:p-6">
        {!product.image && (
          <div className="mb-3 sm:mb-4">
            <span
              className={`inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium ${style.badge}`}
            >
              {product.tierName}
            </span>
          </div>
        )}

        <div className="mb-4 sm:mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-semibold text-[#1a1a1a]">${product.price}</span>
            <span className="text-[#5c564d] text-xs sm:text-sm">/ box</span>
          </div>
        </div>

        <p className="text-[#5c564d] text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
          {product.shortDescription || product.description}
        </p>

        <Link
          href={`/products/${product.id}`}
          className={`btn w-full text-sm sm:text-base ${product.isFeatured ? "btn-gold" : "btn-gold-outline"}`}
        >
          Select this box
        </Link>
      </div>
    </div>
  );
};

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);

  if (!categoryData) {
    notFound();
  }

  const products = getProductsByCategory(category);

  return (
    <>
      <Suspense>
        <Header />
      </Suspense>

      <main className="min-h-screen bg-[#faf8f5]">
        {/* Hero Section */}
        <section className="relative pt-16 pb-12 sm:py-16 lg:py-24 overflow-hidden">
          {/* Hero Image Background */}
          {categoryData.heroImage && (
            <div className="absolute inset-0 z-0">
              <Image
                src={categoryData.heroImage}
                alt={categoryData.name}
                fill
                className="object-cover opacity-15"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5]/80 via-[#faf8f5]/70 to-[#faf8f5]" />
            </div>
          )}

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Link
                href="/"
                className="inline-flex items-center text-xs sm:text-sm text-[#5c564d] hover:text-[#1a1a1a] transition-colors mb-4 sm:mb-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                Back to all boxes
              </Link>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] mb-3 sm:mb-4 px-4">
                {categoryData.name}
              </h1>

              <p className="text-base sm:text-lg text-[#5c564d] mb-3 sm:mb-4 px-4">{categoryData.description}</p>

              {categoryData.peopleCount && (
                <p className="text-sm sm:text-base text-[#c9a96e] font-medium px-4">
                  Perfect for {categoryData.peopleCount}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 lg:pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="font-serif text-2xl sm:text-2xl md:text-3xl text-[#1a1a1a] mb-3 sm:mb-4 px-4">
                Choose your <span className="font-serif italic text-[#c9a96e]">experience</span>
              </h2>
              <p className="text-sm sm:text-base text-[#5c564d] px-4">Select the tier that matches your moment</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 relative">
              {products.map((product) => (
                <TierCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Product Comparison Table */}
        <ProductComparison products={products} />

        {/* Shipping Info */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2 text-[#1a1a1a]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#1a1a1a"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
              <span className="text-sm sm:text-base font-medium">{config.shipping.message}</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
