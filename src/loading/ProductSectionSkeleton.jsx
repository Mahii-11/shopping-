const ProductSectionSkeleton = () => {
  return (
    <section className="bg-[#f0f4f4] py-10 px-4 animate-pulse">

      {/* Title */}
      <div className="text-center mb-8">
        <div className="h-8 w-80 bg-gray-300 mx-auto rounded" />
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">

        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-white flex flex-col">

            {/* Image */}
            <div className="aspect-square bg-gray-300 relative">

              {/* Badge skeleton */}
              <div className="absolute top-2 left-2 h-5 w-12 bg-gray-400 rounded" />
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col flex-1">

              {/* Name */}
              <div className="space-y-2 mb-3">
                <div className="h-3 w-full bg-gray-300 rounded" />
                <div className="h-3 w-3/4 bg-gray-300 rounded" />
              </div>

              {/* Price */}
              <div className="h-4 w-20 bg-gray-300 rounded mb-3" />

              {/* Buttons */}
              <div className="mt-auto flex flex-col gap-2">
                <div className="h-9 w-full bg-gray-300 rounded" />
                <div className="h-9 w-full bg-gray-400 rounded" />
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* View More button skeleton */}
      <div className="flex justify-center mt-10">
        <div className="h-10 w-40 bg-gray-300 rounded" />
      </div>

    </section>
  );
};

export default ProductSectionSkeleton;