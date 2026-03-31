/* eslint-disable no-unused-vars */
import { Button } from "../components/ui/button";
import {
  ShoppingBag,
  ChevronRight,
  Plus,
  Minus,
  Heart,
  Share2,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetail() {
    const [openAccordion, setOpenAccordion] = useState(null);

  const product = {
    name: "Premium Cotton T-Shirt",
    price: 2500,
    salePrice: 1800,
    description:
      "High-quality cotton t-shirt with breathable fabric and modern fit.",
    categoryId: "c-fashion",
    isNew: true,
    image:
      "/images/product-3.png",
    images: [
      "/images/product-3.png",
      "/images/product-4.png",
      "/images/product-5.png",
      "/images/product-6.png",
    ],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#ffffff" },
      { name: "Red", hex: "#ff0000" },
    ],
    sizes: ["S", "M", "L", "XL"],
  };

  const images = product.images;


 const accordions = [
  {
    id: "desc",
    title: "PRODUCT DETAILS",
    content: (
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p>High-quality cotton t-shirt with breathable fabric and modern fit.</p>
      </div>
    ),
  },
  {
    id: "shipping",
    title: "SHIPPING & RETURNS",
    content: (
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p>Free delivery on orders over ৳5,000.</p>
        <p>7-day easy returns.</p>
      </div>
    ),
  },
  {
    id: "care",
    title: "COMPOSITION & CARE",
    content: (
      <div className="text-sm text-muted-foreground leading-relaxed">
        <p>Machine wash cold. Do not bleach.</p>
      </div>
    ),
  },
];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-3 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans text-xs text-muted-foreground flex items-center gap-1.5">
          <span className="hover:text-foreground transition-colors">Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-foreground transition-colors capitalize">
            fashion
          </span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground line-clamp-1">
            {product.name}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-20">

          {/* Left */}
          <div className="w-full md:w-[55%]">
            <div className="relative aspect-[3/4] bg-muted overflow-hidden mb-4">
              {product.isNew && (
                <span className="absolute top-4 left-4 z-10 bg-foreground text-background text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest">
                  New
                </span>
              )}

              {product.salePrice && (
                <span className="absolute top-4 left-4 z-10 bg-destructive text-destructive-foreground text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest">
                  Sale
                </span>
              )}

              <img
                src={images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button className="w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-background transition-colors">
                  <Heart className="w-4 h-4 text-foreground" />
                </button>
                <button className="w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-background transition-colors">
                  <Share2 className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="flex-none w-20 h-24 overflow-hidden border-2 border-transparent opacity-60"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="w-full md:w-[45%] flex flex-col">
            <div className="flex flex-col gap-6">

              <div>
                <h1 className="font-serif text-3xl md:text-4xl text-foreground leading-snug mb-3">
                  {product.name}
                </h1>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-sans text-xs text-muted-foreground">
                    (48 reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 font-sans">
                <span className="text-2xl font-bold text-destructive">
                  ৳{product.salePrice}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ৳{product.price}
                </span>
              </div>

              {/* Color */}
              <div>
                <span className="font-sans text-sm font-semibold uppercase tracking-wider">
                  Color
                </span>
                <div className="flex gap-3 mt-3">
                  {product.colors.map((c) => (
                    <div
                      key={c.name}
                      className="w-8 h-8 rounded-full ring-1 ring-border"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <span className="font-sans text-sm font-semibold uppercase tracking-wider">
                  Size
                </span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {product.sizes.map((s) => (
                    <div
                      key={s}
                      className="min-w-[52px] h-12 px-3 border border-border flex items-center justify-center text-sm"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart */}
              <div className="flex gap-3">
                <div className="flex items-center border border-border h-14">
                  <button className="px-3 h-full flex items-center">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-sans font-semibold text-sm">
                    1
                  </span>
                  <button className="px-3 h-full flex items-center">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <Button className="flex-1 h-14 text-[15px] tracking-wide">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>

                <button className="h-14 w-14 border border-border flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-3 gap-3 py-5 border-y border-border">
                <div className="text-center text-xs">Free Delivery</div>
                <div className="text-center text-xs">Easy Returns</div>
                <div className="text-center text-xs">Authentic</div>
              </div>

              {/* Accordion static */}
                       <div className="font-sans divide-y divide-border">
  {accordions.map((acc) => (
    <div key={acc.id}>
      <button
        type="button"
        onClick={() =>
          setOpenAccordion(openAccordion === acc.id ? null : acc.id)
        }
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-semibold tracking-wider">
          {acc.title}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
            openAccordion === acc.id ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {openAccordion === acc.id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-5">{acc.content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ))}
</div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}