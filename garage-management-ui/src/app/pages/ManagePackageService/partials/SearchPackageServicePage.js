import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SearchPackageServicePage({ onSearch }) {
  const { t } = useTranslation("manage_package");

  const [packageName, setPackageName] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [validityPeriod, setValidityPeriod] = useState("");
  const [timeUnit, setTimeUnit] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleClearFilters = () => {
    setPackageName("");
    setServiceCategory("");
    setCategory("");
    setType("");
    setStatus("");
    setValidityPeriod("");
    setTimeUnit("");
    setUsageLimit("");
    setCreatedAt("");
    setUpdatedAt("");
    setMinPrice("");
    setMaxPrice("");

    onSearch({
      packageName: "",
      serviceCategory: "",
      category: "",
      type: "",
      status: "",
      validityPeriod: "",
      timeUnit: "",
      usageLimit: "",
      createdAt: "",
      updatedAt: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  const handleSearch = () => {
    onSearch({
      packageName,
      serviceCategory,
      category,
      type,
      status,
      validityPeriod,
      timeUnit,
      usageLimit,
      createdAt,
      updatedAt,
      minPrice,
      maxPrice,
    });
  };

  return (
    <div className="flex flex-wrap bg-white p-4 shadow-md rounded-lg gap-4">
      {/* Package Id */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          {t("manage_package.search_package_name")}
        </label>
        <input
          type="text"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
          placeholder={t("manage_package.search_placeholder")}
          className="w-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Package Name */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          {t("manage_package.search_package_name")}
        </label>
        <input
          type="text"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
          placeholder={t("manage_package.search_placeholder")}
          className="w-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Service Category */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          {t("manage_package.search_service_category")}
        </label>
        <input
          type="text"
          value={serviceCategory}
          onChange={(e) => setServiceCategory(e.target.value)}
          className="w-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          {t("manage_package.search_category")}
        </label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Type */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          {t("manage_package.search_type")}
        </label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Status Dropdown */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">{t("manage_package.search_status")}</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{t("manage_package.search_status_enum.choose")}</option>
          <option value="Active">{t("manage_package.search_status_enum.active")}</option>
          <option value="Inactive">{t("manage_package.search_status_enum.inactive")}</option>
        </select>
      </div>

      {/* Validity Period */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          {t("manage_package.search_validity_period")}
        </label>
        <input
          type="number"
          value={validityPeriod}
          onChange={(e) => setValidityPeriod(e.target.value)}
          className="w-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Time Unit */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">{t("manage_package.search_time_unit")}</label>
        <select
          value={timeUnit}
          onChange={(e) => setTimeUnit(e.target.value)}
          className="w-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{t("manage_package.search_time_unit_enum.choose")}</option>
          <option value="Days">{t("manage_package.search_time_unit_enum.days")}</option>
          <option value="Months">{t("manage_package.search_time_unit_enum.months")}</option>
        </select>
      </div>

      {/* Usage Limit */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          {t("manage_package.search_usage_limit")}
        </label>
        <input
          type="number"
          value={usageLimit}
          onChange={(e) => setUsageLimit(e.target.value)}
          className="w-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Date Pickers */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">{t("manage_package.search_created_at")}</label>
        <input
          type="date"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
          className="w-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">{t("manage_package.search_updated_at")}</label>
        <input
          type="date"
          value={updatedAt}
          onChange={(e) => setUpdatedAt(e.target.value)}
          className="w-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Price Range */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">{t("manage_package.search_min_price")}</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">{t("manage_package.search_max_price")}</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col">
        <button onClick={handleClearFilters} className="p-2 border mt-5 border-gray-300 text-gray-500 hover:bg-gray-200 duration-300 focus:outline-none">
          {t("manage_package.clear_filters")}
        </button>

      </div>

      <div className="flex flex-col">
        <button onClick={handleSearch} className="p-2 border mt-5 border-gray-300 bg-blue-500 text-white hover:bg-blue-600 duration-300 focus:outline-none">
          {t("manage_package.search")}
        </button>
      </div>

    </div>
  );
}
