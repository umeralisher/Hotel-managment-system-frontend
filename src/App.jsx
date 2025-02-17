import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./Pages/Client/Register";
import Login from "./Pages/Client/Login";
import ForgotPassword from "./Pages/Client/ForgotPassword";
import ResetPassword from "./Pages/Client/ResetPassword";
import RoomForm from "../src/Pages/Admin/RoomForm";
import Contact from "./Pages/Client/Contact";
import { About } from "./Pages/Client/About";
import BookingForm from "./Pages/Client/BookingForm";
import AllRooms from "../src/Pages/Admin/AllRooms";
import AllBookings from "../src/Pages/Admin/AllBookings";
import AllUsers from "../src/Pages/Admin/AllUsers";
import AllContacts from "../src/Pages/Admin/AllContacts";
import UpdateBookingForm from "../src/Pages/Admin/UpdateBookingForm";
import UpdateRoomForm from "../src/Pages/Admin/UpdateRoomFrom";
import AdminDashboard from "../src/Pages/Admin/AdminDashboard";
import AccountPage from "./Pages/Client/AcountPage";
import PrivateRoute from "./components/PrivateRoute";
import Services from "./Pages/Client/Services";
import NotFoundPage from "./Pages/Client/NotFoundPage";
import Footer from "./components/Footer";
import { Homepage } from "./Pages/Homepage";
import AOS from "aos";
import "aos/dist/aos.css";
import ClientReviews from "./Pages/Client/Clintrev";

import "react-toastify/dist/ReactToastify.css";

AOS.init();

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Homepage />
                <About />
                <Services />
                <ClientReviews />
              </>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* Client Routes */}
          <Route
            path="/book-now"
            element={
              <PrivateRoute roles={["client"]}>
                <BookingForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute roles={["client"]}>
                <AccountPage />
              </PrivateRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/room-create"
            element={
              <PrivateRoute roles={["admin"]}>
                <RoomForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/all-rooms"
            element={
              <PrivateRoute roles={["admin"]}>
                <AllRooms />
              </PrivateRoute>
            }
          />
          <Route
            path="/all-bookings"
            element={
              <PrivateRoute roles={["admin"]}>
                <AllBookings />
              </PrivateRoute>
            }
          />
          <Route
            path="/all-users"
            element={
              <PrivateRoute roles={["admin"]}>
                <AllUsers />
              </PrivateRoute>
            }
          />
          <Route
            path="/all-contacts"
            element={
              <PrivateRoute roles={["admin"]}>
                <AllContacts />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-booking/:id"
            element={
              <PrivateRoute roles={["admin"]}>
                <UpdateBookingForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/rooms/update/:roomId"
            element={
              <PrivateRoute roles={["admin"]}>
                <UpdateRoomForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute roles={["admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
