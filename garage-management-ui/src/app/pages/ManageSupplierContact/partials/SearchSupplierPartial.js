import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatYearMonthDay } from "../schemas/SuplierContactValid";

export default function SearchSupplierPartial({ onSearch }) {
    const { t } = useTranslation("manage_supplier_contact");

    const [searchParams, setSearchParams] = useState({
        contactPersonName: "",
        contactPosition: "",
        contactPhoneNumber: "",
        contactEmail: "",
        status: "",
        createdAt: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({ ...prev, [name]: value }));
    };

    const handleClearFilters = () => {
        setSearchParams({
            contactPersonName: "",
            contactPosition: "",
            contactPhoneNumber: "",
            contactEmail: "",
            status: "",
            createdAt: ""
        });
        onSearch({});
    };

    const handleSearch = () => {
        onSearch({
            ...searchParams,
            createdAt: formatYearMonthDay(searchParams.createdAt)
        });
    };

    return (
        <div className="flex bg-white flex-wrap items-center gap-4 p-4 shadow-md rounded-lg">
            {/* Contact Person Name */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_supplier_contact.contactPersonName")}</label>
                <input
                    type="text"
                    name="contactPersonName"
                    value={searchParams.contactPersonName}
                    onChange={handleChange}
                    placeholder={t("manage_supplier_contact.search_placeholder")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Contact Position */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_supplier_contact.contactPosition")}</label>
                <input
                    type="text"
                    name="contactPosition"
                    value={searchParams.contactPosition}
                    onChange={handleChange}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Contact Phone Number */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_supplier_contact.contactPhoneNumber")}</label>
                <input
                    type="text"
                    name="contactPhoneNumber"
                    value={searchParams.contactPhoneNumber}
                    onChange={handleChange}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Contact Email */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_supplier_contact.contactEmail")}</label>
                <input
                    type="text"
                    name="contactEmail"
                    value={searchParams.contactEmail}
                    onChange={handleChange}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Status Dropdown */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_supplier_contact.status")}</label>
                <select
                    name="status"
                    value={searchParams.status}
                    onChange={handleChange}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">{t("manage_supplier_contact.search_status_enum.choose")}</option>
                    <option value="active">{t("manage_supplier_contact.search_status_enum.active")}</option>
                    <option value="inactive">{t("manage_supplier_contact.search_status_enum.inactive")}</option>
                </select>
            </div>

            {/* CreatedAt Date Picker */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_supplier_contact.createdAt")}</label>
                <input
                    type="date"
                    name="createdAt"
                    value={searchParams.createdAt}
                    onChange={handleChange}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col">
                <button
                    onClick={handleClearFilters}
                    className="p-2 border mt-5 border-gray-300 text-gray-500 hover:bg-gray-200 duration-300 focus:outline-none"
                >
                    {t("manage_supplier_contact.clear_filters")}
                </button>
            </div>

            <div className="flex flex-col">
                <button
                    onClick={handleSearch}
                    className="p-2 border mt-5 border-gray-300 bg-blue-500 text-white hover:bg-blue-600 duration-300 focus:outline-none"
                >
                    {t("manage_supplier_contact.search")}
                </button>
            </div>
        </div>
    );
}
