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
  FaTools,
  FaFileInvoice,
  FaBox,
  FaTags,
  FaLayerGroup,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { useMediaQuery } from "react-responsive";
import LanguageSwitcherSideBar from "../../components/LanguageSwitcherSideBar/LanguageSwitcherSideBar";

export default function SideBarAdmin({ isSidebarOpen, toggleSidebar, onLanguageChange }) {
  const { t } = useTranslation("sidebar_admin");
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [openMenu, setOpenMenu] = useState(null);

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

  const toggleSubMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <>
      {isMobile && !isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-blue-500 text-white rounded-md"
        >
          <FaBars size={20} />
        </button>
      )}

      <aside
        className={`h-screen bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex flex-col justify-between z-40 ${isMobile
          ? `fixed top-0 left-0 w-64 ${isSidebarOpen ? "block" : "hidden"}`
          : `relative ${isSidebarOpen ? "w-64" : "w-16"}`
          }`}
      >
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

          <div className="flex-1 px-2 py-4">
            <ul className="space-y-4">
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
                  to="/admin"
                  className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-lg"
                >
                  <FaUser className="w-6 h-6" />
                  {isSidebarOpen && <span className="ml-3">{t("sidebar_admin.profile")}</span>}
                </Link>
              </li>

              {/* Sản phẩm */}
              <li>
                <button
                  onClick={() => toggleSubMenu("product")}
                  className="flex items-center w-full p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-lg"
                >
                  <FaTools className="w-6 h-6" />
                  {isSidebarOpen && <span className="ml-3">{t("sidebar_admin.product")}</span>}
                  {isSidebarOpen && (
                    <span className="ml-auto">
                      {openMenu === "product" ? <FaChevronDown /> : <FaChevronRight />}
                    </span>
                  )}
                </button>
                {openMenu === "product" && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <Link to="/admin/product" className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <FaBox className="w-5 h-5" />
                        <span className="ml-2">{t("sidebar_admin.product_list")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/category" className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <FaLayerGroup className="w-5 h-5" />
                        <span className="ml-2">{t("sidebar_admin.product_category")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/brand" className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <FaTags className="w-5 h-5" />
                        <span className="ml-2">{t("sidebar_admin.product_brand")}</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Hóa đơn */}
              <li>
                <button
                  onClick={() => toggleSubMenu("invoice")}
                  className="flex items-center w-full p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-lg"
                >
                  <FaFileInvoice className="w-6 h-6" />
                  {isSidebarOpen && <span className="ml-3">{t("sidebar_admin.invoices")}</span>}
                  {isSidebarOpen && (
                    <span className="ml-auto">
                      {openMenu === "invoice" ? <FaChevronDown /> : <FaChevronRight />}
                    </span>
                  )}
                </button>
                {openMenu === "invoice" && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <Link to="/admin/invoice-sale" className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <span className="ml-2">{t("sidebar_admin.invoice_sale")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/invoice-service" className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <span className="ml-2">{t("sidebar_admin.invoice_service")}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/booking" className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <span className="ml-2">{t("sidebar_admin.invoice_booking")}</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
