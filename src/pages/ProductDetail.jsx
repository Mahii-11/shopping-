/* eslint-disable no-unused-vars */
import { Button } from "../components/ui/button";
import { useParams, Link } from "react-router";
import {
  ShoppingBag,
  ChevronRight,
 // Plus,
 // Minus,
  Heart,
  Share2,
  Star,
  ChevronDown,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProductDetailsBySlug } from "../services/api";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";

export default function ProductDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  
  

 useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        if (!slug) throw new Error("Slug is required");

        const res = await getProductDetailsBySlug(slug);

        if (!res?.product?.id) {
          throw new Error("Product not found");
        }

        const p = res.product;

        setProduct(p);
        setRelatedProducts(res.related_products || []);

        setSelectedImage(
          p.thumbnail || "/images/motorola.png"
        );

        setSelectedColor(p.colors?.[0] || null);
        setSelectedVariation(p.variations?.[0] || null);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);


   const galleryImages = useMemo(() => {
    if (!product) return [];

    return [
      product.thumbnail,
      ...(product.gallery?.map((g) => g.url) || []),
    ].filter(Boolean);
  }, [product]);



  const finalPrice =
    Number(selectedVariation?.price) ||
    Number(product?.price?.offer) ||
    Number(product?.price?.final) ||
    0;

  const regularPrice =
    Number(product?.price?.regular) || 0;

  const handleAddToCart = () => {
    if (!product) return;

    if (
      product?.variations?.length > 0 &&
      !selectedVariation
    ) {
      alert("Please select a size");
      return;
    }

    if (
      product?.colors?.length > 0 &&
      !selectedColor
    ) {
      alert("Please select a color");
      return;
    }

    const cartItem = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      thumbnail:
        selectedImage ||
        product.thumbnail ||
        "/images/motorola.png",

      price: finalPrice,
      sale_price: finalPrice,

      variation_id:
        selectedVariation?.id || 0,

      size_id:
        selectedVariation?.id || 0,

      size:
        selectedVariation?.size ||
        selectedVariation?.name ||
        null,

      color_id:
        selectedColor?.id || 0,

      color:
        selectedColor?.name ||
        selectedColor ||
        null,

      quantity: 1,
      stock:
        product?.stock?.in_stock ?? true,
    };

    dispatch(addItem(cartItem));
  };




  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-muted-foreground">Loading product details...</span>
      </div>
    );
  }


   const accordions = [
    {
      id: "desc",
      title: "PRODUCT DETAILS",
      content: (
        <div
          className="text-sm text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{
            __html:
              product.description ||
              "No description available.",
          }}
        />
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
  
  {/* NEW badge */}
  {product?.isNew && (
    <span className="absolute top-4 left-4 z-10 bg-foreground text-background text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest">
      New
    </span>
  )}

  {/* MAIN IMAGE */}
  <img
    src={selectedImage || product?.thumbnail}
    alt={product?.name || "product"}
    className="w-full h-full object-cover"
  />

  {/* ACTION BUTTONS */}
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
  {[
    product.thumbnail,
    ...(product.gallery?.map((g) => g.url) || []),
  ]
    .filter(Boolean)
    .map((img, i) => (
      <div
        key={i}
        onClick={() => setSelectedImage(img)}
        className={`flex-none w-20 h-24 overflow-hidden border-2 cursor-pointer ${
          selectedImage === img
            ? "border-black"
            : "border-transparent opacity-60"
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
                  <span className="text-xs text-muted-foreground">
                  (  {product.rating
                  ?.total_reviews || 0}{" "}
                reviews)
                  </span>
                </div>
              </div>

              {/* Price */}

               <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-red-500">
                ৳
                {finalPrice.toLocaleString()}
              </span>

              {regularPrice > finalPrice && (
                <span className="line-through text-gray-400">
                  ৳
                  {regularPrice.toLocaleString()}
                </span>
              )}
            </div>
            

              {/* Color */}
              {product?.colors?.length > 0 && (
                   <div>
                   <span className="text-sm font-semibold uppercase">Color</span>

                   <div className="flex gap-3 mt-3">
                   {product.colors.map((c, i) => (
                     <div
                       key={c.id || c.name || i}
                      onClick={() => setSelectedColor(c)}
                       className={`w-8 h-8 rounded-full cursor-pointer border transition ${
                       selectedColor?.name === c.name ||
                         selectedColor?.id === c.id
                           ? "ring-2 ring-black scale-110"
                             : "border-gray-300"
                        }`}
                      style={{ backgroundColor: c.hex }}
                      />
                     ))}
                  </div>
          </div>
                )}

              {/* Size */}
              <div>
                <span className="text-sm font-semibold uppercase">Size</span>
                <div className="flex flex-wrap gap-2 mt-3">
                    {product.variations?.length > 0 && (
              <div className="mb-6">
                <p className="font-medium mb-2">Size:</p>
                <div className="flex flex-wrap gap-3">
                  {product.variations.map((variation) => (
                    <button
                      key={variation.id}
                      onClick={() => {
                        setSelectedVariation(variation);
                        console.log("Selected Variation:", variation);
                       }}
                      className={`px-4 py-1 border rounded text-sm
                      ${
                        selectedVariation?.id === variation.id
                          ? "border-orange-500 text-orange-500"
                          : "border-gray-300"
                      }`}
                    >
                      {variation.size}
                    </button>
                  ))}
                </div>
              </div>
            )}
                </div>
              </div>
              <div className="flex gap-3">

              {/* 
              
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
                */}  

                <Button
                  onClick={() => handleAddToCart(product, selectedVariation, selectedColor, )}
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

          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 py-22">
               {relatedProducts.map((rp) => (
               <div
               key={rp.id}
               className="bg-white rounded-3xl md:p-6 p-4 flex flex-col transition duration-300 hover:shadow-lg"
               style={{
               boxShadow:
               "0 2px 8px rgba(0,0,0,0.04), 0 8px 20px rgba(0,0,0,0.05)",
               }}
            >

           <Link to={`/product-details/${rp.slug}`}>

              <div className="h-[130px] flex items-center justify-center mb-4">
              <img
              src={rp.thumbnail || "/images/motorola.png"}
              alt={rp.name}
              className="h-full object-contain"
              onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/motorola.png";
              }}
              />
             </div>

             <h3 className="text-[11px] md:text-[12px] text-center text-gray-700 leading-snug line-clamp-2 min-h-[52px]">
             {rp.name}
             </h3>

             <div className="flex items-center justify-center gap-2 mt-2">
             <span className="text-blue-600 font-semibold text-[16px]">
              Tk.{Number(rp.price?.final).toLocaleString()}
            </span>

           {rp.price?.regular && (
               <span className="text-gray-400 text-xs line-through">
               Tk.{Number(rp.price?.regular).toLocaleString()}
              </span>
            )}
           </div>

           </Link>

           <button className="mt-3 rounded-full border border-blue-500 bg-blue-50 text-blue-600 py-2 text-sm font-medium hover:bg-blue-500 hover:text-white transition">
                 Buy Now
            </button>

           </div>

              ))}
              </div>
      </div>
    </>
  );
}















 {/* const product = {
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
  }; */}