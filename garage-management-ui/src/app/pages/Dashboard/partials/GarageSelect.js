import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllGara } from "../../AdminManageAppoinment/services/AppointmentService";
import { AppointmentSignify } from "../../AdminManageAppoinment/services/store/AppointmentSignify";

export default function GarageSelect() {
  const [data, setData] = useState([]);

  const fetchGara = useCallback(async () => {
    try {
      const response = await getAllGara();
      if (response.data.value) {
        AppointmentSignify.set((v) => {
          v.value.garaCurrent = response.data.value[0].id;
        });
        setData(response.data.value);
      } else {
        console.error("Loading goods receipt failed");
      }
    } catch (error) {
      console.error("Error fetching goods receipt: ", error);
    }
  }, []);

  useEffect(() => {
    fetchGara();
  }, [fetchGara]);

  // Hàm cập nhật gara hiện tại khi chọn
  const handleSelectGara = (id) => {
    AppointmentSignify.set((v) => {
      v.value.garaCurrent = id;
    });
  };

  return (
    <nav className=" bg-white ">
      <ul className="grid grid-cols-2 sm:grid-cols-2 font-title text-center ">
        {data.map((gara) => (
          <li key={gara.id} className="font-medium">
            <NavLink
              className={() =>
                AppointmentSignify.value.garaCurrent === gara.id
                  ? "text-red-500 border-b-2 font-bold border-red-500 pb-2 block w-full py-3"
                  : "text-black block w-full py-3"
              }
              onClick={() => handleSelectGara(gara.id)}
            >
              {gara.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
