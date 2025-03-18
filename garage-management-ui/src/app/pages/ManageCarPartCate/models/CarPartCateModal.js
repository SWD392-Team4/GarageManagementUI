import React from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { createCarPartCate } from "../services/CategoryCarPart";
import { sAccount } from "../../AuthCustomer/services/store";

export default function CarPartCateModal({
  isOpen,
  onClose,
  onCarPartCateCreated,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await createCarPartCate({ partCategory: data.partCategory });
      onCarPartCateCreated();
      reset();
      onClose();
    } catch (error) {
      console.error("Error creating car part category:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* Tiêu đề */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold text-black">
            Thêm danh mục phụ tùng
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Trường nhập danh mục */}
          <div>
            <label className="block text-black">Tên danh mục</label>
            <input
              type="text"
              {...register("partCategory", {
                required: "Tên danh mục không được để trống",
              })}
              className="w-full p-2 border rounded text-black bg-white"
            />
            {errors.partCategory && (
              <p className="text-red-500 text-sm mt-1">
                {errors.partCategory.message}
              </p>
            )}
          </div>

          {/* Nút Hủy & Lưu */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Hủy
            </button>

            {sAccount.value.role === "Administrator" && (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Lưu
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
