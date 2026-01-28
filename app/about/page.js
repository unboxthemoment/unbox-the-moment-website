import { Suspense } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: `About Us | ${config.appName}`,
  description:
    "Learn about our mission to help people build meaningful connections through curated surprise experiences.",
  canonicalUrlRelative: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-black text-white py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <p className="text-[#D4AF37] uppercase tracking-widest text-sm font-medium mb-6">Our Story</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              We Believe in the Power of <span className="text-[#D4AF37]">Connection</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              In a world of endless scrolling and fleeting interactions, we&apos;re on a mission to bring people back
              together - one surprise at a time.
            </p>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-20 lg:py-28">
          <div className="max-w-4xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">The Problem We&apos;re Solving</h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                It&apos;s hard to plan fun things with friends. Between busy schedules, decision fatigue, and the
                overwhelming number of options, quality time often gets pushed aside.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#EF4444"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">No Time to Plan</h3>
                <p className="text-gray-600 text-sm">
                  Between work, family, and life, who has hours to research and organize the perfect activity?
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#EF4444"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Decision Fatigue</h3>
                <p className="text-gray-600 text-sm">
                  Too many choices lead to analysis paralysis and often result in doing nothing at all.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#EF4444"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Missed Moments</h3>
                <p className="text-gray-600 text-sm">
                  We keep saying &quot;we should hang out&quot; but weeks turn into months without meaningful
                  connection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Solution */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-4xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Our Solution</h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                We help you build connections and rediscover the purpose of seeing people. No planning required - just
                open the box and connect.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-[#D4AF37]/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#D4AF37"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3">Curated with Care</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every item in our boxes is thoughtfully selected to create meaningful experiences. We do the research
                  so you can focus on what matters.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-[#D4AF37]/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#D4AF37"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3">Element of Surprise</h3>
                <p className="text-gray-600 leading-relaxed">
                  There&apos;s something magical about not knowing exactly what&apos;s inside. The surprise element
                  makes every unboxing an experience.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-[#D4AF37]/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#D4AF37"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3">For Every Group</h3>
                <p className="text-gray-600 leading-relaxed">
                  Whether it&apos;s date night, family time, girls night, or self-care, we have a curated experience
                  designed for your occasion.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-[#D4AF37]/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#D4AF37"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3">Memories, Not Things</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our boxes aren&apos;t about stuff. They&apos;re about creating moments that become memories
                  you&apos;ll cherish forever.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ready to Start Connecting?</h2>
            <p className="text-lg text-gray-600 mb-10">
              Join thousands of people who have rediscovered the joy of being together.
            </p>
            <Link
              href="/boxes/couples"
              className="btn btn-gold px-10 py-4 text-base"
            >
              Explore Our Boxes
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
