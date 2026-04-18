import { useEffect, useState } from "react"
import { getCategoryWithProducts } from "../services/api";
import ProductSectionSkeleton from "../loading/ProductSectionSkeleton";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";

export default function OldMoneyShirt() {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();


  useEffect(() => {
    const loadWomen = async () => {
      try {
        setLoading(true);
        const res = await getCategoryWithProducts();
        const womenCategory = res.find((item) => item.category_slug === "women");
        if (womenCategory) {
          setCategory(womenCategory);
          setProducts(womenCategory.products.data);
        }
      } catch (error) {
        console.error("Error fetching women's products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadWomen();
  }, []);


 function handleAddToCart(product) {
  const newItem = {
    slug: product.slug || product.id,
    name: product.name,
    image: product.image || product.thumbnail,

    price: Number(product.price?.final || product.price || 0),

    variation_id: Number(product.variation_id || 0),
    color_id: Number(product.color_id || 0),
    size_id: Number(product.size_id || 0),

    color_name: product.color_name || "",
    size_name: product.size_name || "",

    quantity: Number(product.quantity || 1),

    type: product.type || "single",
  };

  dispatch(addItem(newItem));
}


  if (loading) return <ProductSectionSkeleton />;




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
                src={product.image}
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
                
                className="w-full bg-black text-white text-sm py-2 hover:bg-gray-800 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
        <div className="flex justify-center mt-10">
        <button className="relative inline-flex items-center gap-2 px-10 py-3 border-2 border-gray-800 text-gray-800 text-sm font-medium tracking-widest uppercase overflow-hidden group transition-all duration-300 hover:text-white">
          <span className="absolute inset-0 bg-gray-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          <span className="relative">View More</span>
          <span className="relative text-base leading-none">→</span>
        </button>
      </div>
    </section>
  )
}
