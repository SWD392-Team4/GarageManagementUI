import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatYearMonthDay } from "../schemas/SupplierValid"

export default function SearchSupplierPage({ onSearch }) {
    const { t } = useTranslation("manage_supplier");

    const [searchParams, setSearchParams] = useState({
        name: "",
        taxCode: "",
        address: "",
        province: "",
        district: "",
        wards: "",
        status: "",
        createdAt: "",
        updatedAt: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({ ...prev, [name]: value }));
    };

    const handleClearFilters = () => {
        setSearchParams({
            name: "",
            taxCode: "",
            address: "",
            province: "",
            district: "",
            wards: "",
            status: "",
            createdAt: "",
            updatedAt: ""
        });
        onSearch({});
    };

    const handleSearch = () => {
        onSearch({
            ...searchParams,
            createdAt: formatYearMonthDay(searchParams.createdAt),
            updatedAt: formatYearMonthDay(searchParams.updatedAt)
        });
    };

    return (
        <div className="flex bg-white flex-wrap items-center gap-4 p-4 shadow-md rounded-lg">
            {/* Name */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_supplier.name")}</label>
                <input
                    type="text"
                    name="name"
                    value={searchParams.name}
                    onChange={handleChange}
                    placeholder={t("manage_supplier.search_placeholder")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Tax Code */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_supplier.taxCode")}</label>
                <input
                    type="text"
                    name="taxCode"
                    value={searchParams.taxCode}
                    onChange={handleChange}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Address */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_supplier.address")}</label>
                <input
                    type="text"
                    name="address"
                    value={searchParams.address}
                    onChange={handleChange}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Province */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_supplier.province")}</label>
                <input
                    type="text"
                    name="province"
                    value={searchParams.province}
                    onChange={handleChange}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* District */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_supplier.district")}</label>
                <input
                    type="text"
                    name="district"
                    value={searchParams.district}
                    onChange={handleChange}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Wards */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_supplier.wards")}</label>
                <input
                    type="text"
                    name="wards"
                    value={searchParams.wards}
                    onChange={handleChange}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Status Dropdown */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_supplier.status")}</label>
                <select
                    name="status"
                    value={searchParams.status}
                    onChange={handleChange}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">{t("manage_supplier.search_status_enum.choose")}</option>
                    <option value="active">{t("manage_supplier.search_status_enum.active")}</option>
                    <option value="inactive">{t("manage_supplier.search_status_enum.inactive")}</option>
                </select>
            </div>

            {/* CreatedAt Date Picker */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_supplier.createdAt")}</label>
                <input
                    type="date"
                    name="createdAt"
                    value={searchParams.createdAt}
                    onChange={handleChange}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* UpdatedAt Date Picker */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_supplier.updatedAt")}</label>
                <input
                    type="date"
                    name="updatedAt"
                    value={searchParams.updatedAt}
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
                    {t("manage_supplier.clear_filters")}
                </button>
            </div>

            <div className="flex flex-col">
                <button
                    onClick={handleSearch}
                    className="p-2 border mt-5 border-gray-300 bg-blue-500 text-white hover:bg-blue-600 duration-300 focus:outline-none"
                >
                    {t("manage_supplier.search")}
                </button>
            </div>
        </div>
    );
}
