// Trust badges and shipping info component - Hims-inspired style
// Displays trust indicators to build customer confidence

const TrustBar = ({ variant = "default" }) => {
  const trustItems = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
      title: "Secure checkout",
      description: "SSL encrypted payments via Stripe",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Fast delivery",
      description: "Ships soon after order",
    },
  ];

  // Compact variant for product pages
  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-3 sm:gap-4 justify-center py-3 sm:py-4">
        {trustItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#5c564d]"
          >
            <span className="text-[#1a1a1a] w-3.5 h-3.5 sm:w-4 sm:h-4">{item.icon}</span>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    );
  }

  // Horizontal bar variant for footer/header area
  if (variant === "bar") {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-wrap justify-center md:justify-between gap-3 sm:gap-4 md:gap-8">
            {trustItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 sm:gap-2"
              >
                <span className="text-[#1a1a1a] w-4 h-4 sm:w-5 sm:h-5">{item.icon}</span>
                <span className="text-xs sm:text-sm font-medium text-[#1a1a1a]">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default card grid variant
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#f5f0eb] transition-all duration-300 hover:bg-[#ebe4db]"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-[#1a1a1a] mb-2 sm:mb-3">
                <span className="w-4 h-4 sm:w-5 sm:h-5">{item.icon}</span>
              </div>
              <h4 className="font-medium text-xs sm:text-sm text-[#1a1a1a] mb-1">{item.title}</h4>
              <p className="text-[10px] sm:text-xs text-[#5c564d] leading-tight">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Shipping info banner component
export const ShippingBanner = () => {
  return (
    <div className="bg-[#f5f0eb] rounded-xl p-5">
      <div className="flex items-start gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#1a1a1a"
          className="w-5 h-5 shrink-0 mt-0.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
          />
        </svg>
        <div>
          <h4 className="font-medium text-sm text-[#1a1a1a] mb-2">Shipping information</h4>
          <ul className="text-xs text-[#5c564d] space-y-1">
            <li>Standard shipping available</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
