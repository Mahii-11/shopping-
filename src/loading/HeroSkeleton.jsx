const HeroSkeleton = () => {
  return (
    <section className="relative h-[90vh] min-h-150 overflow-hidden bg-black flex items-center animate-pulse">
      
      {/* Background Skeleton */}
      <div className="absolute inset-0 bg-gray-800 opacity-70" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white pt-20">
        
        <div className="max-w-2xl space-y-6">

          {/* Small title */}
          <div className="h-4 w-32 bg-gray-600 rounded" />

          {/* Big heading */}
          <div className="space-y-3">
            <div className="h-12 md:h-16 w-3/4 bg-gray-600 rounded" />
            <div className="h-12 md:h-16 w-1/2 bg-gray-600 rounded" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-700 rounded" />
            <div className="h-4 w-5/6 bg-gray-700 rounded" />
            <div className="h-4 w-2/3 bg-gray-700 rounded" />
          </div>

          {/* Button */}
          <div className="h-10 w-40 bg-gray-500 rounded mt-6" />

        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;