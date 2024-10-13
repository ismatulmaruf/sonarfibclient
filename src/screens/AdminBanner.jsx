import React, { useState, useEffect } from "react";
import Authbtn from "../components/AuthBtn";

const AdminBanner = () => {
  const [banners, setBanners] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [message, setMessage] = useState(null);

  // Fetch all banners when the component mounts
  useEffect(() => {
    const fetchAllBanners = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/banner/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch banners");
        }
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchAllBanners();
  }, []);

  // Handle input change for selected banner
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedBanner((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission for updating the selected banner
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null); // Reset any previous messages
    setIsLoadingUpdate(true); // Start loading update

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/banner/${selectedBanner._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedBanner),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update banner");
      }

      const updatedBanner = await response.json();
      setMessage("Banner updated successfully!");
      setBanners((prevBanners) =>
        prevBanners.map((banner) =>
          banner._id === updatedBanner._id ? updatedBanner : banner
        )
      ); // Update the local banners state
      setSelectedBanner(null); // Hide the form
    } catch (error) {
      console.error(error);
      setMessage("Error updating banner: " + error.message);
    } finally {
      setIsLoadingUpdate(false); // End loading update
    }
  };

  const Loading = () => (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-75"></div>
        <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-150"></div>
      </div>
    </div>
  );

  // Handle selecting a banner to edit
  const handleEdit = (banner) => {
    setSelectedBanner(banner);
  };

  if (loading) {
    return <Loading />; // Loading message
  }

  return (
    <>
      <Authbtn />
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg ">
          <h2 className="text-3xl font-bold text-center mb-6">
            Manage Banners
          </h2>

          {message && <p className="text-center text-green-500">{message}</p>}

          <h3 className="text-2xl mb-4">All Banners</h3>
          <ul className="mb-6">
            {banners.map((banner) => (
              <li
                key={banner._id}
                className="flex justify-between items-center p-4 border-b"
              >
                <div className="flex items-center">
                  <img
                    src={banner.Bgimg}
                    alt={banner.bannerTitle}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{banner.bannerTitle}</h4>
                    <p>{banner.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleEdit(banner)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>

          {selectedBanner && (
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-semibold mb-4">Edit Banner</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Bgimg"
                  >
                    Background Image URL
                  </label>
                  <input
                    type="text"
                    name="Bgimg"
                    id="Bgimg"
                    value={selectedBanner.Bgimg}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="bannerTitle"
                  >
                    Banner Title
                  </label>
                  <input
                    type="text"
                    name="bannerTitle"
                    id="bannerTitle"
                    value={selectedBanner.bannerTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Subtitle
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={selectedBanner.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={selectedBanner.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className={`bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200 ${
                      isLoadingUpdate && "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={isLoadingUpdate}
                  >
                    {isLoadingUpdate ? "Updating..." : "Update Banner"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminBanner;
