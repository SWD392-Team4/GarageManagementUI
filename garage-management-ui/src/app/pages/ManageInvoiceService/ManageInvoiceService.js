import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../AdminManageAppoinment/partials/Breadcrumb';
import ListInvoiceService from './partials/ListInvoiceService';

export default function ManageInvoiceService() {
    const { t } = useTranslation("manage_invoice_service");
    const navigate = useNavigate();

    return (
        <div className="bg-white shadow-lg p-6">
            <Breadcrumb />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">{t("manage_invoice_service.title")}</h1>
                <button
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
                    onClick={() => navigate("/admin/invoice-service/create")}
                >
                    {t("manage_invoice_service.create")}
                </button>
            </div>
            <ListInvoiceService />
        </div>
    )
}
