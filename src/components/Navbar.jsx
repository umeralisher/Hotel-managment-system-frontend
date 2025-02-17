import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getUsernameFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = JSON.parse(atob(token.split(".")[1]));
        return user.username;
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
    return null;
  };

  const username = getUsernameFromToken();

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleTabClose = (event) => {
      event.preventDefault();
      if (!event.defaultPrevented) {
        localStorage.removeItem("token");
      }
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  return (
    <header className="text-black body-font border-b border-gray-200 bg-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="logo" className="w-14 h-14 shadow-md" />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-black focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:space-x-8 text-lg text-black font-medium w-full lg:w-auto mt-4 lg:mt-0`}
        >
          <Link
            to="/"
            className="block lg:inline-block hover:text-yellow-300 text-black transition duration-300 px-3 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block lg:inline-block hover:text-yellow-300 text-black transition duration-300 px-3 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/services"
            className="block lg:inline-block hover:text-yellow-300 text-black transition duration-300 px-3 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="block lg:inline-block hover:text-yellow-300 text-black transition duration-300 px-3 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          {username && (
            <Link
              to="/book-now"
              className="block lg:inline-block hover:text-yellow-300 text-black transition duration-300 px-3 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Booking Form
            </Link>
          )}
        </nav>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          {username ? (
            <>
              <span className="text-black text-lg font-semibold hidden lg:block">
                Welcome, {username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full shadow-md transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-wrap space-x-4">
              <Link
                to="/login"
                className="bg-white text-indigo-500 py-2 px-4 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-400 text-white py-2 px-4 rounded-full shadow-md hover:bg-yellow-500 transition duration-300"
              >
                Register
              </Link>
              <Link
                to="/book-now"
                className="bg-green-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition duration-300"
              >
                Book Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
