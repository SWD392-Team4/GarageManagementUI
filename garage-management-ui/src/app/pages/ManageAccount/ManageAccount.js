import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ListAccount from "./partials/ListAccount";
import CreateAccountForm from "./models/CreateAccountForm";

export default function ManageAccount({ languageKey }) {
    const { t } = useTranslation();
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">{t("manage_account.title")}</h1>
                <button
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
                    onClick={() => setShowForm(true)}
                >
                    {t("manage_account.create")}
                </button>
            </div>

            {showForm && <CreateAccountForm onClose={() => setShowForm(false)} languageKey={languageKey} />}
            <ListAccount languageKey={languageKey} />
        </div>
    );
}