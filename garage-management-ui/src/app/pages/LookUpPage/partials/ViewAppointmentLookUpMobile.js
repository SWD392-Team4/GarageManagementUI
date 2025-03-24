import React, { useState } from "react";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCar,
  FaTag,
  FaWrench,
  FaClock,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import CarConditionImages from "./CarConditionImages";
import { formatVietnameseCurrency } from "../schemas/LookUpSchemas";
import { useTranslation } from "react-i18next";

export default function ViewAppointmentLookUpMobile({ appointment }) {
  // Chỉ render nếu thiết bị là mobile
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [selectedService, setSelectedService] = useState(null);
  const [showAllPackages, setShowAllPackages] = useState(false);
  const { t } = useTranslation("look_up_page");
  ///Cancel them tinh nanng vui ve kh quao
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const openCancelModal = () => setIsCancelModalOpen(true);
  const closeCancelModal = () => setIsCancelModalOpen(false);

  if (!isMobile) return null;
  if (!appointment) {
    return (
      <div className="text-center text-lg font-bold text-red-600">
        No appointment data available.
      </div>
    );
  }

  const submitCancel = async () => {
    if (cancelReason.trim() === "") return;
    await cancelAppointment(cancelReason);
    closeCancelModal();
  };
  return (
    <div className="p-4 md:hidden">
      {/* Appointment Info */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-bold text-center text-red-700 mb-4">
          {t("look_up_page.view_look_up.appointment_info")}
        </h2>
        <div className="space-y-2">
          {/* Customer Details */}
          <div>
            <h3 className="font-semibold text-red-700">
              {" "}
              {t("look_up_page.view_look_up.customer_details")}
            </h3>
            <p>
              <FaUser className="inline mr-2 text-red-700" />
              {appointment.customerName}
            </p>
            <p>
              <FaPhone className="inline mr-2 text-red-700" />
              {appointment.customerPhoneNumber}
            </p>
            <p>
              <FaEnvelope className="inline mr-2 text-red-700" />
              {appointment.customerEmail}
            </p>
          </div>
          {/* Car Details */}
          <div>
            <h3 className="font-semibold text-red-700">
              {" "}
              {t("look_up_page.view_look_up.car_details")}
            </h3>
            <p>
              <FaCar className="inline mr-2 text-red-700" />
              {appointment.carLicensePlateNumber}
            </p>
            <p>
              <FaTag className="inline mr-2 text-red-700" />
              {appointment.carModelId}
            </p>
            <p>
              <FaWrench className="inline mr-2 text-red-700" />
              {appointment.mileage} km
            </p>
          </div>
          {/* Appointment Time */}
          <div>
            <h3 className="font-semibold text-red-700">
              {t("look_up_page.view_look_up.appointment_time")}
            </h3>
            <p>
              <FaClock className="inline mr-2 text-red-700" />
              {t("look_up_page.view_look_up.start")}:{" "}
              {appointment.estimatedAppointmentTime}
            </p>
            <p>
              <FaClock className="inline mr-2 text-red-700" />
              {t("look_up_page.view_look_up.end")}:{" "}
              {appointment.estimatedEndTime}
            </p>
          </div>
          {appointment.status !== "Cancelled" && (
            <div>
              <button
                onClick={openCancelModal}
                className="bg-red-600 text-white p-2 rounded flex items-center gap-2"
              >
                <FaExclamationTriangle /> Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Service Details */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold text-center text-red-700 mb-4">
          {t("look_up_page.view_look_up.service_details")}:
        </h2>
        {appointment.appointmentDetails.map((detail, index) => (
          <div key={index} className="border p-3 rounded-lg mb-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-red-700">
                {detail.serviceName}
              </span>
              <button
                className="text-red-700"
                onClick={() =>
                  setSelectedService(selectedService === index ? null : index)
                }
              >
                {selectedService === index ? <FaTimes /> : "View"}
              </button>
            </div>
            {selectedService === index && (
              <div className="mt-2">
                <p>
                  <strong>
                    {" "}
                    {t("look_up_page.view_look_up.estimated_hours")}:
                  </strong>{" "}
                  {detail.estimatedHours}
                </p>
                <p>
                  <strong>{t("look_up_page.view_look_up.price")}:</strong>{" "}
                  {formatVietnameseCurrency(detail.price)}
                </p>
                <p>
                  <strong>{t("look_up_page.view_look_up.status")}:</strong>{" "}
                  {detail.status}
                </p>
                <h4 className="mt-2 font-semibold">
                  {" "}
                  {t("look_up_page.view_look_up.replacement_parts")} :
                </h4>
                <ul className="list-disc ml-5">
                  {detail.appointmentReplacementParts.map((part, i) => (
                    <li key={i}>
                      {part.productName} - {part.quantity} pcs - $
                      {formatVietnameseCurrency(part.productPrice)}
                    </li>
                  ))}
                </ul>
                <CarConditionImages
                  appointmentDetails={appointment.appointmentDetails}
                  selectedService={index}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Package Details */}
      {appointment.appointmentDetailPackages.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-4 mt-3">
          <h2 className="text-xl font-bold text-center text-red-700 mb-4">
            {t("look_up_page.view_look_up.service_packages")}
          </h2>
          {(showAllPackages
            ? appointment.appointmentDetailPackages
            : appointment.appointmentDetailPackages.slice(0, 2)
          ).map((pkg, index) => (
            <div key={index} className="border p-3 rounded-lg mb-3">
              <h3 className="font-semibold text-red-700">{pkg.packageName}</h3>
              <p>
                <strong> {t("look_up_page.view_look_up.price")}:</strong>{" "}
                {formatVietnameseCurrency(pkg.packagePrice)}
              </p>
              <p>
                <strong> {t("look_up_page.view_look_up.status")}:</strong>{" "}
                {pkg.status}
              </p>
            </div>
          ))}
          {appointment.appointmentDetailPackages.length > 2 && (
            <button
              className="w-full text-blue-600 font-semibold mt-2 flex items-center justify-center gap-2"
              onClick={() => setShowAllPackages(!showAllPackages)}
            >
              {showAllPackages ? (
                <FaChevronUp className="text-lg text-blue-600 animate-bounce transition-transform duration-300 ease-in-out" />
              ) : (
                <FaChevronDown className="text-lg text-blue-600 animate-bounce transition-transform duration-300 ease-in-out" />
              )}
            </button>
          )}
        </div>
      )}

      {isCancelModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <button
              onClick={closeCancelModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <FaTimes />
            </button>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FaExclamationTriangle className="text-red-600" /> Cancel
              Appointment
            </h2>
            <textarea
              placeholder="Enter reason for cancellation..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={closeCancelModal}
                className="bg-gray-300 p-2 rounded"
              >
                Close
              </button>
              <button
                onClick={submitCancel}
                className="bg-red-600 text-white p-2 rounded flex items-center gap-2"
              >
                <FaExclamationTriangle /> Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
