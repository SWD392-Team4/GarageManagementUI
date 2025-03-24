import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { formatVietnameseCurrency } from "../../ManageGoodsIssued/schemas/GoodsIssuedSchemas";
import { getAllProductsAtGara } from "../../AdminManageAppoinment/services/AppointmentService";
import {
  AddAppointmentReplacementPartDetailApi,
  updateReplacementPart,
} from "../services/AppointmentService";
import { useParams } from "react-router-dom";
import { currentAppointment } from "../services/store/mechanic";

export default function ServiceTasks({
  tasks: initialTasks = [],
  serviceDetailId,
}) {
  const { t } = useTranslation("appoinment-admin");
  const { id } = useParams(); // appointment id

  // Mỗi task được mở rộng thêm với tempQuantity và isEditing.
  // Ngoài ra, task mới thêm được đánh dấu isNew: true
  const [localTasks, setLocalTasks] = useState(
    initialTasks.map((task) => ({
      ...task,
      tempQuantity: task.quantity,
      isEditing: false,
      isNew: false,
    }))
  );
  const [products, setProducts] = useState([]);
  const [newTask, setNewTask] = useState({
    productId: "",
    productName: "",
    productPrice: 0,
    availableQuantity: 0,
    quantity: "",
  });

  const fetchProducts = useCallback(async () => {
    try {
      const res = await getAllProductsAtGara();
      setProducts(res.data.value);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Lọc danh sách sản phẩm để chỉ hiển thị những sản phẩm chưa có trong danh sách task
  const filteredOptions = products
    .filter(
      (prod) => !localTasks.some((task) => task.productId === prod.productId)
    )
    .map((prod) => ({
      value: prod.productId,
      label: prod.productName,
      productId: prod.productId,
      productName: prod.productName,
      productPrice: prod.productPrice,
      availableQuantity: prod.quantity,
    }));

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: "180px",
      maxWidth: "180px",
    }),
  };

  const formatOptionLabel = (option) => (
    <div className="flex items-center">
      <div>
        <div className="font-semibold">{option.label}</div>
        <div className="text-sm text-gray-600">
          {formatVietnameseCurrency(option.productPrice)}
        </div>
      </div>
    </div>
  );

  // Khi thêm mới task: gọi API rồi thêm task mới với isNew: true
  const handleAddTask = async () => {
    if (!newTask.productId || newTask.quantity === "") return;
    const quantityNumber = Number(newTask.quantity);
    if (quantityNumber > newTask.availableQuantity) {
      alert(t("errors.exceedsQuantity", "Quantity exceeds available stock"));
      return;
    }
    const payload = {
      productId: newTask.productId,
      quantity: quantityNumber,
    };

    try {
      const response = await AddAppointmentReplacementPartDetailApi(
        payload,
        id,
        serviceDetailId.id
      );
      if (response) {
        const newTaskItem = {
          id: Date.now().toString(), // Giả lập id cho task mới
          productId: newTask.productId,
          productName: newTask.productName,
          productPrice: newTask.productPrice,
          availableQuantity: newTask.availableQuantity,
          quantity: quantityNumber,
          tempQuantity: quantityNumber,
          status: "Pending",
          isEditing: false,
          isNew: true, // Đánh dấu là mới thêm
        };
        setLocalTasks((prev) => [...prev, newTaskItem]);
        setNewTask({
          productId: "",
          productName: "",
          productPrice: 0,
          availableQuantity: 0,
          quantity: "",
        });
        currentAppointment.set((v) => {
          v.value.load += 1;
          return v;
        });
      }
    } catch (error) {
      console.error("Error adding replacement part:", error);
    }
  };

  // Xóa task: nếu task là mới thì chỉ xóa khỏi danh sách, ngược lại gọi API updateReplacementPart
  const handleDeleteTask = async (task) => {
    if (task.isNew) {
      setLocalTasks((prev) => prev.filter((t) => t.id !== task.id));
      return;
    }
    const payload = {
      productId: task.productId,
      quantity: 0,
      status: "Cancelled",
    };
    try {
      const res = await updateReplacementPart(
        id,
        serviceDetailId.id,
        task.id,
        payload
      );
      if (res) {
        setLocalTasks((prev) => prev.filter((t) => t.id !== task.id));
        currentAppointment.set((v) => {
          v.value.load += 1;
          return v;
        });
      }
    } catch (error) {
      console.error("Error updating replacement part:", error);
    }
  };

  // Cập nhật số lượng tạm (tempQuantity) khi người dùng thay đổi ô input và bật cờ chỉnh sửa
  const handleQuantityChange = (taskId, value) => {
    const quantity = Number(value);
    setLocalTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          if (quantity > task.availableQuantity) {
            alert(
              t("errors.exceedsQuantity", "Quantity exceeds available stock")
            );
            return task;
          }
          return { ...task, tempQuantity: value, isEditing: true };
        }
        return task;
      })
    );
  };

  // Khi bấm Save: gọi API updateReplacementPart với payload cần thiết
  const handleSaveTask = async (taskId) => {
    const task = localTasks.find((t) => t.id === taskId);
    if (!task) return;
    const newQuantity = Number(task.tempQuantity);
    const payload = {
      productId: task.productId,
      quantity: newQuantity,
      status: "Pending",
    };
    try {
      const res = await updateReplacementPart(
        id,
        serviceDetailId.id,
        task.id,
        payload
      );
      if (res) {
        setLocalTasks((prev) =>
          prev.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  quantity: newQuantity,
                  isEditing: false,
                  tempQuantity: newQuantity,
                }
              : t
          )
        );
        currentAppointment.set((v) => {
          v.value.load += 1;
          return v;
        });
      }
    } catch (error) {
      console.error("Error updating replacement part:", error);
    }
  };

  // Khi bấm Cancel: revert lại giá trị tempQuantity về quantity và tắt chế độ chỉnh sửa
  const handleCancelTask = (taskId) => {
    setLocalTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, isEditing: false, tempQuantity: t.quantity }
          : t
      )
    );
  };

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Service Tasks</h3>
      {/* Hiển thị danh sách task (chỉ những task có status không phải Cancelled và Declined) */}
      {localTasks
        .filter(
          (task) => task.status !== "Cancelled" && task.status !== "Declined"
        )
        .map((task) => (
          <div
            key={task.id}
            className="grid grid-cols-4 items-center mb-2 space-x-4"
          >
            <span className="col-span-1">{task.productName}</span>
            <div className="col-span-1">
              <input
                type="number"
                value={task.isEditing ? task.tempQuantity : task.quantity}
                min={1}
                max={task.availableQuantity}
                disabled={serviceDetailId.status === "Completed" || task.isNew}
                onChange={(e) => handleQuantityChange(task.id, e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-20"
              />
              {task.isEditing && (
                <div className="mt-1 space-x-2">
                  <button
                    onClick={() => handleSaveTask(task.id)}
                    className="text-green-500 text-sm hover:underline"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleCancelTask(task.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            {serviceDetailId.status !== "Completed" && (
              <div className="col-span-1">
                {task.isNew ? (
                  <span className="text-gray-500">New</span>
                ) : (
                  <button
                    onClick={() => handleDeleteTask(task)}
                    className="text-red-500 hover:underline"
                  >
                    {t("buttons.delete", "Delete")}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

      {serviceDetailId.status !== "Completed" && (
        <>
          {/* Dòng thêm mới task */}
          <div className="grid grid-cols-5 items-center space-x-4 mt-4">
            <div className="col-span-2">
              <Select
                value={
                  newTask.productId
                    ? filteredOptions.find(
                        (opt) => opt.value === newTask.productId
                      ) || null
                    : null
                }
                onChange={(selected) =>
                  setNewTask({
                    ...newTask,
                    productId: selected ? selected.productId : "",
                    productName: selected ? selected.label : "",
                    productPrice: selected ? selected.productPrice : 0,
                    availableQuantity: selected
                      ? selected.availableQuantity
                      : 0,
                  })
                }
                options={filteredOptions}
                styles={customSelectStyles}
                placeholder="Select Product"
                formatOptionLabel={formatOptionLabel}
                isClearable
              />
            </div>
            <div className="col-span-2 w-full">
              <input
                type="number"
                placeholder={t("placeholders.quantity", "Quantity")}
                value={newTask.quantity}
                onChange={(e) =>
                  setNewTask({ ...newTask, quantity: e.target.value })
                }
                className="border border-gray-300 rounded px-2 py-1 w-full"
                disabled={!newTask.productId}
                min={1}
                max={newTask.availableQuantity || ""}
              />
              {newTask.productId && (
                <div className="text-xs text-gray-500">
                  {t("text.available", "Available")}:{" "}
                  {newTask.availableQuantity}
                </div>
              )}
            </div>
            <button
              onClick={handleAddTask}
              className="text-green-500 hover:underline col-span-1"
            >
              {t("buttons.add", "Add")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
