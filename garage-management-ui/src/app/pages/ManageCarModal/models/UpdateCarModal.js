import React, { useState, useEffect } from "react";
import {
  getAllBrand,
  getAllCarCategory,
  updateCarModal,
} from "../services/carModalService";
import { sAccount } from "../../AuthCustomer/services/store";

export default function UpdateCarModal({
  isOpen,
  onClose,
  carModel,
  onCarModelUpdated,
}) {
  const [formData, setFormData] = useState({
    id: "",
    modelName: "",
    modelYear: "",
    brandId: "",
    carCategoryId: "",
    createdAt: "",
    updatedAt: "",
    status: "",
  });

  const [brands, setBrands] = useState([]);
  const [carCategories, setCarCategories] = useState([]);

  useEffect(() => {
    if (isOpen) {
      // Gọi API lấy danh sách thương hiệu và danh mục xe
      const loadData = async () => {
        const brandsData = await getAllBrand();
        const carCategoriesData = await getAllCarCategory();
        setBrands(brandsData || []);
        setCarCategories(carCategoriesData || []);
      };

      loadData();

      // Nếu có dữ liệu xe, cập nhật vào form
      if (carModel) {
        setFormData({
          id: carModel.id || "",
          modelName: carModel.modelName || "",
          modelYear: carModel.modelYear || "",
          brandId: carModel.brandId || "",
          carCategoryId: carModel.carCategoryId || "",
          createdAt: carModel.createdAt || "",
          updatedAt: carModel.updatedAt || "",
          brandName: carModel.brandName,
          carCategory: carModel.carCategory,
          Status: carModel.status,
        });
      }
    }
  }, [isOpen, carModel]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCarModal(formData.id, formData);
      onCarModelUpdated();
      onClose();
    } catch (error) {
      console.error("⚠️ Error updating car model:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Cập nhật mẫu xe</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium">ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Tên mẫu xe</label>
            <input
              type="text"
              name="modelName"
              value={formData.modelName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Năm sản xuất</label>
            <input
              type="text"
              name="modelYear"
              value={formData.modelYear}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Ngày tạo</label>
            <input
              type="text"
              name="createdAt"
              value={formData.createdAt}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Ngày cập nhật</label>
            <input
              type="text"
              name="updatedAt"
              value={formData.updatedAt}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>

          {/* Thương hiệu */}
          <div>
            <label className="block text-sm font-medium">Thương hiệu</label>
            <select
              name="brandId"
              value={formData.brandId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              {/* Hiển thị mặc định theo `carModel` */}
              <option value={carModel?.brandId}>
                {carModel?.brandName || "Chọn thương hiệu"}
              </option>

              {/* Danh sách thương hiệu từ API */}
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.brandName}
                </option>
              ))}
            </select>
          </div>

          {/* Danh mục xe */}
          <div>
            <label className="block text-sm font-medium">Danh mục xe</label>
            <select
              name="carCategoryId"
              value={formData.carCategoryId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              {/* Hiển thị mặc định theo `carModel` */}
              <option value={carModel?.carCategoryId}>
                {carModel?.carCategory || "Chọn danh mục xe"}
              </option>

              {/* Danh sách danh mục xe từ API */}
              {carCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>

          {/* Trạng thái (Status) */}
          <div>
            <label className="block text-sm font-medium">Trạng thái</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={onClose}
            >
              Đóng
            </button>
            {sAccount.value.role === "Administrator" && (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
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
