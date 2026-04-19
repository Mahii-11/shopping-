export default function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 animate-pulse">

      <div className="flex flex-col md:flex-row gap-10 lg:gap-20">

        {/* LEFT IMAGE SECTION */}
        <div className="w-full md:w-[55%]">
          <div className="aspect-[3/4] bg-gray-200 mb-4 rounded-lg" />

          {/* thumbnails */}
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-20 h-24 bg-gray-200 rounded-md"
              />
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-[45%] flex flex-col gap-6">

          {/* TITLE */}
          <div className="space-y-3">
            <div className="h-8 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
          </div>

          {/* META GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-200 rounded-xl"
              />
            ))}
          </div>

          {/* RATING */}
          <div className="h-5 w-40 bg-gray-200 rounded" />

          {/* PRICE */}
          <div className="flex gap-4 items-center">
            <div className="h-8 w-32 bg-gray-200 rounded" />
            <div className="h-6 w-20 bg-gray-200 rounded" />
          </div>

          {/* COLORS */}
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gray-200"
              />
            ))}
          </div>

          {/* SIZES */}
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-14 bg-gray-200 rounded"
              />
            ))}
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3">
            <div className="h-12 flex-1 bg-gray-200 rounded" />
            <div className="h-12 w-40 bg-gray-200 rounded" />
          </div>

        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="aspect-square bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>

    </div>
  );
}