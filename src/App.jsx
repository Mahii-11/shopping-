import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import { getWebsiteSettings } from "./services/api"; 

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import ShopPage from "./pages/ShopPage";
import AuthPage from "./pages/AuthPage";
import OrderDetails from "./components/dashboard/OrderDetails";
import Featured from "./pages/Featured";
import ShowPage from "./pages/ShowPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { path: "/", element: <Home /> },
      { path: "/category/:slug", element: <CategoryPage /> },
      { path: "/product/:slug", element: <ProductDetail /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/dashboard", element: <Dashboard /> },  
      { path: "/shoppage", element: <ShopPage /> },
      { path: "/featured", element: <Featured /> },
      { path: "/login", element: <AuthPage /> },
      { path: "/order-details/:id", element: <OrderDetails /> },
      { path: "/show-page/:slug", element: <ShowPage /> }
    ],
  },
]);

export default function App() {
  const IMAGE_BASE_URL = "https://backend.thecaptainshop.com/";

  // 🧠 Favicon & Site Title dynamic করার গ্লোবাল লজিক
  useEffect(() => {
    const loadDynamicSettings = async () => {
      try {
        const res = await getWebsiteSettings();
        const data = res?.data || res;

        if (data) {
          // 1. Site Title ডায়নামিক করা ("THE CAPTAIN")
          if (data.site_name) {
            document.title = data.site_name;
          }

          // 2. index.html এর Favicon ডায়নামিক করা
          if (data.favicon) {
            const faviconElement = document.querySelector("link[rel='icon']");
            if (faviconElement) {
              faviconElement.type = "image/png";
              faviconElement.href = `${IMAGE_BASE_URL}${data.favicon}`;
            }
          }
        }
      } catch (error) {
        console.error("Error setting dynamic favicon:", error);
      }
    };

    loadDynamicSettings();
  }, []);

  return <RouterProvider router={router} />;
}