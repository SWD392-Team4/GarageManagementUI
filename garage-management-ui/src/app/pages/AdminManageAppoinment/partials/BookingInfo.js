import React, { useCallback, useEffect, useState } from "react";
import { FaEdit, FaRegCalendarCheck } from "react-icons/fa";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { IoMdOptions } from "react-icons/io";
import { TbCalendarCancel } from "react-icons/tb";
import { useParams } from "react-router-dom";
import {
  LabelDateTime,
  LabelInput,
  LabelReactSelect,
  LabelSelect,
} from "./InputSelect";
import { FaFileInvoice } from "react-icons/fa";

import { formatVietnameseCurrency } from "../../ManageGoodsIssued/schemas/GoodsIssuedSchemas";
import {
  confirmAppointment,
  getAllCarModel,
  getAllGara,
  getFullInfomationAppointment,
  updatedAppointmentApi,
} from "../services/AppointmentService";
import { currentAppointment } from "../services/store/AppointmentSignify";

// Import các modal đã tách
import { sAccount } from "../../AuthCustomer/services/store";
import ArrivalModal from "../models/ArrivalModal";
import CancelModal from "../models/CancelModal";
import ConfirmationModal from "../models/ConfirmationModal";
import { useTranslation } from "react-i18next";

// Import Yup để xử lý validation
import * as Yup from "yup";
import InvoiceModal from "../models/InvoiceModal";

// Hàm chuyển đổi datetime (cắt phần giây, timezone, ...)
const formatDateTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const pad = (n) => n.toString().padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const defaultValues = {
  id: "#",
  emp1: "",
  emp2: "",
  gara: "",
  status: "",
  model: "", // carModelId
  mileage: "",
  licenser: "",
  estimatedTime: "",
  actualTime: "",
  estimatedEndTime: "",
  actualEndTime: "",
  expectedPrice: "",
  dateCreated: "",
  dateUpdated: "",
  type: "",
  customerName: "",
  phone: "",
  email: "",
};

// Định nghĩa schema Yup cho các trường cần validate
const validationSchema = Yup.object().shape({
  mileage: Yup.number()
    .typeError("Mileage phải là số")
    .positive("Mileage phải là số dương")
    .required("Vui lòng nhập Mileage"),
  licenser: Yup.string()
    .required("Vui lòng nhập biển số xe")
    .matches(
      /^(?:\d{2}[A-Z]-\d{5,6})$/,
      "Biển số xe không hợp lệ. Vui lòng nhập đúng định dạng (ví dụ: 30A-12345 hoặc 51G-678901)."
    ),
  customerName: Yup.string().required("Vui lòng nhập tên khách hàng"),
  phone: Yup.string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^\d+$/, "Số điện thoại phải là số"),
  email: Yup.string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
});

