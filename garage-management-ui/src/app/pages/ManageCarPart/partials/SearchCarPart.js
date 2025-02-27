import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatDateYearMonthDay } from "../schemas/CarPartValid";

export default function SearchCarPart({ onSearch }) {
  const { t } = useTranslation("manage_carpart");

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
    onSearch({ partName: "", status: "", CreatedAt: "", UpdatedAt: "" });
  };

  const handleSearch = () => {
    onSearch({
      partName: searchName,
      status: searchStatus,
      CreatedAt: formatDateYearMonthDay(createdAt),
      UpdatedAt: formatDateYearMonthDay(updatedAt)
    });
  };

  return (
    <div className="flex bg-white flex-wrap items-center gap-4 p-4 shadow-md rounded-lg">
      {/* Search Input */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          {t("manage_carpart.search_part_name")}
        </label>
        <input
          type="text"
          value={searchName}
          onChange={handleSearchName}
          placeholder={t("manage_carpart.search_placeholder")}
          className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Status Dropdown */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          {t("manage_carpart.search_status")}
        </label>
        <select
          value={searchStatus}
          onChange={handleSearchStatus}
          className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            {t("manage_carpart.search_status_enum.choose")}
          </option>
          <option value="Active">{t("manage_carpart.search_status_enum.active")}</option>
          <option value="Inactive">{t("manage_carpart.search_status_enum.inactive")}</option>
        </select>
      </div>

      {/* CreatedAt Date Picker */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          {t("manage_carpart.search_created_at")}
        </label>
        <input
          type="date"
          value={createdAt}
          onChange={handleCreatedAt}
          className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* UpdatedAt Date Picker */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          {t("manage_carpart.search_updated_at")}
        </label>
        <input
          type="date"
          value={updatedAt}
          onChange={handleUpdatedAt}
          className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col">
        <button
          onClick={handleClearFilters}
          className="p-2 border mt-5 border-gray-300 text-gray-500 hover:bg-gray-200 duration-300 focus:outline-none"
        >
          {t("manage_carpart.clear_filters")}
        </button>
      </div>

      <div className="flex flex-col">
        <button
          onClick={handleSearch}
          className="p-2 border mt-5 border-gray-300 bg-blue-500 text-white hover:bg-blue-600 duration-300 focus:outline-none"
        >
          {t("manage_carpart.search")}
        </button>
      </div>
    </div>
  );
}
