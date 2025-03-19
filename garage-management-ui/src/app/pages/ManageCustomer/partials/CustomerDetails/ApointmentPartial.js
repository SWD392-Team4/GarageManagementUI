import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import BaseTable from "../../../../components/BaseTable/BaseTable";
import ViewApointmentModal from "../../models/ViewApointmentModal";
import {
  getApointmentCustomer,
  getApointmentDetails,
  searchApointmentCustomer,
} from "../../services/CustomerService";
import SearchAppointment from "./SearchApointment";
import SelectGarage from "./SelectGarage";
import { AppointmentSignify } from "../../../AdminManageAppoinment/services/store/AppointmentSignify";

export default function ApointmentPartial({ customer }) {
  const [selectedGarageId, setSelectedGarageId] = useState(null);
  const { t } = useTranslation("manage_customer");
  const [listApointment, setListApointment] = useState([]);
  const [apointmentDetails, setApointmentDetails] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
  });
  const [searchParams, setSearchParams] = useState(null);
  const sAppointmentSignify = AppointmentSignify.use();

  const fetchListApointment = useCallback(
    async (page = 1, params = null) => {
      //   if (selectedGarageId == null) return;

      let response;
      // customer?.phoneNumber,
      if (params) {
        response = await searchApointmentCustomer(customer.email, {
          ...params,
          PageNumber: page,
        });
      } else {
        response = await getApointmentCustomer(customer.email, page);
      }
      // console.log("Check ressponse: ", response);

      setListApointment(response?.data?.value);
      setPagination({
        currentPage: response?.data?.paging.currentPage,
        totalPages: response?.data?.paging.totalPages,
        totalCount: response?.data?.paging.totalCount,
        hasPrevious: response?.data?.paging.hasPrevious,
        hasNext: response?.data?.paging.hasNext,
      });
    },
    [AppointmentSignify.value.garaCurrent, customer.id]
  );

  useEffect(() => {
    fetchListApointment();
  }, [AppointmentSignify.value.garaCurrent, customer.id]);
  // customer,

  const handleSearch = (params) => {
    setSearchParams(params);
    fetchListApointment(1, params);
  };

  // Xử lý khi chuyển trang
  const handlePageChange = (newPage) => {
    fetchListApointment(newPage, searchParams);
  };

  const columns = useMemo(
    () => [
      {
        header: t("manage_customer.apointment_info.id"),
        accessorKey: "id",
        accessorFn: (_row, index) => index + 1,
      },
      {
        header: t("manage_customer.apointment_info.customerName"),
        accessorKey: "customerName",
      },
      {
        header: t("manage_customer.apointment_info.customerPhoneNumber"),
        accessorKey: "customerPhoneNumber",
      },
      {
        header: t("manage_customer.apointment_info.customerEmail"),
        accessorKey: "customerEmail",
      },
      {
        header: t("manage_customer.apointment_info.carLicensePlateNumber"),
        accessorKey: "carLicensePlateNumber",
      },
      {
        header: t("manage_customer.apointment_info.price"),
        accessorKey: "price",
      },
      {
        header: t("manage_customer.apointment_info.status"),
        accessorKey: "status",
      },
      {
        header: t("manage_customer.apointment_info.createdAt"),
        accessorKey: "createdAt",
      },
      {
        header: t("manage_customer.apointment_info.updatedAt"),
        accessorKey: "updatedAt",
      },
    ],
    [t]
  );
  const actions = [
    {
      type: "modal",
      label: t("manage_customer.apointment_info.edit"),
      color: "bg-yellow-500",
      icon: <FaPencilAlt />,
      onClick: async (row) => {
        try {
          const response = await getApointmentDetails(row.garageId, row.id);
          if (response.status === 200) {
            setApointmentDetails(response.data.value);
            // setIsUpdateModalOpen(true);
          }
        } catch (error) {
          console.error("Error fetching Apointment details: ", error);
        }
      },
    },
  ];

  // Khi apointmentDetails được cập nhật, mới mở modal
  useEffect(() => {
    console.log(
      "🔥 Checking apointmentDetails before opening modal: ",
      apointmentDetails
    );
    if (apointmentDetails) {
      console.log("✅ apointmentDetails is ready, opening modal...");
      setIsUpdateModalOpen(true);
    }
  }, [apointmentDetails]);

  return (
    <div className="border border-gray-200 p-4 rounded-md bg-gray-50 mt-5">
      {/* 
            <SelectGarage
                selectedGarageId={selectedGarageId}
                onSelectGarageId={setSelectedGarageId}
            /> */}
      {/* {selectedGarageId && <ApointmentInfo garageId={selectedGarageId} customer={customer} />} */}

      <>
        <SearchAppointment onSearch={handleSearch} />
        <BaseTable
          columns={columns}
          data={listApointment}
          actions={actions}
          pagination={pagination}
          onPageChange={handlePageChange}
          // signifyInformation={sSupplier.value}
        />
      </>

      {/* Modal hiển thị chi tiết cuộc hẹn */}
      {isUpdateModalOpen && apointmentDetails && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Appointment Details
            </h2>

            {/* 🔹 Thông tin chung */}
            <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4">
              <p>
                <strong>Garage:</strong> {apointmentDetails.garageId}
              </p>
              <p>
                <strong>Car Model:</strong> {apointmentDetails.carModelId}
              </p>
              <p>
                <strong>License Plate:</strong>{" "}
                {apointmentDetails.carLicensePlateNumber}
              </p>
              <p>
                <strong>Mileage:</strong> {apointmentDetails.mileage}
              </p>
              <p>
                <strong>Customer:</strong> {apointmentDetails.customerName}
              </p>
              <p>
                <strong>Phone:</strong> {apointmentDetails.customerPhoneNumber}
              </p>
              <p>
                <strong>Email:</strong> {apointmentDetails.customerEmail}
              </p>
              <p>
                <strong>Verification Code:</strong>{" "}
                {apointmentDetails.verificationCode}
              </p>
              <p>
                <strong>Appointment Type:</strong>{" "}
                {apointmentDetails.appointmentType}
              </p>
              <p>
                <strong>Status:</strong> {apointmentDetails.status}
              </p>
              <p>
                <strong>Estimated Time:</strong>{" "}
                {apointmentDetails.estimatedAppointmentTime}
              </p>
              <p>
                <strong>End Time:</strong> {apointmentDetails.estimatedEndTime}
              </p>
              <p>
                <strong>Approved At:</strong> {apointmentDetails.approvedAt}
              </p>
              <p>
                <strong>Created At:</strong> {apointmentDetails.createdAt}
              </p>
              <p>
                <strong>Updated At:</strong> {apointmentDetails.updatedAt}
              </p>
              <p>
                <strong>Total Price:</strong> {apointmentDetails.price}
              </p>
            </div>

            {/* 🔹 Danh sách dịch vụ */}
            {apointmentDetails.appointmentDetails &&
              apointmentDetails.appointmentDetails.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Services</h3>
                  <table className="w-full border border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border p-2">Service Name</th>
                        <th className="border p-2">Estimated Hours</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apointmentDetails.appointmentDetails.map((service) => (
                        <tr key={service.serviceHistoryId} className="border">
                          <td className="border p-2">{service.serviceName}</td>
                          <td className="border p-2">
                            {service.estimatedHours}
                          </td>
                          <td className="border p-2">{service.price}</td>
                          <td className="border p-2">{service.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            {/* 🔹 Danh sách phụ tùng thay thế */}
            {apointmentDetails.appointmentDetails &&
              apointmentDetails.appointmentDetails.some(
                (service) => service.appointmentReplacementParts.length > 0
              ) && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Replacement Parts
                  </h3>
                  <table className="w-full border border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border p-2">Product Name</th>
                        <th className="border p-2">Quantity</th>
                        <th className="border p-2">Product Price</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Created At</th>
                        <th className="border p-2">Updated At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apointmentDetails.appointmentDetails.flatMap((service) =>
                        service.appointmentReplacementParts.map((part) => (
                          <tr key={part.id} className="border">
                            <td className="border p-2">{part.productName}</td>
                            <td className="border p-2">{part.quantity}</td>
                            <td className="border p-2">{part.productPrice}</td>
                            <td className="border p-2">{part.status}</td>
                            <td className="border p-2">{part.createdAt}</td>
                            <td className="border p-2">{part.updatedAt}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

            {/* 🔹 Nút đóng modal */}
            <div className="mt-4 text-right">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                  setIsUpdateModalOpen(false);
                  setApointmentDetails(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
