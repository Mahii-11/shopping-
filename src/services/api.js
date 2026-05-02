import axios from "axios";
const BASE_URL = "https://shopping.gadgetglobe.com.bd/api/";
const TEST_URL = "https://backend.gadgetglobe.com.bd/api/"

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




// post api for login  / register



export const registerApi = async (data) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name.trim());
    formData.append("email", data.email.trim());
    formData.append("phone", data.phone.trim());
    formData.append("password", data.password);
    formData.append(
      "password_confirmation",
      data.password_confirmation
    );

    console.log("REGISTER PAYLOAD:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const res = await axios.post(`${TEST_URL}register-api`, formData);

    return res.data;
  } catch (error) {
    console.log("REGISTER ERROR:", error.response?.data);
    return error.response?.data || {
      status: false,
      message: "Server Error",
    };
  }
};

export const loginApi = async (email, password) => {
  try {
    const formData = new FormData();
    formData.append("email", email.trim());
    formData.append("password", password.trim());

    console.log("LOGIN PAYLOAD:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const response = await fetch(
      "https://backend.gadgetglobe.com.bd/api/store-login-api",
      {
        method: "POST",
        body: formData,
      }
    );

    const text = await response.text();
    console.log("RAW RESPONSE:", text);

    return JSON.parse(text);
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    throw error;
  }
};

export const logoutApi = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${TEST_URL}logout-api`,

  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
  }
  );

return await res.json();

};



// post api for upddating user profile


export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${TEST_URL}get-profile-details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;

  } catch (err) {
    console.error("Error fetching user profile:", err);
    return null;
  }
};

export const updateUserProfile = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${TEST_URL}update-user-profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const text = await res.text();
  console.log("RAW:", text);

  try {
    return JSON.parse(text);
  } catch {
    return { notification: text };
  }
};



// ✅ services/api.js

export const getUserOrders = async () => {
  try {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("userToken");

    const response = await fetch(
      "https://backend.gadgetglobe.com.bd/api/get-all-orders",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log("USER ORDERS RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch orders");
    }

    return data;
  } catch (error) {
    console.error("getUserOrders Error:", error);
    throw error;
  }
};




export const getSingleOrder = async (id) => {
  try {
    const token = localStorage.getItem("token"); 

    const response = await axios.get(
      `${TEST_URL}order-details/${id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching single order:", error.response?.data || error);

    return { success: false };
  }
};







