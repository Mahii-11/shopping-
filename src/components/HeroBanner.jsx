// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const HeroBanner = ({ bannerImage, slug, category }) => {
  
  // Text Reveal Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }, // Smooth Expo ease
    },
  };

  return (
    <section className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden bg-[#050505]">
      
      {/* Background Image with Slow Motion Zoom */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={bannerImage}
          alt={slug}
          // Image position fix: object-top matha kata rodh kore
          className="w-full h-full object-cover object-top sm:object-center"
        />
        {/* Professional Overlay: Multi-layer gradient for depth 
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" /> */}
      </motion.div>

      {/* Content Layer */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10"
      >
        
        {/* Top Label */}
        <motion.span 
          variants={itemVariants}
          className="text-white/60 text-[10px] sm:text-xs tracking-[0.5em] uppercase font-light mb-4"
        >
          New Arrival — 2026
        </motion.span>

        {/* Headline with Masking Effect */}
        <div className="overflow-hidden mb-4">
          <motion.h1 
            variants={itemVariants}
            className="text-white font-extralight uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.2em] leading-none"
          >
            {category?.category_name || slug}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-white/70 text-[11px] sm:text-sm md:text-base max-w-sm sm:max-w-xl font-light leading-relaxed tracking-[0.1em] mb-10 opacity-80"
        >
          Redefining the standards of modern luxury. Explore our curated selection of timeless pieces.
        </motion.p>

        {/* Luxury CTA Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden px-12 py-4 border border-white/30 text-white text-[10px] sm:text-xs tracking-[0.4em] uppercase transition-all duration-500"
          >
            {/* Hover Background Fill */}
            <span className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-[0.6s] ease-[0.16, 1, 0.3, 1]" />
            
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Discover More
            </span>
          </motion.button>
        </motion.div>

      </motion.div>

      {/* Subtle Bottom Vignette */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroBanner;