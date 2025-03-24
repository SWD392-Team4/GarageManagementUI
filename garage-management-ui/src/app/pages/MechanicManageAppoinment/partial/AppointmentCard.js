import React from "react";
import { sAccount } from "../../AuthCustomer/services/store";
import { formatDateTimeHour } from "../../BookingPage/schemas/bookingSchema";
import {
  FaClock,
  FaRegClock,
  FaHourglassEnd,
  FaInfoCircle,
  FaUserFriends,
  FaWrench,
} from "react-icons/fa";

/**
 * Hiển thị thẻ ngắn gọn của 1 Appointment (trên Kanban)
 * @param {object} props
 *  - appointmentDetail: object chứa dữ liệu appointment detail
 *  - onClick: hàm xử lý khi click vào card
 *  - provided, snapshot: props từ react-beautiful-dnd (drag & drop)
 */
function AppointmentCard({ appointmentDetail, onClick, provided, snapshot }) {
  return (
    <div
      className={`
        mb-3 p-3 border rounded hover:bg-gray-100 cursor-pointer
        ${snapshot?.isDragging ? "bg-green-100" : "bg-gray-50"}
      `}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={onClick}
    >
      {/* Tên dịch vụ với icon */}
      <p className="font-bold flex items-center">
        <FaWrench className="mr-2 text-blue-600" />
        {appointmentDetail.serviceName}
      </p>

      {/* Estimated Hours */}
      <p className="flex items-center">
        <span className="font-semibold flex items-center mr-1">
          <FaClock className="mr-1 text-gray-600" />
          Estimated Hours:
        </span>
        {appointmentDetail.estimatedHours}
      </p>

      {/* Time Assign */}
      {appointmentDetail.employeeSchedules ? (
        <>
          <p className="flex items-center">
            <span className="font-semibold flex items-center mr-1">
              <FaRegClock className="mr-1 text-gray-600" />
              Time Assign:
            </span>
            {appointmentDetail.employeeSchedules
              .filter((schedule) => schedule.employeeId === sAccount.value.id)
              .map((schedule) => (
                <span key={schedule.id}>
                  {formatDateTimeHour(schedule.createdAt)}{" "}
                </span>
              ))}
          </p>
          {/* Time End */}

          <p className="flex items-center">
            <span className="font-semibold flex items-center mr-1">
              <FaHourglassEnd className="mr-1 text-gray-600" />
              Time End:
            </span>
            {appointmentDetail.employeeSchedules
              .filter((schedule) => schedule.employee.id === sAccount.value.id)
              .map((schedule) => (
                <span key={schedule.id}>
                  {formatDateTimeHour(schedule.estimatedEndTime)}{" "}
                </span>
              ))}
          </p>
          {/* Số lượng người */}
          {/* <p className="flex items-center">
            <span className="font-semibold flex items-center mr-1">
              <FaUserFriends className="mr-1 text-gray-600" />
              Số lượng người:
            </span>
            {
              appointmentDetail.employeeSchedules.filter(
                (schedule) => schedule.status === "Assigned"
              ).length
            }
          </p> */}
        </>
      ) : (
        ""
      )}

      {/* Trạng thái */}
      <p className="flex items-center">
        <span className="font-semibold flex items-center mr-1">
          <FaInfoCircle className="mr-1 text-gray-600" />
          Trạng thái:
        </span>
        {appointmentDetail.status}
      </p>
    </div>
  );
}

export default AppointmentCard;
