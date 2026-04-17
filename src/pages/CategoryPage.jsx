import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getCategoryWithProducts } from "../services/api";
import CategoriesSkeleton from "../loading/CategoriesSkeleton";
import HeroBanner from "../components/HeroBanner";


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
  const bannerImage = categoryBanners[slug] || "/banners/default.jpg";

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const res = await getCategoryWithProducts();
        setData(res);
      } catch (error) {
        console.error("fetching category data", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCategory();

  }, [])


  const category = data.find(
    (item) => item.category_slug === slug
  );

  const products = category?.products?.data || [];

  if (loading) return <CategoriesSkeleton />

  return (
    <section className="bg-[#f0f4f4] py-10 px-4">

       <HeroBanner bannerImage={bannerImage} slug={slug} category={category} />

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 py-6">

        {products.map((product) => (
          <div key={product.id} className="bg-white flex flex-col">

            {/* Image */}
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

            {/* Content */}
            <div className="p-3 flex flex-col flex-1">

              <p className="text-xs text-gray-700 leading-snug mb-3 min-h-[2.5rem]">
                {product.name}
              </p>

              <p className="text-sm font-medium text-gray-800 mb-3">
                ৳ {product.price}
              </p>

              {/* Buttons */}
              <div className="mt-auto flex flex-col gap-2">

                <button className="w-full border border-gray-400 text-gray-800 text-sm py-2 hover:bg-gray-100 transition-colors">
                  Add To Cart
                </button>

                <Link to={`/product/${product.slug}`} className="w-full">
                  <button className="w-full bg-black text-white text-sm py-2 hover:bg-gray-800 transition-colors">
                    Buy Now
                  </button>
                </Link>

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* View More */}
      <div className="flex justify-center mt-10">
        <button className="relative inline-flex items-center gap-2 px-10 py-3 border-2 border-gray-800 text-gray-800 text-sm font-medium tracking-widest uppercase overflow-hidden group transition-all duration-300 hover:text-white">

          <span className="absolute inset-0 bg-gray-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />

          <span className="relative">View More</span>
          <span className="relative text-base leading-none">→</span>

        </button>
      </div>

    </section>
  );
}