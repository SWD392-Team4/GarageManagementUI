import React, { useState } from "react";
import { GiCancel } from "react-icons/gi";
import {
  MdListAlt,
  MdOutlineAssignmentInd,
  MdOutlineAssignmentLate,
} from "react-icons/md";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { formatDate } from "../schemas/appointmentSchema";
import { formatVietnameseCurrency } from "../../ManageGoodsIssued/schemas/GoodsIssuedSchemas";

const ServiceDetailModal = ({ isOpen, onClose, serviceDetail }) => {
  if (!isOpen || !serviceDetail) return null;
  const [serviceData, setServiceData] = useState({
    ...serviceDetail,
    imagesBefore:
      serviceDetail.carConditionImages?.filter(
        (img) => img.conditionStage === "Before"
      ) || [],
    imagesAfter:
      serviceDetail.carConditionImages?.filter(
        (img) => img.conditionStage === "After"
      ) || [],
  });
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="bg-white rounded-sm shadow-lg relative w-11/12 md:w-2/3 lg:w-1/2 p-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <div className="flex items-center">
            <MdListAlt className="text-2xl text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">Chi tiết hóa đơn</h2>
          </div>
          <button onClick={onClose} className="text-red-500 hover:text-red-700">
            <GiCancel className="text-2xl" />
          </button>
        </div>

        {/* Nội dung chính */}
        <div className="mt-4 space-y-4">
          {/* Thông tin chính */}
          <div className="p-2 border rounded grid grid-cols-2 md:grid-cols-3">
            <p>
              <strong>Tên dịch vụ:</strong> {serviceDetail.serviceName}
            </p>
            <p>
              <strong>Giá:</strong> {serviceDetail.price}
            </p>
            <p>
              <strong>Trạng thái:</strong> {serviceDetail.status}
            </p>
            <p>
              <strong>Thời gian tạo:</strong> {serviceDetail.createAt}
            </p>
            <p>
              <strong>Thời gian cập nhật:</strong> {serviceDetail.updatedAt}
            </p>
          </div>

          {/* Phụ tùng thay thế */}
          {serviceDetail.appointmentReplacementParts &&
            serviceDetail.appointmentReplacementParts.length > 0 && (
              <div className="p-2 border rounded">
                <h3 className="text-lg font-semibold flex items-center">
                  <IoRemoveCircleOutline className="mr-2" />
                  Phụ tùng thay thế
                </h3>
                <div className="mt-2 space-x-2 grid grid-cols-4">
                  {serviceDetail.appointmentReplacementParts.map((part) => (
                    <div key={part.id} className="p-2 border rounded">
                      <p>
                        <strong>Tên phụ tùng:</strong> {part.productName}
                      </p>
                      <p>
                        <strong>Số lượng:</strong> {part.quantity}
                      </p>
                      <p>
                        <strong>Giá:</strong>{" "}
                        {formatVietnameseCurrency(part.productPrice)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Lịch trình nhân viên */}
          {serviceDetail.employeeSchedules &&
            serviceDetail.employeeSchedules.length > 0 && (
              <div className="p-2 border rounded">
                <h3 className="text-lg font-semibold flex items-center">
                  <MdOutlineAssignmentLate className="mr-2" />
                  Lịch trình nhân viên
                </h3>
                <div className="mt-2 space-x-2 grid grid-cols-2">
                  {serviceDetail.employeeSchedules.map((schedule) => (
                    <div key={schedule.id} className="p-2 border rounded">
                      <div className="grid grid-cols-6 items-center w-full max-w-full overflow-hidden space-x-2">
                        <div className="col-span-1 flex-shrink-0">
                          {schedule.employee.imageLink !== "N/A" ? (
                            <img
                              src={schedule.employee.imageLink}
                              alt={`${schedule.employee.firstName} ${schedule.employee.lastName}`}
                              className="w-full h-14 object-cover rounded-sm"
                            />
                          ) : (
                            <div className="w-full h-14 flex items-center justify-center bg-gray-200 rounded-sm">
                              <FaUser className="text-gray-500 text-xl" />
                            </div>
                          )}
                        </div>
                        <div className="col-span-5 overflow-hidden">
                          <div className="font-medium truncate">
                            {schedule.employee.firstName}{" "}
                            {schedule.employee.lastName}
                          </div>
                          <div className="flex text-xs items-center">
                            <div className="flex items-center mr-2">
                              <FaEnvelope className="mr-1" />{" "}
                              {schedule.employee.email}
                            </div>
                            <div className="flex items-center">
                              <FaPhone className="mr-1" />{" "}
                              {schedule.employee.phoneNumber}
                            </div>
                          </div>
                          <div className="mt-1">
                            <p className="text-xs">
                              <strong>Trạng thái:</strong> {schedule.status}
                            </p>
                            <p className="text-xs">
                              <strong>Dự kiến kết thúc:</strong>{" "}
                              {schedule.estimatedEndTime && (
                                <>{formatDate(schedule.estimatedEndTime)}</>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* serviceNote (nếu có) */}
          {serviceDetail.serviceNote && (
            <div className="p-2 border rounded">
              <h3 className="text-lg font-semibold">Ghi Chú Dịch Vụ</h3>
              <div className="flex flex-wrap mt-2 gap-2">
                <span>{serviceDetail.serviceNote}</span>
              </div>
            </div>
          )}
          {serviceDetail.carConditionImages &&
            serviceDetail.carConditionImages.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  {serviceData.imagesBefore.length !== 0 && (
                    <>
                      <p className="font-semibold">Ảnh Before</p>
                      <div className="flex flex-wrap gap-2">
                        {(serviceData.imagesBefore || []).map((url, idx) => (
                          <div key={idx} className="relative">
                            <img
                              src={url.imageLink}
                              alt={`before-${idx}`}
                              className="w-20 h-20 border"
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Ảnh After */}
                <div>
                  {serviceData.imagesAfter.length !== 0 && (
                    <>
                      <p className="font-semibold">Ảnh After</p>
                      <div className="flex flex-wrap gap-2">
                        {(serviceData.imagesAfter || []).map((url, idx) => (
                          <div key={idx} className="relative">
                            <img
                              src={url.imageLink}
                              alt={`after-${idx}`}
                              className="w-20 h-20 border"
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
