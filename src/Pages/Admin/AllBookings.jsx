import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../Admin/AdminDashboard";
import { toast } from "react-toastify";
import { Trash2, Edit } from "lucide-react";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const backendUrl =
          "https://hotel-managment-system-backend.onrender.com";
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${backendUrl}/bookings/get-bookings`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookings(response.data.data || []);
      } catch (err) {
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDeleteBooking = async (id) => {
    try {
      const backendUrl = `https://hotel-managment-system-backend.onrender.com`;
      const token = localStorage.getItem("token");

      await axios.delete(`${backendUrl}/bookings/delete-booking/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings((prev) => prev.filter((booking) => booking._id !== id));
      toast.success("Booking deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      setError("Failed to delete booking.");
      toast.error("Failed to delete booking. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <AdminDashboard />
      <h1 className="text-4xl font-extrabold text-center text-teal-700 mb-8">
        All Bookings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-teal-500"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 text-lg font-semibold">
            {error}
          </p>
        ) : bookings.length ? (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="group relative cursor-pointer overflow-hidden bg-white rounded-2xl px-6 pt-12 pb-10 shadow-2xl ring-1 ring-gray-900/5 transition-all duration-500 transform hover:scale-105 hover:shadow-3xl"
            >
              <span className="absolute top-0 left-0 z-0 h-32 w-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-75 transition-all duration-500 transform group-hover:scale-[20]"></span>
              <div className="relative z-10 mx-auto max-w-md">
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
                  <p className="font-medium">Booking ID: {booking._id}</p>
                  <p>User: {booking.user?.username || "Unknown User"}</p>
                  <p>Room: {booking.room?.roomNumber || "N/A"}</p>
                  <p>
                    Check-in:{" "}
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </p>
                  <p>
                    Check-out:{" "}
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </p>
                  <p>Price: ${booking.totalAmount || "N/A"}</p>
                  <p>Room Type: {booking.room?.roomType || "N/A"}</p>
                </div>
                <div className="pt-6 text-lg font-semibold leading-7 flex justify-between gap-4">
                  <button
                    onClick={() => handleDeleteBooking(booking._id)}
                    className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-300"
                  >
                    <Trash2 className="inline-block w-5 h-5 mr-2" /> Delete
                  </button>
                  <button
                    onClick={() => navigate(`/update-booking/${booking._id}`)}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-300"
                  >
                    <Edit className="inline-block w-5 h-5 mr-2" /> Update
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-600">
            No bookings available
          </p>
        )}
      </div>
    </>
  );
};
export default AllBookings;
