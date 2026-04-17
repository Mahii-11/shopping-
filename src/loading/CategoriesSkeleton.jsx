const CategoriesSkeleton = () => {
  return (
    <section className="py-20 bg-background animate-pulse">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-3">
        <div className="h-8 w-64 bg-gray-300 mx-auto rounded" />
        <div className="h-4 w-80 bg-gray-200 mx-auto rounded" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Fake arrows (optional visual balance) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-300 hidden md:block" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-300 hidden md:block" />

        {/* Slider Skeleton */}
        <div className="flex overflow-hidden gap-6 px-4 sm:px-6 lg:px-8 pb-8">
          
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-none w-64">
              
              {/* Image */}
              <div className="aspect-[4/5] bg-gray-300 mb-4 rounded" />

              {/* Title */}
              <div className="h-4 w-3/4 bg-gray-300 mx-auto rounded" />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default CategoriesSkeleton;