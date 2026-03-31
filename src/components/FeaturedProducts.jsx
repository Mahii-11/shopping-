import { Link } from "react-router";

const products = [
  {
    id: 1,
    name: "White Color - Full Sleeve Designed Fabric",
    price: "BDT 899",
    badge: "Save 251 BDT",
    image: "/images/product-1.png",
  },
  {
    id: 2,
    name: "Full Sleeve Pocketless Check Shirt - SCS05",
    price: "BDT 850",
    badge: null,
    image: "/images/product-2.png",
  },
  {
    id: 3,
    name: "Full Sleeve Pocketless Check Shirt - SCS02",
    price: "BDT 850",
    badge: null,
    image: "images/product-3.png",
  },
  {
    id: 4,
    name: "Cuban Collar Half Sleeve Shirt - SHS02",
    price: "BDT 850",
    badge: null,
    image: "/images/product-4.png",
  },
   {
    id: 4,
    name: "Cuban Collar Half Sleeve Shirt - SHS02",
    price: "BDT 850",
    badge: null,
    image: "/images/product-5.png",
  },
   {
    id: 4,
    name: "Cuban Collar Half Sleeve Shirt - SHS02",
    price: "BDT 850",
    badge: null,
    image: "/images/product-6.png",
  },
   {
    id: 4,
    name: "Cuban Collar Half Sleeve Shirt - SHS02",
    price: "BDT 850",
    badge: null,
    image: "/images/product-7.png",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-[#f0f4f4] py-10 px-4">
      <h2 className="text-center text-3xl font-light text-gray-800 mb-8" style={{ fontFamily: "Georgia, serif" }}>
        Featured Products
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
                <button className="w-full border border-gray-400 text-gray-800 text-sm py-2 hover:bg-gray-100 transition-colors">
                  Add To Cart
                </button>
               <Link to="/product-detail" className="w-full">
                <button className="w-full bg-black text-white text-sm py-2 hover:bg-gray-800 transition-colors">
                  Buy Now
                </button>
               </Link>
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
  );
}
