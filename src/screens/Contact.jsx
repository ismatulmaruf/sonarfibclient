import { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

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

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState(null);
  const [contactInfo, setContactInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/contact`
        );
        const data = await response.json();
        setContactInfo(data); // Assuming the response is an array and taking the first object
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch contact information", error);
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setStateMessage("Message sent successfully!");
      console.log("Submission result:", result);
    } catch (error) {
      console.error("Failed to send message", error);
      setStateMessage("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
      e.target.reset();
      setTimeout(() => {
        setStateMessage(null);
      }, 5000); // Hide message after 5 seconds
    }
  };

  console.log(contactInfo);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {/* Banner Section */}
      <div className="relative mb-6">
        <img
          src={contactInfo.bannerimg}
          alt="Banner"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-70"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold">
            {contactInfo.bannertext}
          </h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction Section */}
        <h2 className="text-3xl font-semibold mb-6 text-center">
          {contactInfo.herotext}
        </h2>
        <p className="text-lg text-gray-700 mb-8 text-center">
          {contactInfo.heroparagraph}
        </p>
      </div>

      {/* Contact Details */}
      <div className="max-w-5xl mx-auto p-8 mb-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Get in Touch</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-blue-500 text-3xl mb-2" />
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p>{contactInfo.Address}</p>
          </div>
          <div className="flex flex-col items-center">
            <FaPhoneAlt className="text-blue-500 text-3xl mb-2" />
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p>{contactInfo.phone}</p>
          </div>
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-blue-500 text-3xl mb-2" />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p>{contactInfo.email}</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center mt-8 space-x-6">
          <a href={contactInfo.facebooklink} target="_blank" rel="noreferrer">
            <FaFacebookF className="text-blue-700 text-3xl hover:text-blue-900 transition duration-200" />
          </a>
          <a href={contactInfo.twitterlink} target="_blank" rel="noreferrer">
            <FaTwitter className="text-blue-500 text-3xl hover:text-blue-700 transition duration-200" />
          </a>
          <a href={contactInfo.instalink} target="_blank" rel="noreferrer">
            <FaInstagram className="text-pink-500 text-3xl hover:text-pink-700 transition duration-200" />
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Contact Form</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="user_name"
          >
            Name
          </label>
          <input
            type="text"
            name="user_name"
            id="user_name"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="user_email"
          >
            Email
          </label>
          <input
            type="email"
            name="user_email"
            id="user_email"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
        {stateMessage && (
          <p className="mt-4 text-center text-green-500">{stateMessage}</p>
        )}
      </form>

      {/* Google Map Embed */}
      <div className="max-w-5xl mx-auto p-8 mt-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-4">Our Location</h2>
        <div className="flex justify-center">
          <iframe
            title="Google Map"
            src={contactInfo.maplink} // Dynamic map link
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
