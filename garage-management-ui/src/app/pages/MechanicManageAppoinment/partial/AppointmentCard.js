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
      <p className="font-bold">{appointment.customerName}</p>
      <p>
        <span className=" font-semibold ">Dịch vụ: </span>{" "}
        {appointment.ServicesName}
      </p>
      <p>
        <span className=" font-semibold">Hành động: </span> {appointment.Action}
      </p>
      <p>
        <span className=" font-semibold">Lưu ý: </span>{" "}
        {appointment.ServiceNote}
      </p>
      <p>
        <span className=" font-semibold">Trạng thái: </span>{" "}
        {appointment.status}
      </p>
    </div>
  );
}

export default AppointmentCard;
