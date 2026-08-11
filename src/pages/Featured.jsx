import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getFeaturedProduct } from "../services/api";
import ProductSectionSkeleton from "../loading/ProductSectionSkeleton";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";
import { isVariantValid } from "../utils/cartHelpers";
import VariantModal from "../components/VariantModal";


export default function Featured() {
  const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [selectedProduct, setSelectedProduct] = useState(null);
   const [modalOpen, setModalOpen] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();
 
   useEffect(() => {
     const fetchProduct = async () => {
       try {
         setLoading(true);
         const res = await getFeaturedProduct();
         
         // 🧠 Handling response whether it comes as res.data.data or res.data or res
         const productList = res?.data?.data || res?.data || res || [];
         setProducts(productList);
       } catch (error) {
         console.error("Error fetching Featured products:", error);
       } finally {
         setLoading(false);
       }
     };
     fetchProduct();
   }, []);
 
   if (loading) return <ProductSectionSkeleton />;
 
   // Dynamic helper for price & path target
   const getProductPrice = (product) => {
     if (typeof product?.price === "object") {
       return Number(product.price?.final || product.price?.offer || 0);
     }
     return Number(product?.price || 0);
   };
 
   const getProductPath = (product) => {
     return product?.slug ? `/product/${product.slug}` : `/product/${product.id}`;
   };
 
   function handleAddToCart(product) {
     if (isVariantValid(product)) {
       setSelectedProduct(product);
       setModalOpen(true);
       return;
     }
 
     dispatch(
       addItem({
         id: product.id,
         product_id: product.id,
         slug: product.slug || product.id,
         name: product.name,
         image: product.image || product.thumbnail,
 
         price: getProductPrice(product),
 
         variation_id: 0,
         color_id: 0,
         size_id: 0,
         color_name: "",
         size_name: "",
 
         quantity: 1,
         type: "single",
       })
     );
   }
 
   // =========================
   // BUY NOW HANDLER (Add to cart + Direct Checkout)
   // =========================
   function handleBuyNow(product) {
     handleAddToCart(product);
     navigate("/checkout");
   }
 
   function handleConfirmVariant(selected) {
     if (!selectedProduct) return;
 
     dispatch(
       addItem({
         id: selectedProduct.id,
         product_id: selectedProduct.id,
         slug: selectedProduct.slug || selectedProduct.id,
         name: selectedProduct.name,
         image: selectedProduct.image || selectedProduct.thumbnail,
 
         price: Number(
           selected?.price || getProductPrice(selectedProduct)
         ),
 
         quantity: 1,
 
         size_id: selected?.size?.size_id || 0,
         color_id: selected?.color?.color_id || 0,
 
         size_name: selected?.size?.size || "",
         color_name: selected?.color?.name || "",
 
         variation_id: selected?.id || 0,
 
         type: "variable",
       })
     );
 
     setModalOpen(false);
     setSelectedProduct(null);
   }
  return (
    <section className="bg-[#f0f4f4] py-10 px-4">
      <HeroBanner  />

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 py-6">
        {products.map((product) => {
          const productPath = getProductPath(product);
          const formattedPrice = getProductPrice(product);

          return (
            <div key={product.id} className="bg-white flex flex-col group">
              {/* Product Image Link */}
              <Link to={productPath} className="relative block overflow-hidden">
                {product.badge && (
                  <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 z-10 uppercase tracking-wider font-semibold">
                    {product.badge}
                  </span>
                )}
                <img
                  src={product.image || product.thumbnail}
                  alt={product.name}
                  className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              {/* Content */}
              <div className="p-3 flex flex-col flex-1">
                {/* Product Title Link */}
                <Link to={productPath} className="hover:underline">
                  <p className="text-xs text-gray-700 leading-snug mb-3 min-h-[2.5rem] font-medium line-clamp-2">
                    {product.name}
                  </p>
                </Link>

                <p className="text-sm font-semibold text-gray-900 mb-3">
                  ৳{formattedPrice.toLocaleString()}
                </p>

                {/* Buttons */}
                <div className="mt-auto flex flex-col gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full border border-gray-400 text-gray-800 text-sm py-2 hover:bg-gray-100 transition-colors font-medium cursor-pointer"
                  >
                    Add To Cart
                  </button>

                  <button
                    onClick={() => handleBuyNow(product)}
                    className="w-full bg-black text-white text-sm py-2 hover:bg-gray-800 transition-colors font-medium cursor-pointer"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <VariantModal
        open={modalOpen}
        product={selectedProduct}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmVariant}
      />
    </section>
  );
}



function HeroBanner() {
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
            Featured
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
            – a perfectly tailored  is the
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
    )
}