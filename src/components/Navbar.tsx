import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change this based on actual login logic

  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  return (
    <div className="shadow-lg">
      <div className="navbar container mx-auto p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-1">
          <Link className="flex items-center space-x-2" to="/">
            <img src="bLogo.png" alt="Logo" className="w-10 h-10" />
            <span className="text-2xl font-semibold">BookShopBD</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle (Hamburger Icon) */}
        <div className="lg:hidden flex items-center">
          <label htmlFor="my-drawer" className="text-2xl cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
        </div>

        {/* Desktop Navbar Items */}
        <div className="hidden lg:flex lg:space-x-6 items-center">
          <ul className="flex items-center space-x-8">
            <li>
              <Link to="/" className="hover:text-[#ED553B] transition">Home</Link>
            </li>
            <li>
              <Link to="/all-products" className="hover:text-[#ED553B] transition">All Products</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#ED553B] transition">About</Link>
            </li>

            {/* Conditionally render Checkout and Dashboard links */}
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/checkout" className="hover:text-[#ED553B] transition">Checkout</Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-[#ED553B] transition">Dashboard</Link>
                </li>
              </>
            )}

            {/* Login/Logout button */}
            {!isLoggedIn ? (
              <li>
                <Link to="/login" onClick={toggleLogin} className="hover:text-[#ED553B] transition">
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <button
                  onClick={toggleLogin}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>

          {/* Cart Icon */}
          <div className="flex items-center space-x-6 py-2 ps-2">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle relative">
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
                  0
                </span>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow-lg rounded-lg"
              >
                <div className="card-body">
                  <div className="card-actions">
                    <button className="btn btn-black btn-block">View cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DaisyUI Drawer for Mobile Menu */}
      <div>
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* This is a placeholder for the drawer content */}
        </div>

        {/* Sidebar (Drawer Content) */}
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              <Link to="/" className="hover:text-[#ED553B] transition">Home</Link>
            </li>
            <li>
              <Link to="/all-products" className="hover:text-[#ED553B] transition">All Products</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#ED553B] transition">About</Link>
            </li>


            {/* Conditionally render Checkout and Dashboard links */}
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/checkout" className="hover:text-[#ED553B] transition">Checkout</Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-[#ED553B] transition">Dashboard</Link>
                </li>
              </>
            )}

            {/* Login/Logout button */}
            {!isLoggedIn ? (
              <li>
                <Link to="/login" onClick={toggleLogin} className="hover:text-[#ED553B] transition">
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <button
                  onClick={toggleLogin}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </li>
            )}
            <li>
            <div className="flex items-center space-x-6 py-2 ps-2">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle relative">
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
                  0
                </span>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow-lg rounded-lg"
              >
                <div className="card-body">
                  <div className="card-actions">
                    <button className="btn btn-black btn-block">View cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
