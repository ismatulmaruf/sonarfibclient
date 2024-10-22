// import React, { useState, useEffect } from "react";

// // Loading component
// const Loading = () => (
//   <div className="flex justify-center items-center min-h-screen bg-gray-100">
//     <div className="flex space-x-2">
//       <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
//       <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-75"></div>
//       <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-150"></div>
//     </div>
//   </div>
// );

// const About = () => {
//   const [bannerData, setBannerData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch the banner data
//   useEffect(() => {
//     const fetchBannerData = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_API_URL}/api/banner/670a4dd46c631a5829413ef4`
//         );
//         const data = await response.json();
//         setBannerData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch banner data", error);
//         setLoading(false);
//       }
//     };

//     fetchBannerData();
//   }, []);

//   if (loading) {
//     return <Loading />;
//   }

//   if (!bannerData) {
//     return <p className="text-center text-red-500">Failed to load content</p>;
//   }

//   return (
//     <div>
//       {/* Banner Section */}
//       <div className="relative">
//         <img src={bannerData.Bgimg} alt="Banner" className="w-full h-[400px]" />
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <h1 className="text-white text-4xl font-bold">
//             {bannerData.bannerTitle}
//           </h1>
//         </div>
//       </div>

//       {/* Main Content Section */}
//       <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Introduction */}
//         <h2 className="text-3xl font-semibold mb-6 text-center">
//           {bannerData.title}
//         </h2>

//         <p className="text-lg text-gray-700 mb-6 text-center">
//           {bannerData.description}
//         </p>

//         {/* Other sections can remain static as in your original code or made dynamic as needed */}
//         {/* Export Section */}
//         <div className="bg-gray-100 p-8 rounded-lg shadow-lg mb-10">
//           <h3 className="text-2xl font-semibold mb-4">Key Export Markets</h3>
//           <p className="text-gray-700 mb-4">
//             The main export destinations for jute and jute goods from Bangladesh
//             are Turkey, India, Egypt, the United States, and China. Turkey is
//             the largest importer, accounting for over 20% of Bangladesh’s total
//             jute exports.
//           </p>
//           <p className="text-gray-700">
//             Bangladesh exports a variety of jute products, including raw jute,
//             jute yarn, jute sacks, bags, and jute carpets. Raw jute is the
//             largest export item, accounting for over 50% of the total value of
//             jute exports.
//           </p>
//         </div>

//         {/* Challenges Section */}
//         <div className="bg-gray-50 p-8 rounded-lg shadow-lg mb-10">
//           <h3 className="text-2xl font-semibold mb-4">
//             Challenges in the Industry
//           </h3>
//           <p className="text-gray-700 mb-4">
//             In recent years, the jute industry in Bangladesh has faced a number
//             of challenges, including competition from synthetic fibers, rising
//             production costs, and declining global demand.
//           </p>
//           <p className="text-gray-700">
//             Despite these challenges, the jute industry remains a crucial sector
//             of the Bangladeshi economy, contributing significantly to employment
//             and exports.
//           </p>
//         </div>

//         {/* Government Support Section */}
//         <div className="bg-gray-100 p-8 rounded-lg shadow-lg mb-10">
//           <h3 className="text-2xl font-semibold mb-4">Government Support</h3>
//           <p className="text-gray-700 mb-4">
//             The government of Bangladesh has taken several steps to support the
//             jute industry. These measures include subsidies and tax breaks for
//             jute mills, as well as investments in research and development to
//             improve productivity and competitiveness in the global market.
//           </p>
//           <p className="text-gray-700">
//             The government is committed to helping the industry grow and remain
//             competitive despite global challenges.
//           </p>
//         </div>

//         {/* Economic Impact Section */}
//         <div className="bg-gray-50 p-8 rounded-lg shadow-lg mb-10">
//           <h3 className="text-2xl font-semibold mb-4">Economic Importance</h3>
//           <p className="text-gray-700 mb-4">
//             The jute industry is a significant contributor to Bangladesh’s
//             economy. It directly employs over 2 million people and generates
//             more than $2 billion in export revenue annually.
//           </p>
//           <p className="text-gray-700">
//             Jute remains a vital part of Bangladesh's industrial and
//             agricultural sectors, and it continues to provide employment and
//             economic growth across the country.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

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

const About = () => {
  const [bannerData, setBannerData] = useState(null);
  const [aboutSections, setAboutSections] = useState([]); // State for all sections from the About API
  const [loading, setLoading] = useState(true);

  // Fetch the banner data and all sections
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/banner/670a4dd46c631a5829413ef4`
        );
        const banner = await response.json();
        setBannerData(banner);
      } catch (error) {
        console.error("Failed to fetch banner data", error);
      }
    };

    const fetchAboutSections = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/about`
        );
        const sections = await response.json();
        setAboutSections(sections); // Assuming the API returns an array of sections
      } catch (error) {
        console.error("Failed to fetch about sections", error);
      }
    };

    const fetchData = async () => {
      await fetchBannerData();
      await fetchAboutSections();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!bannerData || aboutSections.length === 0) {
    return <p className="text-center text-red-500">Failed to load content</p>;
  }

  return (
    <div>
      {/* Banner Section */}
      <div className="relative">
        <img
          src={bannerData.Bgimg}
          alt="Banner"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl font-extrabold drop-shadow-lg animate-fade-in">
            {bannerData.bannerTitle}
          </h1>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center tracking-wide">
          {bannerData.title}
        </h2>

        <p className="text-xl text-gray-700 mb-8 text-center max-w-2xl mx-auto leading-relaxed">
          {bannerData.description}
        </p>

        {/* Dynamic Sections */}
        {aboutSections.map((section, index) => (
          <div
            key={index}
            className={`${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            } p-10 rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 mb-12`}
          >
            <h3 className="text-3xl font-semibold mb-4 text-gray-900">
              {section.title}
            </h3>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              {section.description}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {section.description2}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
