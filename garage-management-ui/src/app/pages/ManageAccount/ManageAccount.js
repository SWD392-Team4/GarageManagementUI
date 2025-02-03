import React from "react";
import { useTranslation } from "react-i18next";
import ListAccount from "./partials/ListAccount";

export default function ManageAccount({ languageKey }) {
    const { t } = useTranslation();

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-semibold mb-4">{t("manage_account.title")}</h1>
            <ListAccount languageKey={languageKey} />
        </div>
    );
}
