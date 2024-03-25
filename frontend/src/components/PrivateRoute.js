import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = () => {
  const {user} = useAuth();
  console.log('User', user);
  if (!user) return <Navigate to="/login" />;
  console.log("Logged in as " + user.userId);
  return <Outlet />;
};

export default PrivateRoute;