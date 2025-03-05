import React from "react";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import ListCustomer from "./partials/ListCustomer";

export default function ManageCustomer() {
  return (
    <div className="bg-white shadow-lg p-6">
      <Breadcrumb />
      <ListCustomer />
    </div>
  );
}
