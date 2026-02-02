"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import Testimonials3 from "@/components/Testimonials3";
import HowItWorks from "@/components/HowItWorks";
import config from "@/config";
import { Suspense, useEffect, useRef, useState } from "react";

// Custom hook for scroll-triggered animations
const useScrollAnimation = (threshold = 0.1, triggerOnce = true) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before element is fully visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, triggerOnce]);

  return [ref, isVisible];
};

// Category card component - Hims-inspired style
const CategoryCard = ({ category, index }) => {
  return (
    <Link
      href={`/boxes/${category.slug}`}
      className="group block animate-fade-in-up h-full"
      style={{ animationDelay: `${index * 100}ms` }}
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

// Feature card component - Enhanced with scroll animations
const FeatureCard = ({ icon, title, description, index }) => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <div
      ref={ref}
      className={`bg-[#f5f0eb] rounded-2xl p-5 sm:p-6 md:p-8 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.95)",
      }}
    >
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 flex items-center justify-center rounded-full bg-white transition-all duration-500 ease-out ${
          isVisible ? "opacity-100 rotate-0" : "opacity-0 rotate-12"
        }`}
        style={{ transitionDelay: `${index * 150 + 200}ms` }}
      >
        {icon}
      </div>
      <h3
        className={`font-serif text-lg sm:text-xl text-[#1a1a1a] mb-2 sm:mb-3 transition-all duration-500 ease-out ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
        style={{ transitionDelay: `${index * 150 + 300}ms` }}
      >
        {title}
      </h3>
      <p
        className={`text-[#5c564d] text-sm leading-relaxed transition-all duration-500 ease-out ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
        style={{ transitionDelay: `${index * 150 + 400}ms` }}
      >
        {description}
      </p>
    </div>
  );
};

// Animated section title component
const AnimatedSectionTitle = () => {
  const [ref, isVisible] = useScrollAnimation(0.3);

  return (
    <div
      ref={ref}
      className="text-center mb-8 sm:mb-12"
    >
      <h2
        className={`font-serif text-2xl sm:text-3xl md:text-4xl text-[#1a1a1a] mb-3 sm:mb-4 px-4 transition-all duration-800 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <span
          className={`inline-block transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          Everything you need,
        </span>{" "}
        <span
          className={`font-serif italic text-[#c9a96e] inline-block transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          delivered to your door
        </span>
      </h2>
    </div>
  );
};

// FAQ Item component - Clean modern style
const FAQItem = ({ question, answer, index }) => {
  return (
    <div
      className="border-b border-[#ebe4db] last:border-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <details className="group py-4 sm:py-5 md:py-6">
        <summary className="flex items-center justify-between cursor-pointer list-none gap-3">
          <h3 className="font-serif text-base sm:text-lg text-[#1a1a1a] pr-2 sm:pr-4 group-hover:text-[#c9a96e] transition-colors duration-200">
            {question}
          </h3>
          <span className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-[#f5f0eb] group-open:bg-[#1a1a1a] transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1a1a1a] transition-transform duration-300 group-open:rotate-180 group-open:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#5c564d] leading-relaxed animate-fade-in">{answer}</p>
      </details>
    </div>
  );
};

// FAQ data
const faqs = [
  {
    question: "What's inside each box?",
    answer:
      "Each box contains a thoughtfully curated selection of activities, treats, and conversation starters designed for your specific occasion. The exact contents are a surprise, but rest assured everything is selected to create meaningful moments together.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Your surprise box will arrive in 3-5 business days. We ship via USPS Priority Mail to ensure fast and reliable delivery.",
  },
  {
    question: "Can I customize my box for dietary restrictions?",
    answer:
      "Absolutely! During checkout, you can specify any dietary restrictions or preferences (vegan, allergies, etc.) and we'll customize your box accordingly.",
  },
  {
    question: "What's the difference between the price tiers?",
    answer:
      "Each tier offers increasing value and premium items. Essential boxes include core activities and treats. Premium boxes add higher-quality items and bonus surprises. Luxury boxes feature the finest curations with keepsake items and exclusive surprises.",
  },
  {
    question: "Do you offer gift options?",
    answer:
      "Every box makes a perfect gift! You can ship directly to your recipient and include a personalized note during checkout.",
  },
];

export default function Page() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>

      <main className="pt-14 sm:pt-16 bg-[#faf8f5]">
        {/* Hero Section */}
        <section className="relative overflow-hidden hero-background min-h-[80vh] flex items-center">
          {/* Floating particles */}
          <div className="hero-particles"></div>
          {/* Subtle glow effect */}
          <div className="hero-glow"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-32 w-full">
            <div className="max-w-3xl mx-auto text-center hero-content-wrapper">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 sm:mb-6 animate-fade-in-up px-2 hero-title">
                Curated surprise boxes, <span className="font-serif italic hero-accent">designed for connection</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-[#5c564d] leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200 px-4 relative z-10">
                It&apos;s hard to plan fun things with friends. We help you build connections and rediscover the purpose
                of seeing people.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up delay-300 px-4 relative z-10">
                <Link
                  href="/boxes"
                  className="btn btn-gold px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base w-full sm:w-auto transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Shop boxes
                </Link>
                <Link
                  href="#how-it-works"
                  className="btn btn-gold-outline px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base w-full sm:w-auto transform hover:scale-105 transition-all duration-300"
                >
                  How it works
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition - Hims-style 2x2 grid */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSectionTitle />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <FeatureCard
                index={0}
                icon={
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
                }
                title="Curated surprises"
                description="Each box is thoughtfully assembled with premium items designed to create memorable moments."
              />
              <FeatureCard
                index={1}
                icon={
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
                }
                title="Meaningful connections"
                description="Skip the planning stress. We provide everything you need to focus on what matters - each other."
              />
              <FeatureCard
                index={2}
                icon={
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
                }
                title="Fast delivery"
                description="Your surprise box arrives in 3-5 business days, ready to create your next unforgettable moment."
              />
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <TrustBar variant="bar" />

        {/* Box Categories */}
        <section className="py-12 sm:py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1a1a1a] animate-fade-in-up px-4">
                Find your <span className="font-serif italic text-[#c9a96e]">perfect box</span>
              </h2>
              <p className="mt-3 sm:mt-4 text-[#5c564d] text-base sm:text-lg max-w-2xl mx-auto px-4">
                Curated experiences for every occasion and connection
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
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

        {/* How It Works */}
        <HowItWorks />

        {/* Testimonials */}
        <Testimonials3 />

        {/* FAQ Section */}
        <section
          id="faq"
          className="py-12 sm:py-16 lg:py-24 bg-[#faf8f5]"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1a1a1a] px-4">
                Frequently asked <span className="font-serif italic text-[#c9a96e]">questions</span>
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  index={index}
                />
              ))}
            </div>

            <div className="text-center mt-10">
              <p className="text-[#5c564d] mb-4">Still have questions?</p>
              <a
                href={`mailto:${config.resend.supportEmail}`}
                className="inline-flex items-center gap-2 text-[#1a1a1a] font-medium border-b border-[#1a1a1a] pb-0.5 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors"
              >
                Contact us
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-24 bg-[#f5f0eb]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1a1a1a] mb-4 sm:mb-6 animate-fade-in-up px-4">
              Ready to create <span className="font-serif italic text-[#c9a96e]">memories?</span>
            </h2>
            <p className="text-base sm:text-lg text-[#5c564d] mb-6 sm:mb-8 md:mb-10 animate-fade-in-up delay-100 px-4">
              Stop planning. Start connecting. Your next unforgettable moment is just a box away.
            </p>
            <Link
              href="/boxes"
              className="btn btn-gold px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base animate-fade-in-up delay-200 w-full sm:w-auto max-w-xs mx-auto"
            >
              Shop now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
