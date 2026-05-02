import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import  Layout  from "./layout/Layout";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import ShopPage from "./pages/ShopPage";
import AuthPage from "./pages/AuthPage";
import OrderDetails from "./components/dashboard/OrderDetails";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
        {path: "/", element: <Home />},
        {path: "/category/:slug", element: < CategoryPage /> },
        { path: "/product/:slug", element: <ProductDetail /> },
        {path: "/cart", element: <Cart /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/dashboard", element: <Dashboard/> },  
        { path: "/shoppage", element: <ShopPage /> },
        {
        path: "/dashboard",
        element: <Dashboard/>
      },

       {
        path: "/login",
        element: <AuthPage/>
      },

       { 
        path: "/order-details/:id",
        element: <OrderDetails />
      },


    ],
  },
]);








export default function App() {
  return <RouterProvider router={router} />
}
