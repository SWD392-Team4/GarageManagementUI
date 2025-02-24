import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    FaTools,
    FaCalendarAlt,
    FaChevronDown,
    FaChevronUp,
    FaSyncAlt,
} from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

export default function ServiceSearchOptions({ onSearch }) {
    const { t } = useTranslation("Service_Home");

    const [searchQuery, setSearchQuery] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    // Toggle advanced filters
    const handleFilterToggle = () => {
        setShowAdvancedFilters(!showAdvancedFilters);
    };

    // Handle search
    const handleSearch = () => {
        onSearch({
            searchQuery,
            serviceType,
            fromDate,
            toDate,
        });
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery("");
        setServiceType("");
        setFromDate("");
        setToDate("");
        onSearch({});
    };

    return (
        <div className="bg-white shadow-md rounded-2xl p-5 mb-12">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">{t("search_services")}</h2>
                <button
                    onClick={clearFilters}
                    className="flex items-center text-red-500 font-semibold hover:underline"
                >
                    <FaSyncAlt className="mr-2" />
                    {t("clear_filters")}
                </button>
            </div>

            {/* Basic Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
                {/* Search Input */}
                <div className="relative">
                    <FaTools className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    <input
                        type="text"
                        className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder={t("search_placeholder")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Service Type Select */}
                <div className="relative">
                    <FaTools className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    <select
                        className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                    >
                        <option value="">{t("all_services")}</option>
                        <option value="maintenance">{t("maintenance")}</option>
                        <option value="repair">{t("repair")}</option>
                        <option value="inspection">{t("inspection")}</option>
                    </select>
                </div>

                {/* Search Button */}
                <div className="relative">
                    <button
                        className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all focus:outline-none"
                        onClick={handleSearch}
                    >
                        <CiSearch className="mr-2" />
                        {t("search")}
                    </button>
                </div>
            </div>

            {/* Toggle Advanced Filters */}
            <div className="mt-6">
                <button
                    className="flex items-center text-blue-500 font-semibold hover:underline focus:outline-none"
                    onClick={handleFilterToggle}
                >
                    {showAdvancedFilters ? (
                        <>
                            <FaChevronUp className="mr-2" />
                            {t("hide_advanced_filters")}
                        </>
                    ) : (
                        <>
                            <FaChevronDown className="mr-2" />
                            {t("show_advanced_filters")}
                        </>
                    )}
                </button>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="relative">
                        <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="date"
                            className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="date"
                            className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
