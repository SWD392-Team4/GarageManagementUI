import React from "react";
import { Outlet } from "react-router-dom";
import Navbar1 from "../../AdminManageAppoinment/partials/Navbar";
import Breadcrumb from "../../AdminManageAppoinment/partials/Breadcrumb";
import Navbar2 from "../../AdminManageAppoinment/partials/Navbar2";
import { sAccount } from "../../AuthCustomer/services/store";

export default function LayoutAppointment() {
  return (
    <div className=" bg-gray-100 md:p-1">
      {" "}
      <Breadcrumb />
      {sAccount.value.role === "Administrator" && <Navbar2 />}
      <Navbar1 />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
