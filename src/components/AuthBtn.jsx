import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice"; // Ensure this path is correct
import { logout } from "../slices/authSlice"; // Adjust this import if necessary

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="px-5 sm:px-10">
      <div className="flex justify-center">
        <div className="flex space-x-2 p-4 overflow-x-auto no-scrollbar">
          {userInfo ? (
            <>
              {/* <Link to="/profile">
                <button className="bg-indigo-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-indigo-600 transition duration-300 transform hover:scale-105">
                  Profile
                </button>
              </Link> */}
              <Link to="/admin">
                <button className="bg-teal-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-teal-600 transition duration-300 transform hover:scale-105">
                  Home
                </button>
              </Link>
              <Link to="/admin/contact/page">
                <button className="bg-purple-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-purple-600 transition duration-300 transform hover:scale-105">
                  Contact
                </button>
              </Link>
              <Link to="/admin/about">
                <button className="bg-pink-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-pink-600 transition duration-300 transform hover:scale-105">
                  About
                </button>
              </Link>
              <Link to="/admin/product">
                <button className="bg-yellow-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-yellow-600 transition duration-300 transform hover:scale-105">
                  Product
                </button>
              </Link>
              <Link to="/admin/banner">
                <button className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-300 transform hover:scale-105">
                  Banner
                </button>
              </Link>
              <Link to="/admin/contact/form">
                <button className="bg-indigo-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-rose-600 transition duration-300 transform hover:scale-105">
                  Form
                </button>
              </Link>
              <button
                onClick={logoutHandler}
                className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                  Sign In
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
