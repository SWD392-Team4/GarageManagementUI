import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaHome,
  FaTools,
  FaFileInvoice,
  FaBox,
  FaTags,
  FaLayerGroup,
  FaChevronDown,
  FaChevronRight,
  FaSignOutAlt,
  FaCogs,
  FaCar,
  FaThList,
  FaCarSide,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";

import { useMediaQuery } from "react-responsive";
import LanguageSwitcherSideBar from "../../components/LanguageSwitcherSideBar/LanguageSwitcherSideBar";

export default function SideBarAdmin({
  isSidebarOpen,
  toggleSidebar,
  onLanguageChange,
}) {
  const { t } = useTranslation("sidebar_admin");
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
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
        className={`h-screen bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex flex-col justify-between z-40 overflow-y-auto ${isMobile
            ? `fixed top-0 left-0 w-64 ${isSidebarOpen ? "block" : "hidden"}`
            : `relative ${isSidebarOpen ? "w-64" : "w-16"}`
          }`}
      >
        <div>
          <div className="flex items-center justify-end px-3 py-3 border-b dark:border-gray-700">
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
            <ul className="space-y-4">
              <li>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-lg"
                >
                  <FaHome className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.dashboard")}</span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-lg"
                >
                  <FaUser className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.profile")}</span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/service"
                  className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-lg"
                >
                  <FaClipboardList className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.service")}</span>
                  )}
                </Link>
              </li>

              {/* Sản phẩm */}
              <li>
                <button
                  onClick={() => toggleSubMenu("product")}
                  className="flex items-center w-full p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-lg"
                >
                  <FaTools className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.product")}</span>
                  )}
                  {isSidebarOpen && (
                    <span className="ml-auto">
                      {openMenu === "product" ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </button>
                {openMenu === "product" && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <Link
                        to="/admin/product"
                        className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <FaBox className="w-5 h-5" />
                        <span className="ml-2">
                          {t("sidebar_admin.product_list")}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/productCategory"
                        className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <FaLayerGroup className="w-5 h-5" />
                        <span className="ml-2">
                          {t("sidebar_admin.product_category")}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/brand"
                        className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <FaTags className="w-5 h-5" />
                        <span className="ml-2">
                          {t("sidebar_admin.product_brand")}
                        </span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Car */}
              <li>
                <button
                  onClick={() => toggleSubMenu("car")}
                  className="flex items-center w-full p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-lg"
                >
                  <FaCar className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.car")}</span>
                  )}
                  {isSidebarOpen && (
                    <span className="ml-auto">
                      {openMenu === "car" ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </button>
                {openMenu === "car" && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <Link
                        to="/admin/carModal"
                        className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <FaCarSide className="w-5 h-5" />
                        <span className="ml-2">
                          {t("sidebar_admin.car_modal")}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/carCategory"
                        className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <FaThList className="w-5 h-5" />
                        <span className="ml-2">
                          {t("sidebar_admin.car_category")}
                        </span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Car Part */}
              <li>
                <button
                  onClick={() => toggleSubMenu("carpart")}
                  className="flex items-center w-full p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-lg"
                >
                  <FaCogs className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.car_part")}</span>
                  )}
                  {isSidebarOpen && (
                    <span className="ml-auto">
                      {openMenu === "carpart" ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </button>
                {openMenu === "carpart" && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <Link
                        to="/admin/carPart"
                        className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <FaCar className="w-5 h-5" />
                        <span className="ml-2">
                          {t("sidebar_admin.car_part_list")}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/carPartCategory"
                        className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <FaThList className="w-5 h-5" />
                        <span className="ml-2">
                          {t("sidebar_admin.car_part_category")}
                        </span>
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
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.invoices")}</span>
                  )}
                  {isSidebarOpen && (
                    <span className="ml-auto">
                      {openMenu === "invoice" ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </button>
                {openMenu === "invoice" && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <Link
                        to="/admin/invoice-sale"
                        className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <span className="ml-2">
                          {t("sidebar_admin.invoice_sale")}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/invoice-service"
                        className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <span className="ml-2">
                          {t("sidebar_admin.invoice_service")}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/booking"
                        className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <span className="ml-2">
                          {t("sidebar_admin.invoice_booking")}
                        </span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* Customer */}
              <li>
                <button
                  onClick={() => toggleSubMenu("customer")}
                  className="flex items-center w-full p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-lg"
                >
                  <FaUsers className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.customer")}</span>
                  )}
                  {isSidebarOpen && (
                    <span className="ml-auto">
                      {openMenu === "invoice" ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </button>
                {openMenu === "customer" && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <Link
                        to="/admin/manage-customer"
                        className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <span className="ml-2">
                          {t("sidebar_admin.customer1")}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/chat"
                        className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <span className="ml-2">
                          {t("sidebar_admin.customer2")}
                        </span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* Appoinment*/}
              <li>
                <button
                  onClick={() => toggleSubMenu("appoinment")}
                  className="flex items-center w-full p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-lg"
                >
                  <AiOutlineSchedule className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">
                      {t("sidebar_admin.appointment")}
                    </span>
                  )}
                  {isSidebarOpen && (
                    <span className="ml-auto">
                      {openMenu === "appoinment" ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </button>
                {openMenu === "appoinment" && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <Link
                        to="appointment"
                        className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <span className="ml-2">
                          {t("sidebar_admin.re-appointment")}
                        </span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="create-appointment"
                        className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <span className="ml-2">
                          {t("sidebar_admin.ce-appointment")}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="appointment-mine"
                        className="text-white flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <span className="ml-2">
                          {t("sidebar_admin.now-appointment")}
                        </span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
        {/* Language Switcher và Logout */}
        <div className="p-2 border-t dark:border-gray-700">
          <LanguageSwitcherSideBar
            isSidebarOpen={isSidebarOpen}
            onLanguageChange={onLanguageChange}
          />
          <button className="flex items-center w-full p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-lg">
            <FaSignOutAlt className="mr-2" />{" "}
            {isSidebarOpen && t("sidebar_admin.logout")}
          </button>
        </div>
      </aside>
    </>
  );
}
