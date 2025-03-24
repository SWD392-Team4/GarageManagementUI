import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import UserService from "../../../hooks/services/UserService";
import { currentAppointment } from "../services/store/mechanic";
import AddAppointmentDetail from "./AddAppointmentDetail";
import AppointmentCard from "./AppointmentCard";
import AppointmentDetailModal from "./AppointmentDetailModal";
import StartConfirmModal from "../modal/StartConfirmModal"; // Modal xác nhận start (before evidence)
import EndConfirmModal from "../modal/EndConfirmModal"; // Modal xác nhận end (after evidence)
import { StartAppointmet, EndAppointmet } from "../services/AppointmentService";
import MechanicMessageForm from "./MechanicMessageForm";

function MechanicDashboard() {
  const [showStartModal, setShowStartModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [appointmentInfo, setAppointmentInfo] = useState({});

  const [services, setServices] = useState({});
  const [columns, setColumns] = useState({});
  const [showDetailModal, setShowDetailModal] = useState(false);
  const sCurrentAppointment = currentAppointment.use();

  const [isNew, setIsNew] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  // Dùng để lưu lại trạng thái cũ khi kéo để có thể revert nếu người dùng hủy modal
  const [confirmData, setConfirmData] = useState(null);

  const userService = new UserService();

  // Hàm mở modal xem/chỉnh sửa chi tiết
  const handleOpenDetails = (service) => {
    setIsNew(false);
    setSelectedService(service);
    setShowDetailModal(true);
  };

  // Hàm xử lý sau khi người dùng chọn ảnh trong modal Start
  const handleStartConfirm = async (selectedImages) => {
    // Lấy schedule có status "Assigned" từ mảng employeeSchedules của selectedDetail
    const assignedSchedule = selectedDetail.employeeSchedules?.find(
      (schedule) => schedule.status === "Assigned"
    );
    currentAppointment.set((v) => {
      v.value.load += 1;
    });
    if (!assignedSchedule) {
      console.error("Không tìm thấy schedule có status 'Assigned'");
      return;
    }
    const scheduleId = assignedSchedule.id;

    // Tạo FormData và append từng file với key "formFileDtos"
    let imageFormData = new FormData();
    selectedImages.forEach((image) => {
      imageFormData.append("formFileDtos", image, image.name);
    });

    try {
      await StartAppointmet(
        scheduleId,
        imageFormData,
        appointmentInfo.id,
        selectedDetail.id
      );
      currentAppointment.set((v) => {
        v.value.load += 1;
      });
    } catch (error) {
      console.error("Lỗi khi bắt đầu appointment:", error);
    }
    // Sau khi xác nhận thành công, revert trạng thái nếu cần và tắt modal
    setConfirmData(null);
    setShowStartModal(false);
  };

  // Hàm xử lý sau khi người dùng chọn ảnh trong modal End
  const handleEndConfirm = async (selectedImages) => {
    // Lấy schedule có status "InProgress" từ mảng employeeSchedules của selectedDetail
    const assignedSchedule = selectedDetail.employeeSchedules?.find(
      (schedule) =>
        schedule.status === "InProgress" || schedule.status === "Assigned"
    );
    if (!assignedSchedule) {
      console.error("Không tìm thấy schedule có status 'InProgress'");
      return;
    }
    const scheduleId = assignedSchedule.id;

    // Tạo FormData và append từng file với key "formFileDtos"
    let imageFormData = new FormData();
    selectedImages.forEach((image) => {
      imageFormData.append("formFileDtos", image, image.name);
    });

    try {
      await EndAppointmet(
        scheduleId,
        imageFormData,
        appointmentInfo.id,
        selectedDetail.id
      );
    } catch (error) {
      console.error("Lỗi khi hoàn thành appointment:", error);
    }
    setConfirmData(null);
    setShowEndModal(false);
  };

  // Hàm hủy chung khi người dùng hủy modal (start hoặc end) để revert lại trạng thái trước đó
  const handleCancel = () => {
    if (confirmData) {
      setColumns(confirmData.oldColumns);
      // Tìm lại trạng thái ban đầu từ oldColumns
      let oldColId = "";
      for (const colId in confirmData.oldColumns) {
        if (
          confirmData.oldColumns[colId].serviceIds.includes(
            confirmData.draggableId
          )
        ) {
          oldColId = colId;
          break;
        }
      }
      setServices((prev) => ({
        ...prev,
        [confirmData.draggableId]: {
          ...prev[confirmData.draggableId],
          status: mapColumnIdToStatus(oldColId),
        },
      }));
    }
    setConfirmData(null);
    setShowStartModal(false);
    setShowEndModal(false);
  };

  // Định nghĩa thứ tự cột (3 cột)
  const columnOrder = [
    "column-assigned",
    "column-inprogress",
    "column-completed",
  ];

  // Ánh xạ trạng thái sang id cột
  const mapStatusToColumnId = (status) => {
    if (status === "Assigned") return "column-assigned";
    if (status === "InProgress") return "column-inprogress";
    if (status === "Completed") return "column-completed";
    return "";
  };

  // Ánh xạ id cột sang trạng thái chuẩn
  const mapColumnIdToStatus = (columnId) => {
    if (columnId === "column-assigned") return "Assigned";
    if (columnId === "column-inprogress") return "InProgress";
    if (columnId === "column-completed") return "Completed";
    return "";
  };

  const fetchAppointment = useCallback(async () => {
    try {
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
      };

      // Đẩy id service vào cột tương ứng dựa trên status
      appointmentData.appointmentDetails.forEach((item) => {
        const colId = mapStatusToColumnId(item.status);
        if (colId) {
          initialColumns[colId].serviceIds.push(item.id);
        }
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

    const sourceIndex = columnOrder.indexOf(source.droppableId);
    const destIndex = columnOrder.indexOf(destination.droppableId);
    if (
      !(destIndex === sourceIndex + 1 || destIndex === columnOrder.length - 1)
    )
      return;

    // Lưu lại trạng thái cũ để có thể revert nếu cần
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

    setColumns(newColumns);
    const newStatus = mapColumnIdToStatus(destination.droppableId);
    setServices((prev) => ({
      ...prev,
      [draggableId]: { ...prev[draggableId], status: newStatus },
    }));

    // Lưu lại dữ liệu cần revert
    setConfirmData({ draggableId, newStatus, oldColumns });

    // Mở modal tương ứng với trạng thái mới
    if (newStatus === "InProgress") {
      setSelectedDetail(services[draggableId]);
      setShowStartModal(true);
    } else if (newStatus === "Completed") {
      setSelectedDetail(services[draggableId]);
      setShowEndModal(true);
    }
  };

  return (
    <div className="">
      {/* Header thông tin appointment */}
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
          {appointmentInfo.mileage && (
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
          {appointmentInfo.carLicensePlateNumber && (
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
          )}
          {appointmentInfo.customerId && (
            <MechanicMessageForm appointmentInfo={appointmentInfo} />
          )}
        </div>
      </div>

      {/* Danh sách Services */}
      <div className="my-5">
        <div className="flex justify-between pb-2">
          <h1 className="text-2xl font-raleway font-semibold text-center md:text-left">
            Services list
          </h1>
          {appointmentInfo.status !== "Completed" && (
            <AddAppointmentDetail id={appointmentInfo.id} />
          )}
        </div>
        <div className="border-t border-red-950 text-left text-gray-500 text-sm w-full"></div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        />
      )}

      {/* Modal Start */}
      {showStartModal && (
        <StartConfirmModal
          onConfirm={handleStartConfirm}
          onCancel={handleCancel}
        />
      )}

      {/* Modal End */}
      {showEndModal && (
        <EndConfirmModal onConfirm={handleEndConfirm} onCancel={handleCancel} />
      )}
    </div>
  );
}

export default MechanicDashboard;
