import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminDashboard from "../Admin/AdminDashboard";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const backendUrl =
          "https://hotel-managment-system-backend.onrender.com";
        const token = localStorage.getItem("token");

        const response = await axios.get(`${backendUrl}/users/get-users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          setError("Users data is not in the expected format.");
          console.error(
            "Error: Response format is not correct. Expected an array of users."
          );
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users!");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const backendUrl = "https://hotel-managment-system-backend.onrender.com";
      const token = localStorage.getItem("token");

      await axios.delete(`${backendUrl}/users/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user!");
    }
  };

  return (
    <>
      <AdminDashboard />
      <div className="flex flex-col items-center justify-center px-4 py-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-teal-600 mb-6">
          User Management
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {loading ? (
            <div className="flex justify-center items-center w-full h-48">
              <div className="loader animate-spin h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-lg font-semibold text-center">
              {error}
            </p>
          ) : users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="group relative cursor-pointer overflow-hidden bg-white rounded-2xl px-6 pt-12 pb-10 shadow-2xl ring-1 ring-gray-900/5 transition-all duration-500 transform hover:scale-105 hover:shadow-3xl"
              >
                <span className="absolute top-0 left-0 z-0 h-32 w-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-75 transition-all duration-500 transform group-hover:scale-[20]"></span>
                <div className="relative z-10 mx-auto max-w-md">
                  <span className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 transform group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-yellow-500">
                    <svg
                      className="h-12 w-12 text-white"
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
                    <p className="font-medium">
                      <strong>Username:</strong> {user.username}
                      <br />
                      <strong>Email:</strong> {user.email}
                      <br />
                      <strong>Role:</strong> {user.role}
                      <br />
                      <strong>Address:</strong> {user.address}
                      <br />
                      <strong>Phone:</strong> {user.phone}
                    </p>
                  </div>
                  <div className="pt-6 text-lg font-semibold leading-7">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="text-red-500 transition-all duration-500 group-hover:text-white hover:bg-red-500 hover:text-white px-4 py-2 rounded"
                    >
                      Delete User →
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg text-center">
              No users available
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllUsers;
