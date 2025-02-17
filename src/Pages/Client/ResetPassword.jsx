import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Token from URL Params:", token);
    console.log("New Password:", newPassword);

    try {
      const resp = await axios.post(
        `https://hotel-managment-system-backend.onrender.com/users/reset-password/${token}`,
        {
          newPassword,
        }
      );
      console.log("API Response:", resp.data);
      toast.success(resp.data.msg);
      navigate("/login");
    } catch (error) {
      console.error("Error Response:", error.response);
      toast.error(error.response?.data?.msg || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="border border-gray-300 rounded-lg p-8 bg-white shadow-lg"
        onSubmit={submitHandler}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your new password below.
        </p>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter a new password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-800 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
