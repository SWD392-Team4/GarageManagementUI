import React from "react";
import ListProductAtWareHouse from "./ListProductAtWareHouse";
import { sAccount } from "../../../AuthCustomer/services/store";
import Nav3 from "../component/Nav3";

export default function ManageProductAt() {
  return (
    <>
      {sAccount.value.role === "Administrator" && <Nav3 />}
      <ListProductAtWareHouse />
    </>
  );
}
