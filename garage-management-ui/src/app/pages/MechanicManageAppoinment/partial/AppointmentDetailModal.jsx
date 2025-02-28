import React, { useEffect, useState, useRef } from "react";

function AppointmentDetailModal({ service, isNew = false, onClose, onSave }) {
  // Nếu isNew thì khởi tạo dữ liệu mặc định, còn không thì dùng dữ liệu được truyền xuống
  const [serviceData, setServiceData] = useState(
    isNew
      ? {
          id: "",
          ServicesName: "",
          Action: "",
          Description: "",
          WorkNature: "",
          ServiceNote: "",
          status: "upcoming",
          imagesBefore: [],
          imagesAfter: [],
          tasks: [],
        }
      : service || {}
  );

  // Nếu prop service thay đổi và không phải là tạo mới, cập nhật lại state
  useEffect(() => {
    if (!isNew && service) {
      setServiceData(service);
    }
  }, [isNew, service]);

  // Refs cho file input của ảnh Before & After
  const fileInputBeforeRef = useRef(null);
  const fileInputAfterRef = useRef(null);

  // Hàm cập nhật dữ liệu form
  const handleChange = (field, value) => {
    setServiceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Cập nhật trạng thái task
  const handleTaskStatusChange = (taskId, newStatus) => {
    setServiceData((prev) => {
      const newTasks = prev.tasks.map((t) =>
        t.id === taskId ? { ...t, Status: newStatus } : t
      );
      return { ...prev, tasks: newTasks };
    });
  };

  // Xử lý thêm ảnh Before sử dụng FileReader
  const handleBeforeImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setServiceData((prev) => ({
          ...prev,
          imagesBefore: [...prev.imagesBefore, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý thêm ảnh After sử dụng FileReader
  const handleAfterImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setServiceData((prev) => ({
          ...prev,
          imagesAfter: [...prev.imagesAfter, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Xoá ảnh Before theo index
  const handleRemoveBeforeImage = (index) => {
    setServiceData((prev) => ({
      ...prev,
      imagesBefore: prev.imagesBefore.filter((_, i) => i !== index),
    }));
  };

  // Xoá ảnh After theo index
  const handleRemoveAfterImage = (index) => {
    setServiceData((prev) => ({
      ...prev,
      imagesAfter: prev.imagesAfter.filter((_, i) => i !== index),
    }));
  };

  // Khi nhấn "Lưu" hoặc "Tạo"
  const handleSaveClick = () => {
    onSave(serviceData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl p-5 rounded shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">
          {isNew
            ? "Tạo mới Service"
            : `Chi tiết Service - ${serviceData.ServicesName}`}
        </h2>

        {/* Form thông tin Service */}
        <div className="mb-2">
          <label className="font-semibold">Tên dịch vụ</label>
          <input
            type="text"
            className="block w-full border rounded p-1 mt-1"
            value={serviceData.ServicesName}
            onChange={(e) => handleChange("ServicesName", e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold">Action</label>
          <input
            type="text"
            className="block w-full border rounded p-1 mt-1"
            value={serviceData.Action}
            onChange={(e) => handleChange("Action", e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold">Mô tả dịch vụ</label>
          <textarea
            className="block w-full border rounded p-1 mt-1"
            value={serviceData.Description}
            onChange={(e) => handleChange("Description", e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold">Work Nature</label>
          <input
            type="text"
            className="block w-full border rounded p-1 mt-1"
            value={serviceData.WorkNature}
            onChange={(e) => handleChange("WorkNature", e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold">Ghi chú dịch vụ</label>
          <textarea
            className="block w-full border rounded p-1 mt-1"
            value={serviceData.ServiceNote}
            onChange={(e) => handleChange("ServiceNote", e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold">Trạng thái</label>
          <input
            type="text"
            className="block w-full border rounded p-1 mt-1"
            value={serviceData.status}
            onChange={(e) => handleChange("status", e.target.value)}
          />
        </div>

        {/* Danh sách các Service Tasks */}
        {serviceData.tasks ? (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Service Tasks</h3>
            {serviceData.tasks.map((task) => (
              <div key={task.id} className="flex items-center mb-2">
                <label className="mr-2 w-40">
                  {task.Action}: {task.ProductName}
                </label>
                <select
                  value={task.Status}
                  onChange={(e) =>
                    handleTaskStatusChange(task.id, e.target.value)
                  }
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}

        {/* Phần ảnh */}
        <div className="grid grid-cols-2">
          {/* Ảnh Before */}
          <div className="mt-2">
            <p className="font-semibold">Ảnh Before</p>
            <div className="flex flex-wrap gap-2">
              {serviceData.imagesBefore.map((url, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={url}
                    alt={`before-${idx}`}
                    className="w-20 h-20 border"
                  />
                  <button
                    onClick={() => handleRemoveBeforeImage(idx)}
                    className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                onClick={() => fileInputBeforeRef.current.click()}
                className="w-20 h-20 border flex items-center justify-center bg-gray-200"
              >
                + Add
              </button>
              <input
                type="file"
                ref={fileInputBeforeRef}
                className="hidden"
                accept="image/*"
                onChange={handleBeforeImageChange}
              />
            </div>
          </div>

          {/* Ảnh After */}
          <div className="mt-2">
            <p className="font-semibold">Ảnh After</p>
            <div className="flex flex-wrap gap-2">
              {serviceData.imagesAfter.map((url, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={url}
                    alt={`after-${idx}`}
                    className="w-20 h-20 border"
                  />
                  <button
                    onClick={() => handleRemoveAfterImage(idx)}
                    className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                onClick={() => fileInputAfterRef.current.click()}
                className="w-20 h-20 border flex items-center justify-center bg-gray-200"
              >
                + Add
              </button>
              <input
                type="file"
                ref={fileInputAfterRef}
                className="hidden"
                accept="image/*"
                onChange={handleAfterImageChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSaveClick}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isNew ? "Tạo" : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetailModal;
