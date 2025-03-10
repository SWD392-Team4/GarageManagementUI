import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatDateYearMonthDay } from "../schemas/GoodsReceivedSchema";

export default function SearchGoodsReceivedPage({ onSearch }) {
    const { t } = useTranslation("manage_goods_received");

    const [referenceNumber, setReferenceNumber] = useState("");
    const [invoiceCode, setInvoiceCode] = useState("");
    const [sourceAddress, setSourceAddress] = useState("");
    const [sourceProvince, setSourceProvince] = useState("");
    const [sourceDistrict, setSourceDistrict] = useState("");
    const [sourceWards, setSourceWards] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [status, setStatus] = useState("");
    const [createdAt, setCreatedAt] = useState("");

    const handleSearch = () => {
        onSearch({
            ReferenceNumber: referenceNumber,
            InvoiceCode: invoiceCode,
            SourceAddress: sourceAddress,
            SourceProvince: sourceProvince,
            SourceDistrict: sourceDistrict,
            SourceWards: sourceWards,
            MinPrice: minPrice,
            MaxPrice: maxPrice,
            Status: status,
            CreatedAt: formatDateYearMonthDay(createdAt),
        });
    };

    const handleClearFilters = () => {
        setReferenceNumber("");
        setInvoiceCode("");
        setSourceAddress("");
        setSourceProvince("");
        setSourceDistrict("");
        setSourceWards("");
        setMinPrice("");
        setMaxPrice("");
        setStatus("");
        setCreatedAt("");
        onSearch({
            ReferenceNumber: "",
            InvoiceCode: "",
            SourceAddress: "",
            SourceProvince: "",
            SourceDistrict: "",
            SourceWards: "",
            MinPrice: "",
            MaxPrice: "",
            Status: "",
            CreatedAt: "",
        });
    };

    return (
        <div className="flex bg-white flex-wrap items-center gap-4 p-4 shadow-md rounded-lg">
            {/* Reference Number */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_goods_received.search.reference_number")}
                </label>
                <input
                    type="text"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Invoice Code */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_goods_received.search.invoice_code")}
                </label>
                <input
                    type="text"
                    value={invoiceCode}
                    onChange={(e) => setInvoiceCode(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Source Address */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_goods_received.search.source_address")}
                </label>
                <input
                    type="text"
                    value={sourceAddress}
                    onChange={(e) => setSourceAddress(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Source Province */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_goods_received.search.source_province")}
                </label>
                <input
                    type="text"
                    value={sourceProvince}
                    onChange={(e) => setSourceProvince(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Source District */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_goods_received.search.source_district")}
                </label>
                <input
                    type="text"
                    value={sourceDistrict}
                    onChange={(e) => setSourceDistrict(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Source Wards */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_goods_received.search.source_wards")}
                </label>
                <input
                    type="text"
                    value={sourceWards}
                    onChange={(e) => setSourceWards(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Min Price */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_goods_received.search.min_price")}
                </label>
                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Max Price */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_goods_received.search.max_price")}
                </label>
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Status */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_goods_received.search.status")}
                </label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                >
                    <option value="">{t("manage_goods_received.search.status_enum.choose")}</option>
                    <option value="active">{t("manage_goods_received.search.status_enum.active")}</option>
                    <option value="inactive">{t("manage_goods_received.search.status_enum.inactive")}</option>
                </select>
            </div>

            {/* Created At */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    {t("manage_goods_received.search.created_at")}
                </label>
                <input
                    type="date"
                    value={createdAt}
                    onChange={(e) => setCreatedAt(e.target.value)}
                    className="w-40 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col">
                <button
                    onClick={handleClearFilters}
                    className="p-2 border mt-5 border-gray-300 text-gray-500 hover:bg-gray-200 duration-300"
                >
                    {t("manage_goods_received.search.clear_filters")}
                </button>
            </div>

            <div className="flex flex-col">
                <button
                    onClick={handleSearch}
                    className="p-2 border mt-5 border-gray-300 bg-blue-500 text-white hover:bg-blue-600 duration-300"
                >
                    {t("manage_goods_received.search.search")}
                </button>
            </div>
        </div>
    );
}
