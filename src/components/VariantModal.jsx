/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function VariantModal({
  open,
  product,
  onClose,
}) {
  if (!open || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className="relative w-[420px] bg-white rounded-3xl shadow-2xl p-6 z-10"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <X />
          </button>

          {/* Product */}
          <div className="flex gap-4">
            <img
              src={product.image}
              className="w-20 h-20 rounded-xl object-cover"
              alt={product.name}
            />

            <div>
              <h2 className="font-semibold text-base">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500">
                This product has options available
              </p>
            </div>
          </div>

          {/* MESSAGE (MAIN UX FIX) */}
          <div className="mt-6 bg-gray-50 border rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
            ⚠️ This product has multiple options (size / color / variation).  
            <br /><br />
            Please go to product details page to select your preferred options before adding to cart.
          </div>

          {/* CTA BUTTON */}
          <Link
            to={`/product/${product.slug}`}
            onClick={onClose}
            className="mt-5 w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            View Product Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}