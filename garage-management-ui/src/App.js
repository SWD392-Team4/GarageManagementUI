import React from "react";

import { ToastContainer } from "react-toastify";
import MainRoutes from "./app/routers/MainRoutes";
import "./app/hooks/i18n/i18n";
export default function App() {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <MainRoutes />
    </>
  );
}
