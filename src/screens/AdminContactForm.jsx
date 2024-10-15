import React, { useState, useEffect } from "react";
import Authbtn from "../components/AuthBtn";

const AdminContact = () => {
  const [forms, setForms] = useState([]); // State to store all forms
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [message, setMessage] = useState(""); // State for status messages

  // Fetch all forms when the component mounts
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/form`
        );
        const data = await response.json();
        setForms(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching forms:", error);
        setMessage("Error fetching forms");
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  // Update form (toggle isFormed)
  const toggleIsFormed = async (id, currentIsFormed) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/form/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isFormed: !currentIsFormed }),
        }
      );

      if (response.ok) {
        const updatedForm = await response.json();
        setForms(forms.map((form) => (form._id === id ? updatedForm : form)));
        setMessage("Form updated successfully");
      } else {
        setMessage("Error updating form");
      }
    } catch (error) {
      console.error("Error updating form:", error);
      setMessage("Error updating form");
    }
  };

  // Delete form
  const deleteForm = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/form/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setForms(forms.filter((form) => form._id !== id));
        setMessage("Form deleted successfully");
      } else {
        setMessage("Error deleting form");
      }
    } catch (error) {
      console.error("Error deleting form:", error);
      setMessage("Error deleting form");
    }
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
      <div className="p-4 min-h-screen">
        {message && <div className="text-center text-red-500">{message}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forms.map((form) => (
            <div key={form._id} className="border p-4 rounded shadow">
              <p>
                <strong>Name:</strong> {form.user_name}
              </p>
              <p>
                <strong>Email:</strong> {form.user_email}
              </p>
              <p>
                <strong>Message:</strong> {form.message}
              </p>
              <p>
                <strong>Contacted:</strong> {form.isFormed ? "Yes" : "No"}
              </p>

              <div className="flex space-x-2 mt-4">
                <button
                  className={`px-4 py-2 rounded ${
                    form.isFormed ? "bg-green-500" : "bg-gray-500"
                  } text-white`}
                  onClick={() => toggleIsFormed(form._id, form.isFormed)}
                >
                  {form.isFormed
                    ? "Mark as Not Contacted"
                    : "Mark as Contacted"}
                </button>

                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => deleteForm(form._id)}
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
