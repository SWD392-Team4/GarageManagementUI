import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import UserService from "../../../hooks/services/UserService";
import { currentAppointment } from "../services/store/mechanic";
import AddAppointmentDetail from "./AddAppointmentDetail";
import AppointmentCard from "./AppointmentCard";
import AppointmentDetailModal from "./AppointmentDetailModal";
import ConfirmDragModal from "./ConfirmDragModal";

function MechanicDashboard() {
  const [appointmentInfo, setAppointmentInfo] = useState({});
  const [services, setServices] = useState({});
  const [columns, setColumns] = useState({});
  const [showDetailModal, setShowDetailModal] = useState(false);
  const sCurrentAppointment = currentAppointment.use();

  const [isNew, setIsNew] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [confirmData, setConfirmData] = useState(null);

  const userService = new UserService();

  // Định nghĩa thứ tự cột cố định
  const columnOrder = [
    "column-assigned",
    "column-inprogress",
    "column-completed",
    "column-cancel",
  ];

  // Hàm ánh xạ status của detail sang id cột tương ứng
  const mapStatusToColumnId = (status) => {
    if (status === "Assigned") return "column-assigned";
    if (status === "InProgress") return "column-inprogress";
    if (status === "Completed") return "column-completed";
    // Với các status khác như Cancelled, Declined, Unsigned... đưa vào cột "cancel"
    return "column-cancel";
  };

  // Hàm ánh xạ ngược: từ id cột sang status chuẩn
  const mapColumnIdToStatus = (columnId) => {
    if (columnId === "column-assigned") return "Assigned";
    if (columnId === "column-inprogress") return "InProgress";
    if (columnId === "column-completed") return "Completed";
    if (columnId === "column-cancel") return "Cancelled";
    return "";
  };

  const fetchAppointment = useCallback(async () => {
    try {
      // Lấy dữ liệu từ currentAppointment.value
      const appointmentData = currentAppointment.value.appointmentDetail;
      setAppointmentInfo(appointmentData);

      // Tạo object mapping id -> appointment detail
      const servicesObj = appointmentData.appointmentDetails.reduce(
        (acc, item) => {
          acc[item.id] = item;
          return acc;
        },
        {}
      );
      setServices(servicesObj);

      // Khởi tạo các cột với danh sách rỗng
      const initialColumns = {
        "column-assigned": {
          id: "column-assigned",
          title: "Được phân công",
          serviceIds: [],
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

      // Duyệt qua toàn bộ appointment detail và đẩy id vào cột phù hợp dựa trên status
      appointmentData.appointmentDetails.forEach((item) => {
        const colId = mapStatusToColumnId(item.status);
        initialColumns[colId].serviceIds.push(item.id);
      });

      setColumns(initialColumns);
    } catch (error) {
      console.error("Error fetching appointment: ", error);
    }
  }, []);

  useEffect(() => {
    fetchAppointment();
  }, [fetchAppointment, sCurrentAppointment.load]);

  // Xử lý kéo thả
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    // Xác định vị trí cột nguồn và đích theo thứ tự cố định
    const sourceIndex = columnOrder.indexOf(source.droppableId);
    const destIndex = columnOrder.indexOf(destination.droppableId);

    // Cho phép kéo sang cột ngay bên phải hoặc sang cột cuối cùng (nếu đó là thao tác hủy)
    if (
      !(destIndex === sourceIndex + 1 || destIndex === columnOrder.length - 1)
    ) {
      return;
    }

    // Lưu lại state cũ để có thể revert nếu cần
    const oldColumns = { ...columns };
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

    // Cập nhật state cột tạm thời
    setColumns(newColumns);
    // Xác định trạng thái mới dựa trên id cột đích
    const newStatus = mapColumnIdToStatus(destination.droppableId);
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

  // Hủy thao tác kéo => revert lại trạng thái cũ
  const handleCancelDrag = () => {
    setColumns(confirmData.oldColumns);
    // Tìm lại trạng thái ban đầu từ oldColumns
    let oldStatus = "";
    for (const colId in confirmData.oldColumns) {
      if (
        confirmData.oldColumns[colId].serviceIds.includes(
          confirmData.draggableId
        )
      ) {
        oldStatus = mapColumnIdToStatus(colId);
        break;
      }
    }
    setServices((prev) => ({
      ...prev,
      [confirmData.draggableId]: {
        ...prev[confirmData.draggableId],
        status: oldStatus,
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

  // Lưu thông tin chi tiết (tạo mới hoặc cập nhật)
  const handleSave = async (newData) => {
    if (isNew) {
      const newId = `appointmentdetail-${Date.now()}`;
      const serviceStatus = newData.status || "Assigned";
      newData.id = newId;
      setServices((prev) => ({
        ...prev,
        [newId]: newData,
      }));
      // Thêm service mới vào cột "column-assigned" (mặc định khi tạo mới)
      setColumns((prev) => ({
        ...prev,
        "column-assigned": {
          ...prev["column-assigned"],
          serviceIds: [newId, ...prev["column-assigned"].serviceIds],
        },
      }));
      // Gọi API tạo mới (giả lập)
      fetch("https://example.com/api/appointments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      }).catch((err) => console.error(err));
    } else {
      const { id } = newData;
      setServices((prev) => ({
        ...prev,
        [id]: { ...prev[id], ...newData },
      }));
      // Xử lý upload file (nếu có) và gọi API cập nhật
      const formData = new FormData();

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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 sm:grid-cols-2">
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
                Email
              </label>
              <div className="w-2/3 border border-gray-300 rounded-sm px-2 py-1 text-sm bg-gray-200">
                {appointmentInfo.customerEmail}
              </div>
            </div>
          </div>
          {appointmentInfo.mileage ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium text-gray-600 w-1/3">
                  Mileage
                </label>
                <div className="w-2/3 border border-gray-300 rounded-sm px-2 py-1 text-sm bg-gray-200">
                  {appointmentInfo.mileage}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium text-gray-600 w-1/3">
                Status
              </label>
              <div className="w-2/3 border border-gray-300 rounded-sm px-2 py-1 text-sm bg-gray-200">
                {appointmentInfo.status}
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
                Verification Code
              </label>
              <div className="w-2/3 border border-gray-300 rounded-sm px-2 py-1 text-sm bg-gray-200">
                {appointmentInfo.verificationCode}
              </div>
            </div>
          </div>

          {appointmentInfo.carLicensePlateNumber ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium text-gray-600 w-1/3">
                  Car License Plate Number
                </label>
                <div className="w-2/3 border border-gray-300 rounded-sm px-2 py-1 text-sm bg-gray-200">
                  {appointmentInfo.carLicensePlateNumber}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* Danh sách Services */}
      <div className="my-5 ">
        <div className="flex justify-between pb-2">
          <h1 className="text-2xl font-raleway font-semibold text-center md:text-left">
            Services list
          </h1>
          <AddAppointmentDetail id={appointmentInfo.id} />
        </div>

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
                              appointmentDetail={service}
                              onClick={() => handleOpenDetails(service)}
                              provided={provided}
                              snapshot={snapshot}
                            />
                          )}
                        </Draggable>
                      );
                    })}
                    {/* Nút "New" chỉ hiển thị ở cột "Được phân công" */}

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
          onClose={() => setShowDetailModal(false)}
          onSave={handleSave}
        />
      )}

      {/* Modal xác nhận thao tác kéo thả */}
      {confirmData && (
        <ConfirmDragModal
          sourceStatus={""}
          destinationStatus={confirmData.newStatus}
          onConfirm={handleConfirmDrag}
          onCancel={handleCancelDrag}
        />
      )}
    </div>
  );
}

export default MechanicDashboard;
