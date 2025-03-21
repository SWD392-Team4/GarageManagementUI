import React from "react";
import { useTranslation } from "react-i18next";
import { formatDateYearMonthDay } from "../schemas/EmployeeValid";
import { FaTimes, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function UpdateEmployeeModal({ isOpen, onClose, employee }) {
  const { t } = useTranslation("manage_employee");

  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-[700px] md:max-w-[800px] lg:max-w-[850px] relative">
        {/* Nút đóng */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t("manage_employee.form_view.employee_info")}
        </h2>

        {/* Ảnh + 3 Cột Thông tin */}
        <div className="grid grid-cols-3 gap-6 items-center">
          {/* Hình ảnh */}
          <div className="flex justify-center col-span-3 md:col-span-1">
            <img
              src={employee.imageLink || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-xl border-4 border-gray-300 shadow-lg object-cover"
            />
          </div>

          {/* Cột thông tin 1 */}
          <div className="col-span-3 md:col-span-1 text-gray-700 text-[16px] sm:text-[18px]">
            <p>
              <strong>{t("manage_employee.form_view.first_name")}:</strong>{" "}
              {employee.firstName}
            </p>
            <p>
              <strong>{t("manage_employee.form_view.last_name")}:</strong>{" "}
              {employee.lastName}
            </p>
            <p>
              <strong>{t("manage_employee.form_view.citizen_id")}:</strong>{" "}
              {employee.citizenIdentification ||
                t("manage_employee.form_view.not_available")}
            </p>
            <p>
              <strong>{t("manage_employee.form_view.gender")}:</strong>{" "}
              {employee.gender
                ? t("manage_employee.form_view.male")
                : t("manage_employee.form_view.female")}
            </p>
            <p>
              <strong>{t("manage_employee.form_view.birth_date")}:</strong>{" "}
              {employee.dateOfBirth !== "0001-01-01"
                ? formatDateYearMonthDay(employee.dateOfBirth)
                : t("manage_employee.form_view.not_available")}
            </p>
          </div>

          {/* Cột thông tin 2 */}
          <div className="col-span-3 md:col-span-1 text-gray-700 text-[16px] sm:text-[18px]">
            <p>
              <strong>{t("manage_employee.form_view.role")}:</strong>{" "}
              {employee.role || t("manage_employee.form_view.not_available")}
            </p>
            <p>
              <strong>{t("manage_employee.form_view.workPlace")}:</strong>{" "}
              {employee.workPlace ||
                t("manage_employee.form_view.not_available")}
            </p>
            <p>
              <strong>{t("manage_employee.form_view.created_at")}:</strong>{" "}
              {employee.createdAt
                ? formatDateYearMonthDay(employee.createdAt)
                : t("manage_employee.form_view.not_available")}
            </p>
            <p>
              <strong>{t("manage_employee.form_view.updated_at")}:</strong>{" "}
              {employee.updatedAt
                ? formatDateYearMonthDay(employee.updatedAt)
                : t("manage_employee.form_view.not_available")}
            </p>
            <p>
              <strong>{t("manage_employee.form_view.status")}:</strong>{" "}
              <span className="text-green-600 font-semibold">
                {t(employee.status.toLowerCase())}
              </span>
            </p>
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="text-gray-700 flex items-center">
            <strong>{t("manage_employee.form_view.email")}:</strong>
            {employee.email}
            {employee.emailConfirmed ? (
              <FaCheckCircle className="ml-2 text-green-500" />
            ) : (
              <FaTimesCircle className="ml-2 text-red-500" />
            )}
          </div>
          <div className="text-gray-700 flex items-center">
            <strong>{t("manage_employee.form_view.phone")}:</strong>{" "}
            {employee.phoneNumber}
            {employee.phoneNumberConfirmed ? (
              <FaCheckCircle className="ml-2 text-green-500" />
            ) : (
              <FaTimesCircle className="ml-2 text-red-500" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
