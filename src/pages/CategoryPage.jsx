import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { getCategoryWithProducts } from "../services/api";
import CategoriesSkeleton from "../loading/CategoriesSkeleton";
import HeroBanner from "../components/HeroBanner";
import { useDispatch } from "react-redux";
import { isVariantValid } from "../utils/cartHelpers";
import { addItem } from "../cart/cartSlice";
import VariantModal from "../components/VariantModal";

const categoryBanners = {
  women: "/banners/women.png",
  men: "/banners/men1.png",
  kids: "/banners/kids.png",
  teen: "/banners/boy.png",
};

export default function CategoryPage() {
  const { slug } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bannerImage = categoryBanners[slug] || "/banners/default.jpg";

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const res = await getCategoryWithProducts();
        setData(res || []);
      } catch (error) {
        console.error("fetching category data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [slug]);

  const category = data.find((item) => item.category_slug === slug);
  const products = category?.products?.data || category?.products || [];

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
    // 🧠 If variant exists → open modal
    if (isVariantValid(product)) {
      setSelectedProduct(product);
      setModalOpen(true);
      return;
    }

    // 🧠 Direct add (single product)
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

  if (loading) return <CategoriesSkeleton />;

  return (
    <section className="bg-[#f0f4f4] py-10 px-4">
      <HeroBanner bannerImage={bannerImage} slug={slug} category={category} />

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