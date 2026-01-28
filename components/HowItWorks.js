"use client";

import { useState, useEffect, useRef } from "react";

const steps = [
  {
    num: "1",
    title: "Choose your box",
    desc: "Select from our curated collections based on your occasion and group size.",
  },
  {
    num: "2",
    title: "Add preferences",
    desc: "Tell us about any dietary restrictions or preferences for your perfect box.",
  },
  {
    num: "3",
    title: "Unbox & connect",
    desc: "Receive your box in 2-3 days and enjoy a curated experience together.",
  },
];

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.4,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Animate steps sequentially
  useEffect(() => {
    if (isVisible) {
      steps.forEach((_, index) => {
        setTimeout(
          () => {
            setCompletedSteps((prev) => [...prev, index]);
          },
          600 + index * 700,
        );
      });
    }
  }, [isVisible]);

  const resetAnimation = () => {
    setCompletedSteps([]);
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 50);
  };

  const progressWidth = completedSteps.length === 0 ? 0 : (completedSteps.length / steps.length) * 100;

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-16 lg:py-24 bg-[#1a1a1a] text-white"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className={`font-serif text-2xl sm:text-3xl md:text-4xl text-white transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            How it <span className="font-serif italic text-[#c9a96e]">works</span>
          </h2>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Steps Container */}
          <div className="relative">
            {/* Connection Line - Behind circles */}
            <div className="absolute top-7 left-[16.67%] right-[16.67%] h-0.5 bg-[#333]">
              <div
                className="absolute inset-y-0 left-0 bg-[#c9a96e] transition-all ease-out"
                style={{
                  width: `${progressWidth}%`,
                  transitionDuration: "600ms",
                }}
              />
              {/* Shimmer */}
              {completedSteps.length > 0 && completedSteps.length < steps.length && (
                <div
                  className="absolute inset-y-0 w-20 shimmer-gradient"
                  style={{
                    left: `${progressWidth - 5}%`,
                  }}
                />
              )}
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-3 gap-8">
              {steps.map((step, index) => {
                const isCompleted = completedSteps.includes(index);
                const isAnimating = completedSteps.length === index + 1;

                return (
                  <div
                    key={step.num}
                    className={`text-center transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{
                      transitionDelay: `${index * 150}ms`,
                    }}
                  >
                    {/* Circle */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div
                          className={`relative w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-500 z-10 ${
                            isCompleted
                              ? "bg-[#c9a96e] text-[#1a1a1a]"
                              : "bg-[#2a2a2a] text-gray-500 border-2 border-[#333]"
                          } ${isAnimating ? "scale-110" : "scale-100"}`}
                        >
                          {/* Number/Check transition */}
                          <span
                            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                              isCompleted ? "opacity-0 scale-75" : "opacity-100 scale-100"
                            }`}
                          >
                            {step.num}
                          </span>
                          <span
                            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                              isCompleted ? "opacity-100 scale-100" : "opacity-0 scale-75"
                            }`}
                          >
                            <CheckIcon />
                          </span>
                        </div>

                        {/* Pulse ring on completion */}
                        {isAnimating && (
                          <div className="absolute inset-0 w-14 h-14 rounded-full bg-[#c9a96e] animate-ping-once opacity-40" />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <h3
                      className={`font-serif text-xl mb-3 transition-colors duration-500 ${
                        isCompleted ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm max-w-xs mx-auto">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="relative pl-14 sm:pl-16">
            {/* Vertical Line */}
            {/* Line centered with circle: pl-14 (56px) - left-10 (40px) + circle radius (20px) = 36px center, minus half line (1px) = 35px */}
            {/* For sm: pl-16 (64px) - left-10 (40px) + circle radius (20px) = 44px center, minus half line (1px) = 43px */}
            <div className="absolute left-[35px] sm:left-[43px] top-2 bottom-2 w-0.5 bg-[#333]">
              <div
                className="absolute inset-x-0 top-0 bg-[#c9a96e] transition-all ease-out"
                style={{
                  height: `${progressWidth}%`,
                  transitionDuration: "600ms",
                }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-10">
              {steps.map((step, index) => {
                const isCompleted = completedSteps.includes(index);
                const isAnimating = completedSteps.length === index + 1;

                return (
                  <div
                    key={step.num}
                    className={`relative flex transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                    style={{
                      transitionDelay: `${index * 150}ms`,
                    }}
                  >
                    {/* Circle */}
                    <div className="absolute -left-10 shrink-0">
                      <div
                        className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${
                          isCompleted
                            ? "bg-[#c9a96e] text-[#1a1a1a]"
                            : "bg-[#2a2a2a] text-gray-500 border-2 border-[#333]"
                        } ${isAnimating ? "scale-110" : "scale-100"}`}
                      >
                        <span
                          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                            isCompleted ? "opacity-0" : "opacity-100"
                          }`}
                        >
                          {step.num}
                        </span>
                        <span
                          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                            isCompleted ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <CheckIcon />
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="ml-4 sm:ml-6 flex-1">
                      <h3
                        className={`font-serif text-lg mb-2 transition-colors duration-500 ${
                          isCompleted ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-sm">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Replay button */}
        <div
          className={`text-center mt-10 sm:mt-14 transition-all duration-500 ${
            completedSteps.length >= steps.length ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={resetAnimation}
            className="text-xs sm:text-sm text-gray-500 hover:text-[#c9a96e] transition-colors duration-200 inline-flex items-center gap-2"
          >
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
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Replay
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes ping-once {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        .animate-ping-once {
          animation: ping-once 0.6s ease-out forwards;
        }

        .shimmer-gradient {
          background: linear-gradient(90deg, transparent, rgba(201, 169, 110, 0.5), transparent);
          animation: shimmer 1s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
