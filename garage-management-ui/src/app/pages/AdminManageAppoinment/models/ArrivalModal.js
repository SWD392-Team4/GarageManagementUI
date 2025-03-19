import React, { useState } from "react";
import { arrivalAppointment } from "../services/AppointmentService";
import { useTranslation } from "react-i18next";

const ArrivalModal = ({ isOpen, formData, onCancel, onConfirm, id }) => {
  const { t } = useTranslation("appoinment-admin");
  const [loading, setLoading] = useState(false);
  if (!isOpen) return null;

  const handleConfirm = async () => {
    const payload = {
      carModelId: formData.model,
      mileage: Number(formData.mileage),
      customerName: formData.customerName,
      customerPhoneNumber: formData.phone,
      customerEmail: formData.email,
      estimatedAppointmentTime: new Date(formData.estimatedTime).toISOString(),
      estimatedEndTime: new Date(formData.estimatedEndTime).toISOString(),
      carLicensePlateNumber: formData.licenser,
    };
    setLoading(true);
    try {
      const response = await arrivalAppointment(payload, id);
      onConfirm(response);
    } catch (error) {
      console.error("Error confirming arrival appointment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl font-semibold mb-2 border-b border-gray-800 text-center font-title">
          {t("arrivalModal.title")}
        </h2>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span className="text-sm font-raleway max-w-32">
              {t("arrivalModal.customerNameLabel")}
            </span>
            <span className="max-w-36 text-right break-all">
              {formData.customerName}
            </span>
          </li>
          <li className="flex justify-between">
            <span className="text-sm font-raleway max-w-32">
              {t("arrivalModal.phoneLabel")}
            </span>
            <span className="max-w-36 text-right break-all">
              {formData.phone}
            </span>
          </li>
          <li className="flex flex-wrap justify-between">
            <span className="text-sm font-raleway max-w-32">
              {t("arrivalModal.emailLabel")}
            </span>
            <span className="max-w-36 text-right break-all">
              {formData.email}
            </span>
          </li>
          <li className="flex justify-between">
            <span className="text-sm font-raleway max-w-32">
              {t("arrivalModal.licenserLabel")}
            </span>
            <span className="max-w-24 text-right">{formData.licenser}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-sm font-raleway max-w-32">
              {t("arrivalModal.estimatedEndTimeLabel")}
            </span>
            <span className="max-w-36 text-right break-all">
              {formData.estimatedEndTime.replace("T", " ")}
            </span>
          </li>
        </ul>
        <div className="mt-4 flex justify-end">
          <button
            className="p-2 bg-gray-300 rounded mr-2"
            onClick={onCancel}
            disabled={loading}
          >
            {t("common.cancel")}
          </button>
          <button
            className="p-2 bg-green-300 rounded hover:bg-green-400"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? t("common.loading") : t("common.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArrivalModal;
