import React from "react";
import ManageInvoiceSale from "./ManageInvoiceSale/ManageInvoiceSale";
import ManageProductAt from "./ManageProductAt/ManageProductAt";
import { sAccount } from "../../AuthCustomer/services/store";

export default function ProductAt() {
  return (
    <>
      <div className="border border-gray-200 p-4 rounded-md bg-gray-50">
        <ManageProductAt />
      </div>

      {sAccount.value.role !== "Mechanic" &&
        sAccount.value.role !== "WarehouseManager" && (
          <div className="border border-gray-200 p-4 rounded-md bg-gray-50 mt-5">
            <ManageInvoiceSale />
          </div>
        )}
    </>
  );
}
