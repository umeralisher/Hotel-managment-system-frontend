import React, { useEffect, useState } from "react";
import axios from "axios";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const backendUrl =
          "https://hotel-managment-system-backend.onrender.com";
        const resp = await axios.get(`${backendUrl}/users/account`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(resp.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user details. Please log in again.");
      }
    };

    fetchUser();
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-b from-indigo-500 via-blue-400 to-blue-300 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-6 animate-pulse">
        🌟 Welcome to Our Hotel, {user.username}! 🌟
      </h1>
      <p className="text-2xl italic mb-6">
        Your ultimate destination for luxury, comfort, and unforgettable
        experiences. 🏨✨
      </p>

      <div className="mt-10 text-center">
        <h2 className="text-3xl font-bold mb-4">An Exclusive Welcome</h2>
        <p className="text-lg leading-relaxed">
          At <span className="font-bold italic">GrandStay Hotel</span>, we don’t
          just provide rooms—we create cherished memories. Relax in our
          world-class amenities, indulge in our gourmet dining experiences, and
          let us cater to your every need. 💎
        </p>
        <p className="text-lg mt-4">
          Thank you for choosing{" "}
          <span className="font-semibold italic">GrandStay Hotel</span>—your
          home away from home. We're honored to have you as our valued guest.
        </p>
      </div>
    </div>
  );
};

export default AccountPage;
