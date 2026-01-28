import Image from "next/image";
import config from "@/config";

// Testimonials for Unbox The Moment surprise boxes
const list = [
  {
    name: "Sarah M.",
    location: "Austin, TX",
    text: "My husband and I had lost our date night spark after having kids. This box gave us everything we needed for an amazing night in - no planning required! We've been subscribers for 3 months now and it's become our favorite ritual.",
  },
  {
    name: "Jessica T.",
    location: "Denver, CO",
    text: "Ordered the Girls Night box for my best friend's birthday. The quality of everything inside was incredible - way more than I expected for the price. We're still talking about how fun that night was!",
  },
  {
    name: "Amanda K.",
    location: "Seattle, WA",
    text: "The Self Care box was exactly what I needed after a stressful month. Every item felt thoughtfully chosen, not just random stuff thrown in a box. I've already ordered two more as gifts.",
  },
];

// A single testimonial, to be rendered in a list - Hims-inspired style
const Testimonial = ({ i }) => {
  const testimonial = list[i];

  if (!testimonial) return null;

  return (
    <li
      key={i}
      className="w-full max-w-lg"
    >
      <figure className="relative h-full p-4 sm:p-5 md:p-6 lg:p-8 bg-[#f5f0eb] rounded-2xl flex flex-col">
        {/* Star rating */}
        <div className="flex gap-0.5 mb-3 sm:mb-4">
          {[...Array(5)].map((_, idx) => (
            <svg
              key={idx}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#1a1a1a"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          ))}
        </div>
        <blockquote className="relative flex-1">
          <p className="text-sm sm:text-base text-[#3d3933] leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
        </blockquote>
        <figcaption className="relative flex items-center justify-start gap-3 sm:gap-4 pt-4 sm:pt-5 mt-4 sm:mt-5 md:pt-6 md:mt-6 border-t border-[#ebe4db]">
          <div className="w-full flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="font-medium text-sm sm:text-base text-[#1a1a1a] md:mb-0.5">{testimonial.name}</div>
              {testimonial.location && (
                <div className="mt-0.5 text-xs sm:text-sm text-[#5c564d]">{testimonial.location}</div>
              )}
            </div>

            <div className="overflow-hidden rounded-full bg-white shrink-0">
              {testimonial.img ? (
                <Image
                  className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full object-cover"
                  src={list[i].img}
                  alt={`${list[i].name}'s testimonial for ${config.appName}`}
                  width={44}
                  height={44}
                />
              ) : (
                <span className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full flex justify-center items-center text-sm sm:text-base font-medium text-[#1a1a1a]">
                  {testimonial.name.charAt(0)}
                </span>
              )}
            </div>
          </div>
        </figcaption>
      </figure>
    </li>
  );
};

const Testimonials3 = () => {
  return (
    <section
      id="testimonials"
      className="bg-[#faf8f5]"
    >
      <div className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col text-center w-full mb-8 sm:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1a1a1a] mb-3 sm:mb-4 px-4">
            What our customers <span className="font-serif italic text-[#c9a96e]">are saying</span>
          </h2>
          <p className="text-sm sm:text-base lg:w-2/3 mx-auto leading-relaxed text-[#5c564d] px-4">
            Join thousands of happy customers who have rediscovered the joy of connection with our curated surprise
            boxes.
          </p>
        </div>

        <ul
          role="list"
          className="flex flex-col items-center lg:flex-row lg:items-stretch gap-4 sm:gap-5 lg:gap-6"
        >
          {[...Array(3)].map((e, i) => (
            <Testimonial
              key={i}
              i={i}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Testimonials3;
