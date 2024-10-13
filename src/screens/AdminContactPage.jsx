import React, { useState, useEffect } from "react";
import Authbtn from "../components/AuthBtn";

const AdminContact = () => {
  const [contactData, setContactData] = useState({}); // State to store contact data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [message, setMessage] = useState(""); // State for status messages

  // Fetch the contact data (GET)
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/contact`
        );
        const data = await response.json();
        setContactData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch contact data", error);
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  // Update contact data (PUT)
  const updateContactData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = await response.json();
      setContactData(updatedData); // Update the state with the new data
      setMessage("Contact information updated successfully!"); // Success message
    } catch (error) {
      console.error("Failed to update contact data", error);
      setMessage("Failed to update contact information. Please try again."); // Error message
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  // Loading spinner
  const Loading = () => (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-75"></div>
        <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-150"></div>
      </div>
    </div>
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Authbtn />
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">Manage Contact Page</h1>

        {/* Status Message */}
        {message && (
          <div className="mb-4 text-lg">
            <span className="text-green-500">{message}</span>
          </div>
        )}

        {/* Update Contact Form */}
        <div className="mb-6">
          <h2 className="text-xl mb-4">Update Contact Details</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateContactData();
            }}
          >
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Banner Text
              </label>
              <input
                type="text"
                name="bannertext"
                value={contactData.bannertext || ""}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Hero Text
              </label>
              <input
                type="text"
                name="herotext"
                value={contactData.herotext || ""}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Hero Paragraph
              </label>
              <textarea
                name="heroparagraph"
                value={contactData.heroparagraph || ""}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Address</label>
              <input
                type="text"
                name="Address"
                value={contactData.Address || ""}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={contactData.phone || ""}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={contactData.email || ""}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Facebook Link
              </label>
              <input
                type="text"
                name="facebooklink"
                value={contactData.facebooklink || ""}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Twitter Link
              </label>
              <input
                type="text"
                name="twitterlink"
                value={contactData.twitterlink || ""}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Instagram Link
              </label>
              <input
                type="text"
                name="instalink"
                value={contactData.instalink || ""}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Map Link</label>
              <input
                type="text"
                name="maplink"
                value={contactData.maplink || ""}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Update Contact Info
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminContact;
