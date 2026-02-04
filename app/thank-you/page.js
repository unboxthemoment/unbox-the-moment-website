import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#D4AF37]/10 mb-6">
              <svg
                className="w-12 h-12 text-[#D4AF37]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Thank You for Your Order!</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We&apos;re so excited to help you create an unforgettable moment!
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 mb-8 border border-gray-100">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What Happens Next?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                      <span className="text-[#D4AF37] font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Order Confirmation</h3>
                      <p className="text-gray-600">
                        You&apos;ll receive an email confirmation shortly with your order details.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                      <span className="text-[#D4AF37] font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">We&apos;re Curating Your Box</h3>
                      <p className="text-gray-600">
                        Our team is carefully selecting and preparing your surprise box with love.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                      <span className="text-[#D4AF37] font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Shipping Notification</h3>
                      <p className="text-gray-600">You&apos;ll receive an email when your box ships.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    <strong className="text-gray-900">Need help?</strong> If you have any questions about your order,
                    feel free to reach out to us at{" "}
                    <a
                      href="mailto:support@unboxthemoment.com"
                      className="text-[#D4AF37] hover:underline"
                    >
                      support@unboxthemoment.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="btn btn-primary btn-lg bg-[#D4AF37] hover:bg-[#C19B2E] border-none text-white"
            >
              View My Orders
            </Link>
            <Link
              href="/"
              className="btn btn-outline btn-lg border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-4">
              Join thousands of happy customers who&apos;ve created unforgettable moments
            </p>
            <div className="flex items-center justify-center gap-2 text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
