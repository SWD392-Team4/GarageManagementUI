import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaClock } from "react-icons/fa";
import UserService from "../../../hooks/services/UserService";
import EmployeeList from "../partials/EmployeeList";
import { AssignAppointmentDetail } from "../services/AppointmentService";
import { currentAppointment } from "../services/store/AppointmentSignify";
import SelectEmployee from "./SelectEmployee";
import {
  notificationTypes,
  sendNotification,
} from "../../Notification/services/sendNotification";
import { ConnectionSignify } from "../../Notification/services/connectionSignify";

export default function AssginEmployee({
  isOpen,
  appointmentId,
  onCancel,
  onConfirm,
  serviceDetail,
}) {
  const { t } = useTranslation("appoinment-admin");
  const [employeeid, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);
  const userService = new UserService();
  const connection = ConnectionSignify.use().connection;
  if (!isOpen) return null;
  const handleConfirm = async () => {
    // console.log("employeeid: ", employeeid);

    if (!employeeid) {
      userService.showToast(
        404,
        t("assignModal.emptyEmployee"),
        "top-center",
        2000
      );
    }

    setLoading(true);
    try {
      const response = await AssignAppointmentDetail(
        appointmentId,
        serviceDetail.id,
        employeeid
      );
      await sendNotification(
        connection,
        notificationTypes.APPOINTMENT_ASSIGNED,
        employeeid
      );
      currentAppointment.set((v) => {
        v.value.load += 1;
      });
    } catch (error) {
      console.error("Error AssignAppointmentDetail appointment:", error);
    } finally {
      onCancel();
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl font-semibold mb-2 border-b border-gray-800 text-center font-title">
          Assgin Employee
        </h2>
        <p className="text-sm font-raleway font-medium">
          Vui lòng chọn nhân viên để xếp lịch cho dịch vụ bên dưới:
        </p>

        <div className="mb-4">
          <div className="my-2">
            <h6 className="font-semibold">Services booking</h6>
            <div className="space-y-2">
              {/* Hiển thị tên dịch vụ và estimatedHours */}
              <div className="flex justify-between items-center">
                <span>{serviceDetail.serviceName}</span>
                <span className="flex items-center">
                  <FaClock className="mr-1" />
                  {serviceDetail.estimatedHours} hours
                </span>
              </div>
              {/* Hiển thị danh sách các sản phẩm cần thay thế */}
              <div>
                <h6 className="font-semibold">Replacement Parts</h6>
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
                  <div className="font-normal italic  text-gray-600 text-sm ">
                    Không có sản phẩm thay thế
                  </div>
                )}
              </div>
              <div>
                <EmployeeList
                  id={appointmentId}
                  onCancel2={onCancel}
                  serviceDetail={serviceDetail}
                />
                {serviceDetail.status === "Unsigned" && (
                  <>
                    <h6 className="font-semibold">Select Employee</h6>
                    <SelectEmployee
                      setEmployeeId={setEmployeeId}
                      employeeid={employeeid}
                      employeeSchedules={serviceDetail.employeeSchedules}
                    />
                  </>
                )}
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
