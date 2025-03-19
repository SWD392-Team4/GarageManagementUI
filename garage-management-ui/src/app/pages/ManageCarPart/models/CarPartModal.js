import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { createCarPart, getAllCarPartCate } from "../services/CarPartService";
import { sAccount } from "../../../pages/AuthCustomer/services/store";

export default function CarPartModal({ isOpen, onClose, onCarPartCreated }) {
  const { t } = useTranslation("manage_carpart");
  const [categories, setCategories] = useState([]);

  // Schema validation bằng Yup
  const schema = yup.object().shape({
    partName: yup.string().required(t("validation.required_part_name")),
    carPartCategoryId: yup.string().required(t("validation.required_category")),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      partName: "",
      carPartCategoryId: "",
    },
  });

  // Lấy danh sách danh mục khi modal mở
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCarPartCate();
        setCategories(response || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục phụ tùng:", error);
      }
    };

    if (isOpen) {
      fetchCategories();
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  // Xử lý gửi form
  const onSubmit = async (data) => {
    try {
      await createCarPart(data);
      onCarPartCreated();
      onClose();
    } catch (err) {
      console.error("Lỗi tạo phụ tùng:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">
          {t("manage_carpart.create_carpart.title")}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Input Tên phụ tùng */}
          <div className="mb-3">
            <input
              type="text"
              {...register("partName")}
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              placeholder={t("manage_carpart.create_carpart.name")}
            />
            {errors.partName && (
              <p className="text-red-500 text-sm">{errors.partName.message}</p>
            )}
          </div>

          {/* Dropdown Chọn danh mục */}
          <div className="mb-3">
            <select
              {...register("carPartCategoryId")}
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            >
              <option value="">
                {t("manage_carpart.create_carpart.select_category")}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.partCategory}
                </option>
              ))}
            </select>
            {errors.carPartCategoryId && (
              <p className="text-red-500 text-sm">
                {errors.carPartCategoryId.message}
              </p>
            )}
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              onClick={onClose}
              disabled={isSubmitting}
            >
              {t("manage_carpart.cancel")}
            </button>
            {sAccount.value.role === "Administrator" && (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    {t("manage_carpart.saving")}
                  </>
                ) : (
                  t("manage_carpart.save")
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
