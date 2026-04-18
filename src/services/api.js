const BASE_URL = "https://shopping.gadgetglobe.com.bd/api/";

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

// Fetch product details by slug
// Fetch product details by slug
export const getProductDetailsBySlug = async (slug) => {
  if (!slug) throw new Error("Slug is required");

  try {
    const res = await fetch(`${BASE_URL}product-details/${slug}`);

    // ✅ IMPORTANT: HTTP error handling
    if (!res.ok) {
      throw new Error(`HTTP Error! Status: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      throw new Error("Invalid response type from API");
    }

    const data = await res.json();

    if (!data?.product) {
      throw new Error("Product not found or invalid response structure");
    }

    return data;
  } catch (error) {
    console.error("getProductDetailsBySlug error:", error.message);
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

