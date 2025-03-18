import React, { useState } from "react";
import ListSupplier from "./partials/ListSupplier";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import { useTranslation } from "react-i18next";
import CreateSupplierModal from "./models/CreateSupplierModal";
import { sAccount } from "../AuthCustomer/services/store";

export default function ManageSupplier() {
  const { t } = useTranslation("manage_supplier");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="bg-white shadow-lg p-6">
      <Breadcrumb />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">{t("manage_supplier.title")}</h1>
        {(sAccount.value.role === "Administrator" ||
          sAccount.value.role === "WarehouseManager") && (
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
            onClick={() => setIsModalOpen(true)}
          >
            {t("manage_supplier.create")}
          </button>
        )}
      </div>
      <ListSupplier refresh={refresh} />
      <CreateSupplierModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSupplierCreated={() => setRefresh((prev) => !prev)}
      />
    </div>
  );
}
