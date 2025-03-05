import React, { useState } from 'react'
import ListCarModal from './partials/ListCarModal'
import { useTranslation } from 'react-i18next'
import CreateCarModal from './models/CreateCarModal';
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";

export default function ManageCarModal() {
    const { t } = useTranslation("manage_car_modal");
    const [isModalOpen, setIsModalOpen] = useState();
    const [refresh, setRefresh] = useState(false);

    return (
        <div className='bg-white shadow-lg p-6'>
            <Breadcrumb/>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">{t("manage_car_modal.title")}</h1>
                <button
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
                    onClick={() => setIsModalOpen(true)}
                >
                    {t("manage_car_modal.create")}
                </button>
            </div>

            <ListCarModal refresh={refresh} />

            <CreateCarModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCarModal={() => setRefresh((pre) => !pre)}
            />
        </div>
    )
}
