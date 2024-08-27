import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";

const PrivateRoute = ({ children }) => {
  const token = useUserStore((state) => state.token);
  console.log(token);
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
