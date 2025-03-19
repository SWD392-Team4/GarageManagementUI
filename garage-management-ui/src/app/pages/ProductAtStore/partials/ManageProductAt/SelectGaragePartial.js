import React, { useEffect, useState } from "react";
import { getAllStore } from "../../services/ProductAtStoreAPI";
import { NavLink } from "react-router-dom";

export default function SelectGaragePartial({
  selectedGarageId,
  onSelecteGarage,
}) {
  const [garages, setGarages] = useState([]);

  useEffect(() => {
    const fetchGarages = async () => {
      const response = await getAllStore();
      const garageList = response?.data?.value;
      setGarages(garageList);
      if (garageList.length > 0) {
        onSelecteGarage(garageList[0].id);
      }
    };

    fetchGarages();
  }, [onSelecteGarage]);

  return (
    <nav className="border-b bg-white shadow-md mb-3">
      <ul className="grid grid-cols-2 sm:grid-cols-2 font-title text-center">
        {garages.map((garages) => (
          <li key={garages.id}>
            <NavLink
              className={() =>
                selectedGarageId === garages.id
                  ? "text-red-500 border-b-2 font-bold border-red-500 pb-2 block w-full py-3"
                  : "text-black block w-full py-3"
              }
              onClick={() => onSelecteGarage(garages.id)}
            >
              {garages.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
