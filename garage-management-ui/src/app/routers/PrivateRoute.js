import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserService from "../hooks/services/UserService";

export default function PrivateRoute({ children, allowedRoles = [] }) {
  const userService = new UserService();
  const isAuthenticated = localStorage.getItem("at");
  const userRole = userService.getRoleFromToken();

  if (!isAuthenticated) {
    return <Navigate to="/authen" />;
  }

  if (userRole === null) {
    return <Navigate to={userService.navigateBasedOnRole()} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to={userService.navigateBasedOnRole()} />;
  }

  return children || <Outlet />;
}
