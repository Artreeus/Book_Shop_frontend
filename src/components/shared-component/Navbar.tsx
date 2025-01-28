import  { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X, ShoppingCart } from "lucide-react";
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

  return (
    <nav className="bg-white shadow-md  w-full top-0 z-50 p-4 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="https://i.ibb.co.com/ykBMBBv/sample-logo-1-1.png"
                alt="Logo"
              />
              <span className="text-lg sm:text-2xl  text-[#393280] font-bold">
                BookShopBD
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-6">
              <Link
                to="/"
                className="text-[#393280] font-fold    hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/all-products"
                className="text-[#393280] font-fold    hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                All Products
              </Link>
              <Link
                to="/about"
                className="text-[#393280] font-fold    hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </Link>
            </div>

            {/* Auth Navigation */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/checkout"
                    className="text-[#393280] font-fold    hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Checkout
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-[#393280] font-fold    hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    <Logout />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Cart Dropdown */}
            <div className="relative group">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                <ShoppingCart className="h-6 w-6 text-[#393280]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs  rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Cart Dropdown Content */}
              <div className="hidden group-hover:block absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100">
                <div className="p-4">
                  {cart.length > 0 ? (
                    <>
                      <div className="max-h-64 overflow-y-auto">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-4 py-3 border-b border-gray-100"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <h3 className="text-sm font-medium text-gray-900">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between font-medium text-gray-900">
                          <span>Total</span>
                          <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <Link
                          to="/cart"
                          className="mt-4 w-full bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors inline-block text-center"
                        >
                          View Cart
                        </Link>
                      </div>
                    </>
                  ) : (
                    <p className="text-center text-gray-500 py-4">
                      Your cart is empty
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-[#393280] font-fold    hover:bg-gray-100 focus:outline-none transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 transition-transform duration-200 ease-in-out" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-200 ease-in-out" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with smooth animation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#393280] font-fold    hover:text-orange-600 hover:bg-gray-50 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/all-products"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#393280] font-fold    hover:text-orange-600 hover:bg-gray-50 transition-colors"
          >
            All Products
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#393280] font-fold    hover:text-orange-600 hover:bg-gray-50 transition-colors"
          >
            About
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/checkout"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#393280] font-fold    hover:text-orange-600 hover:bg-gray-50 transition-colors"
              >
                Checkout
              </Link>
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#393280] font-fold    hover:text-orange-600 hover:bg-gray-50 transition-colors"
              >
                Dashboard
              </Link>
              <div className="px-3 py-2">
                <button className="w-full bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors">
                  <Logout />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#393280] font-fold    hover:text-orange-600 hover:bg-gray-50 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#393280] font-fold    hover:text-orange-600 hover:bg-gray-50 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
