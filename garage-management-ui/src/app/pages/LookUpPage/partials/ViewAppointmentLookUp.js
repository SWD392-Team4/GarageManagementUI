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
} from "react-icons/fa";
import { viewAppointmentLookUp } from "../services/LookUpService";
import { sLookUp } from "../services/LookUpSignify";
import { useNavigate } from "react-router-dom";
import CarConditionImages from "./CarConditionImages";

export default function ViewAppointmentLookUp() {
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [appointment, setAppointment] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();

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

  return (
    <div className="font-extrabold font-space pb-10 relative flex gap-6 p-6 bg-transparent rounded-lg shadow-md backdrop-blur-sm max-w-screen-2xl">
      {/* Sidebar */}
      <div className="w-1/3 bg-transparent text-black p-6 rounded-lg shadow-lg flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-center mb-4 text-red-700">
            Appointment Info
          </h2>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2 text-red-700">
              Customer Details
            </h3>
            <p>
              <FaUser className="inline mr-2 text-red-700" />
              <strong className="text-red-700">Name:</strong>{" "}
              {appointment.customerName}
            </p>
            <p>
              <FaPhone className="inline mr-2 text-red-700" />
              <strong className="text-red-700">Phone:</strong>{" "}
              {appointment.customerPhoneNumber}
            </p>
            <p>
              <FaEnvelope className="inline mr-2 text-red-700" />
              <strong className="text-red-700">Email:</strong>{" "}
              {appointment.customerEmail}
            </p>

            <h3 className="text-lg font-semibold border-b pb-2 mt-4">
              Car Details
            </h3>
            <p>
              <FaCar className="inline mr-2 text-red-700" />
              <strong className="text-red-700">License Plate:</strong>{" "}
              {appointment.carLicensePlateNumber}
            </p>
            <p>
              <FaTag className="inline mr-2 text-red-700" />
              <strong className="text-red-700">Car Model ID:</strong>{" "}
              {appointment.carModelId}
            </p>
            <p>
              <FaWrench className="inline mr-2 text-red-700" />
              <strong className="text-red-700">Mileage:</strong>{" "}
              {appointment.mileage} km
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold border-b pb-2">
            Appointment Time
          </h3>
          <p>
            <FaClock className="inline mr-2 text-red-700" />
            <strong className="text-red-700">Start:</strong>{" "}
            {appointment.estimatedAppointmentTime}
          </p>
          <p>
            <FaClock className="inline mr-2 text-red-700" />
            <strong className="text-red-700">End:</strong>{" "}
            {appointment.estimatedEndTime}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 space-y-6 bg-transparent">
        <h2 className="text-3xl font-bold text-red-700 text-center">
          Service Details
        </h2>

        {/* Appointment Product Details */}
        <div className="grid grid-cols-2 gap-6 bg-transparent">
          {/* Appointment Services (Danh sách dịch vụ) */}
          <div className="bg-transparent">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-red-700">
              Appointment Services
            </h3>
            <div className="space-y-4 bg-transparent">
              {appointment.appointmentDetails.map((detail, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg shadow-md cursor-pointer ${
                    selectedService === index ? "bg-blue-100" : "bg-white/10"
                  }`}
                  onClick={() => setSelectedService(index)}
                >
                  <h3 className="text-lg font-semibold flex items-center">
                    <FaTools className="mr-2" /> {detail.serviceName} (
                    {detail.appointmentReplacementParts.length} parts)
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
                  Service Details
                </h3>
                <p>
                  <strong>Service:</strong>{" "}
                  {appointment.appointmentDetails[selectedService].serviceName}
                </p>
                <p>
                  <strong>Estimated Hours:</strong>{" "}
                  {
                    appointment.appointmentDetails[selectedService]
                      .estimatedHours
                  }
                </p>
                <p>
                  <strong>Price:</strong> $
                  {appointment.appointmentDetails[selectedService].price}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {appointment.appointmentDetails[selectedService].status}
                </p>

                {/* Replacement Parts */}
                <h4 className="mt-4 font-semibold ">REPLACEMENT PARTS :</h4>
                <ul className="mt-2 space-y-2">
                  {appointment.appointmentDetails[
                    selectedService
                  ].appointmentReplacementParts.map((part, i) => (
                    <li key={i} className="bg-transparent p-2 rounded-lg">
                      <span>- {part.productName}</span> - {part.quantity} pcs -
                      <span> ${part.productPrice}</span>
                    </li>
                  ))}
                </ul>

                {/* Car conditions image */}
                <CarConditionImages
                  appointmentDetails={appointment.appointmentDetails}
                  selectedService={selectedService}
                />
                {/* <h4 className="mt-4 font-semibold">Car Conditions Image :</h4>

                {appointment.appointmentDetails[selectedService]
                  ?.carConditionImages && (
                  <div className="space-y-6">
                    {["Before", "After"].map((stage) => {
                      const stageImages = appointment.appointmentDetails[
                        selectedService
                      ].carConditionImages.filter(
                        (img) => img.conditionStage === stage
                      );

                      if (stageImages.length === 0) return null;

                      return (
                        <div key={stage}>
                          <h5 className="text-lg font-semibold text-gray-700">
                            {stage} Condition:
                          </h5>
                          <div className="grid grid-cols-5 gap-4">
                            {stageImages.map((image, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={image.imageLink}
                                  alt={`Car Condition ${stage} - ${index + 1}`}
                                  className="w-32 h-32 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )} */}
              </div>
            )}
          </div>
        </div>

        {/* Package Details */}
        {appointment.appointmentDetailPackages.length > 0 && (
          <div className="bg-transparent">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-red-700">
              Service Packages
            </h3>
            <div className="grid grid-cols-2 gap-6 bg-transparent">
              {(showAllPackages
                ? appointment.appointmentDetailPackages
                : appointment.appointmentDetailPackages.slice(0, 2)
              ).map((pkg, index) => (
                <div key={index} className="p-4 border rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold mb-2">
                    {pkg.PackageName}
                  </h4>
                  <p>
                    <strong>Price:</strong> ${pkg.PackagePrice}
                  </p>
                  <p>
                    <strong>Status:</strong> {pkg.Status}
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
  );
}
