import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import UserService from "../../../hooks/services/UserService";
import { cancelAppointmentDetail } from "../services/AppointmentService";

const CancelDetailAppointment = ({
  isOpen,
  onCancel,
  onConfirm,
  type,
  appointmentId,
  serviceDetailId,
}) => {
  const { t } = useTranslation("appoinment-admin");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const userService = new UserService();
  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!reason) {
      userService.showToast(
        404,
        t("cancelModal.emptyReason"),
        "top-center",
        2000
      );
      return;
    }
    setLoading(true);
    try {
      const response = await cancelAppointmentDetail(
        reason,
        appointmentId,
        serviceDetailId,
        type
      );
      onConfirm(response);
    } catch (error) {
      console.error("Error canceling appointment:", error);
    } finally {
      onCancel();
      setReason();
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl font-semibold mb-2 border-b border-gray-800 text-center font-title">
          {t(`cancelModal.${type}`)}
        </h2>
        <p className="text-sm font-raleway font-medium">
          {t("cancelModal.prompt")}
        </p>
        <textarea
          className="w-full border border-gray-300 rounded p-2 mt-2"
          rows="3"
          placeholder={t("cancelModal.placeholder")}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>
        <div className="mt-4 flex justify-end">
          <button
            className="p-2 bg-gray-300 rounded mr-2"
            onClick={onCancel}
            disabled={loading}
          >
            {t("common.cancel")}
          </button>
          <button
            className="p-2 bg-red-300 rounded hover:bg-red-400"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? t("common.loading") : t("cancelModal.confirmButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelDetailAppointment;
