import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BookingForm = () => {
  const [rooms, setRooms] = useState([]);
  const [roomPrice, setRoomPrice] = useState(0);
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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If room is selected
    if (name === "room") {
      const selectedRoom = rooms.find((r) => r._id === value);
      if (selectedRoom) {
        setRoomPrice(selectedRoom.pricePerNight);
      }
    }

    // If check-in or check-out date changes, calculate total
    if (
      (name === "checkInDate" || name === "checkOutDate" || name === "room") &&
      (formData.checkInDate || name === "checkInDate") &&
      (formData.checkOutDate || name === "checkOutDate") &&
      (formData.room || name === "room")
    ) {
      const checkIn = name === "checkInDate" ? value : formData.checkInDate;
      const checkOut = name === "checkOutDate" ? value : formData.checkOutDate;
      const selectedRoomId = name === "room" ? value : formData.room;

      const selectedRoom = rooms.find((r) => r._id === selectedRoomId);
      if (checkIn && checkOut && selectedRoom) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const diffTime = checkOutDate - checkInDate;
        const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (nights > 0) {
          const total = (nights * selectedRoom.pricePerNight).toFixed(2);
          setFormData((prev) => ({
            ...prev,
            totalAmount: total,
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            totalAmount: "",
          }));
        }
      }
    }
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

        {/* User Name */}
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

        {/* Room Selection */}
        <div className="mb-2">
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
        {roomPrice > 0 && (
          <p className="text-sm text-gray-500 mb-4">
            Price per night: Rs {roomPrice}
          </p>
        )}

        {/* Check-in & Check-out */}
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

        {/* Total Amount - read only */}
        <div className="mb-6">
          <label className="mb-2 text-gray-600 text-sm font-medium">
            Total Amount
          </label>
          <input
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            readOnly
            className="block w-full h-11 px-5 py-2.5 bg-gray-100 border border-gray-300 rounded-full"
            placeholder="Total will be auto-calculated"
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
          disabled={!formData.totalAmount}
        >
          Book Room
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
