"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo-cropped.png";
import config from "@/config";

// Box categories for the dropdown
const boxCategories = [
  {
    href: "/boxes/couples",
    label: "Couple's Edition",
    description: "Romantic surprises for two",
    icon: "💑",
  },
  {
    href: "/boxes/family",
    label: "Family Edition",
    description: "Fun for 2-5 people",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    href: "/boxes/girls-night",
    label: "Girls Night Edition",
    description: "Perfect for 2-5 friends",
    icon: "👯‍♀️",
  },
  {
    href: "/boxes/self-care",
    label: "Self Care Edition",
    description: "Treat yourself",
    icon: "🧘",
  },
];

// Main navigation links
const navLinks = [
  {
    href: "/#how-it-works",
    label: "How It Works",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/#faq",
    label: "FAQ",
  },
];

const Header = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileBoxesOpen, setIsMobileBoxesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
    setIsMobileBoxesOpen(false);
  }, [searchParams]);

  // Track scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#faf8f5]/95 backdrop-blur-md shadow-sm" : "bg-[#faf8f5]"
      }`}
    >
      <nav
        className="container flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 mx-auto max-w-7xl"
        aria-label="Global"
      >
        {/* Logo/name */}
        <div className="flex lg:flex-1">
          <Link
            className="flex items-center gap-1.5 sm:gap-2 shrink-0 group"
            href="/"
            title={`${config.appName} homepage`}
          >
            <Image
              src={logo}
              alt={`${config.appName} logo`}
              className="h-8 sm:h-9 lg:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              priority={true}
              width={200}
              height={40}
            />
          </Link>
        </div>

        {/* Burger button for mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 transition-all duration-200 hover:bg-[#f5f0eb] active:scale-95"
            onClick={() => setIsOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="relative w-6 h-6">
              {/* Hamburger lines */}
              <span
                className={`absolute top-0 left-0 w-6 h-0.5 bg-[#1a1a1a] transition-all duration-300 ease-out ${
                  isOpen ? "rotate-45 top-2.5" : ""
                }`}
              />
              <span
                className={`absolute top-2.5 left-0 w-6 h-0.5 bg-[#1a1a1a] transition-all duration-300 ease-out ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute top-5 left-0 w-6 h-0.5 bg-[#1a1a1a] transition-all duration-300 ease-out ${
                  isOpen ? "-rotate-45 top-2.5" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Navigation links on large screens */}
        <div className="hidden lg:flex lg:justify-center lg:gap-8 lg:items-center">
          {/* Boxes Dropdown */}
          <div
            className="relative"
            ref={dropdownRef}
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onMouseEnter={() => setIsDropdownOpen(true)}
              className="flex items-center gap-1 text-[#1a1a1a] hover:text-[#5c564d] transition-colors duration-200 font-medium py-2"
            >
              Boxes
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>

            {/* Dropdown menu */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-lg py-3 z-50 transition-all duration-200 origin-top ${
                isDropdownOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              {boxCategories.map((category, index) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#faf8f5] transition-colors duration-150 group"
                  onClick={() => setIsDropdownOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-xl">{category.icon}</span>
                  <div>
                    <span className="block font-medium text-[#1a1a1a] group-hover:text-[#c9a96e] transition-colors duration-150">
                      {category.label}
                    </span>
                    <span className="block text-sm text-[#5c564d]">{category.description}</span>
                  </div>
                </Link>
              ))}

              {/* View All Link */}
              <div className="border-t border-[#f5f0eb] mt-2 pt-2 px-4">
                <Link
                  href="/boxes"
                  className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-[#1a1a1a] hover:text-[#c9a96e] transition-colors duration-150"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  View all boxes
                </Link>
              </div>
            </div>
          </div>

          {/* Other Nav Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#1a1a1a] hover:text-[#5c564d] transition-colors duration-200 font-medium py-2"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA on large screens */}
        <div className="hidden lg:flex lg:justify-end lg:flex-1 lg:gap-4 lg:items-center">
          <Link
            href="/boxes"
            className="btn btn-gold px-6 py-2.5 text-sm"
          >
            Shop now
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`relative z-50 ${isOpen ? "" : "hidden"}`}>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ease-out ${
            isOpen ? "opacity-100 animate-[fadeIn_0.2s_ease-out]" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`fixed inset-y-0 right-0 z-10 w-full px-4 sm:px-6 py-4 overflow-y-auto bg-[#faf8f5] sm:max-w-sm shadow-2xl ${
            isOpen ? "animate-slideInMenu" : "translate-x-full opacity-0"
          }`}
          style={
            isOpen
              ? {}
              : {
                  transitionProperty: "transform, opacity",
                  transitionDuration: "0.3s, 0.2s",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1), ease-out",
                }
          }
        >
          {/* Mobile header */}
          <div className="flex items-center justify-between">
            <Link
              className="flex items-center shrink-0"
              title={`${config.appName} homepage`}
              href="/"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                className="h-8 sm:h-9 w-auto"
                priority={true}
                width={180}
                height={36}
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-full p-2.5 hover:bg-[#f5f0eb] transition-colors duration-150"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-[#1a1a1a]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile navigation */}
          <div className="flow-root mt-8">
            <div className="space-y-1">
              {/* Boxes Accordion */}
              <div
                className={`transition-all duration-300 ${
                  isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
                style={{ transitionDelay: isOpen ? "100ms" : "0ms" }}
              >
                <button
                  onClick={() => setIsMobileBoxesOpen(!isMobileBoxesOpen)}
                  className="flex items-center justify-between w-full text-[#1a1a1a] font-medium py-4 border-b border-[#ebe4db] transition-colors duration-150 hover:text-[#5c564d]"
                >
                  Boxes
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-5 h-5 transition-transform duration-300 ease-out ${
                      isMobileBoxesOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isMobileBoxesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="py-2 space-y-1">
                    {boxCategories.map((category, index) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="flex items-center gap-3 py-3 px-4 text-[#5c564d] hover:text-[#1a1a1a] hover:bg-[#f5f0eb] rounded-xl transition-all duration-200 hover:translate-x-1"
                        onClick={() => setIsOpen(false)}
                        style={{
                          animation: isMobileBoxesOpen ? `fadeInSlide 0.3s ease-out ${index * 50}ms forwards` : "none",
                        }}
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span>{category.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Other Links */}
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-[#1a1a1a] font-medium py-4 border-b border-[#ebe4db] hover:text-[#5c564d] transition-all duration-300 ${
                    isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{
                    transitionDelay: isOpen ? `${150 + index * 50}ms` : "0ms",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}
            <div
              className={`mt-6 sm:mt-8 transition-all duration-300 ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: isOpen ? "300ms" : "0ms" }}
            >
              <Link
                href="/boxes"
                className="btn btn-gold w-full text-center py-3 text-sm sm:text-base transition-transform duration-200 hover:scale-[1.02]"
                onClick={() => setIsOpen(false)}
              >
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInMenu {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          60% {
            transform: translateX(-2%);
            opacity: 0.95;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideInMenu {
          animation: slideInMenu 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;
