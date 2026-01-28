import Link from "next/link";
import Image from "next/image";

// ProductCard component for displaying box products - Hims-inspired style
// Used on category pages and home page to showcase products
const ProductCard = ({ product, showCategory = true }) => {
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
    <Link
      href={`/products/${product.id}`}
      className="group block"
    >
      <div className="bg-[#f5f0eb] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg">
        {/* Product Image */}
        <div className="aspect-[4/3] bg-[#ebe4db] relative overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={`${product.name} - ${product.tierName}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[#d9d0c4]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-16 h-16 opacity-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </div>
          )}

          {/* Featured Badge */}
          {product.isFeatured && (
            <div className="absolute top-3 right-3 z-10">
              <span className="bg-[#1a1a1a] text-white text-xs font-medium px-3 py-1 rounded-full">Popular</span>
            </div>
          )}

          {/* Tier Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${style.badge}`}>{product.tierName}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          {showCategory && <p className="text-[#c9a96e] text-xs font-medium mb-1">{product.categoryName}</p>}

          {/* Name */}
          <h3 className="font-serif text-xl text-[#1a1a1a] mb-2">{product.name}</h3>

          {/* Description */}
          <p className="text-[#5c564d] text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.shortDescription || product.description}
          </p>

          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-semibold text-[#1a1a1a]">${product.price}</span>
            </div>
            <span className="text-[#1a1a1a] font-medium text-sm border-b border-[#1a1a1a] pb-0.5 group-hover:text-[#c9a96e] group-hover:border-[#c9a96e] transition-colors">
              Learn more
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Compact variant for smaller displays
export const ProductCardCompact = ({ product }) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex items-center gap-4 p-4 rounded-xl bg-[#f5f0eb] hover:bg-[#ebe4db] transition-all"
    >
      {/* Small Product Image */}
      <div className="w-16 h-16 bg-[#ebe4db] rounded-xl overflow-hidden shrink-0 relative">
        {product.image ? (
          <Image
            src={product.image}
            alt={`${product.name} - ${product.tierName}`}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8 text-[#d9d0c4]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-[#c9a96e] text-xs font-medium">{product.tierName}</p>
        <h4 className="font-serif text-[#1a1a1a] truncate">{product.categoryName}</h4>
      </div>

      {/* Price */}
      <div className="text-right">
        <span className="text-xl font-semibold text-[#1a1a1a]">${product.price}</span>
      </div>
    </Link>
  );
};

export default ProductCard;
