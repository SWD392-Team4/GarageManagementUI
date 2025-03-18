import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import {
  getAllProducts,
  AddAppointmentReplacementPartDetailApi,
} from "../services/AppointmentService";
import { formatVietnameseCurrency } from "../../ManageGoodsIssued/schemas/GoodsIssuedSchemas";

// Giả lập hàm xóa (nếu API chưa có)
const DeleteAppointmentReplacementPartDetailApi = async (
  payload,
  appointmentId,
  serviceDetailId
) => {
  // Setup sẵn hàm xóa, chỉ log payload
  console.log(
    "Deleting replacement part:",
    payload,
    appointmentId,
    serviceDetailId
  );
  return false;
};

const ReplacementPartsModal = ({
  isOpen,
  onClose,
  replacementParts,
  onConfirm, // callback khi xóa hoặc thêm thành công, dùng để cập nhật lại giao diện cha (nếu cần)
  appointmentId,
  serviceDetailId,
}) => {
  const { t } = useTranslation("appoinment-admin");

  // Lưu danh sách phụ tùng thay thế hiện có (local state)
  const [partsList, setPartsList] = useState([]);
  // Danh sách sản phẩm có sẵn từ API
  const [products, setProducts] = useState([]);
  // Dòng thêm mới: lưu option đã chọn và số lượng
  const [newRow, setNewRow] = useState({
    productId: "",
    productName: "",
    productPrice: 0,
    availableQuantity: 0,
    quantity: "",
  });
  const handleClose = () => {
    setNewRow({
      productId: "",
      productName: "",
      productPrice: 0,
      availableQuantity: 0,
      quantity: "",
    });
    onClose();
  };
  // Lấy danh sách sản phẩm từ API
  const fetchData = useCallback(async () => {
    try {
      const productRes = await getAllProducts();
      setProducts(productRes.data.value);
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, []);

  // Cập nhật partsList khi prop replacementParts thay đổi
  useEffect(() => {
    const updatedParts = (replacementParts || []).map((part) => {
      const matchedProduct = products.find(
        (prod) => prod.productId === part.productId
      );
      return matchedProduct
        ? { ...part, availableQuantity: matchedProduct.quantity }
        : part;
    });
    setPartsList(updatedParts);
  }, [replacementParts, products]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!isOpen) return null;

  // filteredOptions: lọc ra danh sách sản phẩm chưa có trong partsList
  const filteredOptions = products
    .filter(
      (prod) => !partsList.some((part) => part.productId === prod.productId)
    )
    .map((prod) => ({
      value: prod.productId,
      label: prod.productName,
      productId: prod.productId,
      productName: prod.productName,
      productPrice: prod.productPrice,
      availableQuantity: prod.quantity,
      image:
        prod.productImage && prod.productImage.length > 0
          ? prod.productImage[0]
          : "",
    }));

  // Custom styles cho react-select
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: "200px",
      maxWidth: "220px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
    placeholder: (provided) => ({
      ...provided,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
    singleValue: (provided) => ({
      ...provided,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
  };

  // Hàm formatOptionLabel để hiển thị option với hình ảnh, label, giá (custom)
  const formatOptionLabel = (option) => {
    return (
      <div className="grid grid-cols-6 items-center w-full max-w-56 overflow-hidden">
        <div className="col-span-2 flex-shrink-0">
          {option.image && (
            <img
              src={option.image}
              alt={option.label}
              className="w-10 h-10 object-cover rounded"
            />
          )}
        </div>
        <div className="col-span-4 overflow-hidden">
          <div className="font-semibold truncate">{option.label}</div>
          <div className="text-gray-700 text-sm truncate">
            {formatVietnameseCurrency(option.productPrice)}
          </div>
        </div>
      </div>
    );
  };

  // Xử lý thêm dòng mới: khi nhấn "Add", gọi API ngay với payload mới
  const handleAddRow = async () => {
    if (!newRow.productId.trim() || newRow.quantity === "") return;
    const quantityNumber = Number(newRow.quantity);
    if (quantityNumber > newRow.availableQuantity) {
      alert(t("errors.exceedsQuantity", "Quantity exceeds available stock"));
      return;
    }
    const payload = {
      productId: newRow.productId,
      quantity: quantityNumber,
    };
    try {
      const response = await AddAppointmentReplacementPartDetailApi(
        payload,
        appointmentId,
        serviceDetailId
      );
      if (response) {
        const tempId = Date.now().toString();
        const newPart = {
          id: tempId,
          productId: newRow.productId,
          productName: newRow.productName,
          productPrice: newRow.productPrice,
          availableQuantity: newRow.availableQuantity,
          quantity: quantityNumber,
        };
        setPartsList((prev) => [...prev, newPart]);
        // Reset dòng thêm mới
        setNewRow({
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

  // Xử lý xóa row: gọi API xóa ngay
  const handleDelete = async (id) => {
    // Tìm dòng cần xóa để lấy productId và quantity (nếu cần gửi payload)
    const partToDelete = partsList.find((part) => part.id === id);
    if (!partToDelete) return;
    const payload = {
      productId: partToDelete.productId,
      quantity: Number(partToDelete.quantity),
    };
    try {
      const response = await DeleteAppointmentReplacementPartDetailApi(
        payload,
        appointmentId,
        serviceDetailId
      );
      if (response) {
        setPartsList((prev) => prev.filter((part) => part.id !== id));
      }
      // Nếu thành công, cập nhật local state
    } catch (error) {
      console.error("Error deleting replacement part:", error);
    }
  };

  // Không còn nút Confirm cuối modal (mỗi thao tác đã gọi API riêng)
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start pt-10 transition-all duration-300">
      <div className="bg-white w-full max-w-4xl rounded shadow-lg overflow-auto">
        {/* Header */}
        <div className="p-4 border-b border-gray-300 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {t("replacementPartsModal.title", "Update Replacement Parts")}
          </h2>
          <button
            onClick={handleClose}
            className="text-red-500 font-bold hover:underline"
          >
            {t("buttons.close", "Close")}
          </button>
        </div>
        {/* Table */}
        <div className="p-4">
          <div className="mt-4 hidden md:block">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100 border-b border-gray-300 uppercase text-xs font-medium text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">
                    {t("tableHeaders.stt", "STT")}
                  </th>
                  <th className="px-4 py-3 text-left">
                    {t("tableHeaders.productId", "Product ID")}
                  </th>
                  <th className="px-4 py-3 text-left">
                    {t("tableHeaders.quantity", "Quantity")}
                  </th>
                  <th className="px-4 py-3 text-left">
                    {t("tableHeaders.price", "Price")}
                  </th>
                  <th className="px-4 py-3 text-left">
                    {t("tableHeaders.totalPrice", "Total Price")}
                  </th>
                  <th className="px-4 py-3 text-left">
                    {t("tableHeaders.action", "Action")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {partsList.map((part, index) => (
                  <tr key={part.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap">{index + 1}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {part.productName} <br />
                      <span className="text-xs text-gray-500">
                        ({part.productId})
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        value={part.quantity}
                        min={1}
                        max={part.availableQuantity}
                        onChange={(e) =>
                          handleQuantityChange(part.id, e.target.value)
                        }
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                      <div className="text-xs text-gray-500">
                        {t("text.available", "Available")}:{" "}
                        {part.availableQuantity}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {formatVietnameseCurrency(part.productPrice)}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {formatVietnameseCurrency(
                        part.productPrice * part.quantity
                      )}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleDelete(part.id)}
                        className="text-red-500 hover:underline"
                      >
                        {t("buttons.delete", "Delete")}
                      </button>
                    </td>
                  </tr>
                ))}
                {/* Dòng thêm mới sử dụng React Select */}
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap"></td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <Select
                      value={
                        newRow.productId
                          ? filteredOptions.find(
                              (opt) => opt.value === newRow.productId
                            ) || null
                          : null
                      }
                      onChange={(selected) =>
                        setNewRow((prev) => ({
                          ...prev,
                          productId: selected ? selected.productId : "",
                          productName: selected ? selected.label : "",
                          productPrice: selected ? selected.productPrice : 0,
                          availableQuantity: selected
                            ? selected.availableQuantity
                            : 0,
                        }))
                      }
                      options={filteredOptions}
                      styles={{
                        ...customSelectStyles,
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      placeholder={t(
                        "placeholders.productId",
                        "Select Product"
                      )}
                      formatOptionLabel={formatOptionLabel}
                      isClearable
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                    />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <input
                      type="number"
                      placeholder={t("placeholders.quantity", "Quantity")}
                      value={newRow.quantity}
                      onChange={(e) =>
                        setNewRow((prev) => ({
                          ...prev,
                          quantity: e.target.value,
                        }))
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      disabled={!newRow.productId}
                      min={1}
                      max={newRow.availableQuantity || ""}
                    />
                    {newRow.productId && newRow.availableQuantity && (
                      <div className="text-xs text-gray-500">
                        {t("text.available", "Available")}:{" "}
                        {newRow.availableQuantity}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {newRow.productPrice
                      ? formatVietnameseCurrency(newRow.productPrice)
                      : ""}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {newRow.productPrice && newRow.quantity
                      ? formatVietnameseCurrency(
                          newRow.productPrice * newRow.quantity
                        )
                      : ""}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={handleAddRow}
                      className="text-green-500 hover:underline"
                    >
                      {t("buttons.add", "Add")}
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-gray-100 border-t border-gray-300 uppercase text-xs font-medium text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left" colSpan={2}>
                    {t("tableHeaders.total", "Total Quantity")}
                  </th>
                  <th className="px-4 py-3 text-left" colSpan={2}>
                    {partsList.reduce(
                      (acc, part) => acc + Number(part.quantity),
                      0
                    )}
                  </th>
                  <th className="px-4 py-3 text-left" colSpan={2}>
                    {formatVietnameseCurrency(
                      partsList.reduce(
                        (acc, part) =>
                          acc + Number(part.quantity * part.productPrice),
                        0
                      )
                    )}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        {/* Footer: chỉ có nút Close */}
        <div className="p-4 border-t border-gray-300 flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="p-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            {t("buttons.close", "Close")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplacementPartsModal;
