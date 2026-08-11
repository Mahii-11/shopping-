/* eslint-disable no-unused-vars */
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { useEffect, useState, useRef } from "react";
import { getHeroSectionData } from "../services/api";
import HeroSkeleton from "../loading/HeroSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSection() {
  const [slider, setSlider] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        setLoading(true);
        const data = await getHeroSectionData();
        setSlider(data || []);
      } catch (error) {
        console.error("Error fetching slider data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSliderData();
  }, []);

  // Autoplay Logic
  const startSlideTimer = () => {
    stopSlideTimer();
    if (slider.length > 1) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slider.length);
      }, 5000);
    }
  };

  const stopSlideTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  useEffect(() => {
    if (slider.length > 0) {
      startSlideTimer();
    }
    return () => stopSlideTimer();
  }, [slider]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slider.length);
    startSlideTimer();
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slider.length) % slider.length);
    startSlideTimer();
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    startSlideTimer();
  };

  const currentData = slider[currentSlide];
  const title = currentData?.title_two?.split(" ");

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  if (loading) return <HeroSkeleton />;
  if (!slider.length) return null;

  return (
    <section className="relative h-[90vh] min-h-150 overflow-hidden bg-black flex items-center group">
      {/* Background Images Slider */}
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div
          className="flex h-full w-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slider.map((item, index) => (
            <div key={item.id || index} className="relative h-full w-full shrink-0">
              <img
                src={item?.image}
                alt={item?.title_one || "Hero Banner"}
                className="w-full h-full object-cover object-top opacity-70"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Hero Content (Dynamic with Framer Motion) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="font-sans tracking-[0.2em] text-sm uppercase text-white/80 mb-4 block">
              {currentData?.title_one}
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-6">
              {title?.[0]} <br />
              <span className="italic text-primary-foreground/90">
                {title?.slice(1).join(" ")}
              </span>
            </h1>
            <p className="font-sans text-lg text-white/70 mb-10 max-w-md font-light leading-relaxed">
              {currentData?.description}
            </p>
            <Link to="/category/c-new">
              <Button className="bg-white text-black hover:bg-primary hover:text-white border-transparent">
                Shop Collection
              </Button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next Buttons */}
      {slider.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-20 backdrop-blur-xs"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-20 backdrop-blur-xs"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 bg-black/20 backdrop-blur-xs px-3 py-1.5 rounded-full">
            {slider.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 cursor-pointer ${
                  currentSlide === index
                    ? "h-2.5 w-7 rounded-full bg-white"
                    : "h-2.5 w-2.5 rounded-full bg-white/40 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}