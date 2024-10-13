import React, { useState, useEffect } from "react";
import Authbtn from "../components/AuthBtn";

const AdminContact = () => {
  const [contactData, setContactData] = useState([]); // State to store contact data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [message, setMessage] = useState(""); // State for status messages
  const [formData, setFormData] = useState({}); // State for form data

  // Fetch the contact data (GET)
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/form`
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
  const updateContactData = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/form/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = await response.json();
      setContactData((prev) =>
        prev.map((contact) => (contact._id === id ? updatedData : contact))
      ); // Update the state with the new data
      setMessage("Contact information updated successfully!"); // Success message
    } catch (error) {
      console.error("Failed to update contact data", error);
      setMessage("Failed to update contact information. Please try again."); // Error message
    }
  };

  // Delete contact data (DELETE)
  const deleteContactData = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/form/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setContactData((prev) => prev.filter((contact) => contact._id !== id));
      setMessage("Contact information deleted successfully!"); // Success message
    } catch (error) {
      console.error("Failed to delete contact data", error);
      setMessage("Failed to delete contact information. Please try again."); // Error message
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
              updateContactData(formData._id); // Pass the ID of the contact being updated
            }}
          >
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Banner Text
              </label>
              <input
                type="text"
                name="bannertext"
                value={formData.bannertext || ""}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            {/* Other input fields... */}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Update Contact Info
            </button>
          </form>
        </div>

        {/* Contact List */}
        <h2 className="text-xl mb-4">Contact List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contactData.map((contact) => (
            <div key={contact._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{contact.bannertext}</h3>
              <p>{contact.herotext}</p>
              <p>{contact.heroparagraph}</p>
              <p>{contact.Address}</p>
              <p>{contact.phone}</p>
              <p>{contact.email}</p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                  onClick={() => {
                    setFormData(contact); // Set the selected contact data to the form
                  }}
                >
                  Check
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                  onClick={() => deleteContactData(contact._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminContact;
