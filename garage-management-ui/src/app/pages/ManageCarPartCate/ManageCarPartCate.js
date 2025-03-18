import React, { useState } from "react";
import ListCarPartCate from "./partials/ListCarPartCate";
import { useTranslation } from "react-i18next";
import CarPartCateModal from "./models/CarPartCateModal";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import { sAccount } from "../AuthCustomer/services/store";

export default function ManageCarPartCate() {
  const { t } = useTranslation("manage_carpartcate");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="bg-white shadow-lg p-6">
      <Breadcrumb />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">
          {t("manage_carpartcate.title")}
        </h1>

        {sAccount.value.role === "Administrator" && (
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
            onClick={() => setIsModalOpen(true)}
          >
            {t("manage_carpartcate.create")}
          </button>
        )}
      </div>

      <ListCarPartCate refresh={refresh} />

      <CarPartCateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCarPartCateCreated={() => setRefresh((prev) => !prev)}
      />
    </div>
  );
}
