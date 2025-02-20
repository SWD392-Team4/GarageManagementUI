import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./partials/Navbar";
import Breadcrumb from "./partials/Breadcrumb";

export default function LayoutAppointment() {
  return (
    <div className=" bg-gray-100">
      {" "}
      <Breadcrumb />
      <Navbar />
      <div className="py-4">
        <Outlet />
      </div>
    </div>
  );
}
