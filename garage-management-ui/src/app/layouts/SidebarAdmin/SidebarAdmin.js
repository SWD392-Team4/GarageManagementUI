import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaCar,
  FaHome,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { useMediaQuery } from "react-responsive";
import LanguageSwitcherSideBar from "../../components/LanguageSwitcherSideBar/LanguageSwitcherSideBar";

export default function SideBarAdmin({ isSidebarOpen, toggleSidebar, onLanguageChange }) {
  const { t } = useTranslation("sidebar_admin");
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <>
      {/* ✅ Nút mở Sidebar trên Mobile */}
      {isMobile && !isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-blue-500 text-white rounded-md"
        >
          <FaBars size={20} />
        </button>
      )}

      {/* ✅ Sidebar */}
      <aside
        className={`h-screen bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex flex-col justify-between z-40 ${isMobile
          ? `fixed top-0 left-0 w-64 ${isSidebarOpen ? "block" : "hidden"}`
          : `relative ${isSidebarOpen ? "w-64" : "w-16"}`
          }`}
      >
        {/* ✅ Header Sidebar */}
        <div>
          <div className="flex items-center justify-between px-3 py-3 border-b dark:border-gray-700">
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
                className="p-2 bg-blue-500 text-white rounded-md"
              >
                {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            )}

            {isSidebarOpen && (
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 bg-gray-300 dark:bg-gray-700 rounded-md"
              >
                {isDarkMode ? (
                  <FaSun size={20} className="text-yellow-500" />
                ) : (
                  <FaMoon size={20} />
                )}
              </button>
            )}
          </div>

          {/* ✅ Danh sách menu */}
          <div className="flex-1 px-2 py-4">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/admin"
                  className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-lg"
                >
                  <ImProfile className="w-6 h-6" />
                  {isSidebarOpen && <span className="ml-3">{t("sidebar_admin.profile")}</span>}
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-lg"
                >
                  <FaHome className="w-6 h-6" />
                  {isSidebarOpen && <span className="ml-3">{t("sidebar_admin.dashboard")}</span>}
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/account"
                  className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-lg"
                >
                  <FaUser className="w-6 h-6" />
                  {isSidebarOpen && <span className="ml-3">{t("sidebar_admin.accounts")}</span>}
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/booking"
                  className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-lg"
                >
                  <FaCar className="w-6 h-6" />
                  {isSidebarOpen && <span className="ml-3">{t("sidebar_admin.booking")}</span>}
                </Link>
              </li>
            </ul>
          </div>
        </div>


        {/* ✅ Nút chọn ngôn ngữ (Cờ) ở cuối Sidebar */}
        <div className="p-2 border-t dark:border-gray-700">
          <LanguageSwitcherSideBar isSidebarOpen={isSidebarOpen} onLanguageChange={onLanguageChange} />
        </div>
      </aside>
    </>
  );
}
