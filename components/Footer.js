import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import logo from "@/app/icon.png";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 mb-4"
            >
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                priority={true}
                className="w-8 h-8"
                width={32}
                height={32}
              />
              <span className="font-serif text-lg">{config.appName}</span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Curated surprise boxes that help you build connections and rediscover the joy of being together.
            </p>

            <p className="text-gray-500 text-xs">{config.shipping.message}</p>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-medium text-white text-sm mb-4">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/boxes/couples"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Couple&apos;s Edition
                </Link>
              </li>
              <li>
                <Link
                  href="/boxes/family"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Family Edition
                </Link>
              </li>
              <li>
                <Link
                  href="/boxes/girls-night"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Girls Night Edition
                </Link>
              </li>
              <li>
                <Link
                  href="/boxes/self-care"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Self Care Edition
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-medium text-white text-sm mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About us
                </Link>
              </li>
              {config.resend.customerServiceEmail && (
                <li>
                  <a
                    href={`mailto:${config.resend.customerServiceEmail}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-medium text-white text-sm mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/tos"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} {config.appName}. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
            <span>Made with</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#c9a96e"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <span>for connection</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
