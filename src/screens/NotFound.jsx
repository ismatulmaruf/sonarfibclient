import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  // Dynamically set the title of the page
  useEffect(() => {
    document.title = "404 - Page Not Found";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      {/* 404 Error */}
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>

      {/* Page not found message */}
      <h2 className="text-3xl font-semibold text-gray-600 mb-8">
        Page Not Found
      </h2>

      {/* Short message */}
      <p className="text-gray-500 mb-6">
        Oops! The page you're looking for doesn't exist or may have been moved.
      </p>

      {/* Helpful links */}
      <div className="mb-6">
        <p className="text-gray-500">
          Here are some helpful links to get you back on track:
        </p>
        <ul className="text-blue-500 mt-4">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">
              Contact Support
            </Link>
          </li>
        </ul>
      </div>

      {/* Call to action button */}
      <Link
        to="/"
        className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
