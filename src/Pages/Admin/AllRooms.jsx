import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminDashboard from "../Admin/AdminDashboard";

const AllRooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const backendUrl =
          "https://hotel-managment-system-backend.onrender.com";
        const response = await axios.get(`${backendUrl}/rooms/get-rooms`);

        if (response.status === 200 && Array.isArray(response.data)) {
          setRooms(response.data);
        } else {
          setError("Rooms data is not in the expected format.");
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load rooms!");
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleDelete = async (roomId) => {
    try {
      const backendUrl = "https://hotel-managment-system-backend.onrender.com";
      await axios.delete(`${backendUrl}/rooms/del-rooms/${roomId}`);

      setRooms(rooms.filter((room) => room._id !== roomId));
      toast.success("Room deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete room!");
    }
  };

  const handleUpdate = (room) => {
    navigate(`/rooms/update/${room._id}`, { state: { room } });
  };

  return (
    <>
      <AdminDashboard />
      <div className="p-5">
        <h1 className="text-2xl font-bold text-center mb-5">Available Rooms</h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
              <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        ) : rooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="group relative cursor-pointer overflow-hidden bg-white rounded-2xl px-6 pt-6 pb-10 shadow-2xl ring-1 ring-gray-900/5 transition-all duration-500 transform hover:scale-105 hover:shadow-3xl sm:mx-auto sm:max-w-sm sm:px-12"
              >
                {/* Display room image if available */}
                {room.image && (
                  <img
                    src={room.image}
                    alt={room.roomType}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <span className="absolute top-0 left-0 z-0 h-32 w-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-75 transition-all duration-500 transform group-hover:scale-[20]"></span>
                <div className="relative z-10 mx-auto max-w-md">
                  <div className="space-y-4 text-lg leading-8 text-gray-700 transition-all duration-500 group-hover:text-white">
                    <h2 className="text-xl font-bold">
                      {room.roomNumber} - {room.roomType}
                    </h2>
                    <p>{room.description}</p>
                    <p>Price per night: ${room.pricePerNight}</p>
                    <p>Status: {room.status}</p>
                    <p
                      className={`text-sm ${
                        room.isActive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {room.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                  <div className="pt-6 text-lg font-semibold leading-7 flex justify-between">
                    <button
                      onClick={() => handleUpdate(room)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Update Room
                    </button>
                    <button
                      onClick={() => handleDelete(room._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete Room
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">No rooms available</p>
        )}
      </div>
    </>
  );
};

export default AllRooms;
