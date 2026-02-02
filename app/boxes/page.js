import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: `Shop All Boxes | ${config.appName}`,
  description:
    "Browse our complete collection of curated surprise boxes. Find the perfect box for couples, families, girls night, or self-care.",
  canonicalUrlRelative: "/boxes",
});

// Category card component
const CategoryCard = ({ category, index }) => {
  return (
    <Link
      href={`/boxes/${category.slug}`}
      className="group block h-full"
    >
      <div className="bg-[#f5f0eb] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
        {/* Category Image */}
        <div className="aspect-[4/3] relative overflow-hidden">
          {category.image ? (
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-[#ebe4db]" />
          )}
        </div>
        <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
          <h3 className="font-serif text-lg sm:text-xl text-[#1a1a1a] mb-2">{category.name}</h3>
          {category.peopleCount && (
            <p className="text-[#c9a96e] text-xs sm:text-sm font-medium mb-2">{category.peopleCount}</p>
          )}
          <p className="text-[#5c564d] text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 flex-grow">
            {category.description}
          </p>
          <span className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-[#1a1a1a] text-white text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 group-hover:bg-[#c9a96e]">
            Explore collection
          </span>
        </div>
      </div>
    </Link>
  );
};

export default function BoxesPage() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>

      <main className="min-h-screen bg-[#faf8f5]">
        {/* Hero Section */}
        <section className="pt-20 sm:pt-24 pb-8 sm:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] mb-4 sm:mb-6 px-4">
                Shop all <span className="font-serif italic text-[#c9a96e]">boxes</span>
              </h1>
              <p className="text-base sm:text-lg text-[#5c564d] max-w-2xl mx-auto px-4">
                Curated surprise boxes designed for every occasion and connection. Choose your experience and create
                unforgettable moments.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {config.categories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#f5f0eb]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#1a1a1a"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-[#1a1a1a] mb-2">Curated surprises</h3>
                <p className="text-[#5c564d] text-sm">Every item thoughtfully selected for your special moment</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#f5f0eb]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#1a1a1a"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-[#1a1a1a] mb-2">Fast shipping</h3>
                <p className="text-[#5c564d] text-sm">{config.shipping.message}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#f5f0eb]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#1a1a1a"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-[#1a1a1a] mb-2">Gift ready</h3>
                <p className="text-[#5c564d] text-sm">Beautiful packaging perfect for any occasion</p>
              </div>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-12 sm:py-16 bg-[#f5f0eb]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1a1a] mb-4">Not sure which to choose?</h2>
            <p className="text-[#5c564d] mb-6">
              Each box is designed for a specific type of connection. Whether it&apos;s a romantic evening, family
              bonding, time with friends, or self-care, we&apos;ve got you covered.
            </p>
            <Link
              href="/#how-it-works"
              className="inline-flex items-center gap-2 text-[#1a1a1a] font-medium border-b border-[#1a1a1a] pb-0.5 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors"
            >
              Learn how it works
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
