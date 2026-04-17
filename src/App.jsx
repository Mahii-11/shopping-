import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import  Layout  from "./layout/Layout";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
        {path: "/", element: <Home />},
        {path: "/category/:slug", element: < CategoryPage /> },
        {path: "/product-detail", element: <ProductDetail /> },
        {path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
    //  { path: "/category/c-pants", element: <Pants /> },
     // { path: "/category/c-sale", element: <Sale /> },
    ],
  },
]);








export default function App() {
  return <RouterProvider router={router} />
}
