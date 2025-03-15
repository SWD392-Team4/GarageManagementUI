import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatYearMonthDay } from "../../schemas/InventorySchemas";

export default function SearchInventory({ onSearch }) {
    const { t } = useTranslation("product_at_warehouse");

    const [searchParams, setSearchParams] = useState({
        minQuantity: "",
        maxQuantity: "",
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
            minQuantity: "",
            maxQuantity: "",
            Status: "",
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
            {/* Min Quantity */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("product_at_warehouse.search.minQuantity")}
                </label>
                <input
                    type="number"
                    name="minQuantity"
                    value={searchParams.minQuantity}
                    onChange={handleChange}
                    placeholder={t("product_at_warehouse.search.search_placeholder_minQuantity")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Max Quantity */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("product_at_warehouse.search.maxQuantity")}
                </label>
                <input
                    type="number"
                    name="maxQuantity"
                    value={searchParams.maxQuantity}
                    onChange={handleChange}
                    placeholder={t("product_at_warehouse.search.search_placeholder_maxQuantity")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Status */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("product_at_warehouse.search.status")}
                </label>
                <select
                    name="status"
                    value={searchParams.status}
                    onChange={handleChange}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">{t("product_at_warehouse.search.search_status_placeholder")}</option>
                    <option value="Active">{t("product_at_warehouse.search.active")}</option>
                    <option value="Inactive">{t("product_at_warehouse.search.inactive")}</option>
                </select>
            </div>

            {/* CreatedAt Date Picker */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("product_at_warehouse.search.createdAt")}
                </label>
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
                <label className="text-sm font-medium text-gray-700">
                    {t("product_at_warehouse.search.updatedAt")}
                </label>
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
                    {t("product_at_warehouse.search.clear_filters")}
                </button>
            </div>

            <div className="flex flex-col">
                <button
                    onClick={handleSearch}
                    className="p-2 border mt-5 border-gray-300 bg-blue-500 text-white hover:bg-blue-600 duration-300 focus:outline-none"
                >
                    {t("product_at_warehouse.search.search")}
                </button>
            </div>
        </div>
    );
}
