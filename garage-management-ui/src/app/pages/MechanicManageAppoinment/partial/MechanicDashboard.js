import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AppointmentCard from "./AppointmentCard";
import AppointmentDetailModal from "./AppointmentDetailModal";
import ConfirmDragModal from "./ConfirmDragModal"; // Component mới tách riêng để xác nhận thao tác drag
import UserService from "../../../hooks/services/UserService";
import { currentAppointment } from "../../AdminManageAppoinment/services/store/AppointmentSignify";
import { useParams } from "react-router-dom";
import { getFullInfomationAppointment } from "../../AdminManageAppoinment/services/AppointmentService";

function MechanicDashboard() {
  const { id } = useParams();
  const [appointmentInfo, setAppointmentInfo] = useState({});
  const [services, setServices] = useState({});
  const [columns, setColumns] = useState({});
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [confirmData, setConfirmData] = useState(null); // Lưu thông tin drag để xác nhận

  const userService = new UserService();
  // Định nghĩa thứ tự cột cố định
  const columnOrder = [
    "column-pending",
    "column-inprogress",
    "column-completed",
    "column-cancel",
  ];

  // Hàm fetch appointment từ API và khởi tạo state
  const fetchAppointment = useCallback(async () => {
    try {
      const response = await getFullInfomationAppointment(id);
      const appointment = response.data.value;
      setAppointmentInfo(appointment);

      // Chuyển appointmentDetails thành map và đảm bảo trạng thái ban đầu là "pending"
      const servicesMap = {};
      appointment.appointmentDetails.forEach((detail) => {
        servicesMap[detail.id] = {
          ...detail,
          // Nếu status trả về là "Approved" hay "Pending", ta đưa vào trạng thái pending ban đầu
          status:
            detail.status === "Pending" || detail.status === "Approved"
              ? "pending"
              : detail.status,
        };
      });
      setServices(servicesMap);

      // Khởi tạo 4 cột: toàn bộ detail ban đầu được đưa vào cột "Chưa làm gì" (pending)
      const initialColumns = {
        "column-pending": {
          id: "column-pending",
          title: "Chưa làm gì",
          serviceIds: appointment.appointmentDetails.map((detail) => detail.id),
        },
        "column-inprogress": {
          id: "column-inprogress",
          title: "In Progress",
          serviceIds: [],
        },
        "column-completed": {
          id: "column-completed",
          title: "Completed",
          serviceIds: [],
        },
        "column-cancel": {
          id: "column-cancel",
          title: "Cancel",
          serviceIds: [],
        },
      };
      setColumns(initialColumns);

      // Cập nhật thông tin global nếu cần
      currentAppointment.set((v) => {
        v.value.status = appointment.status;
        v.value.appointmentDetails = appointment.appointmentDetails;
        v.value.appointmentDetailPackages =
          appointment.appointmentDetailPackages;
      });
    } catch (error) {
      console.error("Error fetching appointment: ", error);
    }
  }, [id]);

  useEffect(() => {
    fetchAppointment();
  }, [id, currentAppointment.value.load]);

  // Xử lý kéo thả
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    // Lấy vị trí của cột nguồn và đích theo thứ tự cố định
    const sourceIndex = columnOrder.indexOf(source.droppableId);
    const destIndex = columnOrder.indexOf(destination.droppableId);

    // Chỉ cho phép kéo sang cột bên phải liền kề
    if (
      !(destIndex === sourceIndex + 1 || destIndex === columnOrder.length - 1)
    ) {
      return;
    }

    // Lưu lại state cũ để có thể revert nếu cần
    const oldColumns = { ...columns };

    // Tính toán lại thứ tự serviceIds trong cột
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    const newSourceServiceIds = Array.from(sourceColumn.serviceIds);
    newSourceServiceIds.splice(source.index, 1);
    const newDestServiceIds = Array.from(destColumn.serviceIds);
    newDestServiceIds.splice(destination.index, 0, draggableId);

    const newColumns = {
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        serviceIds: newSourceServiceIds,
      },
      [destination.droppableId]: {
        ...destColumn,
        serviceIds: newDestServiceIds,
      },
    };

    // Cập nhật state tạm thời (optimistic update)
    setColumns(newColumns);
    // Xác định trạng thái mới dựa trên id của cột đích (bỏ tiền tố "column-")
    const newStatus = destination.droppableId.replace("column-", "");
    setServices((prev) => ({
      ...prev,
      [draggableId]: { ...prev[draggableId], status: newStatus },
    }));

    // Lưu thông tin drag để xác nhận trong modal
    setConfirmData({
      draggableId,
      newStatus,
      oldColumns,
    });
  };

  // Xác nhận cập nhật sau khi kéo
  const handleConfirmDrag = async () => {
    try {
      await fetch("https://example.com/api/appointments/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: confirmData.draggableId,
          newStatus: confirmData.newStatus,
        }),
      });
      // Có thể hiển thị thông báo thành công tại đây
    } catch (error) {
      console.error("Error updating service status:", error);
    }
    setConfirmData(null);
  };

  // Hủy xác nhận => revert lại state ban đầu
  const handleCancelDrag = () => {
    setColumns(confirmData.oldColumns);
    // Giả sử trạng thái ban đầu của service là "pending"
    setServices((prev) => ({
      ...prev,
      [confirmData.draggableId]: {
        ...prev[confirmData.draggableId],
        status: "pending",
      },
    }));
    setConfirmData(null);
  };

  // Mở modal xem/chỉnh sửa chi tiết
  const handleOpenDetails = (service) => {
    setIsNew(false);
    setSelectedService(service);
    setShowDetailModal(true);
  };

  // Hàm tạo mới chi tiết (nếu cần)
  const handleCreateNew = () => {
    setIsNew(true);
    setSelectedService(null);
    setShowDetailModal(true);
  };

  // Hàm lưu thông tin chi tiết (tạo mới hoặc cập nhật)
  const handleSave = async (newData) => {
    if (isNew) {
      const newId = `appointmentdetail-${Date.now()}`;
      const serviceStatus = newData.status || "pending";
      newData.id = newId;
      setServices((prev) => ({
        ...prev,
        [newId]: newData,
      }));
      // Thêm service mới vào cột tương ứng (ở đây chỉ cho phép thêm vào cột pending)
      setColumns((prev) => ({
        ...prev,
        "column-pending": {
          ...prev["column-pending"],
          serviceIds: [newId, ...prev["column-pending"].serviceIds],
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
      // Xử lý upload file, gọi API… (giữ nguyên code hiện tại)
      const formData = new FormData();
      newData.imagesBefore.forEach((file) => {
        formData.append("fileDtos", file);
      });
      try {
        const response = await userService.sendAjax(
          "/api/products/ac103ccc-bd82-44ca-adb7-5b478b95965a/images",
          "POST",
          formData,
          false,
          true
        );
        if (response.status === 204) {
          userService.showToast(response.status, "Lưu được");
        } else {
          userService.showToast(
            response.status,
            response.message || "Lưu không được"
          );
        }
      } catch (error) {
        userService.showToast(error.status, error.message);
      }
    }
    setShowDetailModal(false);
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
                Verification Code
              </label>
              <div className="w-2/3 border border-gray-300 rounded-sm px-2 py-1 text-sm bg-gray-200">
                {appointmentInfo.verificationCode}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium text-gray-600 w-1/3">
                Phone number
              </label>
              <div className="w-2/3 border border-gray-300 rounded-sm px-2 py-1 text-sm bg-gray-200">
                {appointmentInfo.customerPhoneNumber}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium text-gray-600 w-1/3">
                Phone number
              </label>
              <div className="w-2/3 border border-gray-300 rounded-sm px-2 py-1 text-sm bg-gray-200">
                {appointmentInfo.customerEmail}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columnOrder.map((columnId) => {
            const column = columns[columnId];
            if (!column) return null;
            return (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-white rounded-md p-3 shadow-md ${
                      snapshot.isDraggingOver ? "bg-blue-50" : "bg-white"
                    }`}
                  >
                    <h2 className="text-xl font-semibold mb-2">
                      {column.title}
                    </h2>
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
                    {/* Nút "New" chỉ hiển thị ở cột pending */}
                    {column.id === "column-pending" && (
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
            );
          })}
        </div>
      </DragDropContext>

      {/* Modal xem/chỉnh sửa chi tiết */}
      {showDetailModal && (
        <AppointmentDetailModal
          service={selectedService}
          isNew={isNew}
          onClose={() => setShowDetailModal(false)}
          onSave={handleSave}
        />
      )}

      {/* Modal xác nhận thao tác kéo */}
      {confirmData && (
        <ConfirmDragModal
          // Bạn có thể truyền thêm thông tin trạng thái nguồn nếu cần
          sourceStatus="pending"
          destinationStatus={confirmData.newStatus}
          onConfirm={handleConfirmDrag}
          onCancel={handleCancelDrag}
        />
      )}
    </div>
  );
}

export default MechanicDashboard;
