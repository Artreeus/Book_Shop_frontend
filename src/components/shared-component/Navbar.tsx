import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  Menu, X, ShoppingCart, Home, Package, Info, LogOut, 
  LayoutDashboard, Phone, Bell, 
  Newspaper
} from "lucide-react";
import { RootState } from "../../redux/store";
import Logout from "./Logout";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface NavbarProps {
  cart: CartItem[];
}

const Navbar = ({ cart }: NavbarProps) => {
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.user);
  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if click is outside mobile menu and menu button
      if (isMobileMenuOpen && 
          !target.closest('.mobile-menu-container') && 
          !target.closest('.mobile-menu-dropdown')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  // Close cart when mobile menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsCartOpen(false);
    }
  }, [isMobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsCartOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-lg shadow-lg" 
          : "bg-white shadow-md"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center transform transition-transform duration-200 hover:scale-105">
                <img
                  src="https://i.ibb.co.com/6RGzpwZ/erasebg-transformed-resized-679904588a746.webp"
                  alt="BookShopBD Logo"
                  className="h-20 sm:h-24 md:h-26 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation - Hidden on xl and below, shown on xl and above */}
            <div className="hidden xl:flex items-center space-x-6">
              {/* Main Navigation Links */}
              <div className="flex items-center space-x-2">
                <Link
                  to="/"
                  className="group flex items-center gap-2 px-4 py-2 rounded-lg text-[#393280] font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:shadow-md hover:scale-105"
                >
                  <Home className="w-4 h-4 group-hover:animate-bounce" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/all-products"
                  className="group flex items-center gap-2 px-4 py-2 rounded-lg text-[#393280] font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:shadow-md hover:scale-105"
                >
                  <Package className="w-4 h-4 group-hover:animate-bounce" />
                  <span>All Products</span>
                </Link>
                <Link
                  to="/about"
                  className="group flex items-center gap-2 px-4 py-2 rounded-lg text-[#393280] font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:shadow-md hover:scale-105"
                >
                  <Info className="w-4 h-4 group-hover:animate-bounce" />
                  <span>About Us</span>
                </Link>
                <Link
                  to="/contact"
                  className="group flex items-center gap-2 px-4 py-2 rounded-lg text-[#393280] font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:shadow-md hover:scale-105"
                >
                  <Phone className="w-4 h-4 group-hover:animate-bounce" />
                  <span>Contact</span>
                </Link>
                <Link
                  to="/blogs"
                  className="group flex items-center gap-2 px-4 py-2 rounded-lg text-[#393280] font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:shadow-md hover:scale-105"
                >
                  <Newspaper className="w-4 h-4 group-hover:animate-bounce" />
                  <span>Blogs</span>
                </Link>
              </div>

              {/* Auth Navigation */}
              <div className="flex items-center space-x-3">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="group flex items-center gap-2 px-4 py-2 rounded-lg text-[#393280] font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:shadow-md hover:scale-105"
                    >
                      <LayoutDashboard className="w-4 h-4 group-hover:animate-bounce" />
                      <span>Dashboard</span>
                    </Link>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                      <LogOut className="w-4 h-4" />
                      <Logout />
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                    >
                      Register
                    </Link>
                  </>
                )}

                {/* Notification Bell (for logged in users) */}
                {isLoggedIn && (
                  <button className="p-2 relative hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="w-5 h-5 text-[#393280]" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                )}

                {/* Cart Icon */}
                <div className="relative">
                  <button 
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    onMouseEnter={() => setIsCartOpen(true)}
                    className="p-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-200 relative group"
                  >
                    <ShoppingCart className="h-6 w-6 text-[#393280] group-hover:animate-bounce" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                        {totalItems}
                      </span>
                    )}
                  </button>

                  {/* Cart Dropdown */}
                  <div 
                    onMouseLeave={() => setIsCartOpen(false)}
                    className={`absolute right-0 mt-2 w-96 bg-white/98 rounded-xl shadow-2xl border border-purple-100 transform transition-all duration-300 ${
                      isCartOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-purple-600" />
                        Shopping Cart
                      </h3>
                      {cart.length > 0 ? (
                        <>
                          <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
                            {cart.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-purple-50/50 to-blue-50/50 transform transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                />
                                <div className="flex-1">
                                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                                    {item.name}
                                  </h3>
                                  <p className="text-sm font-bold text-purple-600">
                                    ${item.price.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-purple-100">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-lg font-semibold text-gray-900">Total</span>
                              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                ${totalPrice.toFixed(2)}
                              </span>
                            </div>
                            <Link
                              to="/cart"
                              onClick={() => setIsCartOpen(false)}
                              className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02] text-center shadow-lg"
                            >
                              View Cart & Checkout
                            </Link>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500 font-medium">Your cart is empty</p>
                          <Link
                            to="/all-products"
                            onClick={() => setIsCartOpen(false)}
                            className="inline-block mt-4 text-purple-600 hover:text-purple-800 font-medium transition-colors"
                          >
                            Start Shopping →
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tablet Navigation - Show minimal nav for lg screens */}
            <div className="hidden lg:flex xl:hidden items-center space-x-4">
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  className="p-2 rounded-lg text-[#393280] hover:bg-purple-50 transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5" />
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                >
                  Login
                </Link>
              )}
              
              {/* Cart Icon for tablet */}
              <Link to="/cart" className="p-2 relative">
                <ShoppingCart className="h-6 w-6 text-[#393280]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              {/* Menu Toggle for tablet */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="mobile-menu-container p-2 rounded-lg text-[#393280] hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 focus:outline-none transition-all duration-200"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 transition-transform duration-200" />
                ) : (
                  <Menu className="h-6 w-6 transition-transform duration-200" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button - Show for md and below */}
            <div className="flex items-center gap-3 lg:hidden">
              {/* Mobile Cart Icon */}
              <Link to="/cart" className="p-2 relative">
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-[#393280]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              {/* Menu Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="mobile-menu-container p-2 rounded-lg text-[#393280] hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 focus:outline-none transition-all duration-200"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Show for xl and below when menu is open */}
        <div
          className={`xl:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-2 bg-gradient-to-b from-white to-purple-50/30 border-t border-purple-100">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#393280] font-medium hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 transition-all duration-200"
            >
              <Home className="w-5 h-5" />
              Home
            </Link>
            <Link
              to="/all-products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#393280] font-medium hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 transition-all duration-200"
            >
              <Package className="w-5 h-5" />
              All Products
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#393280] font-medium hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 transition-all duration-200"
            >
              <Info className="w-5 h-5" />
              About Us
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#393280] font-medium hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              Contact
            </Link>
            <Link
              to="/blogs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#393280] font-medium hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 transition-all duration-200"
            >
              <Newspaper className="w-5 h-5" />
              Blogs
            </Link>
            
            {/* Mobile Cart Summary */}
            <Link
              to="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-lg bg-gradient-to-r from-purple-100 to-blue-100 text-[#393280] font-medium"
            >
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
              </div>
              {totalItems > 0 && (
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                  {totalItems} items • ${totalPrice.toFixed(2)}
                </span>
              )}
            </Link>

            <div className="pt-2 border-t border-purple-100">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#393280] font-medium hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 transition-all duration-200"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </Link>
                  <div className="px-4 py-2">
                    <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200">
                      <LogOut className="w-4 h-4" />
                      <Logout />
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-2 px-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 text-center"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 sm:h-20"></div>
    </>
  );
};

export default Navbar;