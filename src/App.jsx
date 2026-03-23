import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import  Layout  from "./layout/Layout";
import Home from "./pages/Home";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
        {path: "/", element: <Home/>}
    //  { path: "/category/c-shirt", element: <Shirts /> },
    //  { path: "/category/c-punjabi", element: <Punjabi /> },
    //  { path: "/category/c-pants", element: <Pants /> },
     // { path: "/category/c-sale", element: <Sale /> },
    ],
  },
]);








export default function App() {
  return <RouterProvider router={router} />
}
