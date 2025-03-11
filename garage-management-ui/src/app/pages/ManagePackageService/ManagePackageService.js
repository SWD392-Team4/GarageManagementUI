import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import ListPackageService from './partials/ListPackageService';


export default function ManagePackageService() {
  const { t } = useTranslation("manage_package");
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg p-6">
      <Breadcrumb />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">{t("manage_package.title")}</h1>
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
          onClick={() => navigate("/admin/package-service/create-package")}
        >
          {t("manage_package.create1")}
        </button>
      </div>
      <ListPackageService />

    </div>
  )
}
