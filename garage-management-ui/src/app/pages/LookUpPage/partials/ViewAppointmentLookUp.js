import React, { useEffect, useState } from "react";
import {
  FaCar,
  FaUser,
  FaWrench,
  FaTools,
  FaBox,
  FaTag,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaMoneyBill,
  FaChevronDown,
  FaChevronRight,
  FaTimes,
  FaChevronUp,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  cancelAppointment,
  viewAppointmentLookUp,
} from "../services/LookUpService";
import { sLookUp } from "../services/LookUpSignify";
import { useNavigate } from "react-router-dom";
import CarConditionImages from "./CarConditionImages";
import { useMediaQuery } from "react-responsive";
import ViewAppointmentLookUpMobile from "./ViewAppointmentLookUpMobile";
import { useTranslation } from "react-i18next";
import { formatVietnameseCurrency } from "../schemas/LookUpSchemas";

export default function ViewAppointmentLookUp() {
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [appointment, setAppointment] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { t } = useTranslation("look_up_page");
  ///Cancel them tinh nanng vui ve kh quao
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const openCancelModal = () => setIsCancelModalOpen(true);
  const closeCancelModal = () => setIsCancelModalOpen(false);

  // const toggleService = (index) => {
  //     setExpandedService(expandedService === index ? null : index);
  // };

  //   useEffect(() => {
  //     if (
  //       sLookUp.value.garareId == "" ||
  //       sLookUp.value.VerifyCode == "" ||
  //       sLookUp.value.CustomerEmail == "" ||
  //       sLookUp.value.CustomerPhoneNumber == "" ||
  //       sLookUp.value.EstimatedTime == ""
  //     ) {
  //       navigation("/look-up");
  //     }
  //     // sLookUp.set((v) => {
  //     //   // v.value.garareId == "";
  //     //   v.value.VerifyCode = "";
  //     //   v.value.CustomerEmail = "";
  //     //   v.value.CustomerPhoneNumber = "";
  //     //   v.value.EstimatedTime = "";
  //     // });
  //   }, []);

  const fecthData = async () => {
    try {
      const response = await viewAppointmentLookUp();
      setAppointment(response.data.value);
      setLoading(false);
    } catch (error) {
      console.error("Fail with: ", error);
    }
  };

  useEffect(() => {
    fecthData();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-bold">Loading...</div>;
  }

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
    <>
      {isMobile ? (
        <ViewAppointmentLookUpMobile appointment={appointment} />
      ) : (
        <div className="font-extrabold font-space pb-10 relative flex gap-6 p-6 bg-transparent rounded-lg shadow-md backdrop-blur-sm max-w-screen-2xl">
          {/* Sidebar */}
          <div className="w-1/3 bg-transparent text-black p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-center mb-4 text-red-700">
                {t("look_up_page.view_look_up.appointment_info")}
              </h2>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2 text-red-700">
                  {t("look_up_page.view_look_up.customer_details")}
                </h3>
                <p>
                  <FaUser className="inline mr-2 text-red-700" />
                  <strong className="text-red-700">
                    {t("look_up_page.view_look_up.name")}:
                  </strong>{" "}
                  {appointment.customerName}
                </p>
                <p>
                  <FaPhone className="inline mr-2 text-red-700" />
                  <strong className="text-red-700">
                    {t("look_up_page.view_look_up.phone")}:
                  </strong>{" "}
                  {appointment.customerPhoneNumber}
                </p>
                <p>
                  <FaEnvelope className="inline mr-2 text-red-700" />
                  <strong className="text-red-700">
                    {t("look_up_page.view_look_up.email")}:
                  </strong>{" "}
                  {appointment.customerEmail}
                </p>

                <h3 className="text-lg font-semibold border-b pb-2 mt-4">
                  {t("look_up_page.view_look_up.car_details")}
                </h3>
                <p>
                  <FaCar className="inline mr-2 text-red-700" />
                  <strong className="text-red-700">
                    {t("look_up_page.view_look_up.license_plate")}:
                  </strong>{" "}
                  {appointment.carLicensePlateNumber}
                </p>

                <p>
                  <FaWrench className="inline mr-2 text-red-700" />
                  <strong className="text-red-700">
                    {t("look_up_page.view_look_up.mileage")}:
                  </strong>{" "}
                  {appointment.mileage} {t("look_up_page.view_look_up.km")}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold border-b pb-2">
                {t("look_up_page.view_look_up.appointment_time")}
              </h3>
              <p>
                <FaClock className="inline mr-2 text-red-700" />
                <strong className="text-red-700">
                  {" "}
                  {t("look_up_page.view_look_up.start")}:
                </strong>{" "}
                {appointment.estimatedAppointmentTime}
              </p>
              <p>
                <FaClock className="inline mr-2 text-red-700" />
                <strong className="text-red-700">
                  {t("look_up_page.view_look_up.end")}:
                </strong>{" "}
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

          {/* Main Content */}
          <div className="w-2/3 space-y-6 bg-transparent">
            <h2 className="text-3xl font-bold text-red-700 text-center">
              {t("look_up_page.view_look_up.service_details")}:
            </h2>

            {/* Appointment Product Details */}
            <div className="grid grid-cols-2 gap-6 bg-transparent">
              {/* Appointment Services (Danh sách dịch vụ) */}
              <div className="bg-transparent">
                <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-red-700">
                  {t("look_up_page.view_look_up.appointment_services")}:
                </h3>
                <div className="space-y-4 bg-transparent">
                  {appointment.appointmentDetails.map((detail, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg shadow-md cursor-pointer ${
                        selectedService === index
                          ? "bg-blue-100"
                          : "bg-white/10"
                      }`}
                      onClick={() => setSelectedService(index)}
                    >
                      <h3 className="text-lg font-semibold flex items-center">
                        <FaTools className="mr-2" /> {detail.serviceName} (
                        {detail.appointmentReplacementParts.length}{" "}
                        {t("look_up_page.view_look_up.part")}:)
                      </h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Details (Chi tiết dịch vụ) */}
              <div>
                {selectedService !== null && (
                  <div className="p-6 border rounded-lg shadow-md bg-transparent relative">
                    <button
                      className="absolute top-2 right-2 text-red-700 hover:text-red-800"
                      onClick={() => setSelectedService(null)}
                    >
                      <FaTimes />
                    </button>
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-red-700">
                      {t("look_up_page.view_look_up.service_details")}
                    </h3>
                    <p>
                      <strong>
                        {" "}
                        {t("look_up_page.view_look_up.service")}:
                      </strong>{" "}
                      {
                        appointment.appointmentDetails[selectedService]
                          .serviceName
                      }
                    </p>
                    <p>
                      <strong>
                        {t("look_up_page.view_look_up.estimated_hours")}:
                      </strong>{" "}
                      {
                        appointment.appointmentDetails[selectedService]
                          .estimatedHours
                      }
                    </p>
                    <p>
                      <strong> {t("look_up_page.view_look_up.price")}:</strong>{" "}
                      {formatVietnameseCurrency(
                        appointment.appointmentDetails[selectedService].price
                      )}
                    </p>
                    <p>
                      <strong> {t("look_up_page.view_look_up.status")}:</strong>{" "}
                      {appointment.appointmentDetails[selectedService].status}
                    </p>

                    {/* Replacement Parts */}
                    <h4 className="mt-4 font-semibold ">
                      {t("look_up_page.view_look_up.replacement_parts")} :
                    </h4>
                    <ul className="mt-2 space-y-2">
                      {appointment.appointmentDetails[
                        selectedService
                      ].appointmentReplacementParts.map((part, i) => (
                        <li key={i} className="bg-transparent p-2 rounded-lg">
                          <span>- {part.productName}</span> - {part.quantity}{" "}
                          {t("look_up_page.view_look_up.pcs")} -
                          <span>
                            {" "}
                            {formatVietnameseCurrency(part.productPrice)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Car conditions image */}
                    <CarConditionImages
                      appointmentDetails={appointment.appointmentDetails}
                      selectedService={selectedService}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Package Details */}
            {appointment.appointmentDetailPackages.length > 0 && (
              <div className="bg-transparent">
                <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-red-700">
                  {t("look_up_page.view_look_up.service_packages")}
                </h3>
                <div className="grid grid-cols-2 gap-6 bg-transparent">
                  {(showAllPackages
                    ? appointment.appointmentDetailPackages
                    : appointment.appointmentDetailPackages.slice(0, 2)
                  ).map((pkg, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg shadow-md"
                    >
                      <h4 className="text-lg font-semibold mb-2">
                        {pkg.packageName}
                      </h4>
                      <p>
                        <strong>
                          {" "}
                          {t("look_up_page.view_look_up.price")}:
                        </strong>{" "}
                        {formatVietnameseCurrency(pkg.packagePrice)}
                      </p>
                      <p>
                        <strong>
                          {t("look_up_page.view_look_up.status")}:
                        </strong>{" "}
                        {pkg.status}
                      </p>
                    </div>
                  ))}
                </div>
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
          </div>
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
    </>
  );
}
