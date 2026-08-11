import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getCategoryWithProducts } from "../services/api";
import ProductSectionSkeleton from "../loading/ProductSectionSkeleton";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";
import { isVariantValid } from "../utils/cartHelpers";
import VariantModal from "./VariantModal";

export default function MenCategory() {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadMen = async () => {
      try {
        setLoading(true);
        const res = await getCategoryWithProducts();
        const menCategory = res?.find(
          (item) => item.category_slug === "men"
        );
        if (menCategory) {
          setCategory(menCategory);
          setProducts(
            menCategory.products?.data || menCategory.products || []
          );
        }
      } catch (error) {
        console.error("Error fetching Men products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMen();
  }, []);

  // Helper for safe price parsing
  const getProductPrice = (product) => {
    if (typeof product?.price === "object") {
      return Number(
        product.price?.final || product.price?.offer || product.price?.regular || 0
      );
    }
    return Number(product?.price || 0);
  };

  // Helper for safe route path
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
        slug: product.slug,
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
  // BUY NOW HANDLER
  // =========================
  function handleBuyNow(product) {
    if (isVariantValid(product)) {
      navigate(getProductPath(product));
    } else {
      handleAddToCart(product);
      navigate("/checkout");
    }
  }

  // =========================
  // CONFIRM VARIANT ADD
  // =========================
  function handleConfirmVariant(selected) {
    if (!selectedProduct) return;

    dispatch(
      addItem({
        id: selectedProduct.id,
        product_id: selectedProduct.id,

        slug: selectedProduct.slug,
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

  // 1. ডাটা লোড না হওয়া পর্যন্ত স্কেলিটন দেখাবে
  if (loading) return <ProductSectionSkeleton />;

  // 2. লোডিং শেষে ব্যাকএন্ডে কোনো প্রোডাক্ট না থাকলে পুরো সেকশন হাইড হয়ে যাবে
  if (!products || products.length === 0) return null;

  return (
    <section className="bg-[#f0f4f4] py-10 px-4">
      <h2
        className="text-center text-3xl font-light text-gray-800 mb-8"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {category?.category_name}
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">
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

      {/* 3. প্রোডাক্ট ১ বা তার বেশি থাকলে তবেই কেবল View More বাটন দেখাবে */}
      {products.length > 0 && (
        <div className="flex justify-center mt-10">
          <Link
            to={`/category/${category?.category_slug || "men"}`}
            className="relative inline-flex items-center gap-2 px-10 py-3 border-2 border-gray-800 text-gray-800 text-sm font-medium tracking-widest uppercase overflow-hidden group transition-all duration-300 hover:text-white"
          >
            <span className="absolute inset-0 bg-gray-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <span className="relative">View More</span>
            <span className="relative text-base leading-none">→</span>
          </Link>
        </div>
      )}

      <VariantModal
        open={modalOpen}
        product={selectedProduct}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmVariant}
      />
    </section>
  );
}