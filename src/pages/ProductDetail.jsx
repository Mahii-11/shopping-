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
import ProductDetailSkeleton from "../loading/ProductDetailSkeleton";

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

    

  const handleAddToCart = (item) => {
  if (!item) return;
  

  if (
    item?.variations?.length > 0 &&
    !selectedVariation
  ) {
    alert("Please select a size");
    return;
  }

  if (
    item?.colors?.length > 0 &&
    !selectedColor
  ) {
    alert("Please select a color");
    return;
  }

  const price =
  item?.variations?.length > 0 && selectedVariation
    ? selectedVariation.price
    : item?.price?.final || item?.price?.offer || 0;

  const cartItem = {
    id: item.id,
    product_id: item.id,
    slug: item.slug,
    name: item.name,
    thumbnail: item.thumbnail,

    price: Number(price),
    sale_price: Number(price),
    variation_id: selectedVariation?.id || "", 
    size_id: selectedVariation?.size_id || "",
    size_name: selectedVariation?.size || "",
    color_id: selectedColor?.color_id || "", 
    color_name: selectedColor?.name || "",

    quantity: 1,
    type: selectedVariation ? "variable" : "single",
    stock: item?.stock?.quantity ?? 0, 
    in_stock: item?.stock?.in_stock ?? false,
};

  dispatch(addItem(cartItem));
};



  if (loading) {
    return (
     <ProductDetailSkeleton />
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
  {[product.thumbnail, ...(product.gallery?.map((g) => g.url) || [])]
    .filter(Boolean)
    .map((img, i) => {
      const isSelected = selectedImage === img;

      return (
        <div
          key={i}
          onClick={() => setSelectedImage(img)}
          className={`flex-none w-20 h-24 overflow-hidden cursor-pointer rounded-md transition-all duration-300 relative
            ${isSelected ? "scale-105" : "opacity-60 hover:opacity-100 hover:scale-105"}
          `}
        >
          {/* soft dark overlay only for selected */}
          {isSelected && (
            <div className="absolute inset-0 bg-black/10" />
          )}

          {/* subtle shadow depth */}
          <div
            className={`absolute inset-0 rounded-md transition-all duration-300
              ${isSelected ? "shadow-xl shadow-black/20" : ""}
            `}
          />

          <img
            src={img}
            alt=""
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      );
    })}
</div>
          </div>

          {/* Right */}
          <div className="w-full md:w-[45%] flex flex-col">
            <div className="flex flex-col gap-6">

             <div className="space-y-6">

  {/* Product Title */}
  <div className="space-y-3">
    <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900 leading-tight">
      {product.name}
    </h1>
  </div>

  {/* Meta Info */}
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">

    {product?.brand?.name && (
      <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
        <p className="text-xs uppercase tracking-wide text-zinc-400 mb-1">
          Brand
        </p>
        <p className="font-medium text-zinc-800">
          {product.brand.name}
        </p>
      </div>
    )}

    {product?.sku && (
      <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
        <p className="text-xs uppercase tracking-wide text-zinc-400 mb-1">
          SKU
        </p>
        <p className="font-medium text-zinc-800">
          {product.sku}
        </p>
      </div>
    )}

    {product?.category?.name && (
      <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
        <p className="text-xs uppercase tracking-wide text-zinc-400 mb-1">
          Category
        </p>
        <p className="font-medium text-zinc-800">
          {product.category.name}
        </p>
      </div>
    )}

    <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-zinc-400 mb-1">
        Availability
      </p>

      <p className="font-medium text-zinc-800">
        {product?.stock?.in_stock ? "In Stock" : "Out of Stock"}
      </p>
    </div>

    {product?.price?.discount > 0 && (
      <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
        <p className="text-xs uppercase tracking-wide text-zinc-400 mb-1">
          Discount
        </p>
        <p className="font-medium text-zinc-800">
          {product.price.discount}%
        </p>
      </div>
    )}

  </div>

  {/* Rating */}
  <div className="flex items-center gap-3 pt-1">
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="w-4 h-4 text-zinc-700 fill-zinc-700"
        />
      ))}
    </div>

    <span className="text-sm text-zinc-500">
      {product?.rating?.total_reviews || 0} Reviews
    </span>
  </div>

</div>

            

              {/* Price */}

               <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-green-700">
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

                   <div className="flex gap-3 mt-2">
                   {product.colors.map((c, i) => (
                     <div
                       key={c.id || c.name || i}
                      onClick={() => setSelectedColor(c)}
                       className={`w-8 h-8 rounded-full cursor-pointer border transition ${
                       selectedColor?.name === c.name ||
                         selectedColor?.id === c.id
                           ? "ring-2 ring-green-700 scale-110"
                             : "border-gray-300"
                        }`}
                      style={{ backgroundColor: c.code  }}
                      title={c.name}
                      />
                     ))}
                  </div>
          </div>
                )}

              {/* Size */}
              <div>
                <div className="flex flex-wrap gap-2">
                    {product.variations?.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase mb-2">Size:</p>
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
                          ? "border-green-700 text-green-700"
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
              
              {product?.short_description && (
  <div className="bg-gray-50 rounded-xl px-4 border">
    <div
      className="text-sm md:text-base text-gray-700 leading-7"
      dangerouslySetInnerHTML={{
        __html: product.short_description,
      }}
    />
  </div>
)}
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
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 h-14"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>

                  <button className="w-64 bg-black text-white text-sm py-2 hover:bg-gray-800 transition-colors flex items-center justify-center">
                     <ShoppingBag className="w-4 h-4 mr-2" />
                  Buy Now
                </button>
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
          <section>
             <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 mt-20">
        {relatedProducts.map((item) => (
          <div key={item.id} className="bg-[#FCF8F8]  flex flex-col">
            <Link to={`/product/${item.slug}`}>

             <div className="relative">
              {item.badge && (
                <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 z-10">
                  {item.badge}
                </span>
              )}
              <img
                src={item.image || item.thumbnail}
                alt={item.name}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="p-3 flex flex-col flex-1">
              <p className="text-xs text-gray-700 leading-snug mb-3 min-h-[2.5rem]">
                {item.name}
              </p>
               <div className="flex items-center justify-between mt-2">
                <span className="text-black font-semibold text-lg">
                  Tk {Number(item.price?.final).toLocaleString()}
                </span>
                {item.price?.regular && (
                  <span className="text-gray-400 text-sm line-through">
                    Tk {Number(item.price?.regular).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
              </Link>
          </div>
        ))}
      </div>


          </section>
       
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