import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const OverlayText = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[20rem] bg-white text-black">
      {/* Chữ nền mờ */}
      {/* <h1
        className="absolute text-[4rem] md:text-[5rem] font-extrabold font-raleway select-none
          bg-gradient-to-r from-gray-800 via-gray-400/65 to-gray-800 bg-clip-text text-transparent 
          animate-shine"
        style={{ backgroundSize: "200% auto" }}
      >
        ABOUT COMPANY
      </h1> */}
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
            MISSION
          </NavLink>
          <NavLink
            to="vision"
            className={({ isActive }) =>
              isActive
                ? "cursor-pointer text-red-500 border-b-2 border-red-500"
                : "cursor-pointer hover:text-red-500"
            }
          >
            VISION
          </NavLink>
          <NavLink
            to="history"
            className={({ isActive }) =>
              isActive
                ? "cursor-pointer text-red-500 border-b-2 border-red-500"
                : "cursor-pointer hover:text-red-500"
            }
          >
            HISTORY
          </NavLink>
        </div>
        <Outlet />
      </div>{" "}
    </div>
  );
};

export default OverlayText;
