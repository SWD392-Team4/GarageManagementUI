import React, { useState } from "react";
import ListEmployee from "./partials/ListEmployee";
import { useTranslation } from "react-i18next";
import CreateEmployeeModal from "./models/CreateEmployeeModal";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import { sAccount } from "../AuthCustomer/services/store";

export default function ManageEmployee() {
  const { t } = useTranslation("manage_employee");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="bg-white shadow-lg p-6">
      <Breadcrumb />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">{t("manage_employee.title")}</h1>

        {sAccount.value.role === "Administrator" && (
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
            onClick={() => setIsModalOpen(true)}
          >
            {t("manage_employee.create")}
          </button>
        )}
      </div>
      <ListEmployee refresh={refresh} />

      <CreateEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBrandCreated={() => setRefresh((prev) => !prev)}
      />
    </div>
  );
}
