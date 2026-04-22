// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const HeroBanner = ({ slug, category }) => {
  return (
    <section className="w-full bg-[#f4f4f4]">
      <div className="max-w-[1900px] mx-auto px-5 sm:px-8 md:px-14 lg:px-16">

        {/* Top Editorial Block */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-[14vh] md:min-h-[34vh] flex flex-col items-center justify-center text-center  md:py-8"
        >
          {/* Small Label */}
          <span className="uppercase tracking-[0.32em] text-[11px] md:text-xs text-neutral-500 mb-3 md:mb-4">
            Clothing
          </span>

          {/* Title */}
          <h1 className="font-serif text-[42px] sm:text-5xl md:text-6xl lg:text-[64px] text-neutral-950 leading-none mb-5 md:mb-7">
            {category?.category_name || slug}
          </h1>

          {/* Description */}
          <p className="max-w-[980px] text-[12px] sm:text-[16px] md:text-[22px] leading-[1.55] text-neutral-900 font-serif px-2">
            From effortless{" "}
            <span className="underline underline-offset-2 text-neutral-500">
              matching separates
            </span>{" "}
            to{" "}
            <span className="underline underline-offset-2 text-neutral-500">
              denim
            </span>{" "}
            and{" "}
            <span className="underline underline-offset-2 text-neutral-500">
              dresses
            </span>{" "}
            – a perfectly tailored {category?.category_name || slug} is the
            ultimate way to elevate every look. These are the styles to invest
            in now and reach for on repeat.
          </p>
        </motion.div>

        {/* Bottom Divider */}
        <div className="border-t border-neutral-300 mt-2" />

        {/* Bottom Spacing (same visual breathing room as reference) */}
        <div className="h-16 md:h-20" />
      </div>
    </section>
  );
};

export default HeroBanner;