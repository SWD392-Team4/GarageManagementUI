import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SearchBrand({ onSearch }) {
    const { t } = useTranslation("manage_brand");

    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    const handleSearchName = (e) => setSearchName(e.target.value);
    const handleSearchStatus = (e) => setSearchStatus(e.target.value);

    const handleClearFilters = () => {
        setSearchName("");
        setSearchStatus("");
        onSearch({ BrandName: "", Status: "" });
    };

    const handleSearch = () => {
        onSearch({ BrandName: searchName, Status: searchStatus });
    };

    return (
        <div className="flex bg-white flex-wrap items-center gap-4 p-4 shadow-md rounded-lg">
            {/* Search Input */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_brand.search_brand_name")}
                </label>
                <input
                    type="text"
                    value={searchName}
                    onChange={handleSearchName}
                    placeholder={t("manage_brand.search_placeholder")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Status Dropdown */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_brand.search_status")}
                </label>
                <select
                    value={searchStatus}
                    onChange={handleSearchStatus}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>
                        {t("manage_brand.search_status_enum.choose")} {/* "Chọn trạng thái" */}
                    </option>
                    <option value="active">{t("manage_brand.search_status_enum.active")}</option>
                    <option value="inactive">{t("manage_brand.search_status_enum.inactive")}</option>
                </select>
            </div>


            {/* Action Buttons */}
            <div className="flex flex-col">
                <button
                    onClick={handleClearFilters}
                    className="p-2 border mt-5 border-gray-300 text-gray-500 hover:bg-gray-200 duration-300 focus:outline-none"
                >
                    {t("manage_brand.clear_filters")}
                </button>
            </div>

            <div className="flex flex-col">
                <button
                    onClick={handleSearch}
                    className="p-2 border mt-5 border-gray-300 bg-blue-500 text-white hover:bg-blue-600 duration-300 focus:outline-none"
                >
                    {t("manage_brand.search")}
                </button>
            </div>
        </div>
    );
}
