import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Use NavLink for active link styling
import Logo from "../assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false); // Close the mobile menu when a link is clicked
  };

  return (
    <nav className="bg-white bg-opacity-70 backdrop-blur-md border-gray-200 fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
          onClick={handleMobileLinkClick}
        >
          <img src={Logo} className="h-8" alt="Logo" />
        </NavLink>

        {/* Mobile menu button (visible below 1024px width) */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-dropdown"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } w-full lg:flex lg:w-auto`}
          id="navbar-dropdown"
        >
          <ul className="flex flex-col font-medium p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 items-center">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 rounded lg:bg-transparent lg:p-0 font-bold text-blue-700 border-b-2 border-blue-700"
                    : "block py-2 px-3 rounded lg:bg-transparent lg:p-0 text-gray-900"
                }
                aria-current="page"
                onClick={handleMobileLinkClick} // Close menu when clicked
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 text-gray-900 rounded lg:bg-transparent lg:p-0 font-bold text-blue-700 border-b-2 border-blue-700"
                    : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0"
                }
                onClick={handleMobileLinkClick} // Close menu when clicked
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/product"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 text-gray-900 rounded lg:bg-transparent lg:p-0 font-bold text-blue-700 border-b-2 border-blue-700"
                    : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0"
                }
                onClick={handleMobileLinkClick} // Close menu when clicked
              >
                Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 text-gray-900 rounded lg:bg-transparent lg:p-0 font-bold text-blue-700 border-b-2 border-blue-700"
                    : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0"
                }
                onClick={handleMobileLinkClick} // Close menu when clicked
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
