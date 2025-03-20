import React, { useState } from "react";
import ListProductAtGarage from "./ListProductAtGarage";
import SelectGaragePartial from "./SelectGaragePartial";
import { sAccount } from "../../../AuthCustomer/services/store";
import Navbar2 from "../../../AdminManageAppoinment/partials/Navbar2";

export default function ManageProductAt() {

  return (
    <>
      {sAccount.value.role === "Administrator" && <Navbar2 />}
      <ListProductAtGarage />
    </>
  );
}
