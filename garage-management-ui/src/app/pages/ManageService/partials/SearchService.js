import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SearchService({ onSearch }) {
    const { t } = useTranslation("manage_service");

    const [serviceName, setServiceName] = useState("");
    const [serviceCategory, setServiceCategory] = useState("");
    const [partName, setPartName] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [workNature, setWorkNature] = useState("");
    const [estimatedHours, setEstimatedHours] = useState("");
    const [status, setStatus] = useState("");

    const handleSearch = () => {
        onSearch({
            ServiceName: serviceName,
            ServiceCategory: serviceCategory,
            PartName: partName,
            Category: category,
            MinPrice: minPrice,
            MaxPrice: maxPrice,
            WorkNature: workNature,
            EstimatedHours: estimatedHours,
            Status: status,
        });
    };

    const handleClearFilters = () => {
        setServiceName("");
        setServiceCategory("");
        setPartName("");
        setCategory("");
        setMinPrice("");
        setMaxPrice("");
        setWorkNature("");
        setEstimatedHours("");
        setStatus("");
        onSearch({
            ServiceName: "",
            ServiceCategory: "",
            PartName: "",
            Category: "",
            MinPrice: "",
            MaxPrice: "",
            WorkNature: "",
            EstimatedHours: "",
            Status: ""
        });
    };

    return (
        <div className="flex bg-white flex-wrap items-center gap-4 p-4 shadow-md rounded-lg">
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_service.search_service_name")}</label>
                <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder={t("manage_service.search_placeholder")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_service.search_category")}</label>
                <input
                    type="text"
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    placeholder={t("manage_service.search_placeholder")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_service.search_part_name")}</label>
                <input
                    type="text"
                    value={partName}
                    onChange={(e) => setPartName(e.target.value)}
                    placeholder={t("manage_service.search_placeholder")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_service.search_category")}</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder={t("manage_service.search_placeholder")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_service.search_min_price")}</label>
                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder={t("manage_service.search_min_price")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_service.search_max_price")}</label>
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder={t("manage_service.search_max_price")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_service.search_work_nature")}</label>
                <input
                    type="text"
                    value={workNature}
                    onChange={(e) => setWorkNature(e.target.value)}
                    placeholder={t("manage_service.search_placeholder")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_service.search_estimated_hours")}</label>
                <input
                    type="number"
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(e.target.value)}
                    placeholder={t("manage_service.search_placeholder")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_service.search_status")}</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>{t("manage_service.search_status_enum.choose")}</option>
                    <option value="active">{t("manage_service.search_status_enum.active")}</option>
                    <option value="inactive">{t("manage_service.search_status_enum.inactive")}</option>
                </select>
            </div>

            <div className="flex flex-col">
                <button onClick={handleClearFilters} className="p-2 border mt-5 border-gray-300 text-gray-500 hover:bg-gray-200 duration-300 focus:outline-none">
                    {t("manage_service.clear_filters")}
                </button>
            </div>

            <div className="flex flex-col">
                <button onClick={handleSearch} className="p-2 border mt-5 border-gray-300 bg-blue-500 text-white hover:bg-blue-600 duration-300 focus:outline-none">
                    {t("manage_service.search")}
                </button>
            </div>
        </div>
    );
}
