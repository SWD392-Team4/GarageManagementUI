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

export default function SidebarCashier({
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
                  to="dashboard"
                  className="flex items-center p-2  text-white  transition-all rounded-lg"
                >
                  <FaHome className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.dashboard")}</span>
                  )}
                </Link>
                <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover:w-full"></div>
              </li>
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
              <li className="group">
                <Link
                  to="service"
                  className="flex items-center p-2  text-white  transition-all rounded-lg"
                >
                  <FaClipboardList className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.service")}</span>
                  )}
                </Link>
                <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover:w-full"></div>
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
                          to="suppliers"
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
                        to="suppliers-contact"
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

              {/* Employee */}
              <li className="group">
                <button
                  onClick={() => toggleSubMenu("employee")}
                  className="flex items-center p-2  text-white  transition-all"
                >
                  <FaUserTie className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.employee")}</span>
                  )}
                  {isSidebarOpen && (
                    <span className="ml-2">
                      {openMenu === "employee" ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </button>
                <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover:w-full"></div>

                {openMenu === "employee" && (
                  <ul className="ml-6  space-y-1">
                    <li className="group/link">
                      <Link
                        to="employee"
                        className="text-white flex items-center p-2"
                      >
                        <FaUserCog className="w-5 h-5" />
                        <span className="ml-2">
                          {t("sidebar_admin.employee_list")}
                        </span>
                      </Link>
                      <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                    </li>
                    <li className="group/link">
                      <Link
                        to="employee-schedule"
                        className="text-white flex items-center p-2"
                      >
                        <FaBuilding className="w-5 h-5" />
                        <span className="ml-2">
                          {t("sidebar_admin.employee_schedule")}
                        </span>
                      </Link>
                      <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                    </li>
                  </ul>
                )}
              </li>

              {/* Sản phẩm */}
              <li className="group">
                <button
                  onClick={() => toggleSubMenu("product")}
                  className="flex items-center p-2  text-white  transition-all rounded-lg"
                >
                  <FaTools className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.product")}</span>
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

                {openMenu === "product" && (
                  <ul className="ml-6  space-y-1">
                    <li className="group/link">
                      <Link
                        to="product"
                        className="text-white flex items-center p-2"
                      >
                        <FaBox className="w-5 h-5" />
                        <span className="ml-2">
                          {t("sidebar_admin.product_list")}
                        </span>
                      </Link>
                      <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                    </li>
                    <li className="group/link">
                      <Link
                        to="productCategory"
                        className="text-white flex items-center p-2"
                      >
                        <FaLayerGroup className="w-5 h-5" />
                        <span className="ml-2">
                          {t("sidebar_admin.product_category")}
                        </span>
                      </Link>
                      <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                    </li>
                    <li className="group/link">
                      <Link
                        to="brand"
                        className="text-white flex items-center p-2"
                      >
                        <FaTags className="w-5 h-5" />
                        <span className="ml-2">
                          {t("sidebar_admin.product_brand")}
                        </span>
                      </Link>
                      <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                    </li>
                  </ul>
                )}
              </li>

              {/* Car */}
              <li className="group">
                <button
                  onClick={() => toggleSubMenu("car")}
                  className="flex items-center p-2  text-white  transition-all rounded-lg"
                >
                  <FaCar className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.car")}</span>
                  )}
                  {isSidebarOpen && (
                    <span className="ml-2">
                      {openMenu === "car" ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </button>
                <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover:w-full"></div>

                {openMenu === "car" && (
                  <ul className="ml-6  space-y-1">
                    <li className="group/link">
                      <Link
                        to="carModal"
                        className="text-white flex items-center p-2"
                      >
                        <FaCarSide className="w-5 h-5" />
                        <span className="ml-2">
                          {t("sidebar_admin.car_modal")}
                        </span>
                      </Link>
                      <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                    </li>
                    <li className="group/link">
                      <Link
                        to="carCategory"
                        className="text-white flex items-center p-2"
                      >
                        <FaThList className="w-5 h-5" />
                        <span className="ml-2">
                          {t("sidebar_admin.car_category")}
                        </span>
                      </Link>
                      <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                    </li>
                  </ul>
                )}
              </li>

              {/* Car Part */}
              <li className="group">
                <button
                  onClick={() => toggleSubMenu("carpart")}
                  className="flex items-center p-2  text-white  transition-all rounded-lg"
                >
                  <FaCogs className="w-6 h-6" />
                  {isSidebarOpen && (
                    <span className="ml-3">{t("sidebar_admin.car_part")}</span>
                  )}
                  {isSidebarOpen && (
                    <span className="ml-2">
                      {openMenu === "carpart" ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </button>
                <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover:w-full"></div>
                {openMenu === "carpart" && (
                  <ul className="ml-6  space-y-1">
                    <li className="group/link">
                      <Link
                        to="carPart"
                        className="text-white flex items-center p-2"
                      >
                        <FaCar className="w-5 h-5" />
                        <span className="ml-2">
                          {t("sidebar_admin.car_part_list")}
                        </span>
                      </Link>
                      <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                    </li>
                    <li className="group/link">
                      <Link
                        to="carPartCategory"
                        className="text-white flex items-center p-2"
                      >
                        <FaThList className="w-5 h-5" />
                        <span className="ml-2">
                          {t("sidebar_admin.car_part_category")}
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
                        to="invoice-sale"
                        className="text-white flex items-center p-2"
                      >
                        <FaFileInvoiceDollar className="w-5 h-5" />

                        <span className="ml-2">
                          {t("sidebar_admin.invoice_sale")}
                        </span>
                      </Link>
                      <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                    </li>
                    <li className="group/link">
                      <Link
                        to="invoice-service"
                        className="text-white flex items-center p-2"
                      >
                        <TbFileInvoice className="w-5 h-5" />

                        <span className="ml-2">
                          {t("sidebar_admin.invoice_service")}
                        </span>
                      </Link>
                      <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                    </li>
                    <li className="group/link">
                      <Link
                        to="booking"
                        className="text-white flex items-center p-2"
                      >
                        <TbBrandBooking className="w-5 h-5" />

                        <span className="ml-2">
                          {t("sidebar_admin.invoice_booking")}
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
                        to="manage-customer"
                        className="text-white flex items-center p-2"
                      >
                        <PiUserFocus className="w-5 h-5" />
                        <span className="ml-2">
                          {t("sidebar_admin.customer1")}
                        </span>
                      </Link>

                      <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                    </li>
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
                        to="appointment"
                        className="text-white flex items-center p-2"
                      >
                        <TbReportSearch className="w-5 h-5" />

                        <span className="ml-2">
                          {t("sidebar_admin.re-appointment")}
                        </span>
                      </Link>
                      <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                    </li>

                    <li className="group/link">
                      <Link
                        to="create-appointment"
                        className="text-white flex items-center p-2"
                      >
                        <IoCreateOutline className="w-5 h-5" />

                        <span className="ml-2">
                          {t("sidebar_admin.ce-appointment")}
                        </span>
                      </Link>
                      <div className="border-t border-white h-1 transition-all duration-500 w-0 group-hover/link:w-full"></div>
                    </li>
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
