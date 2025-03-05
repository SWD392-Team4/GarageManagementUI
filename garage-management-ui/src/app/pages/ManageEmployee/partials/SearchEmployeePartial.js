import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SearchEmployeePartial({ onSearch }) {
    const { t } = useTranslation("manage_employee");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [workplace, setWorkplace] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleSearch = () => {
        onSearch({ firstName, lastName, workplace, email, status, phoneNumber });
    };

    const handleClearFilters = () => {
        setFirstName("");
        setLastName("");
        setWorkplace("");
        setEmail("");
        setStatus("");
        setPhoneNumber("");
        onSearch({ firstName: "", lastName: "", workplace: "", email: "", status: "", phoneNumber: "" });
    };

    return (
        <div className="flex bg-white flex-wrap items-center gap-4 p-4 shadow-md rounded-lg">
            {/* First Name */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_employee.search_first_name")}</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={t("manage_employee.search_placeholder")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_employee.search_last_name")}</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={t("manage_employee.search_placeholder")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Workplace */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_employee.search_workplace")}</label>
                <input
                    type="text"
                    value={workplace}
                    onChange={(e) => setWorkplace(e.target.value)}
                    placeholder={t("manage_employee.search_placeholder")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Email */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_employee.search_email")}</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("manage_employee.search_placeholder")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Status */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_employee.search_status")}</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>{t("manage_employee.search_status_enum.choose")}</option>
                    <option value="active">{t("manage_employee.search_status_enum.active")}</option>
                    <option value="inactive">{t("manage_employee.search_status_enum.inactive")}</option>
                </select>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_employee.search_phone_number")}</label>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder={t("manage_employee.search_placeholder")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col">
                <button
                    onClick={handleClearFilters}
                    className="p-2 border mt-5 border-gray-300 text-gray-500 hover:bg-gray-200 duration-300 focus:outline-none"
                >
                    {t("manage_employee.clear_filters")}
                </button>
            </div>

            <div className="flex flex-col">
                <button
                    onClick={handleSearch}
                    className="p-2 border mt-5 border-gray-300 bg-blue-500 text-white hover:bg-blue-600 duration-300 focus:outline-none"
                >
                    {t("manage_employee.search")}
                </button>
            </div>
        </div>
    );
}
