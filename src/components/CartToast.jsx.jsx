/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { isVariantValid } from "../utils/cartHelpers";
import {
  CheckCircle2,
  X,
  ArrowRight,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";
import { hideCartPopup } from "../cart/cartSlice";
import { useEffect } from "react";

export default function CartToast() {
  const dispatch = useDispatch();

  const { cart, showCartPopup } = useSelector((state) => state.cart);

  const lastItem = cart[cart.length - 1];

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (showCartPopup) {
      const timer = setTimeout(() => {
        dispatch(hideCartPopup());
      }, 4200);

      return () => clearTimeout(timer);
    }
  }, [showCartPopup, dispatch]);

  return (
    <AnimatePresence>
      {showCartPopup && lastItem && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 35, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 22,
          }}
          className="fixed bottom-5 right-5 z-[9999] w-[390px] max-w-[calc(100vw-18px)] rounded-3xl overflow-hidden border border-white/40 bg-white/75 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.20)]"
        >
          {/* animated top timer */}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 4.2, ease: "linear" }}
            className="h-[3px] bg-gradient-to-r from-black via-gray-700 to-black"
          />

          {/* glow background */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-gray-200 rounded-full blur-3xl opacity-40" />
          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-gray-300 rounded-full blur-3xl opacity-30" />

          <div className="relative p-5">
            {/* Header */}
            <div className="flex justify-between items-start gap-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold tracking-wide">
                    Added to Cart
                  </p>
                  <p className="text-xs text-gray-500">
                    Smoothly added to your bag
                  </p>
                </div>
              </div>

              <button
                onClick={() => dispatch(hideCartPopup())}
                className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center transition"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Product Area */}
            <div className="mt-4 rounded-2xl border bg-white/70 p-3 flex gap-3">
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.05 }}
                src={lastItem.image}
                alt={lastItem.name}
                className="w-18 h-18 rounded-2xl object-cover border"
              />

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug line-clamp-2">
                  {lastItem.name}
                </p>

                {isVariantValid(lastItem) && (
               <p className="text-xs text-gray-500 mt-1">
                 Variant Product
                 </p>
                 )}

                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                  <ShoppingBag className="w-3 h-3" />
                  <span>{totalItems} item(s) in bag</span>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-base font-semibold">
                    ৳ {lastItem.price}
                  </p>

                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                    Qty {lastItem.quantity}
                  </span>
                </div>
              </div>
            </div>

            {/* Smart Recommendation */}
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-black/[0.03] px-3 py-2">
              <Sparkles className="w-4 h-4" />
              <p className="text-xs text-gray-700">
                Customers usually checkout within 2 minutes.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => dispatch(hideCartPopup())}
                className="h-11 rounded-2xl border text-sm font-medium hover:bg-gray-100 transition"
              >
                Continue Shopping
              </button>

              <Link
                to="/cart"
                onClick={() => dispatch(hideCartPopup())}
                className="h-11 rounded-2xl bg-black text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition"
              >
                View Bag
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}