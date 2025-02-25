import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SearchCarModel({ onSearch }) {
    const { t } = useTranslation("manage_car_modal");

    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");
    const [modelYear, setModelYear] = useState("");

    const handleSearchName = (e) => setSearchName(e.target.value);
    const handleSearchStatus = (e) => setSearchStatus(e.target.value);
    const handleCreatedAt = (e) => setCreatedAt(e.target.value);
    const handleUpdatedAt = (e) => setUpdatedAt(e.target.value);
    const handleModelYear = (e) => setModelYear(e.target.value);

    const handleClearFilters = () => {
        setSearchName("");
        setSearchStatus("");
        setCreatedAt("");
        setUpdatedAt("");
        onSearch({ ModelName: "", Status: "", CreatedAt: "", UpdatedAt: "", ModelYear: "" });
    };

    const handleSearch = () => {
        onSearch({
            ModelName: searchName,
            Status: searchStatus,
            CreatedAt: createdAt,
            UpdatedAt: updatedAt,
            ModelYear: modelYear
        });
    };

    return (
        <div className="flex bg-white flex-wrap items-center gap-4 p-4 shadow-md rounded-lg">
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_car_modal.search_model_name")}
                </label>
                <input
                    type="text"
                    value={searchName}
                    onChange={handleSearchName}
                    placeholder={t("manage_car_modal.search_placeholder")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_car_modal.search_status")}
                </label>
                <select
                    value={searchStatus}
                    onChange={handleSearchStatus}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>
                        {t("manage_car_modal.search_status_enum.choose")}
                    </option>
                    <option value="active">{t("manage_car_modal.search_status_enum.active")}</option>
                    <option value="inactive">{t("manage_car_modal.search_status_enum.inactive")}</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_car_modal.search_modal_year")}
                </label>
                <input
                    type="text"
                    value={modelYear}
                    onChange={handleModelYear}
                    placeholder={t("manage_car_modal.search_modal_year_placeholder")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_car_modal.search_created_at")}
                </label>
                <input
                    type="date"
                    value={createdAt}
                    onChange={handleCreatedAt}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_car_modal.search_updated_at")}
                </label>
                <input
                    type="date"
                    value={updatedAt}
                    onChange={handleUpdatedAt}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col">
                <button
                    onClick={handleClearFilters}
                    className="p-2 border mt-5 border-gray-300 text-gray-500 hover:bg-gray-200 duration-300 focus:outline-none"
                >
                    {t("manage_car_modal.clear_filters")}
                </button>
            </div>

            <div className="flex flex-col">
                <button
                    onClick={handleSearch}
                    className="p-2 border mt-5 border-gray-300 bg-blue-500 text-white hover:bg-blue-600 duration-300 focus:outline-none"
                >
                    {t("manage_car_modal.search")}
                </button>
            </div>
        </div>
    );
}
