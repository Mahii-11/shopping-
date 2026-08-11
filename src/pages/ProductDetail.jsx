/* eslint-disable no-unused-vars */
import { Button } from "../components/ui/button";
import { useParams, Link, useNavigate } from "react-router";
import {
  ShoppingBag,
  ChevronRight,
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
import Swal from "sweetalert2";

export default function ProductDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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

        setSelectedImage(p.thumbnail || "/images/motorola.png");

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

  const regularPrice = Number(product?.price?.regular) || 0;

  // Helper method to create formatted item payload
  const createCartPayload = (item) => {
    if (!item) return null;

    if (item?.variations?.length > 0 && !selectedVariation) {
      Swal.fire({
        icon: "warning",
        title: "Please select a size",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
      return null;
    }

    if (item?.colors?.length > 0 && !selectedColor) {
      Swal.fire({
        icon: "warning",
        title: "Please select a color",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
      return null;
    }

    const price =
      item?.variations?.length > 0 && selectedVariation
        ? selectedVariation.price
        : item?.price?.final || item?.price?.offer || 0;

    return {
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
  };

  const handleAddToCart = (item) => {
    const cartItem = createCartPayload(item);
    if (!cartItem) return;

    dispatch(addItem(cartItem));

    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleBuyNow = (item) => {
    const cartItem = createCartPayload(item);
    if (!cartItem) return;

    // Add item to cart state and immediately redirect
    dispatch(addItem(cartItem));
    navigate("/checkout");
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  const accordions = [
    {
      id: "desc",
      title: "PRODUCT DETAILS",
      content: (
        <div
          className="text-sm text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: product.description || "No description available.",
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

          {/* Left - Visual Gallery */}
          <div className="w-full md:w-[55%]">
            <div className="relative aspect-[3/4] bg-muted overflow-hidden mb-4 rounded-xl">

              {product?.isNew && (
                <span className="absolute top-4 left-4 z-10 bg-foreground text-background text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest">
                  New
                </span>
              )}

              <img
                src={selectedImage || product?.thumbnail}
                alt={product?.name || "product"}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button className="w-9 h-9 rounded-full bg-background/80 flex items-center justify-center shadow hover:bg-background transition">
                  <Heart className="w-4 h-4" />
                </button>

                <button className="w-9 h-9 rounded-full bg-background/80 flex items-center justify-center shadow hover:bg-background transition">
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
                        ${
                          isSelected
                            ? "scale-105 ring-2 ring-zinc-900"
                            : "opacity-60 hover:opacity-100 hover:scale-105"
                        }
                      `}
                    >
                      {isSelected && (
                        <div className="absolute inset-0 bg-black/10" />
                      )}

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

          {/* Right - Product Details */}
          <div className="w-full md:w-[45%] flex flex-col">
            <div className="flex flex-col gap-6">

              <div className="space-y-6">

                {/* Title */}
                <div className="space-y-3">
                  <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-zinc-900 leading-tight">
                    {product.name}
                  </h1>
                </div>

                {/* Meta Info Grid */}
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
                  ৳{finalPrice.toLocaleString()}
                </span>

                {regularPrice > finalPrice && (
                  <span className="line-through text-gray-400 text-lg">
                    ৳{regularPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Color Selection */}
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
                            ? "ring-2 ring-green-700 ring-offset-2 scale-110"
                            : "border-gray-300 hover:scale-105"
                        }`}
                        style={{ backgroundColor: c.code }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Variations */}
              {product?.variations?.length > 0 && (
                <div>
                  <p className="text-sm font-semibold uppercase mb-2">Size:</p>
                  <div className="flex flex-wrap gap-3">
                    {product.variations.map((variation) => (
                      <button
                        key={variation.id}
                        onClick={() => setSelectedVariation(variation)}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                          selectedVariation?.id === variation.id
                            ? "border-green-700 text-green-700 bg-green-50 shadow-sm"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {variation.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Short Description */}
              {product?.short_description && (
                <div className="bg-gray-50 rounded-xl p-4 border">
                  <div
                    className="text-sm text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: product.short_description,
                    }}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={() => handleAddToCart(product)}
                  variant="outline"
                  className="flex-1 h-12 border-zinc-900 text-zinc-900 hover:bg-zinc-100 cursor-pointer font-semibold text-base"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>

                <Button
                  onClick={() => handleBuyNow(product)}
                  className="flex-1 h-12 bg-black hover:bg-zinc-800 text-white cursor-pointer font-semibold text-base"
                >
                  Buy Now
                </Button>
              </div>

              {/* Accordions */}
              <div className="divide-y border-t pt-4">
                {accordions.map((acc) => (
                  <div key={acc.id}>
                    <button
                      onClick={() =>
                        setOpenAccordion(
                          openAccordion === acc.id ? null : acc.id
                        )
                      }
                      className="w-full flex justify-between items-center py-4 text-left"
                    >
                      <span className="text-sm font-semibold">
                        {acc.title}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
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
                          <div className="pb-4">{acc.content}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h3 className="text-xl font-bold mb-6">You May Also Like</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {relatedProducts.map((item) => (
                <div key={item.id} className="bg-[#FCF8F8] rounded-xl overflow-hidden border flex flex-col group hover:shadow-md transition">
                  <Link to={`/product/${item.slug}`}>
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      {item.badge && (
                        <span className="absolute top-2 left-2 bg-black text-white text-[10px] uppercase font-bold px-2 py-1 z-10">
                          {item.badge}
                        </span>
                      )}
                      <img
                        src={item.image || item.thumbnail}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <p className="text-xs text-gray-800 font-medium line-clamp-2 min-h-[2.5rem]">
                        {item.name}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-black font-semibold text-base">
                          ৳{Number(item.price?.final || 0).toLocaleString()}
                        </span>
                        {item.price?.regular && (
                          <span className="text-gray-400 text-xs line-through">
                            ৳{Number(item.price?.regular).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </>
  );
}