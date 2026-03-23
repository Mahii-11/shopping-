/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { ShoppingBag, Menu, X, Search, User, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu close + scroll to top on route change
  useEffect(() => {
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      window.scrollTo(0, 0);
    }, 0);
  }, [location]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Top Announcement */}
      <div className="bg-foreground text-background text-xs font-sans font-medium py-2 px-4 text-center flex justify-center items-center gap-2">
        <span>FREE SHIPPING ON ORDERS OVER ৳5000</span>
        <ArrowRight className="w-3 h-3" />
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -ml-2 text-foreground/80 hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-2xl tracking-widest font-semibold flex-1 md:flex-none text-center md:text-left"
          >
            SAVIOR
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-sans font-medium tracking-wide">
            <Link to="/" className="hover:text-primary transition-colors">NEW</Link>
            <Link to="/category/c-shirt" className="hover:text-primary transition-colors">SHIRTS</Link>
            <Link to="/category/c-punjabi" className="hover:text-primary transition-colors">PUNJABI</Link>
            <Link to="/category/c-pants" className="hover:text-primary transition-colors">PANTS</Link>
            <Link to="/category/c-sale" className="text-destructive hover:text-destructive/80 transition-colors">SALE</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-6 flex-1 md:flex-none justify-end">
            <button className="text-foreground/80 hover:text-foreground hidden sm:block">
              <Search className="w-5 h-5" />
            </button>

            <button className="text-foreground/80 hover:text-foreground hidden sm:block">
              <User className="w-5 h-5" />
            </button>

            {/* Static Cart */}
            <Link
              to="/cart"
              className="relative text-foreground/80 hover:text-foreground transition-colors group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-background shadow-2xl z-50 flex flex-col p-6 md:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-serif text-xl tracking-widest font-semibold">SAVIOR</span>
                <button onClick={closeMenu}>
                  <X className="w-6 h-6 text-foreground/60" />
                </button>
              </div>

              <nav className="flex flex-col gap-6 text-lg font-serif">
                <Link to="/" onClick={closeMenu} className="border-b border-border/50 pb-2">Home</Link>
                <Link to="/category/c-shirt" onClick={closeMenu} className="border-b border-border/50 pb-2">Shirts</Link>
                <Link to="/category/c-punjabi" onClick={closeMenu} className="border-b border-border/50 pb-2">Punjabi</Link>
                <Link to="/category/c-pants" onClick={closeMenu} className="border-b border-border/50 pb-2">Pants</Link>
                <Link to="/category/c-sale" onClick={closeMenu} className="text-destructive border-b border-border/50 pb-2">Sale</Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}