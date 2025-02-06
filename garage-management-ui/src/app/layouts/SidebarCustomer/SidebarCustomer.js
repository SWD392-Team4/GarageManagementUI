import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SidebarCustomer() {
    const { t } = useTranslation("sidebar_customer");

    const menuItems = [
        { text: t("menu.personal_info"), path: "/customer" },
        { text: t("menu.order_history"), path: "/customer/orderHistory" },
        { text: t("menu.current_orders"), path: "#" } // Chưa có route cụ thể
    ];

    return (
        <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                <div className="flex flex-col items-center">
                    <img
                        src="https://randomuser.me/api/portraits/men/94.jpg"
                        className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0 border-4 border-gray-400"
                        alt="Profile"
                    />
                    <h1 className="text-xl font-bold text-gray-800">{t("profile.name")}</h1>
                    <p className="text-gray-600">{t("profile.role")}</p>
                </div>
                <hr className="my-6 border-t border-gray-300" />

                <div className="flex flex-col gap-3">
                    {menuItems.map(({ text, path }, index) => (
                        <NavLink
                            key={index}
                            to={path}
                            className={({ isActive }) =>
                                `py-2 px-4 rounded-lg text-gray-800 font-medium transition-all duration-300 
                                bg-gradient-to-r from-[#435D76] to-[#D4D4D5] hover:from-[#D4D4D5] hover:to-[#435D76] hover:text-white
                                ${isActive ? "text-white bg-[#435D76]" : ""}`
                            }
                        >
                            {text}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
}
