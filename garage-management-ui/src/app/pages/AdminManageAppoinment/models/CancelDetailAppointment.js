import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import UserService from "../../../hooks/services/UserService";
import { cancelAppointmentDetail } from "../services/AppointmentService";
import { currentAppointment } from "../services/store/AppointmentSignify";

const CancelDetailAppointment = ({
  isOpen,
  onCancel,
  onConfirm,
  appointmentId,
  serviceDetailId,
}) => {
  const { t } = useTranslation("appoinment-admin");
  const [reason, setReason] = useState("");
  const [type, setType] = useState("");
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
    if (!type) {
      userService.showToast(
        404,
        t("cancelModal.selectType"),
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
      if (response) {
        currentAppointment.set((v) => {
          v.value.load += 1;
        });
      }
      onConfirm(response);
    } catch (error) {
      console.error("Error canceling appointment:", error);
    } finally {
      onCancel();
      setReason("");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl font-semibold mb-2 border-b border-gray-800 text-center font-title">
          {t("cancelModal.title")}
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
        <div className="mt-4">
          <p className="text-sm font-medium">{t("cancelModal.type")}</p>
          <div className="flex items-center mt-2 space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="cancelType"
                value="cancel"
                checked={type === "cancel"}
                onChange={() => setType("cancel")}
                className="mr-1"
              />
              <span>Cancel</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="cancelType"
                value="reject"
                checked={type === "reject"}
                onChange={() => setType("reject")}
                className="mr-1"
              />
              <span>Declined</span>
            </label>
          </div>
          <div className="flex flex-col mt-2">
            <div className="text-red-500 text-xs italic">
              <strong>*Lưu ý:</strong>
              <div>
                <strong>Cancel</strong> {t("cancelModal.cancel")}
              </div>
              <div>
                <strong>Declined</strong> {t("cancelModal.reject")}
              </div>
            </div>
          </div>
        </div>

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
            disabled={loading || !type}
          >
            {loading ? t("common.loading") : t("cancelModal.confirmButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelDetailAppointment;
