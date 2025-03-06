import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaBars,
  FaChevronDown,
  FaChevronRight,
  FaSignOutAlt,
  FaTimes,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { Link } from "react-router-dom";

import { RiCustomerServiceLine, RiGalleryView2 } from "react-icons/ri";

import { AiOutlineSchedule } from "react-icons/ai";

import { CgExtensionAdd } from "react-icons/cg";
import { useMediaQuery } from "react-responsive";
import LanguageSwitcherSideBar from "../../components/LanguageSwitcherSideBar/LanguageSwitcherSideBar";
import { useHandleLogout } from "../Header/service/logout";

export default function SidebarMechanic({
  isSidebarOpen,
  toggleSidebar,
  onLanguageChange,
}) {
  const { t } = useTranslation("sidebar_admin");

  const [openMenu, setOpenMenu] = useState(null);

  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const handleLogout = useHandleLogout();

  // Đóng tất cả submenu khi sidebar đóng
  useEffect(() => {
    if (!isSidebarOpen) {
      setOpenMenu(null);
    }
  }, [isSidebarOpen]);

  const toggleSubMenu = (menu) => {
    if (!isSidebarOpen) return;
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <>
      {isMobile && !isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-2 z-50 p-2 bg-blue-500 text-white rounded-md"
        >
          <FaBars size={20} />
        </button>
      )}

      <aside
        className={`h-screen bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex flex-col justify-between z-40 overflow-y-auto ${
          isMobile
            ? `fixed top-0 left-0 w-64 ${isSidebarOpen ? "block" : "hidden"}`
            : `relative ${isSidebarOpen ? "w-64" : "w-16"}`
        }`}
      >
        <div>
          <div className="flex items-center justify-end px-3 py-3 border-b ">
            {isMobile && isSidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="p-2 bg-blue-500 text-white rounded-md"
              >
                <FaTimes size={20} />
              </button>
            )}

            {!isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 bg-blue-500 justify-start text-white rounded-md"
              >
                {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            )}
          </div>

          <div className="flex-1 px-2 py-4">
            <ul className="space-y-3">
              <li className="group">
                <Link
                  to=""
                  className="flex items-center p-2  text-white  transition-all rounded-lg"
                >
                  <FaUser className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.profile")}</span>
                  )}
                </Link>
                <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover:w-full"></div>
              </li>

              {/* tiện íchc */}
              <li className="group">
                <button
                  onClick={() => toggleSubMenu("extension")}
                  className="flex items-center p-2  text-white  transition-all rounded-lg"
                >
                  <CgExtensionAdd className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.extension")}</span>
                  )}
                  {isSidebarOpen && (
                    <span className="ml-2">
                      {openMenu === "extension" ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </button>
                <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover:w-full"></div>
                {openMenu === "extension" && (
                  <ul className="ml-6  space-y-1">
                    <li className="group/link">
                      <Link to="#" className="text-white flex items-center p-2">
                        <MdOutlineHomeRepairService className="w-5 h-5" />

                        <span className="ml-2">
                          {t("sidebar_admin.extension-sub1")}
                        </span>
                      </Link>
                      <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                    </li>
                  </ul>
                )}
              </li>
              {/* Customer */}
              <li className="group">
                <button
                  onClick={() => toggleSubMenu("customer")}
                  className="flex items-center p-2  text-white  transition-all rounded-lg"
                >
                  <FaUsers className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.customer")}</span>
                  )}
                  {isSidebarOpen && (
                    <span className="ml-2">
                      {openMenu === "customer" ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </button>
                <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover:w-full"></div>
                {openMenu === "customer" && (
                  <ul className="ml-6  space-y-1">
                    <li className="group/link">
                      <Link
                        to="chat"
                        className="text-white flex items-center p-2"
                      >
                        <RiCustomerServiceLine className="w-5 h-5" />

                        <span className="ml-2">
                          {t("sidebar_admin.customer2")}
                        </span>
                      </Link>
                      <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                    </li>
                  </ul>
                )}
              </li>
              {/* Appoinment*/}
              <li className="group">
                <button
                  onClick={() => toggleSubMenu("appoinment")}
                  className="flex items-center p-2  text-white  transition-all rounded-lg"
                >
                  <AiOutlineSchedule className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">
                      {t("sidebar_admin.appointment")}
                    </span>
                  )}
                  {isSidebarOpen && (
                    <span className="ml-2">
                      {openMenu === "appoinment" ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </button>
                <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover:w-full"></div>
                {openMenu === "appoinment" && (
                  <ul className="ml-6  space-y-1">
                    <li className="group/link">
                      <Link
                        to="appointment-mine"
                        className="text-white flex items-center p-2"
                      >
                        <RiGalleryView2 className="w-5 h-5" />

                        <span className="ml-2">
                          {t("sidebar_admin.now-appointment")}
                        </span>
                      </Link>
                      <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
        {/* Language Switcher và Logout */}
        <div className="p-2 border-t">
          <LanguageSwitcherSideBar
            isSidebarOpen={isSidebarOpen}
            onLanguageChange={onLanguageChange}
          />
          <div className="group">
            <button
              onClick={() => handleLogout()}
              className="flex items-center p-2  text-white  transition-all rounded-lg "
            >
              <FaSignOutAlt className="mr-2" />{" "}
              {isSidebarOpen && t("sidebar_admin.logout")}
            </button>
            <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover:w-full"></div>
          </div>
        </div>
      </aside>
    </>
  );
}
