import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const backendUrl = "https://hotel-managment-system-backend.onrender.com";

      const resp = await axios.post(`${backendUrl}/users/login`, userData);

      if (resp?.data) {
        localStorage.setItem("token", resp.data.token);
        toast.success(resp.data.msg);

        if (resp.data.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/account");
        }
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(
        error.response?.data?.msg || "Internal Server Error. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center p-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fHww')",
      }}
    >
      <form
        className="bg-white bg-opacity-90 shadow-2xl rounded-3xl p-10 w-full max-w-md transform hover:scale-105 transition-transform duration-500"
        onSubmit={submitHandler}
      >
        <h1 className="text-center text-3xl font-extrabold text-gray-800 mb-6 tracking-wide">
          Login To your Account
        </h1>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={changeHandler}
              value={userData.email}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition ease-in-out"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              name="password"
              onChange={changeHandler}
              value={userData.password}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition ease-in-out"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Role
            </label>
            <select
              name="role"
              value={userData.role}
              onChange={changeHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition ease-in-out"
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="client">Client</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-800 transition-colors duration-500 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loader w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Log In"
            )}
          </button>
        </div>

        <div className="mt-6 flex justify-between text-sm text-indigo-600">
          <Link to="/register" className="hover:underline">
            Don't have an account?
          </Link>
          <Link to="/forgot-password" className="hover:underline">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
