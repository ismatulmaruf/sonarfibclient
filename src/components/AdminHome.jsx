import React, { useState, useEffect } from "react";

const AdminHome = () => {
  const [formData, setFormData] = useState({
    bannerImg: "",
    bannerText: "",
    secondColumnTitle: "",
    secondParagraph1: "",
    secondParagraph2: "",
    secondImage: "",
    thirdParagraph1: "",
    thirdParagraph2: "",
    thirdImage: "",
    fourthParagraph: "",
    fifthParagraph1: "",
    fifthParagraph2: "",
    fifthImage: "",
    finalContent: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the previous or default content when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/home`
        );
        const result = await response.json();

        if (response.ok) {
          setFormData(result); // Populate formData with the fetched data
        } else {
          setResponseMessage(`Error: ${result.message}`);
        }
      } catch (error) {
        setResponseMessage("Failed to load content. Please try again later.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = "6708dddee9583576943a573a"; // Replace with the actual ID

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/home/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setResponseMessage("Content updated successfully!");
      } else {
        setResponseMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setResponseMessage("Failed to update content. Please try again later.");
    }
  };

  const Loading = () => (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-75"></div>
        <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-150"></div>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen  p-8">
      <div className="max-w-2xl w-full bg-white shadow-2xl rounded-xl p-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 tracking-wide">
          Update Home Content
        </h1>

        {isLoading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Banner Image */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Banner Image URL
              </label>
              <input
                type="text"
                name="bannerImg"
                value={formData.bannerImg}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter URL"
              />
            </div>

            {/* Banner Text */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Banner Text
              </label>
              <input
                type="text"
                name="bannerText"
                value={formData.bannerText}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter Banner Text"
              />
            </div>

            {/* Second Column Title */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Second Column Title
              </label>
              <input
                type="text"
                name="secondColumnTitle"
                value={formData.secondColumnTitle}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter Title"
              />
            </div>

            {/* Second Paragraph 1 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Second Paragraph 1
              </label>
              <textarea
                name="secondParagraph1"
                value={formData.secondParagraph1}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter Paragraph 1"
                rows={4}
              ></textarea>
            </div>

            {/* Second Paragraph 2 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Second Paragraph 2
              </label>
              <textarea
                name="secondParagraph2"
                value={formData.secondParagraph2}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter Paragraph 2"
                rows={4}
              ></textarea>
            </div>

            {/* Second Image */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Second Image URL
              </label>
              <input
                type="text"
                name="secondImage"
                value={formData.secondImage}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter Image URL"
              />
            </div>

            {/* Third Paragraph 1 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Third Paragraph 1
              </label>
              <textarea
                name="thirdParagraph1"
                value={formData.thirdParagraph1}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter Third Paragraph 1"
                rows={4}
              ></textarea>
            </div>

            {/* Third Paragraph 2 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Third Paragraph 2
              </label>
              <textarea
                name="thirdParagraph2"
                value={formData.thirdParagraph2}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter Third Paragraph 2"
                rows={4}
              ></textarea>
            </div>

            {/* Third Image */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Third Image URL
              </label>
              <input
                type="text"
                name="thirdImage"
                value={formData.thirdImage}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter Image URL"
              />
            </div>

            {/* Fourth Paragraph */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Fourth Paragraph
              </label>
              <textarea
                name="fourthParagraph"
                value={formData.fourthParagraph}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter Fourth Paragraph"
                rows={4}
              ></textarea>
            </div>

            {/* Fifth Paragraph 1 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Fifth Paragraph 1
              </label>
              <textarea
                name="fifthParagraph1"
                value={formData.fifthParagraph1}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter Fifth Paragraph 1"
                rows={4}
              ></textarea>
            </div>

            {/* Fifth Paragraph 2 */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Fifth Paragraph 2
              </label>
              <textarea
                name="fifthParagraph2"
                value={formData.fifthParagraph2}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter Fifth Paragraph 2"
                rows={4}
              ></textarea>
            </div>

            {/* Fifth Image */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Fifth Image URL
              </label>
              <input
                type="text"
                name="fifthImage"
                value={formData.fifthImage}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter Image URL"
              />
            </div>

            {/* Final Content */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Final Content
              </label>
              <textarea
                name="finalContent"
                value={formData.finalContent}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Enter Final Content"
                rows={4}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg"
            >
              Update Content
            </button>
          </form>
        )}

        {/* Response Message */}
        {responseMessage && (
          <div className="mt-6 text-center text-green-600 font-semibold">
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
