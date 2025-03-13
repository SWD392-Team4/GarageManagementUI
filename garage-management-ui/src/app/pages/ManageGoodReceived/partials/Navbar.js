import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { getAllWarehouse } from "../service/GoodsReceivedService";
import { sGoodsReceivedGara } from "../service/GoodsReceivedSignify";

export default function Navbar() {
  const [data, setData] = useState([]);

  const fetchWarehouse = useCallback(async () => {
    try {
      const response = await getAllWarehouse();
      if (response.data.value) {
        sGoodsReceivedGara.set((v) => {
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
    fetchWarehouse();
  }, [fetchWarehouse]);

  // Hàm cập nhật gara hiện tại khi chọn
  const handleSelectGara = (id) => {
    sGoodsReceivedGara.set((v) => {
      v.value.garaCurrent = id;
    });
  };

  return (
    <nav className="border-b bg-white shadow-md mb-3">
      <ul className="grid grid-cols-2 sm:grid-cols-2 font-title text-center ">
        {data.map((gara) => (
          <li key={gara.id}>
            <NavLink
              className={() =>
                sGoodsReceivedGara.value.garaCurrent === gara.id
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
