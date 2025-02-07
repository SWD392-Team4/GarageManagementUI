import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { LuSettings, LuLogOut } from "react-icons/lu";

import { sAccount } from "../../pages/AuthCustomer/services/store";
import UserService from "../../hooks/services/UserService";
import { useTranslation } from "react-i18next";
const ssAccountAvatar = sAccount.slice((n) => n.avatar);
const ssAccountLastName = sAccount.slice((n) => n.LastName);
const ssAccountFirstName = sAccount.slice((n) => n.FirstName);

export default function ButtonAccount() {
  const { t } = useTranslation("bttnSignIn");
  const [isOpen, setIsOpen] = useState(false);
  const [isLogIn, setIsLogIn] = useState(localStorage.getItem("at"));
  const userService = new UserService();
  const handleLogout = () => {
    localStorage.clear();
    setIsLogIn(false);
    userService.showToast(200, t("title4"));
  };
  if (isLogIn) {
    return (
      <>
        <div className="relative inline-block text-left">
          {/* Nút chính */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-4 py-2 w-40 bg-gray-100/20 text-white rounded-lg shadow-md hover:bg-gray-100/50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          >
            <FaRegUserCircle />
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
              <button className="flex items-center px-4 py-2 w-full text-left rounded-md  text-white hover:bg-gray-100/50 transition duration-150">
                <FaRegUserCircle className="text-xl" />
                <span className="mr-2"></span>
                {t("title1")}
              </button>
              <button className="flex items-center px-4 py-2 w-full text-left rounded-md  text-white hover:bg-gray-100/50 transition duration-150">
                <LuSettings className="text-xl" />
                <span className="mr-2"></span>
                {t("title2")}
              </button>
              <button
                onClick={() => handleLogout()}
                className="flex items-center px-4 py-2 w-full text-left rounded-md  text-white hover:bg-gray-100/50 transition duration-150"
              >
                <LuLogOut className="text-xl" />
                <span className="mr-2"></span>
                {t("title3")}
              </button>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Link to="/authen">
        <button class="flex items-center space-x-2 bg-gray-100/20 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600/30">
          <FaUserPlus />
          <span> {t("title")}</span>
        </button>
      </Link>
    </>
  );
}
