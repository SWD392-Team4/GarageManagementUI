import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaClock } from "react-icons/fa";
import UserService from "../../../hooks/services/UserService";
import { UnAssignAppointmentDetail } from "../services/AppointmentService";
import { currentAppointment } from "../services/store/AppointmentSignify";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

export default function UnAssginEmployee({
  isOpen,
  appointmentId,
  onCancel,
  onConfirm,
  serviceDetail,
  employee,
  onCancel2,
}) {
  const { t } = useTranslation("appoinment-admin");

  const [cancelType, setCancelType] = useState("");
  const [loading, setLoading] = useState(false);
  const userService = new UserService();

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!cancelType) {
      userService.showToast(
        404,
        t("assignModal.selectTypeCancel"),
        "top-center",
        2000
      );
      return;
    }

    const payload = {
      employeeId: employee.id,

      isCancel: cancelType === "cancel",
      isDecline: cancelType === "decline",
    };

    setLoading(true);
    try {
      const response = await UnAssignAppointmentDetail(
        appointmentId,
        serviceDetail.id,
        payload
      );
      currentAppointment.set((v) => {
        v.value.load += 1;
      });
    } catch (error) {
      console.error("Error unassigning employee:", error);
    } finally {
      onCancel();
      setLoading(false);
      onCancel2();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl font-semibold mb-2 border-b border-gray-800 text-center font-title">
          {t("unAssgn.UnassignEmployee")}
        </h2>
        <p className="text-sm font-raleway font-medium">
          {t("unAssgn.Reason")}
        </p>

        <div className="mb-4">
          <div className="my-2">
            <h6 className="font-semibold"> {t("unAssgn.ServicesUn")}</h6>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>{serviceDetail.serviceName}</span>
                <span className="flex items-center">
                  <FaClock className="mr-1" />
                  {serviceDetail.estimatedHours} {t("unAssgn.hours")}
                </span>
              </div>
              <div>
                <h6 className="font-semibold">
                  {" "}
                  {t("unAssgn.ReplacementParts")}
                </h6>
                {serviceDetail.appointmentReplacementParts &&
                serviceDetail.appointmentReplacementParts.length > 0 ? (
                  serviceDetail.appointmentReplacementParts.map((part) => (
                    <div key={part.id} className="flex justify-between">
                      <span>
                        {part.productName} x {part.quantity}{" "}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="font-normal italic text-gray-600 text-sm ">
                    {t("unAssgn.NoProduct")}
                  </div>
                )}
                <h6 className="font-semibold mt-4">
                  {" "}
                  {t("unAssgn.InfomationEmployee")}
                </h6>
                <div
                  key={employee.id}
                  className="grid grid-cols-6 items-center w-full max-w-full overflow-hidden space-x-2 mb-2"
                >
                  <div className="col-span-1 flex-shrink-0">
                    {employee.imageLink ? (
                      <img
                        src={employee.imageLink}
                        alt={`${employee.firstName} ${employee.lastName}`}
                        className="w-full h-14 object-cover rounded-sm"
                      />
                    ) : (
                      <div className="w-full h-14 flex items-center justify-center bg-gray-200 rounded-sm">
                        <FaUser className="text-gray-500 text-xl" />
                      </div>
                    )}
                  </div>
                  <div className="col-span-4 overflow-hidden">
                    <div className="font-medium">
                      {employee.firstName} {employee.lastName}
                    </div>
                    <div className="flex text-xs items-center">
                      <div className="flex items-center mr-2">
                        <FaEnvelope className="mr-1" /> {employee.email}
                      </div>
                      <div className="flex items-center">
                        <FaPhone className="mr-1" /> {employee.phoneNumber}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h6 className="font-semibold mt-4">
                  {" "}
                  {t("unAssgn.TypeCancel")}
                </h6>
                <div className="flex items-center space-x-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="cancelType"
                      value="cancel"
                      checked={cancelType === "cancel"}
                      onChange={() => setCancelType("cancel")}
                      className="mr-1"
                    />
                    <span>Cancel</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="cancelType"
                      value="decline"
                      checked={cancelType === "decline"}
                      onChange={() => setCancelType("decline")}
                      className="mr-1"
                    />
                    <span>Decline</span>
                  </label>
                </div>
                <div className="flex flex-col mt-2">
                  <div className="text-red-500 text-xs italic">
                    <strong>Lưu ý:</strong>
                    <div>
                      <strong>Cancel</strong> {t("unAssgn.title1")}
                    </div>
                    <div>
                      <strong>Decline</strong> {t("unAssgn.title2")}
                    </div>
                  </div>
                </div>
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
            className="p-2 bg-green-300 rounded hover:bg-green-400"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? t("common.loading") : t("assignModal.confirmButton")}
          </button>
        </div>
      </div>
    </div>
  );
}
