import React, { useState, useEffect } from "react";
import Authbtn from "../components/AuthBtn";

const AdminAbout = () => {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSection, setNewSection] = useState({
    title: "",
    description: "",
    description2: "",
  });
  const [editSectionId, setEditSectionId] = useState(null); // For updating sections

  // Fetch all "About" sections (GET)
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/about`
        );
        const data = await response.json();
        setAboutData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch about data", error);
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Create a new section (POST)
  const createSection = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/about`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSection),
        }
      );
      const data = await response.json();
      setAboutData([...aboutData, data]); // Add the new section to the list
      setNewSection({ title: "", description: "", description2: "" }); // Clear the form
    } catch (error) {
      console.error("Failed to create section", error);
    }
  };

  // Delete a section (DELETE)
  const deleteSection = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/about/${id}`, {
        method: "DELETE",
      });
      setAboutData(aboutData.filter((section) => section._id !== id));
    } catch (error) {
      console.error("Failed to delete section", error);
    }
  };

  // Update a section (PUT)
  const updateSection = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/about/${editSectionId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSection),
        }
      );
      const updatedSection = await response.json();
      setAboutData(
        aboutData.map((section) =>
          section._id === editSectionId ? updatedSection : section
        )
      );
      setEditSectionId(null); // Exit edit mode
      setNewSection({ title: "", description: "", description2: "" }); // Clear the form
    } catch (error) {
      console.error("Failed to update section", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setNewSection({ ...newSection, [e.target.name]: e.target.value });
  };

  // Enter edit mode
  const handleEdit = (section) => {
    setEditSectionId(section._id);
    setNewSection({
      title: section.title,
      description: section.description,
      description2: section.description2,
    });
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

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Authbtn />
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">Manage About Sections</h1>

        {/* Create/Edit Section Form */}
        <div className="mb-6">
          <h2 className="text-xl mb-4">
            {editSectionId ? "Edit Section" : "Add New Section"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editSectionId ? updateSection() : createSection();
            }}
          >
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={newSection.title}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={newSection.description}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Description 2
              </label>
              <textarea
                name="description2"
                value={newSection.description2}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {editSectionId ? "Update Section" : "Create Section"}
            </button>
          </form>
        </div>

        {/* Display Existing Sections */}
        <div>
          <h2 className="text-xl mb-4">Existing Sections</h2>
          <div className="space-y-4">
            {aboutData.map((section) => (
              <div key={section._id} className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <p>{section.description}</p>
                <p>{section.description2}</p>
                <div className="mt-4 space-x-2">
                  <button
                    className="bg-yellow-500 text-white py-1 px-2 rounded"
                    onClick={() => handleEdit(section)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded"
                    onClick={() => deleteSection(section._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAbout;
