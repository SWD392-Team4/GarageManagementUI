import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
const OverlayText = () => {
  const { t } = useTranslation("about_overview");
  return (
    <div className="relative flex items-center justify-center min-h-[20rem] bg-white text-black h-screen">
      {/* Chữ nền mờ */}
      <h1
        className="absolute text-[4rem] md:text-[5rem] font-extrabold font-raleway select-none
          bg-gradient-to-r from-red-300 via-red-200/65 to-red-300 bg-clip-text text-transparent 
          animate-shine"
        style={{ backgroundSize: "200% auto" }}
      >
        {t("about_overview.brand_name")}
      </h1>
      {/* Nội dung chính */}
      <div className="text-center z-10">
        <div className="flex space-x-4 justify-center mb-4 text-gray-400 text-sm">
          <NavLink
            to="mission"
            className={({ isActive }) =>
              isActive
                ? "cursor-pointer text-red-500 border-b-2 border-red-500"
                : "cursor-pointer hover:text-red-500"
            }
          >
            {t("about_overview.mission")}
          </NavLink>
          <NavLink
            to="vision"
            className={({ isActive }) =>
              isActive
                ? "cursor-pointer text-red-500 border-b-2 border-red-500"
                : "cursor-pointer hover:text-red-500"
            }
          >
            {t("about_overview.vision")}
          </NavLink>
          <NavLink
            to="history"
            className={({ isActive }) =>
              isActive
                ? "cursor-pointer text-red-500 border-b-2 border-red-500"
                : "cursor-pointer hover:text-red-500"
            }
          >
            {t("about_overview.history")}
          </NavLink>
        </div>
        <Outlet />
      </div>{" "}
    </div>
  );
};

export default OverlayText;
