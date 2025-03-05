import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { LuSettings, LuLogOut } from "react-icons/lu";

import { sAccount } from "../../pages/AuthCustomer/services/store";
import { useTranslation } from "react-i18next";
import { useHandleLogout } from "./service/logout";
import Notification from "../../pages/Notification/Notification";
const ssAccountAvatar = sAccount.slice((n) => n.ImageLink);
const ssAccountLastName = sAccount.slice((n) => n.LastName);
const ssAccountFirstName = sAccount.slice((n) => n.FirstName);

export default function ButtonAccount() {
  const { t } = useTranslation("bttnSignIn");
  const [isOpen, setIsOpen] = useState(false);
  const [isLogIn, setIsLogIn] = useState(localStorage.getItem("at"));
  const handleLogout = useHandleLogout();
  if (isLogIn) {
    return (
      <>
        <div className="flex items-center space-x-4">
          <div className="relative inline-block text-left ">
            {/* Nút chính */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center px-4 py-2 w-40 bg-gray-100/20 text-white rounded-lg shadow-md hover:bg-gray-100/50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
            >
              <ssAccountAvatar.Wrap>
                {(ImageLink) => (
                  <img
                    src={
                      ImageLink ||
                      "https://static-00.iconduck.com/assets.00/profile-major-icon-512x512-xosjbbdq.png"
                    }
                    alt="Avatar"
                    className="w-6 h-6 rounded-full object-cover cursor-pointer"
                    onError={(e) =>
                      (e.target.src =
                        "https://static-00.iconduck.com/assets.00/profile-major-icon-512x512-xosjbbdq.png")
                    }
                  />
                )}
              </ssAccountAvatar.Wrap>

              <span className="mr-2"></span>

              <span className="truncate max-w-[100px] overflow-hidden whitespace-nowrap">
                <ssAccountLastName.Wrap>
                  {(LastName) => LastName}
                </ssAccountLastName.Wrap>{" "}
                <ssAccountFirstName.Wrap>
                  {(FirstName) => FirstName}
                </ssAccountFirstName.Wrap>
              </span>
            </button>

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-black/60 rounded-lg shadow-lg z-50 border border-gray-200">
                <Link to="/customer/profile">
                  <button className="flex items-center px-4 py-2 w-full text-left rounded-md text-white hover:bg-gray-100/50 transition duration-150">
                    <FaRegUserCircle className="text-xl" />
                    <span className="mr-2"></span>
                    {t("title1")}
                  </button>
                </Link>

                <button className="flex items-center px-4 py-2 w-full text-left rounded-md text-white hover:bg-gray-100/50 transition duration-150">
                  <LuSettings className="text-xl" />
                  <span className="mr-2"></span>
                  {t("title2")}
                </button>

                <button
                  onClick={() => handleLogout()}
                  className="flex items-center px-4 py-2 w-full text-left rounded-md text-white hover:bg-gray-100/50 transition duration-150"
                >
                  <LuLogOut className="text-xl" />
                  <span className="mr-2"></span>
                  {t("title3")}
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center p-2 text-white rounded-lg shadow-md">
            <Notification />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Link to="/authen">
        <button className="flex items-center space-x-2 bg-gray-100/20 text-white font-medium py-2  rounded-md hover:bg-red-600/30 md:px-4 px-2 md:py-2 md:text-md text-sm">
          <FaUserPlus />
          <span> {t("title")}</span>
        </button>
      </Link>
    </>
  );
}
