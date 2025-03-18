import React, { useState } from "react";
import ListCarCategory from "./partials/ListCarCategory";
import { useTranslation } from "react-i18next";
import CreateCarCategoryModal from "./models/CreateCarCategoryModal";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import { sAccount } from "../AuthCustomer/services/store";

export default function ManageCarCategory() {
  const { t } = useTranslation("manage_car_category");
  const [isOpenModal, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="bg-white shadow-lg p-6">
      <Breadcrumb />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">
          {t("manage_car_category.title")}
        </h1>
        {sAccount.value.role === "Administrator" && (
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
            onClick={() => setIsModalOpen(true)}
          >
            {t("manage_car_category.create")}
          </button>
        )}
      </div>

      <ListCarCategory refresh={refresh} />

      <CreateCarCategoryModal
        isOpenModal={isOpenModal}
        onClose={() => setIsModalOpen(false)}
        onCreateCarCategory={() => setRefresh((pre) => !pre)}
      />
    </div>
  );
}
