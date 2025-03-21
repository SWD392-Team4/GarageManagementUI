import React from "react";

/**
 * Hiển thị thẻ ngắn gọn của 1 Appointment (trên Kanban)
 * @param {object} props
 *  - appointment: object chứa dữ liệu appointment
 *  - onClick: hàm xử lý khi click vào card
 *  - provided, snapshot: props từ react-beautiful-dnd (drag & drop)
 */
function AppointmentCard({ appointment, onClick, provided, snapshot }) {
  return (
    <div
      className={`
        mb-3 p-3 border rounded bg-gray-50 hover:bg-gray-100 cursor-pointer
        ${snapshot?.isDragging ? "bg-green-100" : "bg-gray-50"}
      `}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={onClick}
    >
      <p className="font-bold">{appointment.appointmentDetail.serviceName}</p>
      <p>
        <span className=" font-semibold ">Giá: </span>{" "}
        {appointment.appointmentDetail.price}
      </p>
      <p>
        <span className=" font-semibold">Estimated Hours: </span>{" "}
        {appointment.appointmentDetail.estimatedHours}
      </p>
      <p>
        <span className=" font-semibold">Lưu ý: </span>{" "}
        {appointment.appointmentDetail.serviceNote}
      </p>
      <p>
        <span className=" font-semibold">Trạng thái: </span>{" "}
        {appointment.appointmentDetail.status}
      </p>
    </div>
  );
}

export default AppointmentCard;
