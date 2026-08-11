import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import ProductSectionSkeleton from "../loading/ProductSectionSkeleton";
import { getCategoryWithProducts } from "../services/api";
import { addItem } from "../cart/cartSlice";
import { useDispatch } from "react-redux";
import VariantModal from "../components/VariantModal";
import { isVariantValid } from "../utils/cartHelpers";

export default function Panjabi() {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Track korbo execution-ta Buy Now dynamic button theke ashchhe kina
  const [isBuyNowAction, setIsBuyNowAction] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadKids = async () => {
      try {
        setLoading(true);
        const res = await getCategoryWithProducts();
        const womenCategory = res?.find((item) => item.category_slug === "kids");
        if (womenCategory) {
          setCategory(womenCategory);
          setProducts(
            womenCategory.products?.data || womenCategory.products || []
          );
        }
      } catch (error) {
        console.error("Error fetching Kids products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadKids();
  }, []);

  // =========================
  // ADD TO CART
  // =========================
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

        price: Number(
          product.price?.final ||
            product.price ||
            0
        ),

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
    // A. Single / Without Variant product hole:
    if (!isVariantValid(product)) {
      dispatch(
        addItem({
          id: product.id,
          product_id: product.id,
          slug: product.slug,
          name: product.name,
          image: product.image || product.thumbnail,
          price: Number(product.price?.final || product.price || 0),
          variation_id: 0,
          color_id: 0,
          size_id: 0,
          color_name: "",
          size_name: "",
          quantity: 1,
          type: "single",
        })
      );
      navigate("/checkout");
      return;
    }

    // B. Variant product hole:
    setIsBuyNowAction(true);
    setSelectedProduct(product);
    setModalOpen(true);
  }

  // =========================
  // CONFIRM VARIANT ADD
  // =========================
  function handleConfirmVariant(selected) {
    dispatch(
      addItem({
        id: selectedProduct.id,
        product_id: selectedProduct.id, 

        slug: selectedProduct.slug,
        name: selectedProduct.name,
        image: selectedProduct.image || selectedProduct.thumbnail,

        price: Number(
          selected?.price ||
          selectedProduct.price?.final ||
          selectedProduct.price ||
          0
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

    if (isBuyNowAction) {
      setIsBuyNowAction(false);
      setSelectedProduct(null);
      navigate("/checkout");
    } else {
      setSelectedProduct(null);
    }
  }

  // 1. ডাটা ফেচ হওয়া পর্যন্ত স্কেলিটন লোডার দেখাবে
  if (loading) return <ProductSectionSkeleton />;

  // 2. লোডিং শেষে ব্যাকএন্ড থেকে প্রোডাক্ট না আসলে পুরো সেকশনটাই হাইড হয়ে যাবে
  if (!products || products.length === 0) return null;

  return (
    <section className="bg-[#f0f4f4] py-10 px-4">
      <h2 className="text-center text-3xl font-light text-gray-800 mb-8" style={{ fontFamily: "Georgia, serif" }}>
        {category?.category_name}
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white flex flex-col">
            <div className="relative">
              {product.badge && (
                <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 z-10">
                  {product.badge}
                </span>
              )}
              <img
                src={product.image || product.thumbnail}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="p-3 flex flex-col flex-1">
              <p className="text-xs text-gray-700 leading-snug mb-3 min-h-[2.5rem]">
                {product.name}
              </p>
              <p className="text-sm font-medium text-gray-800 mb-3">
                {product.price}
              </p>
              <div className="mt-auto flex flex-col gap-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full border border-gray-400 text-gray-800 text-sm py-2 hover:bg-gray-100 transition-colors">
                  Add To Cart
                </button>

                <button 
                  onClick={() => handleBuyNow(product)}
                  className="w-full bg-black text-white text-sm py-2 hover:bg-gray-800 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. প্রোডাক্ট ১ বা তার বেশি থাকলে তবেই কেবল View More বাটনটি রেন্ডার হবে */}
      {products.length > 0 && (
        <div className="flex justify-center mt-10">
          <Link
            to={`/category/${category?.category_slug || "kids"}`}
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
        onClose={() => {
          setModalOpen(false);
          setIsBuyNowAction(false);
        }}
        onConfirm={handleConfirmVariant}
      />
    </section>
  );
}