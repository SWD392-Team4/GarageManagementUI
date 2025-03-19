import React from "react";
import ManageInvoiceSale from "./ManageInvoiceSale/ManageInvoiceSale";
import ManageProductAt from "./ManageProductAt/ManageProductAt";

export default function ProductAt() {
  return (
    <>
      <div className="border border-gray-200 p-4 rounded-md bg-gray-50">
        <ManageProductAt />
      </div>

      <div className="border border-gray-200 p-4 rounded-md bg-gray-50 mt-5">
        <ManageInvoiceSale />
      </div>
    </>
  );
}
