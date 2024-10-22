import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [productData, setProductData] = useState([]); // State for products

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/home`
        );
        const data = await response.json();
        setHomeData(data);
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };

    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products`
        );
        const data = await response.json();
        setProductData(data.slice(0, 3)); // Set only the first 3 products
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchHomeData();
    fetchProductData();
  }, []);

  // Loading animation component
  const Loading = () => (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-75"></div>
        <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-150"></div>
      </div>
    </div>
  );

  // Show loading animation while data is being fetched
  if (!homeData) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <div className="relative">
        <img
          src={homeData.bannerImg}
          alt="Banner"
          className="w-full h-[600px] object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-md">
            {homeData.bannerText}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-20 lg:px-36 py-16 bg-white">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900 text-center">
          {homeData.secondColumnTitle}
        </h2>
        <p className="text-xl leading-relaxed text-gray-700 mb-10 text-center mx-auto max-w-3xl">
          {homeData.secondParagraph1}
        </p>

        <p className="text-xl leading-relaxed text-gray-700 mb-10 text-center mx-auto max-w-3xl">
          {homeData.secondParagraph2}
        </p>

        {/* New Product Section */}
        <div className="py-8">
          <div className="">
            <h2 className="text-4xl text-center font-extrabold text-gray-900 mb-6">
              Our Featured Products
            </h2>
            <p className="text-lg text-center text-gray-700 mb-8">
              Explore a wide range of high-quality products curated just for
              you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productData.map((product, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">
                    {product.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                </div>
              ))}
            </div>

            {/* Button to link to the products page using Link */}
            <div className="text-center mt-8">
              <Link
                to="/product" // Redirect to products page
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold text-center mb-8">
            Explore Our Jute Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src={homeData.secondImage}
                alt="Jute Fiber"
                className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-4 text-center">
                <p className="font-bold text-lg">{homeData.thirdParagraph1}</p>
                <p>{homeData.thirdParagraph2}</p>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src={homeData.fifthImage}
                alt="Jute Industry"
                className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-4 text-center">
                <p className="font-bold text-lg">{homeData.fifthParagraph1}</p>
                <p>{homeData.fifthParagraph2}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-lg text-gray-800 text-center">
              {homeData.fourthParagraph}
            </p>
            <p className="text-lg text-gray-800 text-center mt-4">
              {homeData.finalContent}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
