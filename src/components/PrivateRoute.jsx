import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ roles, children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  const user = JSON.parse(atob(token.split(".")[1]));
  if (!roles.includes(user.role)) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
