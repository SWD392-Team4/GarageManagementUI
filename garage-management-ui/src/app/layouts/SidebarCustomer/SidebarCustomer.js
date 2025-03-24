import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaUser, FaShoppingCart, FaClipboardList, FaCog } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { IoMdChatboxes } from "react-icons/io";
import { useHandleLogout } from "../Header/service/logout";

export default function SidebarCustomer() {
  const { t } = useTranslation("sidebar_customer");
  const handleLogout = useHandleLogout(); // Gọi hook logout ở cấp top-level

  const menuItems = [
    { text: t("menu.personal_info"), path: "profile", icon: <FaUser /> },
    {
      text: t("menu.order_history"),
      path: "orderHistory",
      icon: <FaClipboardList />,
    },
    {
      text: t("menu.current_orders"),
      path: "orders",
      icon: <FaShoppingCart />,
    },
    { text: t("menu.chatting"), path: "chatting", icon: <IoMdChatboxes /> },
    { text: t("menu.settings"), path: "settings", icon: <FaCog /> },
    {
      text: t("menu.logout"),
      path: "logout",
      icon: <MdOutlineLogout />,
      isLogout: true,
    },
  ];

  return (
    <div className="col-span-4 sm:col-span-3 bg-white text-black shadow-lg flex flex-col rounded-md border border-gray-300">
      {/* Logo */}
      <div className="flex items-center justify-center py-6 border-b border-gray-300">
        <h1 className="text-xl font-bold text-black">Social</h1>
      </div>

      {/* Menu */}
      <nav className="flex flex-col p-4 space-y-2">
        {menuItems.map(({ text, path, icon, isLogout }, index) => (
          <div key={index} className="group">
            {isLogout ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 rounded-sm font-medium transition-all duration-300 text-black hover:bg-gray-200 hover:text-gray-700"
              >
                <span className="text-lg">{icon}</span>
                <span>{text}</span>
              </button>
            ) : (
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gray-200 text-gray-700"
                      : "text-black hover:bg-gray-200 hover:text-gray-700"
                  }`
                }
              >
                <span className="text-lg">{icon}</span>
                <span>{text}</span>
              </NavLink>
            )}
            <div className="border-t border-gray-700 h-1 transition-all duration-500 w-0 group-hover:w-full"></div>
          </div>
        ))}
      </nav>
    </div>
  );
}
