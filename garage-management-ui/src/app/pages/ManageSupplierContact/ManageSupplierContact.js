import React, { useState } from 'react'
import ListSupplierContact from './partials/ListSupplierContact'
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import { useTranslation } from 'react-i18next';
import CreateSupplierContactModal from "./models/CreateSupplierContactModal"


export default function ManageSupplierContact() {
    const { t } = useTranslation("manage_supplier_contact");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    return (

        <div className="bg-white shadow-lg p-6">
            < Breadcrumb />

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">{t("manage_supplier_contact.title")}</h1>
                <button
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
                    onClick={() => setIsModalOpen(true)}
                >
                    {t("manage_supplier_contact.create")}
                </button>
            </div>
            <ListSupplierContact refresh={refresh} />

            <CreateSupplierContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSupplierCreated={() => setRefresh((prev) => !prev)}
            />
        </div >
    )
}
