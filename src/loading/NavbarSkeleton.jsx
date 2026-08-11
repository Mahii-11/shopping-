export default function NavbarSkeleton() {
  return (
    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40 py-5">
      <div className="max-w-7xl h-8 mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between animate-pulse">
        
        {/* Mobile Menu Icon Skeleton (Only Mobile) */}
        <div className="md:hidden w-6 h-6 bg-muted rounded-md" />

        {/* Logo Skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-muted rounded-full shrink-0" />
          <div className="w-28 md:w-36 h-5 bg-muted rounded-md hidden sm:block" />
        </div>

        {/* Desktop Nav Links Skeleton (Only Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <div className="w-12 h-4 bg-muted rounded-md" />
          <div className="w-16 h-4 bg-muted rounded-md" />
          <div className="w-14 h-4 bg-muted rounded-md" />
          <div className="w-12 h-4 bg-muted rounded-md" />
          <div className="w-16 h-4 bg-muted rounded-md" />
        </div>

        {/* Right Action Icons Skeleton (User & Cart) */}
        <div className="flex items-center gap-5">
          <div className="w-6 h-6 bg-muted rounded-full" />
          <div className="w-6 h-6 bg-muted rounded-full" />
        </div>

      </div>
    </div>
  );
}