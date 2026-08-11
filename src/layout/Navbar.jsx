/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { ShoppingBag, Menu, X, Search, User, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { getTotalCartQuantity } from "../cart/cartSlice";
import { getNavMenu, getWebsiteSettings } from "../services/api";
import NavbarSkeleton from "../loading/NavbarSkeleton";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);

  const location = useLocation();
  const cartCount = useSelector(getTotalCartQuantity);
  const token = localStorage.getItem("token");
  
  const [isLoading, setIsLoading] = useState(true);
  const [siteSettings, setSiteSettings] = useState({
    logo: "",
    site_name: "",
  });

  const IMAGE_BASE_URL = "https://backend.thecaptainshop.com/"; 

  // Combined Data Fetching for Navbar & Settings
  useEffect(() => {
    const fetchAllNavbarData = async () => {
      try {
        setIsLoading(true);

        // API Call 1: Website Settings (Logo & Site Name)
        const settingsRes = await getWebsiteSettings();
        const settingsData = settingsRes?.data || settingsRes;

        if (settingsData) {
          setSiteSettings({
            logo: settingsData.logo ? `${IMAGE_BASE_URL}${settingsData.logo.replace(/\\/g, "/")}` : "",
            site_name: settingsData.site_name || "THE CAPTAIN",
          });
        }

        // API Call 2: Nav Menu
        const menuRes = await getNavMenu();
        const menuData = Array.isArray(menuRes) ? menuRes : menuRes?.menu_data || [];
        setMenuItems(menuData);

      } catch (error) {
        console.error("Error fetching navbar data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllNavbarData();
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu close + scroll to top on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
  };

  const toggleMobileSubmenu = (id) => {
    setOpenMobileSubmenu(openMobileSubmenu === id ? null : id);
  };

  if (isLoading) return <NavbarSkeleton />;

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
            ? "bg-background/90 backdrop-blur-lg shadow-sm py-3"
            : "bg-background py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-h-[38px]">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -ml-2 text-foreground/80 hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo & Site Name Section */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            {siteSettings.logo ? (
              <img
                src={siteSettings.logo}
                alt={siteSettings.site_name || "Logo"}
                className="h-9 sm:h-11 w-auto object-contain"
                onError={(e) => {
                  // Fallback in case image fails to load
                  e.target.style.display = 'none';
                }}
              />
            ) : null}

            <span className="font-extrabold text-[#01070c] font-serif tracking-tight text-lg md:text-xl uppercase">
              {siteSettings.site_name || "THE CAPTAIN"}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-sans font-medium tracking-wide">
            <Link to="/" className="hover:text-primary transition-colors">
              HOME
            </Link>

            {/* Dynamic Menu Items */}
            {menuItems.map((item) => {
              const hasSubcategories =
                item.active_sub_categories &&
                item.active_sub_categories.length > 0;

              return (
                <div key={item.id} className="relative group py-2">
                  <Link
                    to={`/category/${item.slug}`}
                    className="hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {item.name}
                    {hasSubcategories && (
                      <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Hover Dropdown Sub-menu */}
                  {hasSubcategories && (
                    <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-background shadow-lg border border-border/50 rounded-md py-2 min-w-[160px] z-50">
                      {item.active_sub_categories.map((sub) => (
                        <Link
                          key={sub.id}
                          to={`/category/${item.slug}/${sub.slug}`}
                          className="px-4 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <Link to="/shoppage" className="hover:text-primary transition-colors">
              Shop
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 md:gap-6 flex-1 md:flex-none justify-end">
            <Link to={token ? "/dashboard" : "/login"}>
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-foreground/80 hover:text-foreground transition-colors group"
            >
              <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </motion.div>

              {/* Badge */}
              <AnimatePresence mode="wait">
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-2 -right-2 bg-black text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
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
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-background shadow-2xl z-50 flex flex-col p-6 md:hidden overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-serif text-xl tracking-widest font-semibold uppercase">
                  {siteSettings.site_name || "THE CAPTAIN"}
                </span>
                <button onClick={closeMenu}>
                  <X className="w-6 h-6 text-foreground/60" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 font-sans text-base">
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="border-b border-border/50 pb-2 font-medium"
                >
                  Home
                </Link>

                {/* Dynamic Mobile Menu */}
                {menuItems.map((item) => {
                  const hasSubcategories =
                    item.active_sub_categories &&
                    item.active_sub_categories.length > 0;
                  const isOpen = openMobileSubmenu === item.id;

                  return (
                    <div key={item.id} className="border-b border-border/50 pb-2">
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/category/${item.slug}`}
                          onClick={closeMenu}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                        {hasSubcategories && (
                          <button
                            onClick={() => toggleMobileSubmenu(item.id)}
                            className="p-1"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Mobile Submenu Accordion */}
                      {hasSubcategories && isOpen && (
                        <div className="flex flex-col gap-2 mt-2 ml-4 text-sm text-foreground/70">
                          {item.active_sub_categories.map((sub) => (
                            <Link
                              key={sub.id}
                              to={`/category/${item.slug}/${sub.slug}`}
                              onClick={closeMenu}
                              className="py-1 hover:text-primary transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                <Link
                  to="/shoppage"
                  onClick={closeMenu}
                  className="border-b border-border/50 pb-2 font-medium"
                >
                  Shop
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}