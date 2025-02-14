import React from "react";
import { Navigate } from "react-router-dom";

const RedirectRoute = ({ to }) => {
  return <Navigate to={to} replace />;
};

export default RedirectRoute;
