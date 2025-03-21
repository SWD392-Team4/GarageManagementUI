import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { formatVietnameseCurrency } from "../../ManageGoodsIssued/schemas/GoodsIssuedSchemas";

const UpdateServiceModal = ({ isOpen, onClose, services, appointmentId }) => {
  const { t } = useTranslation("appoinment-admin");
  const [formData, setFormData] = useState({});

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start pt-10 transition-all duration-300">
      <div className="bg-white w-full max-w-4xl rounded shadow-lg overflow-auto">
        {/* Header của modal */}
        <div className="p-4 border-b border-gray-300 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {t("updateServiceModal.title", "Update Services")}
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 font-bold hover:underline"
          >
            {t("common.close", "Close")}
          </button>
        </div>
        {/* Nội dung modal: bảng hiển thị service */}
        <div className="p-4">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 border-b border-gray-300 uppercase text-xs font-medium text-gray-700">
              <tr>
                <th scope="col" className="px-4 py-3 text-left">
                  {t("tableHeaders.stt", "STT")}
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  {t("tableHeaders.serviceName", "Service Name")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((service, index) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap">{index + 1}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {service.serviceName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UpdateServiceModal;
