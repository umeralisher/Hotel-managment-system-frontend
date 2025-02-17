import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const backendUrl = "https://hotel-managment-system-backend.onrender.com";
      const resp = await axios.post(`${backendUrl}/users/forget-password`, {
        email,
      });
      toast.success(resp.data.msg);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="border border-gray-300 rounded-lg p-8 bg-white shadow-lg"
        onSubmit={submitHandler}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your email to receive a reset link.
        </p>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter your email"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-800 transition flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="loader w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
