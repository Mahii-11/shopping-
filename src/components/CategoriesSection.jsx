/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import CategoriesSkeleton from "../loading/CategoriesSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCategory } from "../services/api";

// Import Swiper React components and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // States to explicitly hide/show navigation arrows at edges
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const res = await getCategory();
        console.log("Category Data:", res);
        setCategories(res || []);
      } catch (error) {
        console.error("Error fetching Category section", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  if (loading) return <CategoriesSkeleton />;

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-20 bg-background select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-10 text-center">
        <h2 className="font-serif text-3xl md:text-4xl mb-2">Shop by Category</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Browse products by your favorite categories
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 group/carousel">
        {/* Side Fade Gradient Overlays */}
        <div className="absolute top-0 bottom-0 left-4 sm:left-6 lg:left-8 w-6 md:w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-4 sm:right-6 lg:right-8 w-6 md:w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Custom Left Arrow Navigation Button */}
        <button
          ref={prevRef}
          className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white border border-neutral-200 shadow-md active:scale-95 text-neutral-700 flex items-center justify-center transition-opacity duration-200 hover:bg-neutral-50 ${
            isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Custom Right Arrow Navigation Button */}
        <button
          ref={nextRef}
          className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white border border-neutral-200 shadow-md active:scale-95 text-neutral-700 flex items-center justify-center transition-opacity duration-200 hover:bg-neutral-50 ${
            isEnd ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Autoplay, A11y]}
          speed={600}
          slidesPerGroup={1}
          watchOverflow={true}
          grabCursor={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();

            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.8,
              spaceBetween: 12,
            },
            480: {
              slidesPerView: 2.2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4.5,
              spaceBetween: 24,
            },
          }}
          className="pb-6"
        >
          {categories.map((cat, i) => (
            <SwiperSlide key={cat.id || i} className="h-auto">
              <Link to={`/category/${cat.slug}`} className="block h-full cursor-pointer">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-muted mb-3 relative rounded-xl border border-neutral-200/60 shadow-sm">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      draggable={false}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <span className="text-white text-lg sm:text-xl font-medium tracking-wide opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        Explore
                      </span>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-center text-neutral-800 group-hover:text-black transition-colors">
                    {cat.name}
                  </h3>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}