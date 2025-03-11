import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import ListGoodsReceived from './partials/ListGoodsReceived';


export default function ManageGoodReceived() {
    const { t } = useTranslation("manage_goods_received");
    const navigate = useNavigate();

    return (


        <div className="bg-white shadow-lg p-6">
            <Breadcrumb />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">{t("manage_goods_received.title")}</h1>
                <button
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
                    onClick={() => navigate("/admin/invoice-goods-Received/create-goods-Received")}
                >
                    {t("manage_goods_received.create")}
                </button>
            </div>
            <ListGoodsReceived />

        </div>
    )
}
