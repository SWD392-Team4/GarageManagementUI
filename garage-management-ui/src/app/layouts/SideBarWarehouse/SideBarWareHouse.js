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
  FaUserCog,
  FaUserTie,
  FaBuilding,
  FaTruck,
  FaFileInvoiceDollar,
} from "react-icons/fa";

import { RiCustomerServiceLine } from "react-icons/ri";
import { PiUserFocus } from "react-icons/pi";
import { RiGalleryView2 } from "react-icons/ri";
import { TbReportSearch, TbFileInvoice, TbBrandBooking } from "react-icons/tb";
import { IoCreateOutline } from "react-icons/io5";

import { AiOutlineSchedule } from "react-icons/ai";

import { useMediaQuery } from "react-responsive";
import LanguageSwitcherSideBar from "../../components/LanguageSwitcherSideBar/LanguageSwitcherSideBar";
import { useHandleLogout } from "../Header/service/logout";

export default function SideBarWareHouse({
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
  const handleLogout = useHandleLogout();
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
                  to="/warehousemanager"
                  className="flex items-center p-2  text-white  transition-all rounded-lg"
                >
                  <FaUser className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.profile")}</span>
                  )}
                </Link>
                <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover:w-full"></div>
              </li>

              {/* Product At Store and Warehouse*/}
              <li className="group">
                <button
                  onClick={() => toggleSubMenu("product_at")}
                  className="flex items-center p-2 text-white transition-all rounded-lg"
                >
                  <FaBox className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">
                      {t("sidebar_admin.product_at")}
                    </span>
                  )}
                  {isSidebarOpen && (
                    <span className="ml-2">
                      {openMenu === "product" ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </button>
                <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover:w-full"></div>
                {openMenu === "product_at" && (
                  <ul className="ml-6 space-y-1">
                    <li>
                      <div className="group/link">
                        <Link
                          to="/warehousemanager/product-at-warehouse"
                          className="text-white flex items-center p-2"
                        >
                          <FaBox className="w-5 h-5" />
                          <span className="ml-2">
                            {t("sidebar_admin.product_at_warehouse")}
                          </span>
                        </Link>
                        <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                      </div>
                    </li>
                    <li>
                      <div className="group/link">
                        <Link
                          to="/warehousemanager/product-at-store"
                          className="text-white flex items-center p-2"
                        >
                          <FaBox className="w-5 h-5" />
                          <span className="ml-2">
                            {t("sidebar_admin.product_at_store")}
                          </span>
                        </Link>
                        <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                      </div>
                    </li>
                  </ul>
                )}
              </li>

              {/* Suppliers */}
              <li className="group">
                <button
                  onClick={() => toggleSubMenu("suppliers")}
                  className="flex items-center p-2  text-white  transition-all rounded-lg"
                >
                  <FaTruck className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.suppliers")}</span>
                  )}
                  {isSidebarOpen && (
                    <span className="ml-2">
                      {openMenu === "suppliers" ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </button>
                <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover:w-full"></div>
                {openMenu === "suppliers" && (
                  <ul className="ml-6  space-y-1">
                    <li>
                      <div className="group/link">
                        <Link
                          to="/warehousemanager/suppliers"
                          className="text-white flex items-center p-2 "
                        >
                          <FaUsers className="w-5 h-5" />
                          <span className="ml-2">
                            {t("sidebar_admin.supplier_list")}
                          </span>
                        </Link>
                        <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                      </div>
                    </li>
                    <li className="group/link">
                      <Link
                        to="/warehousemanager/suppliers-contact"
                        className="text-white flex items-center p-2 "
                      >
                        <FaClipboardList className="w-5 h-5" />
                        <span className="ml-2">
                          {t("sidebar_admin.supplier_contact")}
                        </span>
                      </Link>
                      <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                    </li>
                  </ul>
                )}
              </li>

              {/* Hóa đơn */}
              <li className="group">
                <button
                  onClick={() => toggleSubMenu("invoice")}
                  className="flex items-center p-2  text-white  transition-all rounded-lg"
                >
                  <FaFileInvoice className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.invoices")}</span>
                  )}
                  {isSidebarOpen && (
                    <span className="ml-2">
                      {openMenu === "invoice" ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </button>
                <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover:w-full"></div>
                {openMenu === "invoice" && (
                  <ul className="ml-6  space-y-1">
                    <li className="group/link">
                      <Link
                        to="/WarehouseManager/invoice-goodsIssued"
                        className="text-white flex items-center p-2"
                      >
                        <TbBrandBooking className="w-5 h-5" />

                        <span className="ml-2">
                          {t("sidebar_admin.invoice_goodsIssue")}
                        </span>
                      </Link>
                      <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                    </li>
                    <li className="group/link">
                      <Link
                        to="invoice-goods-Received"
                        className="text-white flex items-center p-2"
                      >
                        <TbBrandBooking className="w-5 h-5" />

                        <span className="ml-2">
                          {t("sidebar_admin.invoice-goods-Received")}
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
