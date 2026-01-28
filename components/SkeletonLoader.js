// Skeleton loaders for various components
// Uses shimmer effect with gold accents matching the brand

// Base skeleton with shimmer effect
const SkeletonBase = ({ className = "" }) => {
  return (
    <div className={`bg-gray-200 animate-pulse relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
    </div>
  );
};

// Product card skeleton
export const ProductCardSkeleton = () => {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 bg-white">
      {/* Image */}
      <SkeletonBase className="aspect-square w-full" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <SkeletonBase className="h-3 w-20 rounded" />

        {/* Title */}
        <SkeletonBase className="h-5 w-3/4 rounded" />

        {/* Price */}
        <div className="flex items-center justify-between">
          <SkeletonBase className="h-6 w-16 rounded" />
          <SkeletonBase className="h-4 w-12 rounded" />
        </div>
      </div>
    </div>
  );
};

// Category card skeleton
export const CategoryCardSkeleton = () => {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 bg-white">
      {/* Image */}
      <SkeletonBase className="aspect-[4/3] w-full" />

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Description */}
        <SkeletonBase className="h-4 w-full rounded" />
        <SkeletonBase className="h-4 w-2/3 rounded" />

        {/* CTA */}
        <SkeletonBase className="h-4 w-32 rounded mt-4" />
      </div>
    </div>
  );
};

// Tier card skeleton for category pages
export const TierCardSkeleton = () => {
  return (
    <div className="rounded-lg overflow-hidden border-2 border-gray-200 bg-white">
      {/* Image */}
      <SkeletonBase className="aspect-[4/3] w-full" />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Price */}
        <SkeletonBase className="h-10 w-24 rounded" />

        {/* Description */}
        <div className="space-y-2">
          <SkeletonBase className="h-4 w-full rounded" />
          <SkeletonBase className="h-4 w-4/5 rounded" />
        </div>

        {/* Features */}
        <div className="space-y-2 pt-2">
          <SkeletonBase className="h-4 w-3/4 rounded" />
          <SkeletonBase className="h-4 w-2/3 rounded" />
          <SkeletonBase className="h-4 w-4/5 rounded" />
        </div>

        {/* Button */}
        <SkeletonBase className="h-12 w-full rounded-lg mt-4" />
      </div>
    </div>
  );
};

// Product detail image skeleton
export const ProductImageSkeleton = () => {
  return (
    <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative">
      <SkeletonBase className="w-full h-full" />

      {/* Badge placeholder */}
      <div className="absolute top-4 left-4">
        <SkeletonBase className="h-7 w-20 rounded-full" />
      </div>
    </div>
  );
};

// Product detail content skeleton
export const ProductDetailSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Category */}
      <SkeletonBase className="h-4 w-32 rounded" />

      {/* Title */}
      <SkeletonBase className="h-10 w-3/4 rounded" />

      {/* Price */}
      <SkeletonBase className="h-12 w-24 rounded" />

      {/* Description */}
      <div className="space-y-2">
        <SkeletonBase className="h-4 w-full rounded" />
        <SkeletonBase className="h-4 w-full rounded" />
        <SkeletonBase className="h-4 w-2/3 rounded" />
      </div>

      {/* Features */}
      <div className="space-y-3 pt-4">
        <SkeletonBase className="h-6 w-40 rounded" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonBase
              key={i}
              className="h-5 w-3/4 rounded"
            />
          ))}
        </div>
      </div>

      {/* Purchase options */}
      <div className="pt-4">
        <SkeletonBase className="h-6 w-36 rounded mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <SkeletonBase className="h-24 w-full rounded-lg" />
          <SkeletonBase className="h-24 w-full rounded-lg" />
        </div>
      </div>

      {/* Button */}
      <SkeletonBase className="h-14 w-full rounded-lg mt-4" />
    </div>
  );
};

// Full page skeleton
export const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero skeleton */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <SkeletonBase className="h-4 w-32 mx-auto rounded mb-4" />
          <SkeletonBase className="h-12 w-64 mx-auto rounded mb-4" />
          <SkeletonBase className="h-6 w-96 mx-auto rounded" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <TierCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Text skeleton
export const TextSkeleton = ({ lines = 3, className = "" }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBase
          key={i}
          className={`h-4 rounded ${i === lines - 1 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </div>
  );
};

// Add shimmer animation to globals.css:
// @keyframes shimmer {
//   100% { transform: translateX(100%); }
// }
// .animate-shimmer { animation: shimmer 1.5s infinite; }

export default SkeletonBase;
