import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatDateYearMonthDay } from "../schemas/GoodsIssuedSchemas";

export default function SearchGoodsIssuedPage({ onSearch }) {
    const { t } = useTranslation("manage_goods_issued");

    const [referenceNumber, setReferenceNumber] = useState("");
    const [invoiceCode, setInvoiceCode] = useState("");
    const [minTotalCost, setMinTotalCost] = useState("");
    const [maxTotalCost, setMaxTotalCost] = useState("");
    const [status, setStatus] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");

    const handleSearch = () => {
        onSearch({
            ReferenceNumber: referenceNumber,
            InvoiceCode: invoiceCode,
            MinTotalCost: minTotalCost,
            MaxTotalCost: maxTotalCost,
            Status: status,
            CreatedAt: formatDateYearMonthDay(createdAt),
            UpdatedAt: formatDateYearMonthDay(updatedAt),
        });
    };

    const handleClearFilters = () => {
        setReferenceNumber("");
        setInvoiceCode("");
        setMinTotalCost("");
        setMaxTotalCost("");
        setStatus("");
        setCreatedAt("");
        setUpdatedAt("");
        onSearch({
            ReferenceNumber: "",
            InvoiceCode: "",
            MinTotalCost: "",
            MaxTotalCost: "",
            Status: "",
            CreatedAt: "",
            UpdatedAt: "",
        });
    };

    return (
        <div className="flex bg-white flex-wrap items-center gap-4 p-4 shadow-md rounded-lg">
            {/* Reference Number */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_goods_issued.search.reference_number")}</label>
                <input
                    type="text"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Invoice Code */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_goods_issued.search.invoice_code")}</label>
                <input
                    type="text"
                    value={invoiceCode}
                    onChange={(e) => setInvoiceCode(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Min Total Cost */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_goods_issued.search.min_total_cost")}</label>
                <input
                    type="number"
                    value={minTotalCost}
                    onChange={(e) => setMinTotalCost(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Max Total Cost */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_goods_issued.search.max_total_cost")}</label>
                <input
                    type="number"
                    value={maxTotalCost}
                    onChange={(e) => setMaxTotalCost(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Status */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_goods_issued.search.status")}</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                >
                    <option value="">{t("manage_goods_issued.search.status_enum.choose")}</option>
                    <option value="active">{t("manage_goods_issued.search.status_enum.active")}</option>
                    <option value="inactive">{t("manage_goods_issued.search.status_enum.inactive")}</option>
                </select>
            </div>

            {/* Created At */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_goods_issued.search.created_at")}</label>
                <input
                    type="date"
                    value={createdAt}
                    onChange={(e) => setCreatedAt(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Updated At */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_goods_issued.search.updated_at")}</label>
                <input
                    type="date"
                    value={updatedAt}
                    onChange={(e) => setUpdatedAt(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col">
                <button
                    onClick={handleClearFilters}
                    className="p-2 border mt-5 border-gray-300 text-gray-500 hover:bg-gray-200 duration-300"
                >
                    {t("manage_goods_issued.search.clear_filters")}
                </button>
            </div>

            <div className="flex flex-col">
                <button
                    onClick={handleSearch}
                    className="p-2 border mt-5 border-gray-300 bg-blue-500 text-white hover:bg-blue-600 duration-300"
                >
                    {t("manage_goods_issued.search.search")}
                </button>
            </div>
        </div>
    );
}
