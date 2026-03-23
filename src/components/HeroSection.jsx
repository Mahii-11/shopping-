/* eslint-disable no-unused-vars */
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router";
import { Button } from "../components/ui/button";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-[90vh] min-h-150 overflow-hidden bg-black flex items-center">
      <motion.div className="absolute inset-0 z-0" style={{ y: heroY, opacity: heroOpacity }}>
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=900&fit=crop&q=80"
          alt="Summer Collection"
          className="w-full h-full object-cover object-top opacity-70"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <span className="font-sans tracking-[0.2em] text-sm uppercase text-white/80 mb-4 block">
            The New Standard
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-6">
            Summer <br />
            <span className="italic text-primary-foreground/90">Collection</span>
          </h1>
          <p className="font-sans text-lg text-white/70 mb-10 max-w-md font-light leading-relaxed">
            Discover our latest arrivals. Elevated essentials crafted from premium fabrics for the modern lifestyle.
          </p>
          <Link to="/category/c-new">
            <Button className="bg-white text-black hover:bg-primary hover:text-white border-transparent">
              Shop Collection
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}