import React from "react";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import ProductAt from "./partials/ProductAt";

export default function ProductAtStore() {
  return (
    <div className="bg-white shadow-lg p-6">
      <Breadcrumb />
      <ProductAt />
    </div>
  );
}
