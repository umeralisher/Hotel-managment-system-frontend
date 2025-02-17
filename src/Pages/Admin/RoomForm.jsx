import axios from "axios";
import FileBase64 from "react-file-base64";
import { toast } from "react-toastify";
import React, { useState } from "react";
import AdminDashboard from "../Admin/AdminDashboard";

const RoomForm = () => {
  const [roomData, setRoomData] = useState({
    roomNumber: "",
    roomType: "single",
    description: "",
    pricePerNight: "",
    status: "available",
    isActive: "true",
    image: "",
  });

  const [fileName, setFileName] = useState("");

  const changeHandler = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (file) => {
    setRoomData({ ...roomData, image: file.base64 });
    setFileName(file.name || "Uploaded File");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...roomData,
      pricePerNight: Number(roomData.pricePerNight),
      isActive: roomData.isActive === "true",
    };

    try {
      const backendUrl = "https://hotel-managment-system-backend.onrender.com";

      const resp = await axios.post(
        `${backendUrl}/rooms/create-rooms`,
        formattedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(resp.data.msg);
      setRoomData({
        roomNumber: "",
        roomType: "",
        description: "",
        pricePerNight: "",
        status: "",
        isActive: "true",
        image: "",
      });
    } catch (error) {
      console.error("Submission Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.msg || "Something went wrong!");
    }
  };

  return (
    <>
      <AdminDashboard />
      <div
        className="flex justify-center items-center min-h-screen py-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fHww')",
        }}
      >
        <form
          className="bg-white bg-opacity-90 shadow-2xl rounded-3xl p-10 w-full max-w-lg transform hover:scale-105 transition-transform duration-500"
          onSubmit={submitHandler}
        >
          <h1 className="text-center text-3xl font-extrabold text-gray-800 mb-6 tracking-wide">
            Add Room Details
          </h1>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Room Number
              </label>
              <input
                type="text"
                placeholder="Enter Room Number"
                name="roomNumber"
                onChange={changeHandler}
                value={roomData.roomNumber}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition ease-in-out"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Room Type
              </label>
              <select
                name="roomType"
                value={roomData.roomType}
                onChange={changeHandler}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition ease-in-out"
                required
              >
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
                <option value="family">Family</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter room description"
                onChange={changeHandler}
                value={roomData.description}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition ease-in-out"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Price Per Night
              </label>
              <input
                type="number"
                placeholder="Enter Price Per Night"
                name="pricePerNight"
                onChange={changeHandler}
                value={roomData.pricePerNight}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition ease-in-out"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Status
              </label>
              <select
                name="status"
                value={roomData.status}
                onChange={changeHandler}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition ease-in-out"
                required
              >
                <option value="available">Available</option>
                <option value="booked">Booked</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Active Status
              </label>
              <select
                name="isActive"
                value={roomData.isActive}
                onChange={changeHandler}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition ease-in-out"
                required
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Room Image
              </label>
              <FileBase64 multiple={false} onDone={handleFileUpload} />
              {fileName && (
                <p className="text-gray-500 text-sm mt-2">
                  Uploaded: {fileName}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-800 transition-colors duration-500"
            >
              Add Room
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RoomForm;
