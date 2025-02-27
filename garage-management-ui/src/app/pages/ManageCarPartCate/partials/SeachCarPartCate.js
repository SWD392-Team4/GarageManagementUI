import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SearchCarPartCate({ onSearch }) {
    const { t } = useTranslation("manage_carpartcate");

    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");

    const handleSearchName = (e) => setSearchName(e.target.value);
    const handleSearchStatus = (e) => setSearchStatus(e.target.value);
    const handleCreatedAt = (e) => setCreatedAt(e.target.value);
    const handleUpdatedAt = (e) => setUpdatedAt(e.target.value);

    const handleClearFilters = () => {
        setSearchName("");
        setSearchStatus("");
        setCreatedAt("");
        setUpdatedAt("");
        onSearch({ partCategory: "", status: "", createdAt: "", updatedAt: "" });
    };

    const handleSearch = () => {
        onSearch({
            partCategory: searchName,
            status: searchStatus,
            createdAt: createdAt,
            updatedAt: updatedAt,
        });
    };

    return (
        <div className="flex bg-white flex-wrap items-center gap-4 p-4 shadow-md rounded-lg">
            {/* Search Input */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_carpartcate.search_part_name")}
                </label>
                <input
                    type="text"
                    value={searchName}
                    onChange={handleSearchName}
                    placeholder={t("manage_carpartcate.search_placeholder")}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Status Dropdown */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_carpartcate.search_status")}
                </label>
                <select
                    value={searchStatus}
                    onChange={handleSearchStatus}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                >
                    <option value="" disabled>{t("manage_carpartcate.search_status_enum.choose")}</option>
                    <option value="Active">{t("manage_carpartcate.search_status_enum.active")}</option>
                    <option value="Inactive">{t("manage_carpartcate.search_status_enum.inactive")}</option>
                </select>
            </div>

            {/* CreatedAt Date Picker */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_carpartcate.search_created_at")}
                </label>
                <input
                    type="date"
                    value={createdAt}
                    onChange={handleCreatedAt}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* UpdatedAt Date Picker */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_carpartcate.search_updated_at")}
                </label>
                <input
                    type="date"
                    value={updatedAt}
                    onChange={handleUpdatedAt}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col">
                <button
                    onClick={handleClearFilters}
                    className="p-2 border mt-5 border-gray-300 text-gray-500 hover:bg-gray-200"
                >
                    {t("manage_carpartcate.clear_filters")}
                </button>
            </div>

            <div className="flex flex-col">
                <button
                    onClick={handleSearch}
                    className="p-2 border mt-5 border-gray-300 bg-blue-500 text-white hover:bg-blue-600"
                >
                    {t("manage_carpartcate.search")}
                </button>
            </div>
        </div>
    );
}
