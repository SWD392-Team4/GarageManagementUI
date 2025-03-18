import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatYearMonthDay } from "../../../pages/ProductAtStore/schemas/ProductAtStoreSchemas";

export default function SearchInvoicePage({ onSearch }) {
  const { t } = useTranslation("product_at_store");

  const [searchParams, setSearchParams] = useState({
    invoiceNumber: "",
    customerName: "",
    minTotalPrice: "",
    maxTotalPrice: "",
    status: "",
    createdAt: "",
    updatedAt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setSearchParams({
      invoiceNumber: "",
      customerName: "",
      minTotalPrice: "",
      maxTotalPrice: "",
      status: "",
      createdAt: "",
      updatedAt: "",
    });
    onSearch({});
  };

  const handleSearch = () => {
    onSearch({
      ...searchParams,
      createdAt: formatYearMonthDay(searchParams.createdAt),
      updatedAt: formatYearMonthDay(searchParams.updatedAt),
    });
  };

  return (
    <div className="flex bg-white flex-wrap items-center gap-4 p-4 shadow-md rounded-lg">
      {/* Invoice Number */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          {t("product_at_store.search_invoice.invoiceNumber")}
        </label>
        <input
          type="text"
          name="invoiceNumber"
          value={searchParams.invoiceNumber}
          onChange={handleChange}
          className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Customer Name */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          {t("product_at_store.search_invoice.customerName")}
        </label>
        <input
          type="text"
          name="customerName"
          value={searchParams.customerName}
          onChange={handleChange}
          className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Min Total Price */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          {t("product_at_store.search_invoice.minTotalPrice")}
        </label>
        <input
          type="number"
          name="minTotalPrice"
          value={searchParams.minTotalPrice}
          onChange={handleChange}
          className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Max Total Price */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          {t("product_at_store.search_invoice.maxTotalPrice")}
        </label>
        <input
          type="number"
          name="maxTotalPrice"
          value={searchParams.maxTotalPrice}
          onChange={handleChange}
          className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Status Dropdown */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          {t("product_at_store.search_invoice.status")}
        </label>
        <select
          name="status"
          value={searchParams.status}
          onChange={handleChange}
          className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            {t("product_at_store.search_invoice.search_status_enum.choose")}
          </option>
          <option value="paid">
            {t("product_at_store.search_invoice.search_status_enum.paid")}
          </option>
          <option value="unpaid">
            {t("product_at_store.search_invoice.search_status_enum.unpaid")}
          </option>
        </select>
      </div>

      {/* CreatedAt Date Picker */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">
          {t("product_at_store.search_invoice.createdAt")}
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
          {t("product_at_store.search_invoice.updatedAt")}
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
          {t("product_at_store.search_invoice.clear_filters")}
        </button>
      </div>

      <div className="flex flex-col">
        <button
          onClick={handleSearch}
          className="p-2 border mt-5 border-gray-300 bg-blue-500 text-white hover:bg-blue-600 duration-300 focus:outline-none"
        >
          {t("product_at_store.search_invoice.search")}
        </button>
      </div>
    </div>
  );
}
