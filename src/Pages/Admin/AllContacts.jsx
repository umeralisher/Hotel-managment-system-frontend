import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminDashboard from "../Admin/AdminDashboard";

const AllContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const backendUrl =
          "https://hotel-managment-system-backend.onrender.com";
        const response = await axios.get(`${backendUrl}/contact/get-contacts`);
        setContacts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch contacts!");
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDeleteContact = async (id) => {
    try {
      const backendUrl = "https://hotel-managment-system-backend.onrender.com";
      await axios.delete(`${backendUrl}/contact/del-contact/${id}`);

      setContacts(contacts.filter((contact) => contact._id !== id));
      toast.success("Contact deleted successfully.");
    } catch (err) {
      toast.error("Failed to delete contact.");
    }
  };

  return (
    <>
      <AdminDashboard />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-8">
          All Contacts
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
              <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        ) : contacts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="group relative cursor-pointer overflow-hidden bg-white rounded-2xl px-6 pt-12 pb-10 shadow-2xl ring-1 ring-gray-900/5 transition-all duration-500 transform hover:scale-105 hover:shadow-3xl sm:mx-auto sm:max-w-md sm:px-12"
                style={{ width: "600px" }} // Increased card width
              >
                <span className="absolute top-0 left-0 z-0 h-32 w-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-75 transition-all duration-500 transform group-hover:scale-[20]"></span>
                <div className="relative z-10 mx-auto max-w-lg">
                  <span className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 transform group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-yellow-500">
                    <svg
                      className="h-12 w-12 text-white transition-all"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </span>
                  <div className="space-y-6 pt-6 text-lg leading-8 text-gray-700 transition-all duration-500 group-hover:text-white">
                    <h2 className="font-bold">{contact.name}</h2>
                    <p>
                      <strong>Email:</strong> {contact.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {contact.phone}
                    </p>
                    <p>
                      <strong>Message:</strong> {contact.message}
                    </p>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {new Date(contact.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="pt-6 text-lg font-semibold leading-7">
                    <button
                      onClick={() => handleDeleteContact(contact._id)}
                      className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">
            No contacts available
          </p>
        )}
      </div>
    </>
  );
};

export default AllContacts;
