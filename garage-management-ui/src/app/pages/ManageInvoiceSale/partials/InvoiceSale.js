import React from "react";
import Navbar2 from "../../AdminManageAppoinment/partials/Navbar2";
import { sAccount } from "../../AuthCustomer/services/store";
import ListInvoiceSale from "./ListInvoiceSale";

export default function InvoiceSale() {
  return (
    <>
      {sAccount.value.role === "Administrator" && <Navbar2 />}
      <ListInvoiceSale />
    </>
  );
}
