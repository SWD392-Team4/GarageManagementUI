import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { formatVietnameseCurrency } from "../../ManageGoodsIssued/schemas/GoodsIssuedSchemas";
import { getAllProductsAtGara } from "../../AdminManageAppoinment/services/AppointmentService";
import { AddAppointmentReplacementPartDetailApi } from "../services/AppointmentService";
import { useParams } from "react-router-dom";

export default function ServiceTasks({
  tasks: initialTasks = [],
  serviceDetailId,
}) {
  const { t } = useTranslation("appoinment-admin");
  const { id } = useParams();

  // Quản lý danh sách task (mỗi task gồm product, quantity, status)
  const [localTasks, setLocalTasks] = useState(initialTasks);
  // Danh sách sản phẩm lấy từ API
  const [products, setProducts] = useState([]);
  // Dòng thêm mới: lưu thông tin sản phẩm được chọn và số lượng cần thêm
  const [newTask, setNewTask] = useState({
    productId: "",
    productName: "",
    productPrice: 0,
    availableQuantity: 0,
    quantity: "",
  });

  // Lấy danh sách sản phẩm từ API
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

  // Custom styles cho react-select
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: "180px",
      maxWidth: "180px",
    }),
  };

  // Hiển thị option với ảnh, tên và giá sản phẩm
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
        serviceDetailId
      );
      if (response) {
        const newTaskItem = {
          id: Date.now().toString(),
          productId: newTask.productId,
          productName: newTask.productName,
          productPrice: newTask.productPrice,
          availableQuantity: newTask.availableQuantity,
          quantity: quantityNumber,
          status: "Pending", // trạng thái mặc định khi thêm mới
        };
        setLocalTasks((prev) => [...prev, newTaskItem]);
        setNewTask({
          productId: "",
          productName: "",
          productPrice: 0,
          availableQuantity: 0,
          quantity: "",
        });
      }
    } catch (error) {
      console.error("Error adding replacement part:", error);
    }
  };

  const handleDeleteTask = (id) => {
    setLocalTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Cập nhật số lượng của task (đảm bảo không vượt quá số lượng sẵn có)
  const handleQuantityChange = (id, value) => {
    const quantity = Number(value);
    setLocalTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          if (quantity > task.availableQuantity) {
            alert(
              t("errors.exceedsQuantity", "Quantity exceeds available stock")
            );
            return task;
          }
          return { ...task, quantity };
        }
        return task;
      })
    );
  };

  // Cập nhật trạng thái (status) của task
  const handleStatusChange = (id, newStatus) => {
    setLocalTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Service Tasks</h3>
      {/* Hiển thị danh sách task */}
      {localTasks.map((task) => (
        <div
          key={task.id}
          className="grid grid-cols-4 items-center mb-2 space-x-4"
        >
          <span className="col-span-1">{task.productName}</span>
          <input
            type="number"
            value={task.quantity}
            min={1}
            max={task.availableQuantity}
            onChange={(e) => handleQuantityChange(task.id, e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-20 col-span-1"
          />

          <select
            value={task.status}
            onChange={(e) => handleStatusChange(task.id, e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 col-span-1"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            onClick={() => handleDeleteTask(task.id)}
            className="text-red-500 hover:underline"
          >
            {t("buttons.delete", "Delete")}
          </button>
        </div>
      ))}

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
                availableQuantity: selected ? selected.availableQuantity : 0,
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
              {t("text.available", "Available")}: {newTask.availableQuantity}
            </div>
          )}
        </div>
        <button
          onClick={handleAddTask}
          className="text-green-500 hover:underline"
        >
          {t("buttons.add", "Add")}
        </button>
      </div>
    </div>
  );
}
