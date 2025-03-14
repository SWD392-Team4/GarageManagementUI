import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isAppointmentActive =
    location.pathname.includes("/appointment") &&
    !location.pathname.includes("/appointment/");

  return (
    <nav className="border-b bg-white shadow-md">
      <ul className="grid grid-cols-2 sm:grid-cols-3 font-title md:grid-cols-6 text-center">
        <li>
          <NavLink
            to=""
            className={() =>
              isAppointmentActive
                ? "text-red-500 border-b-2  font-bold border-red-500 pb-2 block w-full py-3"
                : "text-black block w-full  py-3"
            }
            end
          >
            Tất cả
          </NavLink>
        </li>
        <li>
          <NavLink
            to="waiting"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 border-b-2 font-bold border-red-500 pb-2 block w-full py-3"
                : "text-black block w-full py-3"
            }
          >
            Trạng thái chờ
          </NavLink>
        </li>
        <li>
          <NavLink
            to="approved"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 border-b-2 font-bold border-red-500 pb-2 block w-full py-3"
                : "text-black block w-full py-3"
            }
          >
            Đã xác nhận
          </NavLink>
        </li>
        <li>
          <NavLink
            to="in-progress"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 border-b-2 font-bold border-red-500 pb-2 block w-full py-3"
                : "text-black block w-full py-3"
            }
          >
            Đang thực hiện
          </NavLink>
        </li>
        <li>
          <NavLink
            to="completed"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 border-b-2 font-bold border-red-500 pb-2 block w-full py-3"
                : "text-black block w-full py-3"
            }
          >
            Hoàn Thành
          </NavLink>
        </li>
        <li>
          <NavLink
            to="canceled"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 border-b-2 font-bold border-red-500 pb-2 block w-full py-3"
                : "text-black block w-full py-3"
            }
          >
            Đã hủy
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
