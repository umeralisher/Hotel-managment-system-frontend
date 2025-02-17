import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BookingForm = () => {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    user: "",
    room: "",
    checkInDate: "",
    checkOutDate: "",
    totalAmount: "",
    paymentStatus: "unpaid",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const backendUrl =
          "https://hotel-managment-system-backend.onrender.com";

        const roomsResponse = await axios.get(`${backendUrl}/rooms/get-rooms`);
        const allRooms = roomsResponse.data;

        const availableRooms = allRooms.filter(
          (room) => room.status === "available"
        );

        setRooms(availableRooms);
      } catch (err) {
        setError("Could not fetch rooms. Please try again.");
      }
    };

    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const backendUrl = "https://hotel-managment-system-backend.onrender.com";
      if (!token) {
        toast.error("You must be logged in to make a booking.");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/bookings/create-booking`,
        {
          user: formData.user,
          room: formData.room,
          checkInDate: formData.checkInDate,
          checkOutDate: formData.checkOutDate,
          totalAmount: formData.totalAmount,
          paymentStatus: formData.paymentStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Booking created successfully!");
      setFormData({
        user: "",
        room: "",
        checkInDate: "",
        checkOutDate: "",
        totalAmount: "",
        paymentStatus: "unpaid",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Booking creation failed. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-10 mt-20">
      <form
        className="border-2 border-solid p-6 rounded-md shadow-xl w-full max-w-lg bg-white"
        onSubmit={submitHandler}
      >
        <h1 className="text-center font-bold text-2xl m-3 font-mono">
          Book a Room
        </h1>
        <hr />
        <br />

        {/* User Input */}
        <div className="mb-6">
          <label className="mb-2 text-gray-600 text-sm font-medium">
            Your Name
          </label>
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
            placeholder="Enter your name"
            className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
            required
          />
        </div>

        {/* Room Selection Dropdown */}
        <div className="mb-6">
          <label className="mb-2 text-gray-600 text-sm font-medium">
            Select Room
          </label>
          <select
            name="room"
            value={formData.room}
            onChange={handleChange}
            className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
            required
          >
            <option value="" disabled>
              Select a Room
            </option>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  {room.roomNumber} - {room.roomType}
                </option>
              ))
            ) : (
              <option disabled>No available rooms</option>
            )}
          </select>
        </div>

        {/* Check-in and Check-out Dates */}
        <div className="flex gap-x-6 mb-6">
          <div className="w-full">
            <label className="mb-2 text-gray-600 text-sm font-medium">
              Check-in Date
            </label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
              required
            />
          </div>
          <div className="w-full">
            <label className="mb-2 text-gray-600 text-sm font-medium">
              Check-out Date
            </label>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
              required
            />
          </div>
        </div>

        {/* Total Amount */}
        <div className="mb-6">
          <label className="mb-2 text-gray-600 text-sm font-medium">
            Total Amount
          </label>
          <input
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
            required
          />
        </div>

        {/* Payment Status */}
        <div className="mb-6">
          <label className="mb-2 text-gray-600 text-sm font-medium">
            Payment Status
          </label>
          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
            required
          >
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-52 h-12 shadow-sm rounded-full bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 text-white text-base font-semibold mt-6"
        >
          Book Room
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
