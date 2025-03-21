import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { AppointmentSignify } from "../services/store/AppointmentSignify";
import { FilterAppointment } from "../services/store/FilterStore";

export default function Navbar() {
  const location = useLocation();
  const isAppointmentActive =
    location.pathname.includes("/appointment") &&
    !location.pathname.includes("/appointment/");

  const { t } = useTranslation("appoinment-admin");

  const navItems = [
    { path: "", label: t("status.all") },
    { path: "waiting", label: t("status.waiting") },
    { path: "approved", label: t("status.approved") },
    { path: "arrival", label: t("status.arrival") },
    { path: "in-progress", label: t("status.in_progress") },
    { path: "completed", label: t("status.completed") },
    { path: "canceled", label: t("status.canceled") },
  ];

  return (
    <nav className="border-b bg-white shadow-md">
      <ul className="grid grid-cols-2 sm:grid-cols-3 font-title md:grid-cols-7 text-center">
        {navItems.map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              onClick={() => {
                FilterAppointment.reset();
              }}
              className={({ isActive }) =>
                (isAppointmentActive && path === "") || isActive
                  ? "text-red-500 border-b-2 font-bold border-red-500 pb-2 block w-full py-3"
                  : "text-black block w-full py-3"
              }
              end
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
