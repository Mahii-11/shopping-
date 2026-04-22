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
    console.log("=== FORM DATA DEBUG ===");
    // Debugging loop to see what exactly is being sent
    for (let pair of orderData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    const response = await fetch(`${BASE_URL}store-order`, {
      method: "POST",
      headers: {
        // 'Content-Type' manually set korbe na, faka rakhbe.
        // Sudhu 'Accept' header ta thakbe jate server JSON response dey.
        "Accept": "application/json",
      },
      body: orderData, // FormData object directly jachche
    });

    console.log("STATUS:", response.status);

    const text = await response.text();
    console.log("SERVER RESPONSE RAW:", text);

    // Error handling with parsing check
    if (!response.ok) {
        // Jodi status 422 ba 500 hoy, error message ta throw korbe
        const errorData = text ? JSON.parse(text) : { msg: "Server Error" };
        return { success: false, ...errorData };
    }

    return text ? JSON.parse(text) : { success: false };
  } catch (error) {
    console.error("Error in createOrder:", error);
    // UI te error message show korar jonno object return koro
    return { success: false, msg: "Network or Server Error" };
  }
}