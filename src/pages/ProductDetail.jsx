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
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetail() {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const product = {
    name: "Premium Cotton T-Shirt",
    price: 2500,
    salePrice: 1800,
    description:
      "High-quality cotton t-shirt with breathable fabric and modern fit.",
    categoryId: "c-fashion",
    isNew: true,
    image: "/images/product-3.png",
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

  const accordions = [
    {
      id: "desc",
      title: "PRODUCT DETAILS",
      content: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>{product.description}</p>
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

  const handleAddToCart = () => {
    const payload = {
      product: product.name,
      price: product.salePrice,
      quantity,
      color: selectedColor,
      size: selectedSize,
    };

    console.log("Added to cart:", payload);

    alert("Added to cart successfully!");
  };

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

              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button className="w-9 h-9 rounded-full bg-background/80 flex items-center justify-center shadow">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-full bg-background/80 flex items-center justify-center shadow">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-none w-20 h-24 overflow-hidden border-2 cursor-pointer ${
                    activeImage === i ? "border-black" : "border-transparent opacity-60"
                  }`}
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
                <h1 className="font-serif text-3xl md:text-4xl mb-3">
                  {product.name}
                </h1>

                <div className="flex items-center gap-2">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-xs text-muted-foreground">(48 reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-destructive">
                  ৳{product.salePrice}
                </span>
                <span className="text-lg line-through text-muted-foreground">
                  ৳{product.price}
                </span>
              </div>

              {/* Color */}
              <div>
                <span className="text-sm font-semibold uppercase">Color</span>
                <div className="flex gap-3 mt-3">
                  {product.colors.map((c) => (
                    <div
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full cursor-pointer border ${
                        selectedColor === c.name ? "ring-2 ring-black" : ""
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <span className="text-sm font-semibold uppercase">Size</span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {product.sizes.map((s) => (
                    <div
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-[52px] h-12 px-3 border flex items-center justify-center cursor-pointer ${
                        selectedSize === s ? "bg-black text-white" : ""
                      }`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity + Cart */}
              <div className="flex gap-3">
                <div className="flex items-center border h-14">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 h-full"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <span className="w-10 text-center font-semibold">
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 h-full"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="flex-1 h-14"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>

              {/* Accordion */}
              <div className="divide-y">
                {accordions.map((acc) => (
                  <div key={acc.id}>
                    <button
                      onClick={() =>
                        setOpenAccordion(openAccordion === acc.id ? null : acc.id)
                      }
                      className="w-full flex justify-between py-4"
                    >
                      <span className="text-sm font-semibold">
                        {acc.title}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openAccordion === acc.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openAccordion === acc.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-4">
                            {acc.content}
                          </div>
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