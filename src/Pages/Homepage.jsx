import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const images = [
  "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1661929519129-7a76946c1d38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdGVsfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1661676056771-f6c2711249e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGhvdGVsfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGhvdGVsfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1682001285904-0e59c1c87c59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvdGVsJTIwZmVtYWxlfGVufDB8fDB8fHww",
];

export const Homepage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div
        className="hero min-h-screen bg-cover bg-center transition-all duration-500 ease-in-out"
        style={{ backgroundImage: `url('${images[currentImageIndex]}')` }}
      >
        <div className="hero-overlay bg-opacity-50"></div>
        <div className="hero-content text-center text-white">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold" data-aos="zoom-out-right">
              Welcome to THE SEA
            </h1>
            <p className="py-6 text-1xl" data-aos="fade-up">
              Experience luxury, comfort, and world-class hospitality in the
              heart of Lahore. Whether you're traveling for business or leisure,
              we ensure a stay that is both memorable and relaxing.
            </p>
            <h2 className="text-2xl font-bold mb-2">Book Your Stay Today</h2>
            <div class="flex justify-center"  data-aos="fade-down-right">
              <Link to="/book-now">
                <button class="relative overflow-hidden h-12 px-8 rounded-full bg-gray-800 text-white border-none cursor-pointer group">
                  <span class="relative z-10">Book Now</span>
                  <span class="absolute inset-0 transform scale-x-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-transform duration-[475ms] origin-left group-hover:scale-x-100"></span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
