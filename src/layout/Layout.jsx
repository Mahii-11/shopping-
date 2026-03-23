import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20">
      <Navbar />
      <main className="grow">
       <Outlet/>
      </main>
      <Footer />
    </div>
  );
}