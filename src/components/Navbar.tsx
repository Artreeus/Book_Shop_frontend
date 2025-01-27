import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "./Logout";
import { RootState } from "../redux/store"; // Adjust the import based on your store setup

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
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.user); // Assuming user is stored in auth state
  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="shadow-lg">
      <div className="navbar container mx-auto pt-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-1">
          <Link className="flex items-center space-x-2" to="/">
            <img src="bLogo.png" alt="Logo" className="w-10 h-10" />
            <span className="text-2xl font-semibold">BookShopBD</span>
          </Link>
        </div>

        {/* Hamburger for small screens */}
        <div className="lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-2xl">
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
  <div
    className={`absolute top-16 left-0 right-0 bg-white shadow-lg p-4 lg:hidden text-center flex flex-col space-y-4 transition-transform duration-100 ease-in-out transform ${
      isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
    }`}
  >
    <ul className="space-y-4">
      <li>
        <Link to="/" className="hover:text-[#ED553B] transition">
          Home
        </Link>
      </li>
      <li>
        <Link to="/all-products" className="hover:text-[#ED553B] transition">
          All Products
        </Link>
      </li>
      <li>
        <Link to="/about" className="hover:text-[#ED553B] transition">
          About
        </Link>
      </li>
      {isLoggedIn ? (
        <>
          <li>
            <Link to="/checkout" className="hover:text-[#ED553B] transition">
              Checkout
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-[#ED553B] transition">
              Dashboard
            </Link>
          </li>
          <li>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
              <Logout />
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login" className="hover:text-[#ED553B] transition">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-[#ED553B] transition">
              Register
            </Link>
          </li>
        </>
      )}
    </ul>
  </div>
)}


        {/* Desktop Navbar Items */}
        <div className={`hidden lg:flex lg:space-x-6 items-center`}>
          <ul className="flex items-center space-x-8">
            <li>
              <Link to="/" className="hover:text-[#ED553B] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-products" className="hover:text-[#ED553B] transition">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#ED553B] transition">
                About
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/checkout" className="hover:text-[#ED553B] transition">
                    Checkout
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-[#ED553B] transition">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                    <Logout />
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-[#ED553B] transition">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-[#ED553B] transition">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Cart Dropdown */}
        <div className="flex items-center space-x-6 py-2 ps-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute top-0 right-0 bg-white text-black text-xs font-semibold rounded-full px-2 py-1 transform translate-x-1 translate-y-1">
                {totalItems}
              </span>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-72 shadow-lg rounded-lg"
            >
              <div className="card-body">
                {cart.length > 0 ? (
                  <>
                    <ul>
                      {cart.map((item) => (
                        <li
                          key={item.id}
                          className="flex justify-between items-center border-b py-2"
                        >
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p>${item.price.toFixed(2)}</p>
                          </div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover"
                          />
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 font-bold">
                      Total: ${totalPrice.toFixed(2)}
                    </p>
                    <div className="card-actions mt-4">
                      <Link to="/cart" className="btn btn-black btn-block">
                        View Cart
                      </Link>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-gray-500">Your cart is empty.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
