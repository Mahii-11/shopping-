/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link } from "react-router"; 
import { Button } from "../components/ui/button"; 

const PromoSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&h=600&fit=crop&q=80"
          alt="Promo Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-6xl mb-6 leading-tight">
            Mid-Season <span className="text-primary italic">Event</span>
          </h2>

          <p className="font-sans text-xl md:text-2xl font-light mb-10 text-white/80">
            Up to 50% off on selected premium styles. Limited time only.
          </p>

          <Link to="/category/c-sale">
            <Button className="bg-white text-black hover:bg-primary hover:text-white border-transparent px-10 py-4 text-lg">
              Shop Sale
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoSection;