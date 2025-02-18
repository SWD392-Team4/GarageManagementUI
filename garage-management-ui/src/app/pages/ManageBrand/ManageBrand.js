import React, { useState } from "react";
import ListBrand from "./partials/ListBrand";
import { useTranslation } from "react-i18next";
import BrandModal from "./models/BrandModal";

export default function ManageBrand() {
    const { t } = useTranslation("manage_brand");
    const [isModalOpen, setIsModalOpen] = useState(false);
    //Dùng để render lại
    const [refresh, setRefresh] = useState(false); 

    return (
        <div className="bg-white shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">{t("manage_brand.title")}</h1>
                <button
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
                    onClick={() => setIsModalOpen(true)}
                >
                    {t("manage_brand.create")}
                </button>
            </div>

            <ListBrand refresh={refresh} />

            <BrandModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onBrandCreated={() => setRefresh((prev) => !prev)}
            />
        </div>
    );
}
