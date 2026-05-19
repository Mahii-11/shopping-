function Bone({ className = "" }) {
  return (
    <div
      className={`bg-gray-200/80 rounded ${className}`}
      aria-hidden="true"
    />
  );
}

function FilterGroupSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      <Bone className="h-3.5 w-24" />
      <ul className="space-y-2.5">
        {Array.from({ length: rows }).map((_, i) => (
          <li key={i} className="flex items-center gap-3">
            <Bone className="h-3 w-3 shrink-0 rounded-sm" />
            <Bone
              className="h-3.5"
              style={{ width: `${55 + (i % 3) * 12}%` }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <Bone className="aspect-[4/5] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Bone className="h-2.5 w-16" />
        <Bone className="h-4 w-full" />
        <Bone className="h-4 w-2/3" />
        <Bone className="mt-auto h-5 w-20" />
      </div>
    </div>
  );
}

export function ShopProductsSkeleton({ count = 6 }) {
  return (
    <div
      className="animate-pulse"
      aria-busy="true"
      aria-label="Loading products"
    >
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <Bone className="h-4 w-40" />
        <div className="hidden flex-1 flex-wrap items-center justify-center gap-2 md:flex">
          <Bone className="h-4 w-20" />
          <Bone className="h-7 w-24 rounded-md" />
          <Bone className="h-7 w-28 rounded-md" />
        </div>
        <Bone className="h-9 w-36 rounded-md" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function ShopPageSkeleton() {
  return (
    <div
      className="min-h-screen animate-pulse bg-white font-sans text-gray-900 sm:mt-10 md:mt-14"
      aria-busy="true"
      aria-label="Loading shop"
    >
      <div className="relative flex h-40 w-full flex-col items-center justify-center overflow-hidden bg-[#faf9f8] md:h-56">
        <Bone className="mb-3 h-10 w-32 md:h-12 md:w-40" />
        <div className="flex items-center gap-2">
          <Bone className="h-3.5 w-12" />
          <Bone className="h-3 w-2 rounded-full" />
          <Bone className="h-3.5 w-10" />
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:py-12 lg:flex-row lg:px-8">
        <aside className="hidden w-64 shrink-0 space-y-8 lg:block">
          <Bone className="h-6 w-36" />
          <FilterGroupSkeleton rows={6} />
          <FilterGroupSkeleton rows={5} />
          <div className="space-y-3 px-2">
            <Bone className="h-3.5 w-16" />
            <Bone className="h-1.5 w-full rounded-full" />
            <Bone className="h-1.5 w-full rounded-full" />
            <Bone className="mt-2 h-4 w-28" />
          </div>
          <FilterGroupSkeleton rows={8} />
          <FilterGroupSkeleton rows={6} />
        </aside>

        <main className="flex-1">
          <Bone className="mb-4 h-10 w-full rounded-md lg:hidden" />
          <ShopProductsSkeleton count={9} />
        </main>
      </div>
    </div>
  );
}
