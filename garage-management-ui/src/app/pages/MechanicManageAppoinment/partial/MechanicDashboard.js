import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AppointmentCard from "./AppointmentCard";
import AppointmentDetailModal from "./AppointmentDetailModal";

// Dữ liệu fake cho appointment (bao gồm header và danh sách service)
const fakeAppointment = {
  id: "appointment",
  customerName: "Trần Thị B",
  CarLicensePlateNumber: "51D-678.90",
  ActualAppointmentTime: "28/02/2025 11:00 AM",
  status: "Đã confirm",
  listServices: [
    {
      id: "appointmentdetail-1",
      ServicesName: "Kiểm tra động cơ",
      status: "upcoming",
      Action: "action services",
      Description: "Description servies",
      WorkNature: "WorkNature",
      ServiceNote: "Yêu cầu thay bugi loại Iridium",
      imagesBefore: [],
      imagesAfter: [],
      tasks: [
        {
          id: "appointmentReplace-1",
          Action: "Thay thế",
          ProductName: "Bánh xe",
          Status: "Pending",
        },
        {
          id: "appointmentReplace-2",
          Action: "Thay thế",
          ProductName: "Niềng xe",
          Status: "Pending",
        },
      ],
    },
    {
      id: "appointmentdetail-2",
      ServicesName: "Kiểm tra động cơ 2",
      status: "completed",
      Action: "action services",
      Description: "Description servies",
      WorkNature: "WorkNature",
      ServiceNote: "Yêu cầu thay bugi loại Iridium",
      imagesBefore: [],
      imagesAfter: [],
      tasks: [
        {
          id: "appointmentReplace-3",
          Action: "Thay thế",
          ProductName: "Bánh xe",
          Status: "Pending",
        },
        {
          id: "appointmentReplace-4",
          Action: "Thay thế",
          ProductName: "Niềng xe",
          Status: "Pending",
        },
      ],
    },
    {
      id: "appointmentdetail-3",
      ServicesName: "Kiểm tra động cơ 3",
      status: "in-progress",
      Action: "action services",
      Description: "Description servies",
      WorkNature: "WorkNature",
      ServiceNote: "Yêu cầu thay bugi loại Iridium",
      imagesBefore: [],
      imagesAfter: [],
    },
  ],
};

