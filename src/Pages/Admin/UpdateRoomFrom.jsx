import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const UpdateRoomForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { room } = location.state || {};

  const [updatedRoom, setUpdatedRoom] = useState({
    roomNumber: room?.roomNumber || "",
    roomType: room?.roomType || "",
    description: room?.description || "",
    pricePerNight: room?.pricePerNight || "",
    status: room?.status || "available",
    isActive: room?.isActive || false,
  });

  const backendUrl = "https://hotel-managment-system-backend.onrender.com";

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedRoom((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${backendUrl}/rooms/update-rooms/${room._id}`,
        updatedRoom
      );

      if (response.status === 200) {
        toast.success("Room updated successfully!");
        navigate("/all-rooms");
      }
    } catch (error) {
      toast.error("Failed to update room!");
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
          Update Room
        </h1>
        <hr className="mb-6" />

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Room Number Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Room Number
            </label>
            <input
              type="text"
              name="roomNumber"
              value={updatedRoom.roomNumber}
              onChange={handleInputChange}
              className="w-full rounded-lg border-2 border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
              required
            />
          </div>

          {/* Room Type Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Room Type
            </label>
            <input
              type="text"
              name="roomType"
              value={updatedRoom.roomType}
              onChange={handleInputChange}
              className="w-full rounded-lg border-2 border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={updatedRoom.description}
              onChange={handleInputChange}
              className="w-full rounded-lg border-2 border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
              required
            />
          </div>

          {/* Price Per Night Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Price Per Night
            </label>
            <input
              type="number"
              name="pricePerNight"
              value={updatedRoom.pricePerNight}
              onChange={handleInputChange}
              className="w-full rounded-lg border-2 border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
              required
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <select
              name="status"
              value={updatedRoom.status}
              onChange={handleInputChange}
              className="w-full rounded-lg border-2 border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
              required
            >
              <option value="available">Available</option>
              <option value="booked">Booked</option>
            </select>
          </div>

          {/* Active Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={updatedRoom.isActive}
              onChange={handleInputChange}
              className="w-5 h-5 text-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"
            />
            <label className="ml-3 text-sm font-medium text-gray-600">
              Active
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-all duration-300"
          >
            Update Room
          </button>
          <button
            type="button"
            onClick={() => navigate("/all-rooms")} // Navigate back to rooms list
            className="w-full py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-300 mt-4"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoomForm;
