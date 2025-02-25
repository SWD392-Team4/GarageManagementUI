import React, { useState } from "react";
import ListCarPart from "./partials/ListCarPart";
import { useTranslation } from "react-i18next";
import CarPartModal from "./models/CarPartModal";

export default function ManageCarPart() {
  const { t } = useTranslation("manage_carpart");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="bg-white shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">{t("manage_carpart.title")}</h1>
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
          onClick={() => setIsModalOpen(true)}
        >
          {t("manage_carpart.create")}
        </button>
      </div>

      <ListCarPart refresh={refresh} />

      <CarPartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCarPartCreated={() => setRefresh((prev) => !prev)}
      />
    </div>
  );
}
