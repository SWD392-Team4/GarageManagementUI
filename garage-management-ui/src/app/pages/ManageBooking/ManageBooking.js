import React from "react";
import { useTranslation } from "react-i18next";
import ListBooking from "./partials/ListBooking";

export default function ManageBooking({ languageKey }) {
    const { t } = useTranslation("manage_booking");

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-semibold mb-4">{t("manage_booking.title")}</h1>
            <ListBooking languageKey={languageKey} />
        </div>
    );
}
