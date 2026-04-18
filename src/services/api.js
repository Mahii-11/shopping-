const BASE_URL = "https://shopping.gadgetglobe.com.bd/api/";
//const URL = "https://backend.gadgetglobe.com.bd/api/";
// 🔹 Normalize data (main magic)
const normalizeData = (res) => {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.data?.data)) return res.data.data;

  return [];
};
// 🔹 Handle error nicely
const handleError = async (res) => {
  let message = "Something went wrong";

  try {
    const errorData = await res.json();
    message = errorData?.message || message;
  } catch (e) {
     console.error("Error parsing error response:", e);
  }

  throw new Error(message);
};

// 🔹 Main fetch function
export const fetchData = async (endpoint, options = {}) => {
  const { method = "GET", body, headers = {}, raw = false } = options;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    await handleError(res);
  }

  const json = await res.json();

  return raw ? json : normalizeData(json);
};




export const getHeroSectionData = () => fetchData("slider-data");
export const getCategory = () => fetchData("shop-by-category-data");
export const getFeaturedProduct = () => fetchData("featured-product-data");
export const getCategoryWithProducts = () => fetchData("popular-products");


// ===============================
// 📦 PRODUCT DETAILS API
// ===============================

export const getProductDetails = async (slug) => {
  if (!slug) throw new Error("Product slug is required");

  try {
    const res = await fetch(`${BASE_URL}product-details/${slug}`);

    if (!res.ok) {
      await handleError(res);
    }

    const json = await res.json();

    const product = json?.product || {};

    // ✅ SAFE NORMALIZATION (NO MISSING KEYS ANYMORE)
    return {
      product: {
        id: product?.id ?? null,
        name: product?.name ?? "",
        slug: product?.slug ?? "",
        sku: product?.sku ?? "",

        description: product?.description ?? "",
        short_description: product?.short_description ?? "",

        // 💰 PRICE SAFE MAP (IMPORTANT)
        price: {
          regular: product?.price?.regular ?? 0,
          offer: product?.price?.offer ?? 0,
          final: product?.price?.final ?? 0,
          discount: product?.price?.discount ?? 0,
          currency: product?.price?.currency ?? "BDT",
        },

        // 🏷 BRAND (FIXED)
        brand: {
          id: product?.brand?.id ?? null,
          name: product?.brand?.name ?? "Unknown Brand",
        },

        category: product?.category ?? null,
        sub_category: product?.sub_category ?? null,

        thumbnail: product?.thumbnail ?? "",
        gallery: product?.gallery ?? [],

        variations: product?.variations ?? [],
        colors: product?.colors ?? [],

        stock: {
          quantity: product?.stock?.quantity ?? 0,
          in_stock: product?.stock?.in_stock ?? false,
        },

        rating: {
          total_reviews: product?.rating?.total_reviews ?? 0,
          average: product?.rating?.average ?? 0,
        },

        views: product?.views ?? 0,
      },

      related_products: json?.related_products ?? [],
    };
  } catch (error) {
    console.error("Product details fetch error:", error);
    throw error;
  }
};
//Post api

export async function createOrder(orderData) {
  try {
    const response = await fetch(`${URL}store-order`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: orderData,
    });

    console.log("STATUS:", response.status);

    const text = await response.text();
    console.log("SERVER RESPONSE:", text);

    if (!text) {
      return { success: false, msg: "Empty response from server" };
    }

    return JSON.parse(text);

  } catch (error) {
    console.error("Error in createOrder:", error);
    throw error;
  }
}