function MechanicDashboard() {
  // State header dùng fakeAppointment
  const [appointmentInfo] = useState(fakeAppointment);
  const [selectedService, setSelectedService] = useState(null);
  // State lưu các service (mapping từ id -> service)
  const [services, setServices] = useState(() => {
    const map = {};
    fakeAppointment.listServices.forEach((service) => {
      map[service.id] = service;
    });
    return map;
  });

  // Tạo 3 cột cố định: Upcoming, In Progress, Completed
  const initialColumns = {
    "column-upcoming": {
      id: "column-upcoming",
      title: "Upcoming (Sắp tới)",
      serviceIds: fakeAppointment.listServices
        .filter((service) => service.status === "upcoming")
        .map((service) => service.id),
    },
    "column-in-progress": {
      id: "column-in-progress",
      title: "In Progress (Đang thực hiện)",
      serviceIds: fakeAppointment.listServices
        .filter((service) => service.status === "in-progress")
        .map((service) => service.id),
    },
    "column-completed": {
      id: "column-completed",
      title: "Completed (Hoàn thành)",
      serviceIds: fakeAppointment.listServices
        .filter((service) => service.status === "completed")
        .map((service) => service.id),
    },
  };

  const [columns, setColumns] = useState(initialColumns);

  // State cho modal xem/sửa hoặc tạo mới
  const [showModal, setShowModal] = useState(false);
  const [isNew, setIsNew] = useState(false);

  // -----------------------------
  // Xử lý Drag & Drop
  // -----------------------------
  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    const sourceServiceIds = Array.from(sourceColumn.serviceIds);
    sourceServiceIds.splice(source.index, 1);

    const destServiceIds = Array.from(destColumn.serviceIds);
    destServiceIds.splice(destination.index, 0, draggableId);

    setColumns({
      ...columns,
      [sourceColumn.id]: {
        ...sourceColumn,
        serviceIds: sourceServiceIds,
      },
      [destColumn.id]: {
        ...destColumn,
        serviceIds: destServiceIds,
      },
    });

    // Cập nhật status của service dựa trên cột đích
    const newStatus = destColumn.id.replace("column-", "");
    setServices((prev) => ({
      ...prev,
      [draggableId]: {
        ...prev[draggableId],
        status: newStatus,
      },
    }));

    // Gọi API cập nhật (giả lập)
    try {
      await fetch("https://example.com/api/appointments/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: draggableId,
          newStatus: newStatus,
        }),
      });
    } catch (error) {
      console.error("Error updating service status:", error);
    }
  };

  // -----------------------------
  // Modal: Mở chi tiết (xem/sửa)
  // -----------------------------
  const handleOpenDetails = (service) => {
    setIsNew(false);
    setSelectedService(service);
    setShowModal(true);
  };

  // -----------------------------
  // Modal: Tạo mới
  // -----------------------------
  const handleCreateNew = () => {
    setIsNew(true);
    setSelectedServiceId(null);
    setShowModal(true);
  };

  // -----------------------------
  // Modal: Lưu/Tạo
  // -----------------------------
  const handleSave = (newData) => {
    if (isNew) {
      const newId = `appointmentdetail-${Date.now()}`;
      const serviceStatus = newData.status || "upcoming";
      newData.id = newId;
      setServices((prev) => ({
        ...prev,
        [newId]: newData,
      }));
      // Thêm service mới vào cột tương ứng
      const colId = `column-${serviceStatus}`;
      setColumns((prev) => ({
        ...prev,
        [colId]: {
          ...prev[colId],
          serviceIds: [newId, ...prev[colId].serviceIds],
        },
      }));
      // Gọi API tạo mới (giả lập)
      fetch("https://example.com/api/appointments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      }).catch((err) => console.error(err));
    } else {
      // Cập nhật service hiện có
      const { id } = newData;
      setServices((prev) => ({
        ...prev,
        [id]: { ...prev[id], ...newData },
      }));
      // Gọi API cập nhật (giả lập)
      fetch("https://example.com/api/appointments/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      }).catch((err) => console.error(err));
    }
    setShowModal(false);
  };

  return (
    <div className="">
      {/* Thông tin header của appointment */}
      <div className="pb-4">
        <div className="my-5">
          <h1 className="text-2xl font-raleway font-semibold text-center md:text-left">
            Information appointment
          </h1>
          <div className="border-t border-red-950 text-left text-gray-500 text-sm w-full"></div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium text-gray-600 w-1/3">
                Customer Name
              </label>
              <div className="w-2/3 border border-gray-300 rounded-sm px-2 py-1 text-sm bg-gray-200">
                {appointmentInfo.customerName}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium text-gray-600 w-1/3">
                CarLicensePlateNumber
              </label>
              <div className="w-2/3 border border-gray-300 rounded-sm px-2 py-1 text-sm bg-gray-200">
                {appointmentInfo.CarLicensePlateNumber}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium text-gray-600 w-1/3">
                Actual Appointment Time
              </label>
              <div className="w-2/3 border border-gray-300 rounded-sm px-2 py-1 text-sm bg-gray-200">
                {appointmentInfo.ActualAppointmentTime}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium text-gray-600 w-1/3">
                Appointment Status
              </label>
              <div className="w-2/3 border border-gray-300 rounded-sm px-2 py-1 text-sm bg-gray-200">
                {appointmentInfo.status}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách Services */}
      <div className="my-5">
        <h1 className="text-2xl font-raleway font-semibold text-center md:text-left">
          Services list
        </h1>
        <div className="border-t border-red-950 text-left text-gray-500 text-sm w-full"></div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(columns).map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  className={`bg-white rounded-md p-3 shadow-md ${
                    snapshot.isDraggingOver ? "bg-blue-50" : "bg-white"
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className="text-xl font-semibold mb-2">{column.title}</h2>
                  {column.serviceIds.map((serviceId, index) => {
                    const service = services[serviceId];
                    return (
                      <Draggable
                        key={service.id}
                        draggableId={service.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <AppointmentCard
                            appointment={service}
                            onClick={() => handleOpenDetails(service)}
                            provided={provided}
                            snapshot={snapshot}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {/* Nút "New" chỉ hiển thị ở cột Upcoming */}
                  {column.id === "column-upcoming" && (
                    <button
                      className="mt-3 w-full bg-blue-600 text-white py-2 rounded"
                      onClick={handleCreateNew}
                    >
                      + New
                    </button>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Modal chi tiết (xem / tạo mới) */}
      {showModal && (
        <AppointmentDetailModal
          service={selectedService}
          isNew={isNew}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default MechanicDashboard;
