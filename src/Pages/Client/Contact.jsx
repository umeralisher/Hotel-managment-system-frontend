import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContactData({ ...contactData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const backendUrl = "https://hotel-managment-system-backend.onrender.com";

      const resp = await axios.post(
        `${backendUrl}/contact/create-contact`,
        contactData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(resp.data.message);

      setContactData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error.response
        ? error.response.data.message
        : "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-10 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fHww)' }}>
      <form
        className="border-2 border-solid p-8 rounded-2xl shadow-2xl w-full max-w-md bg-white bg-opacity-90"
        onSubmit={submitHandler}
      >
        <h1 className="text-center font-bold text-3xl m-4 font-mono text-indigo-700">
          Contact Us
        </h1>
        <hr className="border-indigo-300 mb-6" />

        <div className="relative mb-4">
          <label className="flex items-center mb-2 text-gray-700 text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={contactData.name}
            onChange={changeHandler}
            className="block w-full h-12 px-5 py-2 bg-white text-base shadow-md border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Your Full Name"
            required
          />
        </div>

        <div className="relative mb-4">
          <label className="flex items-center mb-2 text-gray-700 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={contactData.email}
            onChange={changeHandler}
            className="block w-full h-12 px-5 py-2 bg-white text-base shadow-md border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Your Email Address"
            required
          />
        </div>

        <div className="relative mb-4">
          <label className="flex items-center mb-2 text-gray-700 text-sm font-medium">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={contactData.phone}
            onChange={changeHandler}
            className="block w-full h-12 px-5 py-2 bg-white text-base shadow-md border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Your Phone Number"
            required
          />
        </div>

        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-700 text-sm font-medium">
            Message
          </label>
          <textarea
            name="message"
            value={contactData.message}
            onChange={changeHandler}
            className="block w-full px-5 py-3 bg-white text-base shadow-md border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Your Message"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 shadow-lg rounded-full bg-indigo-600 hover:bg-indigo-800 transition-all duration-500 text-white text-lg font-semibold"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
