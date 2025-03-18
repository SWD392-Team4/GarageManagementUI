import React, { useEffect, useState } from "react";
import { FaCar, FaUser, FaWrench, FaTools, FaBox, FaTag, FaClock, FaPhone, FaEnvelope, FaMoneyBill, FaChevronDown, FaChevronRight, FaTimes, FaChevronUp } from "react-icons/fa";
import { viewAppointmentLookUp } from "../services/LookUpService";

export default function ViewAppointmentLookUp() {
    const [showAllPackages, setShowAllPackages] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    // const [appointment, setAppointment] = useState();

    // const toggleService = (index) => {
    //     setExpandedService(expandedService === index ? null : index);
    // };

    // const fecthData = async () => {
    //     try {
    //         const response = await viewAppointmentLookUp();
    //         setAppointment(response.data.value);
    //     } catch (error) {
    //         console.error("Fail with: ", error);
    //     }
    // }

    // useEffect(() => {
    //     fecthData();
    // }, [])

    const appointment = {
        approveByEmployee: "Cashier_1_last_name Cashier_1_first_name",
        carModelId: "1f9f9bce-f9f2-4ac6-a614-004ae7fd9d6a",
        mileage: 20000,
        verificationCode: "RF4KZA",
        customerName: "Trần Huy Hanh",
        customerPhoneNumber: "0962418452",
        customerEmail: "nhuttan1325@gmail.com",
        estimatedAppointmentTime: "2025-03-26T17:59:00+00:00",
        estimatedEndTime: "2025-03-26T18:59:00+00:00",
        price: 2194123,
        appointmentType: "ServicePackageBooking",
        carLicensePlateNumber: "213123",
        status: "Pending",
        appointmentDetails: [
            {
                serviceName: "Windshield Wiper Replacement",
                estimatedHours: 1,
                price: 2122123,
                status: "Pending",
                appointmentReplacementParts: [
                    {
                        productName: "Honda Civic Wiper Blades",
                        quantity: 6,
                        productPrice: 12000,
                    },
                    {
                        productName: "Honda Civic Wiper Blades",
                        quantity: 6,
                        productPrice: 12000,
                    },
                    {
                        productName: "Honda Civic Wiper Blades",
                        quantity: 6,
                        productPrice: 12000,
                    },
                    {
                        productName: "Honda Civic Wiper Blades",
                        quantity: 6,
                        productPrice: 12000,
                    }
                ],
            },
            {
                serviceName: "Windshield Wiper Hihi",
                estimatedHours: 1,
                price: 2122123,
                status: "Pending",
                appointmentReplacementParts: [
                    {
                        productName: "Yamaha",
                        quantity: 6,
                        productPrice: 12000,
                    },
                    {
                        productName: "Yamaha",
                        quantity: 6,
                        productPrice: 12000,
                    },
                    {
                        productName: "Yamaha",
                        quantity: 6,
                        productPrice: 12000,
                    },
                    {
                        productName: "Yamaha",
                        quantity: 6,
                        productPrice: 12000,
                    }
                ],
            },
        ],
        appointmentDetailPackages: [
            {
                PackageName: "Full Car Service Package",
                PackagePrice: 500000,
                Status: "Pending",
                CreatedAt: "2025-03-18T00:59:32.2998452+07:00",
                UpdatedAt: "2025-03-18T00:59:32.2998476+07:00",
            },
            {
                PackageName: "Full Car Service Package",
                PackagePrice: 500000,
                Status: "Pending",
                CreatedAt: "2025-03-18T00:59:32.2998452+07:00",
                UpdatedAt: "2025-03-18T00:59:32.2998476+07:00",
            },
            {
                PackageName: "Full Car Service Package",
                PackagePrice: 500000,
                Status: "Pending",
                CreatedAt: "2025-03-18T00:59:32.2998452+07:00",
                UpdatedAt: "2025-03-18T00:59:32.2998476+07:00",
            },
            {
                PackageName: "Full Car Service Package",
                PackagePrice: 500000,
                Status: "Pending",
                CreatedAt: "2025-03-18T00:59:32.2998452+07:00",
                UpdatedAt: "2025-03-18T00:59:32.2998476+07:00",
            },
        ],
    };

    return (
        <div className="font-extrabold font-space pb-10 relative flex gap-6 p-6 bg-transparent rounded-lg shadow-md backdrop-blur-sm max-w-screen-2xl">
            {/* Sidebar */}
            <div className="w-1/3 bg-transparent text-black p-6 rounded-lg shadow-lg flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-center mb-4 text-red-700">Appointment Info</h2>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2 text-red-700">Customer Details</h3>
                        <p>
                            <FaUser className="inline mr-2 text-red-700" />
                            <strong className="text-red-700">Name:</strong> {appointment.customerName}
                        </p>
                        <p>
                            <FaPhone className="inline mr-2 text-red-700" />
                            <strong className="text-red-700">Phone:</strong> {appointment.customerPhoneNumber}
                        </p>
                        <p>
                            <FaEnvelope className="inline mr-2 text-red-700" />
                            <strong className="text-red-700">Email:</strong> {appointment.customerEmail}
                        </p>

                        <h3 className="text-lg font-semibold border-b pb-2 mt-4">Car Details</h3>
                        <p>
                            <FaCar className="inline mr-2 text-red-700" />
                            <strong className="text-red-700">License Plate:</strong> {appointment.carLicensePlateNumber}
                        </p>
                        <p>
                            <FaTag className="inline mr-2 text-red-700" />
                            <strong className="text-red-700">Car Model ID:</strong> {appointment.carModelId}
                        </p>
                        <p>
                            <FaWrench className="inline mr-2 text-red-700" />
                            <strong className="text-red-700">Mileage:</strong> {appointment.mileage} km
                        </p>
                    </div>
                </div>


                <div className="mt-6">
                    <h3 className="text-lg font-semibold border-b pb-2">Appointment Time</h3>
                    <p>
                        <FaClock className="inline mr-2 text-red-700" />
                        <strong className="text-red-700">Start:</strong> {new Date(appointment.estimatedAppointmentTime).toLocaleString()}
                    </p>
                    <p>
                        <FaClock className="inline mr-2 text-red-700" />
                        <strong className="text-red-700">End:</strong> {new Date(appointment.estimatedEndTime).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-2/3 space-y-6 bg-transparent">
                <h2 className="text-3xl font-bold text-red-700 text-center">Service Details</h2>

                {/* Appointment Product Details */}
                <div className="grid grid-cols-2 gap-6 bg-transparent">
                    {/* Appointment Services (Danh sách dịch vụ) */}
                    <div className="bg-transparent">
                        <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-red-700">Appointment Services</h3>
                        <div className="space-y-4 bg-transparent">
                            {appointment.appointmentDetails.map((detail, index) => (
                                <div
                                    key={index}
                                    className={`p-4 border rounded-lg shadow-md cursor-pointer ${selectedService === index ? 'bg-blue-100' : 'bg-white/10'
                                        }`}
                                    onClick={() => setSelectedService(index)}
                                >
                                    <h3 className="text-lg font-semibold flex items-center">
                                        <FaTools className="mr-2" /> {detail.serviceName} ({detail.appointmentReplacementParts.length} parts)
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
                                <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-red-700">Service Details</h3>
                                <p><strong>Service:</strong> {appointment.appointmentDetails[selectedService].serviceName}</p>
                                <p><strong >Estimated Hours:</strong> {appointment.appointmentDetails[selectedService].estimatedHours}</p>
                                <p><strong >Price:</strong> ${appointment.appointmentDetails[selectedService].price.toLocaleString()}</p>
                                <p><strong >Status:</strong> {appointment.appointmentDetails[selectedService].status}</p>

                                {/* Replacement Parts */}
                                <h4 className="mt-4 font-semibold ">REPLACEMENT PARTS :</h4>
                                <ul className="mt-2 space-y-2">
                                    {appointment.appointmentDetails[selectedService].appointmentReplacementParts.map((part, i) => (
                                        <li key={i} className="bg-transparent p-2 rounded-lg">
                                            <span >- {part.productName}</span> - {part.quantity} pcs -
                                            <span > ${part.productPrice.toLocaleString()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>


                {/* Package Details */}
                {appointment.appointmentDetailPackages.length > 0 && (
                    <div className="bg-transparent">
                        <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-red-700">Service Packages</h3>
                        <div className="grid grid-cols-2 gap-6 bg-transparent">
                            {(showAllPackages ? appointment.appointmentDetailPackages : appointment.appointmentDetailPackages.slice(0, 2)).map((pkg, index) => (
                                <div key={index} className="p-4 border rounded-lg shadow-md">
                                    <h4 className="text-lg font-semibold mb-2">{pkg.PackageName}</h4>
                                    <p><strong>Price:</strong> ${pkg.PackagePrice.toLocaleString()}</p>
                                    <p><strong>Status:</strong> {pkg.Status}</p>
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
