import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatYearMonthDay } from "../schemas/CustomerValid";

export default function SearchCustomers({ onSearch }) {
    const { t } = useTranslation("manage_customer");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");
    const [status, setStatus] = useState("");

    const handleSearch = () => {
        onSearch({
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            PhoneNumber: phoneNumber,
            CreatedAt: formatYearMonthDay(createdAt),
            UpdatedAt: formatYearMonthDay(updatedAt),
            Status: status,
        });
    };

    const handleClearFilters = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setCreatedAt("");
        setUpdatedAt("");
        setStatus("");
        onSearch({ FirstName: "", LastName: "", Email: "", PhoneNumber: "", CreatedAt: "", UpdatedAt: "", Status: "" });
    };

    return (
        <div className="flex bg-white flex-wrap items-center gap-4 p-4 shadow-md rounded-lg">
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_customer.firstName")}</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={t("manage_customer.search_placeholder")} className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_customer.lastName")}</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={t("manage_customer.search_placeholder")} className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_customer.email")}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("manage_customer.search_placeholder")} className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_customer.phoneNumber")}</label>
                <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder={t("manage_customer.search_placeholder")} className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_customer.search_created_at")}</label>
                <input type="date" value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_customer.search_updated_at")}</label>
                <input type="date" value={updatedAt} onChange={(e) => setUpdatedAt(e.target.value)} className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_customer.status")}</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="" disabled>{t("manage_customer.search_status_enum.choose")}</option>
                    <option value="active">{t("manage_customer.search_status_enum.active")}</option>
                    <option value="inactive">{t("manage_customer.search_status_enum.inactive")}</option>
                </select>
            </div>

            <div className="flex flex-col">
                <button onClick={handleClearFilters} className="p-2 border mt-5 border-gray-300 text-gray-500 hover:bg-gray-200 duration-300 focus:outline-none">
                    {t("manage_customer.clear_filters")}
                </button>
            </div>

            <div className="flex flex-col">
                <button onClick={handleSearch} className="p-2 border mt-5 border-gray-300 bg-blue-500 text-white hover:bg-blue-600 duration-300 focus:outline-none">
                    {t("manage_customer.search")}
                </button>
            </div>
        </div>
    );
}