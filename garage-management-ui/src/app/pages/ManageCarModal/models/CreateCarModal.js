import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createCarModal,
  getAllBrand,
  getAllCarCategory,
} from "../services/carModalService";

export default function CreateCarModal({ isOpen, onClose, onCarModal }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [brands, setBrands] = useState([]);
  const [carCategories, setCarCategories] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchBrands();
      fetchCarCategories();
    }
  }, [isOpen]);

  const fetchBrands = async () => {
    const data = await getAllBrand();
    if (data) setBrands(data);
  };

  const fetchCarCategories = async () => {
    const data = await getAllCarCategory();
    if (data) setCarCategories(data);
  };

  const onSubmit = async (data) => {
    // Định dạng `modelYear` thành `yyyy/MM/dd`
    const formattedModelYear = `${String(data.year).padStart(4, "0")}-${String(
      data.month
    ).padStart(2, "0")}-${String(data.day).padStart(2, "0")}`;

    const response = await createCarModal({
      brandId: data.brandId,
      carCategoryId: data.carCategoryId,
      modelName: data.modelName,
      modelYear: formattedModelYear,
    });

    if (response) {
      onCarModal();
      reset();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Thêm xe mới</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Select Brand */}
          <label className="block mb-2">Thương hiệu</label>
          <select
            {...register("brandId", { required: true })}
            className="w-full p-2 border rounded mb-3"
          >
            <option value="">Chọn thương hiệu</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.brandName}
              </option>
            ))}
          </select>
          {errors.brandId && <p className="text-red-500">Bắt buộc</p>}

          {/* Select Car Category */}
          <label className="block mb-2">Danh mục xe</label>
          <select
            {...register("carCategoryId", { required: true })}
            className="w-full p-2 border rounded mb-3"
          >
            <option value="">Chọn danh mục xe</option>
            {carCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category}
              </option>
            ))}
          </select>
          {errors.carCategoryId && <p className="text-red-500">Bắt buộc</p>}

          {/* Model Name */}
          <label className="block mb-2">Tên mẫu xe</label>
          <input
            type="text"
            {...register("modelName", { required: true })}
            className="w-full p-2 border rounded mb-3"
          />
          {errors.modelName && <p className="text-red-500">Bắt buộc</p>}

          {/* Model Year */}
          <label className="block mb-2">Năm sản xuất</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Ngày"
              {...register("day", { required: true })}
              className="w-1/3 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Tháng"
              {...register("month", { required: true })}
              className="w-1/3 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Năm"
              {...register("year", { required: true })}
              className="w-1/3 p-2 border rounded"
            />
          </div>
          {(errors.year || errors.month || errors.day) && (
            <p className="text-red-500">Bắt buộc</p>
          )}

          {/* Buttons */}
          <div className="flex justify-end mt-4 space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
