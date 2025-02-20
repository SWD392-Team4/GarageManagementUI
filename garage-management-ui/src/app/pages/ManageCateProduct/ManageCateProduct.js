import React, { useState } from "react";
import ListCatePro from "./partials/ListCatePro";
import { useTranslation } from "react-i18next";
import CreateCateForm from "./models/CreateCateForm";

export default function ManageCateProduct() {
    const { t } = useTranslation("manage_product_category");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);

    return (
        <div className="bg-white shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">{t("manage_product_category.title")}</h1>
                <button
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
                    onClick={() => setIsModalOpen(true)}
                >
                    {t("manage_product_category.create")}
                </button>
            </div>

            <ListCatePro refresh={refresh} />

            <CreateCateForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCategoryCreated={() => setRefresh((prev) => !prev)}
            />
        </div>
    );
}
