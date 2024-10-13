import React, { useEffect, useState } from "react";

const Home = () => {
  const [homeData, setHomeData] = useState(null);

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

    fetchHomeData();
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
      <div className="max-w-screen-xl mx-auto px-4 sm:px-20 lg:px-36 py-12">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          {homeData.secondColumnTitle}
        </h2>
        <p className="text-lg leading-relaxed text-gray-600 mb-8">
          {homeData.secondParagraph1}
        </p>

        <p className="text-lg leading-relaxed text-gray-600 mb-8">
          {homeData.secondParagraph2}
        </p>

        {/* Image Section */}
        <div className="flex flex-wrap lg:flex-nowrap items-stretch gap-12 my-10">
          <div className="w-full lg:w-1/2 flex-grow">
            <img
              src={homeData.secondImage}
              alt="Jute Fiber"
              className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="w-full lg:w-1/2 bg-gray-100 p-6 lg:p-8 rounded-lg shadow-lg flex-grow">
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              {homeData.thirdParagraph1}
            </p>

            <p className="text-lg leading-relaxed text-gray-700">
              {homeData.thirdParagraph2}
            </p>
          </div>
        </div>

        <p className="text-lg leading-relaxed text-gray-600 mb-8">
          {homeData.fourthParagraph}
        </p>

        {/* Second Image Section */}
        <div className="flex flex-wrap lg:flex-nowrap items-stretch gap-12 my-10">
          <div className="w-full lg:w-1/2 bg-gray-100 p-6 lg:p-8 rounded-lg shadow-lg flex-grow">
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              {homeData.fifthParagraph1}
            </p>

            <p className="text-lg leading-relaxed text-gray-700">
              {homeData.fifthParagraph2}
            </p>
          </div>

          <div className="w-full lg:w-1/2 flex-grow">
            <img
              src={homeData.fifthImage}
              alt="Jute Industry"
              className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <p className="text-lg leading-relaxed text-gray-600">
          {homeData.finalContent}
        </p>
      </div>
    </div>
  );
};

export default Home;