const BookingInfo = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [carModels, setCarModels] = useState([]);
  const [gara, setGara] = useState([]);
  const [formData, setFormData] = useState(defaultValues);
  const { t } = useTranslation("appoinment-admin");
  // State quản lý hiển thị menu options và các modal
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showArrivalModal, setShowArrivalModal] = useState(false);
  // State lưu các thông báo lỗi của validation
  const [errors, setErrors] = useState({});
  const [showInvoice, setShowInvoice] = useState(false);
  const sAppointment = currentAppointment.use();
  const fetchData = useCallback(async () => {
    try {
      const carModelsResponse = await getAllCarModel();
      setCarModels(carModelsResponse.data.value);
      const garaRes = await getAllGara();
      setGara(garaRes.data.value);
    } catch (error) {
      console.error("Error loading car models", error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchAppointment = useCallback(async () => {
    try {
      const response = await getFullInfomationAppointment(id);
      const appointment = response.data.value;
      const apiValues = {
        id: appointment.verificationCode,
        emp1: appointment.approveByEmployee
          ? { name: appointment.approveByEmployee, bg: "bg-gray-200" }
          : { name: "N/A", bg: "bg-gray-200" },
        emp2: appointment.rejectByEmployee
          ? { name: appointment.rejectByEmployee, bg: "bg-gray-200" }
          : { name: "N/A", bg: "bg-gray-200" },
        gara: appointment.garageId,
        status: { name: appointment.status, bg: "bg-gray-200" },
        model: appointment.carModelId,
        mileage: appointment.mileage,
        licenser: appointment.carLicensePlateNumber,
        estimatedTime: formatDateTime(appointment.estimatedAppointmentTime),
        actualTime: "",
        estimatedEndTime: formatDateTime(appointment.estimatedEndTime),
        actualEndTime: "",
        expectedPrice: formatVietnameseCurrency(appointment.price),
        dateCreated: formatDateTime(appointment.createdAt),
        dateUpdated: formatDateTime(appointment.updatedAt),
        type: appointment.appointmentType,
        customerName: appointment.customerName,
        phone: appointment.customerPhoneNumber,
        email: appointment.customerEmail,
      };
      currentAppointment.set((v) => {
        v.value.status = appointment.status;
        v.value.appointmentFull = appointment;
        v.value.appointmentDetails = appointment.appointmentDetails;
        v.value.appointmentDetailPackages =
          appointment.appointmentDetailPackages;
      });
      setFormData(apiValues);
    } catch (error) {
      console.error("Error fetching appointment: ", error);
    }
  }, [id]);

  useEffect(() => {
    fetchAppointment();
  }, [id, isEditing, currentAppointment.value.load]);

  // Hàm kiểm tra xem estimatedTime có cùng ngày với hiện tại không
  const isSameDay = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const now = new Date();
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()
    );
  };

  // Xử lý thay đổi input thông thường
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý sự kiện onBlur dùng để validate các trường theo Yup (bao gồm Mileage, License Plate, Customer Name, Phone, Email)
  const handleBlur = async (e) => {
    const { name, value } = e.target;
    // Nếu trường hiện không nằm trong schema thì bỏ qua
    if (
      !["mileage", "licenser", "customerName", "phone", "email"].includes(name)
    ) {
      return;
    }
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  // Nhận giá trị từ react-select cho Model
  const handleModelChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      model: selectedOption ? selectedOption.id : "",
    }));
  };

  // Chuyển sang chế độ chỉnh sửa
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    // Validate các trường sử dụng Yup trước khi submit
    try {
      await validationSchema.validate(
        {
          mileage: formData.mileage,
          licenser: formData.licenser,
          customerName: formData.customerName,
          phone: formData.phone,
          email: formData.email,
        },
        { abortEarly: false }
      );
      // Nếu validate thành công, xóa lỗi
      setErrors({});
    } catch (err) {
      const validationErrors = {};
      if (err.inner) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
      }
      setErrors(validationErrors);
      return; // Ngừng submit nếu có lỗi
    }

    const payload = {
      carModelId: formData.model,
      mileage: Number(formData.mileage),
      customerName: formData.customerName,
      customerPhoneNumber: formData.phone,
      customerEmail: formData.email,
      estimatedAppointmentTime: new Date(formData.estimatedTime).toISOString(),
      estimatedEndTime: new Date(formData.estimatedEndTime).toISOString(),
      carLicensePlateNumber: formData.licenser,
    };

    try {
      await updatedAppointmentApi(payload, id);
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
    setIsEditing(false);
  };

  // Hủy chỉnh sửa, đặt lại giá trị mặc định hiện tại
  const handleCancel = () => {
    setFormData(defaultValues);
    setIsEditing(false);
  };

  const handleCancelMenu = () => {
    setShowOptionsMenu(false);
  };

  // Xử lý khi nhấn vào một trong các option của menu
  const handleOptionClick = (optionType) => {
    setShowOptionsMenu(false);
    if (optionType === "confirmation") {
      setShowConfirmModal(true);
    } else if (optionType === "cancel") {
      setShowCancelModal(true);
    } else if (optionType === "arrival") {
      setShowArrivalModal(true);
    }
  };

  return (
    <>
      <div className="border bg-white border-gray-300 shadow-md p-4 w-full overflow-auto">
        <form onSubmit={handleConfirm}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5 sm:grid-cols-2">
            <div>
              <LabelInput
                label={t("bookingInfo.id")}
                name="id"
                value={formData.id}
                onChange={handleChange}
                readOnly={true}
              />
              <LabelInput
                label={t("bookingInfo.employeeApproved")}
                name="emp1"
                value={formData.emp1.name}
                bg={formData.emp1.bg}
                onChange={handleChange}
              />
              <LabelInput
                label={t("bookingInfo.employeeReject")}
                name="emp2"
                value={formData.emp2.name}
                bg={formData.emp2.bg}
                onChange={handleChange}
              />
              <LabelInput
                label={t("bookingInfo.status")}
                name="status"
                value={formData.status.name}
                bg={formData.status.bg}
              />
            </div>

            <div>
              <LabelReactSelect
                label={t("bookingInfo.model")}
                name="model"
                value={formData.model}
                onChange={handleModelChange}
                options={carModels}
                editable={isEditing}
              />
              <LabelInput
                label={t("bookingInfo.mileage")}
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                onBlur={handleBlur}
                editable={isEditing}
                error={errors.mileage}
              />
              <LabelInput
                label={t("bookingInfo.licenser")}
                name="licenser"
                value={formData.licenser}
                onChange={handleChange}
                onBlur={handleBlur}
                editable={isEditing}
                error={errors.licenser}
              />
              <LabelSelect
                label={t("bookingInfo.gara")}
                options={gara}
                name="gara"
                value={formData.gara}
              />
            </div>

            <div>
              <LabelDateTime
                label={t("bookingInfo.estimatedTime")}
                name="estimatedTime"
                value={formData.estimatedTime}
                onChange={handleChange}
                editable={isEditing}
              />
              <LabelDateTime
                label={t("bookingInfo.actualTime")}
                name="actualTime"
                value={formData.actualTime}
                onChange={handleChange}
              />
              <LabelDateTime
                label={t("bookingInfo.estimatedEndTime")}
                name="estimatedEndTime"
                value={formData.estimatedEndTime}
                onChange={handleChange}
                editable={isEditing}
              />
              <LabelDateTime
                label={t("bookingInfo.actualEndTime")}
                name="actualEndTime"
                value={formData.actualEndTime}
                onChange={handleChange}
              />
            </div>

            <div>
              <LabelInput
                label={t("bookingInfo.expectedPrice")}
                name="expectedPrice"
                value={formData.expectedPrice}
              />
              <LabelDateTime
                label={t("bookingInfo.dateCreated")}
                name="dateCreated"
                value={formData.dateCreated}
                onChange={handleChange}
                readOnly={true}
              />
              <LabelDateTime
                label={t("bookingInfo.dateUpdated")}
                name="dateUpdated"
                value={formData.dateUpdated}
                onChange={handleChange}
              />
              <LabelInput
                label={t("bookingInfo.type")}
                name="type"
                value={formData.type}
                readOnly
              />
            </div>

            <div>
              <LabelInput
                label={t("bookingInfo.customerName")}
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                onBlur={handleBlur}
                editable={isEditing}
                error={errors.customerName}
              />
              <LabelInput
                label={t("bookingInfo.phone")}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                editable={isEditing}
                error={errors.phone}
              />
              <LabelInput
                label={t("bookingInfo.email")}
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                editable={isEditing}
                error={errors.email}
              />
            </div>
          </div>
          {/* Nút Hành Động */}
        </form>

        {sAccount.value.role === "Cashier" && (
          <div className="flex justify-end mt-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="p-2 bg-red-300 rounded hover:bg-red-400 mr-2"
                >
                  <GiCancel className="text-white" />
                </button>
                <button
                  type="submit"
                  onClick={handleConfirm}
                  className="p-2 bg-green-300 rounded hover:bg-green-400"
                >
                  <GiConfirmed className="text-white" />
                </button>
              </>
            ) : showOptionsMenu ? (
              <div className="flex">
                {formData.status.name === "Pending" && (
                  <button
                    type="button"
                    onClick={() => handleOptionClick("confirmation")}
                    className="p-2 bg-blue-300 rounded hover:bg-blue-400 mr-2"
                  >
                    <GiConfirmed className="text-white" />
                  </button>
                )}
                {(formData.status.name === "Pending" ||
                  formData.status.name === "Approved") && (
                  <button
                    type="button"
                    onClick={() => handleOptionClick("cancel")}
                    className="p-2 bg-red-300 rounded hover:bg-red-400 mr-2"
                  >
                    <TbCalendarCancel className="text-white" />
                  </button>
                )}
                {isSameDay(formData.estimatedTime) &&
                  formData.status.name !== "Rejected" && (
                    <button
                      type="button"
                      onClick={() => handleOptionClick("arrival")}
                      className="p-2 bg-green-300 rounded hover:bg-green-400 mr-2"
                    >
                      <FaRegCalendarCheck className="text-white" />
                    </button>
                  )}
                <button
                  type="button"
                  onClick={handleCancelMenu}
                  className="p-2 bg-red-300 rounded hover:bg-red-400"
                >
                  <GiCancel className="text-white" />
                </button>
              </div>
            ) : (
              <div className="flex">
                {formData.status.name !== "Rejected" &&
                  formData.status.name !== "Cancelled" &&
                  formData.status.name !== "Completed" && (
                    <>
                      <button
                        type="button"
                        onClick={handleEdit}
                        className="p-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
                      >
                        <FaEdit className="text-purple-700" />
                      </button>
                      {(formData.status.name === "Pending" ||
                        formData.status.name === "Approved") && (
                        <button
                          type="button"
                          onClick={() => setShowOptionsMenu(true)}
                          className="p-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                          <IoMdOptions className="text-purple-700" />
                        </button>
                      )}
                    </>
                  )}
              </div>
            )}
            {/* {formData.status.name === "Completed" && (
            <button
              type="button"
              onClick={() => setShowInvoice(true)}
              className="p-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
            >
              <FaFileInvoice className="text-white" />
            </button>
          )} */}
          </div>
        )}
      </div>
      <InvoiceModal
        isOpen={showInvoice}
        onClose={() => setShowInvoice(false)}
        appointmentData={currentAppointment.value.appointmentFull}
      />
      {/* Sử dụng các modal riêng */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        appointmentId={id}
        confirmAppointment={confirmAppointment}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={(response) => {
          setShowConfirmModal(false);
          if (response) {
            setFormData((prev) => ({
              ...prev,
              emp1: {
                name: sAccount.value.firstName + sAccount.value.lastName,
                bg: "bg-green-200",
              },
              status: { name: "Approved", bg: "bg-green-200" },
            }));
          }
        }}
      />

      <CancelModal
        isOpen={showCancelModal}
        onCancel={() => setShowCancelModal(false)}
        id={id}
        onConfirm={(response) => {
          if (response) {
            setFormData((prev) => ({
              ...prev,
              emp2: {
                name: sAccount.value.firstName + sAccount.value.lastName,
                bg: "bg-red-200",
              },
              status: { name: "Reject", bg: "bg-red-200" },
            }));
          }
          setShowCancelModal(false);
        }}
      />

      <ArrivalModal
        isOpen={showArrivalModal}
        formData={formData}
        onCancel={() => setShowArrivalModal(false)}
        id={id}
        onConfirm={(response) => {
          setShowArrivalModal(false);
          currentAppointment.set((v) => {
            v.value.load += 1;
          });
          if (response) {
            setFormData((prev) => ({
              ...prev,
              emp1: {
                name: sAccount.value.firstName + sAccount.value.lastName,
                bg: "bg-green-200",
              },
              status: { name: "Arrival", bg: "bg-green-200" },
            }));
          }
        }}
      />
    </>
  );
};

export default BookingInfo;
