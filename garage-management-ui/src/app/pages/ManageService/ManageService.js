import React from 'react'
import ListService from './partials/ListService'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";

export default function ManageService() {
    const { t } = useTranslation("manage_service");
    const navigate = useNavigate();
    return (
        <>
            <div className="bg-white shadow-lg p-6">
                <Breadcrumb />
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">{t("manage_service.title")}</h1>
                    <button
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
                        onClick={() => navigate("/admin/service/createService")}
                    >
                        {t("manage_service.create")}
                    </button>
                </div>
                <ListService />
            </div>
        </>
    )
}
