import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";
// import { isTokenExpired } from './jwtUtils';

const PrivateRoute = ({ children }) => {
  const token = useUserStore((state) => state.token);
  console.log(token);
  return true ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
