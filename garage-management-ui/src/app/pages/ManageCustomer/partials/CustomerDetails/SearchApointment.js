import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatYearMonthDay } from "../../schemas/CustomerValid";

export default function SearchAppointment({ onSearch }) {
    const { t } = useTranslation("manage_customer");

    const [searchParams, setSearchParams] = useState({
        carLicensePlateNumber: "",
        appointmentType: "",
        appointmentStatus: "",
        fromTime: "",
        toTime: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({ ...prev, [name]: value }));
    };

    const handleClearFilters = () => {
        setSearchParams({
            carLicensePlateNumber: "",
            appointmentType: "",
            appointmentStatus: "",
            fromTime: "",
            toTime: ""
        });
        onSearch({});
    };

    const handleSearch = () => {
        onSearch({
            ...searchParams,
            fromTime: formatYearMonthDay(searchParams.fromTime),
            toTime: formatYearMonthDay(searchParams.toTime)
        });
    };

    return (
        <div className="flex bg-white flex-wrap items-center gap-4 p-4 shadow-md rounded-lg">
            {/* Car License Plate Number */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_customer.appointment.carLicensePlateNumber")}</label>
                <input
                    type="text"
                    name="carLicensePlateNumber"
                    value={searchParams.carLicensePlateNumber}
                    onChange={handleChange}
                    placeholder={t("manage_customer.appointment.search_placeholder")}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Appointment Type Dropdown */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_customer.appointment.appointmentType")}</label>
                <select
                    name="appointmentType"
                    value={searchParams.appointmentType}
                    onChange={handleChange}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">{t("manage_customer.appointment.search_type_enum.choose")}</option>
                    <option value="ServiceBooking">{t("manage_customer.appointment.search_type_enum.serviceBooking")}</option>
                    <option value="ServicePackageBooking">{t("manage_customer.appointment.search_type_enum.servicePackageBooking")}</option>
                    <option value="ScheduledMaintenance">{t("manage_customer.appointment.search_type_enum.scheduledMaintenance")}</option>
                    <option value="SellingProduct">{t("manage_customer.appointment.search_type_enum.sellingProduct")}</option>
                </select>
            </div>

            {/* Appointment Status Dropdown */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_customer.appointment.appointmentStatus")}</label>
                <select
                    name="appointmentStatus"
                    value={searchParams.appointmentStatus}
                    onChange={handleChange}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">{t("manage_customer.appointment.search_status_enum.choose")}</option>
                    <option value="Pending">{t("manage_customer.appointment.search_status_enum.pending")}</option>
                    <option value="Approved">{t("manage_customer.appointment.search_status_enum.approved")}</option>
                    <option value="Rejected">{t("manage_customer.appointment.search_status_enum.rejected")}</option>
                    <option value="Cancelled">{t("manage_customer.appointment.search_status_enum.cancelled")}</option>
                    <option value="InProgress">{t("manage_customer.appointment.search_status_enum.inProgress")}</option>
                    <option value="Completed">{t("manage_customer.appointment.search_status_enum.completed")}</option>
                </select>
            </div>

            {/* From Time Date Picker */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_customer.appointment.fromTime")}</label>
                <input
                    type="date"
                    name="fromTime"
                    value={searchParams.fromTime}
                    onChange={handleChange}
                    className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* To Time Date Picker */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">{t("manage_customer.appointment.toTime")}</label>
                <input
                    type="date"
                    name="toTime"
                    value={searchParams.toTime}
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
                    {t("manage_customer.appointment.clear_filters")}
                </button>
            </div>

            <div className="flex flex-col">
                <button
                    onClick={handleSearch}
                    className="p-2 border mt-5 border-gray-300 bg-blue-500 text-white hover:bg-blue-600 duration-300 focus:outline-none"
                >
                    {t("manage_customer.appointment.search")}
                </button>
            </div>
        </div>
    );
}
