import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  ShoppingBag,
  ChevronDown,
  ChevronRight,
  Home,
  User,
  Phone,
  Info,
  Store,
  Sparkles,
  Flower2,
  Building2,
  Palette,
} from "lucide-react";
import logo from "@/assets/logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import product2 from "@/assets/product-2.jpg";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import CartSheet from "./CartSheet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const collections = [
    {
      name: "Statue Gods",
      icon: (
        <svg className="w-4.5 h-4.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L15 8L21 6L18 16H6L3 6L9 8L12 2Z" />
          <circle cx="12" cy="2" r="0.8" fill="currentColor" />
          <circle cx="3" cy="6" r="0.8" fill="currentColor" />
          <circle cx="21" cy="6" r="0.8" fill="currentColor" />
          <circle cx="12" cy="11" r="1.2" fill="currentColor" />
        </svg>
      ),
      subcategories: ["Lord Ganesh", "Lord Shiva", "Lord Vishnu", "Lord Krishna", "Lord Hanuman", "Lord Buddha"],
    },
    {
      name: "Statue Goddess",
      icon: (
        <svg className="w-4.5 h-4.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Central petal */}
          <path d="M12 3C12 3 9 10 12 21C15 10 12 3 12 3Z" strokeLinecap="round" strokeLinejoin="round" />
          {/* Left inner petal */}
          <path d="M12 10C9.5 7.5 5 11 12 21C19 11 14.5 7.5 12 10Z" strokeLinecap="round" strokeLinejoin="round" />
          {/* Right inner petal */}
          <path d="M12 14C8 13 4 16 12 21C20 16 16 13 12 14Z" strokeLinecap="round" strokeLinejoin="round" />
          {/* Outer base leaves */}
          <path d="M6 21C9 18 15 18 18 21" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      subcategories: ["Goddess Durga", "Goddess Lakshmi", "Goddess Saraswati", "Radha Rani"],
    },
    {
      name: "Temple & Mandir",
      icon: (
        <svg className="w-4.5 h-4.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 21H21" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 21V15H19V21" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 21V15" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 21V15" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 15C5 15 7 10 12 10C17 10 19 15 19 15" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 10C8 10 9 4 12 2C15 4 16 10 16 10H8Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 2V0.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 0.5H15L14 2.5H12" fill="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      subcategories: ["Home Mandir", "Pooja Mandir", "Wall Mounted Mandir"],
    },
    {
      name: "Decor Items",
      icon: (
        <svg className="w-4.5 h-4.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="4" width="16" height="16" rx="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 8V16" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 12H16" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 12C10 10 10 8 12 8C14 8 14 10 12 12Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 12C10 14 10 16 12 16C14 16 14 14 12 12Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 12C8 10 6 10 8 12C10 14 8 14 12 12Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 12C16 10 18 10 16 12C14 14 16 14 12 12Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      subcategories: ["Wall Murals", "Wall Panels", "Fountains", "Planters"],
    },
  ];

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/shop", icon: Store },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const isActive = (href: string) => location.pathname === href;

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-2"
        : "bg-background/40 backdrop-blur-sm border-transparent py-4"
        }`}
    >
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 -ml-2 text-foreground hover:text-primary transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="w-full max-h-[70vh] h-auto p-4 bg-white backdrop-blur-xl rounded-t-2xl shadow-xl">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3"></div>
          {/* Header with Logo */}
              <SheetHeader className="p-4 bg-gradient-to-r from-primary/10 to-transparent border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <SheetTitle className="text-left text-base font-semibold font-serif">Welcome</SheetTitle>
                    <p className="text-xs text-muted-foreground">Explore our luxury collections</p>
                  </div>
                </div>
              </SheetHeader>

              {/* Navigation Content */}
              <div className="flex flex-col h-[calc(100vh-80px)]">
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {/* Quick Links */}
                  <div className="p-3 mb-2 bg-white/10 rounded-lg border-b border-border">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${isActive(link.href)
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                          }`}
                      >
                        <link.icon className="w-5 h-5" />
                        <span className="text-sm">{link.name}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Collections Categories */}
                  <div className="p-2">
                    <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Collections
                    </p>
                    {collections.map((category) => (
                      <div key={category.name} className="mb-1">
                        <button
                          onClick={() => toggleCategory(category.name)}
                          className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-foreground bg-white/5 hover:bg-white/15 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                              {category.icon}
                            </div>
                            <span className="font-medium text-sm">{category.name}</span>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${expandedCategory === category.name ? "rotate-180" : ""
                              }`}
                          />
                        </button>

                        {/* Subcategories */}
                        <AnimatePresence>
                          {expandedCategory === category.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden ml-4 pl-6 border-l-2 border-primary/20 space-y-1"
                            >
                              {category.subcategories.map((sub) => (
                                <Link
                                  key={sub}
                                  to={`/shop?category=${encodeURIComponent(category.name)}&sub=${encodeURIComponent(sub)}`}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="flex items-center gap-2 py-2.5 px-3 text-sm text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                                >
                                  <ChevronRight className="w-3 h-3" />
                                  {sub}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}

                    {/* View All Link */}
                    <Link
                      to="/collections"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 mt-2 rounded-lg bg-primary/5 text-primary font-medium hover:bg-primary/10 transition-colors"
                    >
                      <Sparkles className="w-5 h-5" />
                      View All Collections
                    </Link>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="p-4 border-t border-border bg-muted/30">
                  <Link
                    to="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Phone className="w-4 h-4" />
                    Get Custom Quote
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 relative group">
            <img
              src={logo}
              alt="StoneAura Studio"
              className={`w-auto transition-all duration-300 ${isScrolled ? "h-10 md:h-12" : "h-12 md:h-16"}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium tracking-wide transition-colors duration-300 relative group ${isActive("/") ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
            >
              Home
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive("/") ? "w-full" : "w-0 group-hover:w-full"}`} />
            </Link>

            {/* Collections Mega Menu Trigger */}
            <div
              className="py-2"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <Link
                to="/shop"
                className={`text-sm font-medium tracking-wide transition-colors duration-300 relative group flex items-center gap-1 ${
                  isActive("/shop") || showDropdown ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                Collections
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showDropdown ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
              </Link>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 relative group ${isActive(link.href) ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            <CartSheet />
            <Link
              to="/contact"
              className={`hidden md:inline-flex items-center justify-center bg-gradient-gold text-primary-foreground px-6 rounded-full text-sm font-medium hover:shadow-gold hover:-translate-y-0.5 transition-all duration-300 ${isScrolled ? "py-2" : "py-2.5"}`}
            >
              Enquiry
            </Link>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
              className="absolute left-4 right-4 top-full mt-2 bg-white/95 backdrop-blur-xl border border-primary/10 rounded-[2.2rem] shadow-[0_45px_100px_rgba(0,0,0,0.12)] p-8 z-50 flex gap-8 hidden md:flex"
            >
              {/* Categories Grid - 4 Columns */}
              <div className="flex-1 grid grid-cols-4 gap-6">
                {collections.map((category) => (
                  <div
                    key={category.name}
                    className="p-4 rounded-2xl border border-transparent hover:border-primary/10 hover:bg-[#fdfaf5]/70 transition-all duration-300 space-y-4"
                  >
                    <div className="flex items-center gap-2.5 pb-2 mb-2 border-b border-border/40">
                      <div className="w-8 h-8 rounded-xl bg-primary/8 flex items-center justify-center text-primary shadow-sm">
                        {category.icon}
                      </div>
                      <h4 className="font-serif font-semibold text-[14px] tracking-wide text-foreground">{category.name}</h4>
                    </div>
                    <ul className="space-y-1">
                      {category.subcategories.map((sub) => (
                        <li key={sub}>
                          <Link
                            to={`/shop?category=${encodeURIComponent(category.name)}&sub=${encodeURIComponent(sub)}`}
                            onClick={() => setShowDropdown(false)}
                            className="group/item flex items-center justify-between text-[11px] font-medium text-muted-foreground hover:text-primary transition-all duration-300 py-1.5 px-2 rounded-lg hover:bg-white"
                          >
                            <span className="group-hover/item:translate-x-1 transition-transform duration-300">
                              {sub}
                            </span>
                            <ChevronRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all duration-300 text-primary" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Featured Section */}
              <div className="w-[280px] shrink-0 flex flex-col justify-between pl-6 border-l border-border/50">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary block">Featured Spotlight</span>
                  <div className="relative rounded-[1.5rem] overflow-hidden group shadow-lg border border-white/40 aspect-[4/3] bg-primary/5">
                    <img
                      src={product2}
                      alt="Featured Collection"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent flex flex-col justify-end p-4">
                      <span className="inline-flex self-start rounded-full bg-primary/95 px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-primary-foreground mb-1.5 shadow-sm">
                        Best Seller
                      </span>
                      <h4 className="text-white font-serif text-sm font-semibold leading-tight">Radha Krishna Eternal Love</h4>
                      <p className="text-white/80 text-[9px] mt-0.5 leading-normal font-light">Pure Alwar white marble handcarved idol</p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/shop"
                  onClick={() => setShowDropdown(false)}
                  className="group/btn flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold shadow-soft hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:rotate-12" />
                  View All Masterpieces
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;

