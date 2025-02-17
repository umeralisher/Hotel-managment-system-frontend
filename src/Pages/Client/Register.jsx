import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    // Validation checks
    if (userData.firstname.length < 3) {
      toast.error("First name must be at least 3 characters long!");
      setIsLoading(false);
      return;
    }
    if (userData.lastname.length < 3) {
      toast.error("Last name must be at least 3 characters long!");
      setIsLoading(false);
      return;
    }
    if (userData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      setIsLoading(false);
      return;
    }
    if (userData.address.length < 5) {
      toast.error("Address must be at least 5 characters long!");
      setIsLoading(false);
      return;
    }

    // Phone number validation
    const phoneRegex = /^03\d{9}$/;
    if (!phoneRegex.test(userData.phone)) {
      toast.error("Phone number must start with '03' and be 11 digits long!");
      setIsLoading(false);
      return;
    }

    try {
      const backendUrl = "https://hotel-managment-system-backend.onrender.com";

      const response = await axios.post(
        `${backendUrl}/users/register`,
        userData
      );

      if (response?.data?.msg) {
        toast.success(response.data.msg);
        navigate("/login");

        setUserData({
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
          role: "",
          phone: "",
          address: "",
        });
      } else {
        throw new Error("Unexpected response format from server.");
      }
    } catch (error) {
      console.error("Registration Error:", error);

      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.error ||
        error.message ||
        "Failed to register!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false); // Stop loading
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
      <form
        className="border-2 border-solid p-4 rounded-xl shadow-2xl w-full max-w-md bg-white bg-opacity-90"
        onSubmit={submitHandler}
      >
        <h1 className="text-center font-bold text-xl mb-4 font-mono">
          Register Your Account
        </h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <InputField
            label="First Name"
            name="firstname"
            value={userData.firstname}
            onChange={changeHandler}
            placeholder="First Name"
          />
          <InputField
            label="Last Name"
            name="lastname"
            value={userData.lastname}
            onChange={changeHandler}
            placeholder="Last Name"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <InputField
            label="Username"
            name="username"
            value={userData.username}
            onChange={changeHandler}
            placeholder="Username"
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={userData.email}
            onChange={changeHandler}
            placeholder="Email"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <InputField
            label="Password"
            name="password"
            type="password"
            value={userData.password}
            onChange={changeHandler}
            placeholder="********"
          />
          <SelectField
            label="Role"
            name="role"
            value={userData.role}
            onChange={changeHandler}
            options={[
              { value: "", label: "Select Role" },
              { value: "admin", label: "Admin" },
              { value: "client", label: "Client" },
            ]}
          />
        </div>
        <InputField
          label="Phone"
          name="phone"
          value={userData.phone}
          onChange={changeHandler}
          placeholder="03000000000"
        />
        <TextareaField
          label="Address"
          name="address"
          value={userData.address}
          onChange={changeHandler}
        />
        <button
          type="submit"
          className="w-full h-12 shadow-md rounded-full bg-indigo-600 hover:bg-indigo-800 transition-all duration-500 text-white text-base font-semibold mt-4 flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="loader w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Register"
          )}
        </button>
        <Link to="/login">
          <p className="text-center text-indigo-600 mt-3">
            Already have an account? Login
          </p>
        </Link>
      </form>
    </div>
  );
};

const InputField = ({ label, type = "text", ...props }) => (
  <div className="w-full">
    <label className="block mb-1 text-gray-600 text-sm font-medium">
      {label}
    </label>
    <input
      type={type}
      className="block w-full h-10 px-4 py-2 bg-white text-sm shadow-sm border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
      {...props}
    />
  </div>
);

const TextareaField = ({ label, ...props }) => (
  <div className="w-full mb-4">
    <label className="block mb-1 text-gray-600 text-sm font-medium">
      {label}
    </label>
    <textarea
      className="block w-full h-20 px-4 py-2 bg-white text-sm shadow-sm border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none"
      {...props}
    />
  </div>
);

const SelectField = ({ label, options, ...props }) => (
  <div className="w-full">
    <label className="block mb-1 text-gray-600 text-sm font-medium">
      {label}
    </label>
    <select
      className="block w-full h-10 px-4 py-2 bg-white text-sm shadow-sm border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default Register;
