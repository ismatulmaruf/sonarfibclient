import React, { useState, useEffect } from "react";

// Loading component
const Loading = () => (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="flex space-x-2">
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-75"></div>
      <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-150"></div>
    </div>
  </div>
);

const Product = () => {
  const [banner, setBanner] = useState({});
  const [products, setProducts] = useState([]); // State for products
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/banner/670a4dd46c631a5829413ef5`
        ); // Replace with your banner ID
        const data = await response.json();
        setBanner(data);
      } catch (error) {
        console.error("Failed to fetch banner", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products`
        ); // Replace with your products endpoint
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBanner();
    fetchProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {/* Banner Section */}
      <div className="relative">
        <img
          src={banner.Bgimg}
          alt="Banner"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">
            {banner.bannerTitle}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction Section */}
        <h2 className="text-3xl font-semibold mb-6 text-center">
          {banner.title}
        </h2>
        <p className="text-lg text-gray-700 mb-8 text-center">
          {banner.description}
        </p>

        {/* Products Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">{product.title}</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
