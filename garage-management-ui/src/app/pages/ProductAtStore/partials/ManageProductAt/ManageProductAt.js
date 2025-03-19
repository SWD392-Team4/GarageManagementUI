import React, { useState } from "react";
import ListProductAtGarage from "./ListProductAtGarage";
import SelectGaragePartial from "./SelectGaragePartial";
import { sAccount } from "../../../AuthCustomer/services/store";

export default function ManageProductAt() {
  const [selectedGarageId, setSelectedGarageId] = useState(null);

  console.log("Check id :", selectedGarageId);

  return (
    <>
      {sAccount.value.role === "Administrator" && (
        <SelectGaragePartial
          selectedGarageId={selectedGarageId}
          onSelecteGarage={setSelectedGarageId}
        />
      )}
      {selectedGarageId && <ListProductAtGarage garageId={selectedGarageId} />}
    </>
  );
}
