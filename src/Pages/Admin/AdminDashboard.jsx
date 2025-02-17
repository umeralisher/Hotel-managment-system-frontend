import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  FaHome,
  FaEnvelope,
  FaInfoCircle,
  FaServicestack,
  FaUsers,
  FaClipboardList,
  FaBed,
  FaPlusCircle,
  FaAddressBook,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      {/* Header with Button */}
      <header className="bg-purple-800 text-gray-100 shadow-md">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between text-center">
          {/* Logo & Branding */}
          <Link
            to="/"
            className="flex title-font font-medium items-center text-gray-100 mb-4 md:mb-0"
          >
            <img src={logo} alt="logo" className="w-12 h-12" />
            <span className="ml-3 text-2xl font-semibold ">
              Hotel Admin Dashboard
            </span>
          </Link>

          {/* Toggle Drawer Button */}
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={toggleDrawer}
          >
            {isDrawerOpen ? "Close Menu" : "Show Menu"}
          </button>
        </div>
      </header>

      {/* Drawer Navigation */}
      {isDrawerOpen && (
        <div className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto bg-purple-800 w-64 dark:bg-purple-800 transition-transform transform">
          <button
            type="button"
            onClick={toggleDrawer}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>

          <div className="py-4">
            <ul className="space-y-2 font-medium">
              {/* Additional Links */}
              <li>
                <Link
                  to="/"
                  className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-700"
                >
                  <FaHome className="w-5 h-5 text-gray-400" />
                  <span className="ml-3">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-700"
                >
                  <FaInfoCircle className="w-5 h-5 text-gray-400" />
                  <span className="ml-3">About</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-700"
                >
                  <FaServicestack className="w-5 h-5 text-gray-400" />
                  <span className="ml-3">Services</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-700"
                >
                  <FaEnvelope className="w-5 h-5 text-gray-400" />
                  <span className="ml-3">Contact</span>
                </Link>
              </li>

              {/* Admin Panel Links */}
              <li>
                <Link
                  to="/all-users"
                  className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-700"
                >
                  <FaUsers className="w-5 h-5 text-gray-400" />
                  <span className="ml-3">All Users</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/all-bookings"
                  className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-700"
                >
                  <FaClipboardList className="w-5 h-5 text-gray-400" />
                  <span className="ml-3">All Bookings</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/all-rooms"
                  className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-700"
                >
                  <FaBed className="w-5 h-5 text-gray-400" />
                  <span className="ml-3">All Rooms</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/room-create"
                  className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-700"
                >
                  <FaPlusCircle className="w-5 h-5 text-gray-400" />
                  <span className="ml-3">Create Room</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/all-contacts"
                  className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-700"
                >
                  <FaAddressBook className="w-5 h-5 text-gray-400" />
                  <span className="ml-3">All Contacts</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      <br />
      <h1 className="text-center text-5xl text-cyan-400 font-extrabold">
        Welcome Admin!
      </h1>
    </div>
  );
};

export default AdminDashboard;
