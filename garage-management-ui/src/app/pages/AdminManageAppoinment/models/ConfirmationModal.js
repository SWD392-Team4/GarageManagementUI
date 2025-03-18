import React, { useState } from "react";
import { confirmAppointment } from "../services/AppointmentService";
import { useTranslation } from "react-i18next";

const ConfirmationModal = ({ isOpen, appointmentId, onCancel, onConfirm }) => {
  const { t } = useTranslation("appoinment-admin");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const estimatedAppointmentTime = new Date();
      const response = await confirmAppointment(
        estimatedAppointmentTime,
        appointmentId
      );
      onConfirm(response);
    } catch (error) {
      console.error("Error confirming appointment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl font-semibold mb-2 border-b border-gray-800 text-center font-title">
          {t("confirmationModal.title")}
        </h2>
        <p>{t("confirmationModal.prompt")}</p>
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

export default ConfirmationModal;
