import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-600 py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Company Name and Description */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-gray-800 text-lg font-semibold mb-2">
              Sonargaon Fibers
            </h3>
            <p className="text-gray-500">
              Providing the best travel and visa services for an exceptional
              customer experience.
            </p>
          </div>

          {/* Quick Links (Horizontally aligned) */}
          <div>
            <h3 className="text-gray-800 text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/"
                  className="text-gray-500 hover:text-gray-800 transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-500 hover:text-gray-800 transition duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/product"
                  className="text-gray-500 hover:text-gray-800 transition duration-300"
                >
                  Product
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-500 hover:text-gray-800 transition duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-6 border-t border-gray-300 pt-4 text-center">
          <p className="text-gray-500">
            © {currentYear} Sonargaon Fibers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
