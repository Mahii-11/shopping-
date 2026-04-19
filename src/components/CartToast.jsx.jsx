/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
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

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

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
          initial={{ opacity: 0, y: 60, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 24,
          }}
          className="fixed bottom-5 right-5 z-[9999] w-[395px] max-w-[calc(100vw-16px)] rounded-3xl overflow-hidden border border-white/40 bg-white/80 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.20)]"
        >
          {/* top progress */}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 4.2, ease: "linear" }}
            className="h-[3px] bg-gradient-to-r from-black via-gray-700 to-black"
          />

          {/* ambient glow */}
          <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gray-200 blur-3xl opacity-40" />
          <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-gray-300 blur-3xl opacity-30" />

          <div className="relative p-5">
            {/* Header */}
            <div className="flex justify-between items-start gap-3">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0.8, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </motion.div>

                <div>
                  <p className="text-sm font-semibold tracking-wide">
                    Added to Cart
                  </p>
                  <p className="text-xs text-gray-500">
                    Item added successfully
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

            {/* Product Card */}
            <div className="mt-4 rounded-2xl border bg-white/70 p-3 flex gap-3 relative overflow-hidden">
              {/* image shine */}
              <motion.div
                animate={{ x: ["-120%", "140%"] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-y-0 w-10 bg-white/40 blur-md rotate-12"
              />

              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                src={lastItem.image || lastItem.thumbnail}
                alt={lastItem.name}
                className="w-20 h-20 rounded-2xl object-cover border bg-white"
              />

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug line-clamp-2">
                  {lastItem.name}
                </p>

                {/* variant badge */}
                {lastItem.has_variants && (
                  <span className="inline-flex mt-2 w-fit px-2 py-1 rounded-full bg-black text-white text-[11px] font-medium">
                    Variants Available
                  </span>
                )}

                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                  <ShoppingBag className="w-3 h-3" />
                  <span>
                    {totalItems} {totalItems === 1 ? "item" : "items"} in bag
                  </span>
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

            {/* subtotal */}
            <div className="mt-3 rounded-2xl bg-black/[0.03] px-4 py-3 flex items-center justify-between">
              <span className="text-xs text-gray-500">Current Subtotal</span>
              <span className="text-sm font-semibold">৳ {subtotal}</span>
            </div>

            {/* message */}
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-black/[0.03] px-3 py-2">
              <Sparkles className="w-4 h-4" />
              <p className="text-xs text-gray-700">
                Fast checkout recommended for best availability.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => dispatch(hideCartPopup())}
                className="h-11 rounded-2xl border text-sm font-medium hover:bg-gray-100 transition"
              >
                Continue
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