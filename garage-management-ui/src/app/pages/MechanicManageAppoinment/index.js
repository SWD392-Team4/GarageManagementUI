import React from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";

export default function MechanicManageAppointment() {
  return (
    <div className=" bg-gray-100 md:p-6 p-2">
      {" "}
      <Breadcrumb />
      <div className="py-4">
        <Outlet />
      </div>
    </div>
  );
}
