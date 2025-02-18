import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaUser, FaShoppingCart, FaClipboardList, FaCog } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

export default function SidebarCustomer() {
    const { t } = useTranslation("sidebar_customer");

    const menuItems = [
        { text: t("menu.personal_info"), path: "/customer", icon: <FaUser /> },
        { text: t("menu.order_history"), path: "/customer/orderHistory", icon: <FaClipboardList /> },
        { text: t("menu.current_orders"), path: "#", icon: <FaShoppingCart /> }, // Chưa có route cụ thể
        { text: t("menu.settings"), path: "/customer/settings", icon: <FaCog /> },
        { text: t("menu.logout"), path: "/logout", icon: <MdOutlineLogout /> },
    ];

    return (
        <div className="col-span-4 sm:col-span-3 bg-white text-black shadow-lg flex flex-col rounded-xl border border-gray-300">
            {/* Logo */}
            <div className="flex items-center justify-center py-6 border-b border-gray-300">
                <h1 className="text-xl font-bold text-black">Social</h1>
            </div>

            {/* Menu */}
            <nav className="flex flex-col p-4 space-y-2">
                {menuItems.map(({ text, path, icon }, index) => (
                    <NavLink
                        key={index}
                        to={path}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg text-black font-medium transition-all duration-300 hover:bg-gray-200 hover:text-gray-700"
                    >
                        <span className="text-lg">{icon}</span>
                        <span>{text}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}
