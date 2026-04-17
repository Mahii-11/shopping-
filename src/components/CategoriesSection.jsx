/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import CategoriesSkeleton from "../loading/CategoriesSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCategory } from "../services/api";

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const autoSlideRef = useRef(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const res = await getCategory();
        console.log("Category Data:", res);
        setCategories(res);
      } catch (error) {
        console.error("Error fetching Category section", error);
      } finally {
        setLoading(false)
      }
      
    }
    fetchCategory();
  }, [])






  const CARD_WIDTH = 272;

  const checkScrollBounds = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  const scrollBy = useCallback((direction) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "right" ? CARD_WIDTH : -CARD_WIDTH, behavior: "smooth" });
  }, []);

  // Auto-slide
useEffect(() => {
  const el = sliderRef.current;
  if (!el) return;

  const INTERVAL = 2800; // ms between slides
  const THRESHOLD = 5; // pixel tolerance for end-of-scroll

  const slide = () => {
    if (isHoveringRef.current) return;

    const remainingScroll = el.scrollWidth - el.scrollLeft - el.clientWidth;

    if (remainingScroll <= THRESHOLD) {
      // Reached (or almost reached) end → reset to start smoothly
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      // Scroll one card forward
      el.scrollBy({ left: CARD_WIDTH, behavior: "smooth" });
    }
  };

  autoSlideRef.current = setInterval(slide, INTERVAL);

  return () => clearInterval(autoSlideRef.current);
}, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScrollBounds, { passive: true });
    checkScrollBounds();
    return () => el.removeEventListener("scroll", checkScrollBounds);
  }, [checkScrollBounds]);

  if (loading) return <CategoriesSkeleton />

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <h2 className="font-serif text-3xl md:text-4xl mb-2">Shop by Category</h2>
        <p className="text-muted-foreground text-sm md:text-base">Browse products by your favorite categories</p>
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Left Arrow */}
        <button
          onClick={() => scrollBy("left")}
          disabled={!canScrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow md:flex items-center justify-center hover:bg-gray-200 disabled:opacity-30 hidden"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scrollBy("right")}
          disabled={!canScrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow  items-center justify-center hover:bg-gray-200 disabled:opacity-30 md:flex hidden"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          onMouseEnter={() => (isHoveringRef.current = true)}
          onMouseLeave={() => (isHoveringRef.current = false)}
          className="flex overflow-x-auto gap-6 px-4 sm:px-6 lg:px-8 pb-8 snap-x scroll-smooth  hide-scrollbar"
        >
          {categories.map((cat, i) => (
            <Link key={cat.id} to={`/category/${cat.slug}`} className="flex-none w-64 snap-start cursor-pointer">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative"
              >
                <div className="aspect-4/5 overflow-hidden bg-muted mb-4 relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <span className="text-white text-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Explore
                    </span>
                  </div>
                </div>
                <h3 className="text-lg text-center">{cat.name}</h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}