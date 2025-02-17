import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateBookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    room: "",
    checkInDate: "",
    checkOutDate: "",
    totalAmount: "",
    bookingStatus: "pending",
    paymentStatus: "unpaid",
  });
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [changeRoom, setChangeRoom] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendUrl =
          "https://hotel-managment-system-backend.onrender.com";
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized access. Please log in.");

        // Fetch booking details
        const { data: bookingResponse } = await axios.get(
          `${backendUrl}/bookings/get-booking/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const booking = bookingResponse.data;

        const formattedCheckInDate = new Date(booking.checkInDate)
          .toISOString()
          .split("T")[0];
        const formattedCheckOutDate = new Date(booking.checkOutDate)
          .toISOString()
          .split("T")[0];

        setData({
          room: booking.room?._id || "",
          checkInDate: formattedCheckInDate,
          checkOutDate: formattedCheckOutDate,
          totalAmount: booking.totalAmount || "",
          bookingStatus: booking.bookingStatus || "pending",
          paymentStatus: booking.paymentStatus || "unpaid",
        });

        // Fetch available rooms
        const { data: roomsResponse } = await axios.get(
          `${backendUrl}/rooms/get-available-rooms`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRooms(roomsResponse.data || []);
      } catch (err) {
        setError("Failed to fetch booking data.");
        toast.error("Failed to fetch booking data.");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const backendUrl = "https://hotel-managment-system-backend.onrender.com";
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized access. Please log in.");

      await axios.put(`${backendUrl}/bookings/update-booking/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Booking updated successfully!");
      navigate("/all-bookings");
    } catch (err) {
      setError("Failed to update booking.");
      toast.error("Failed to update booking.");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fHww')",
      }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Update Booking
        </h1>
        <hr className="mb-6" />

        {error && (
          <p className="text-center text-red-500 text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Room Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Room
            </label>
            {changeRoom ? (
              <select
                name="room"
                value={data.room}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
                required
              >
                <option value="">Select a Room</option>
                {rooms.map((room) => (
                  <option key={room._id} value={room._id}>
                    Room {room.roomNumber}
                  </option>
                ))}
              </select>
            ) : (
              <div className="w-full p-3 bg-gray-100 border-2 border-gray-300 rounded-lg text-gray-600 flex justify-between">
                Room{" "}
                {rooms.find((room) => room._id === data.room)?.roomNumber ||
                  "Current Room"}
              </div>
            )}
            <button
              type="button"
              className="mt-2 text-sm text-indigo-500 hover:underline"
              onClick={() => setChangeRoom(!changeRoom)}
            >
              {changeRoom ? "Cancel Change" : "Change Room"}
            </button>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Check-in Date
              </label>
              <input
                type="date"
                name="checkInDate"
                value={data.checkInDate}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Check-out Date
              </label>
              <input
                type="date"
                name="checkOutDate"
                value={data.checkOutDate}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
                required
              />
            </div>
          </div>

          {/* Total Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Total Amount
            </label>
            <input
              type="number"
              name="totalAmount"
              value={data.totalAmount}
              onChange={handleChange}
              className="w-full rounded-lg border-2 border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
              required
            />
          </div>

          {/* Booking Status */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Booking Status
            </label>
            <select
              name="bookingStatus"
              value={data.bookingStatus}
              onChange={handleChange}
              className="w-full rounded-lg border-2 border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Payment Status
            </label>
            <select
              name="paymentStatus"
              value={data.paymentStatus}
              onChange={handleChange}
              className="w-full rounded-lg border-2 border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
            >
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-all duration-300"
          >
            Update Booking
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateBookingForm;
