import React, { useState, useEffect } from "react";

export default function UpdateCarModal({ isOpen, onClose, carModel, onCarModelUpdated }) {

  const [formData, setFormData] = useState({
    id: "",
    modelName: "",
    modelYear: "",
    brandId: "",
    carCategoryId: "",
    createdAt: "",
    updatedAt: ""
  });

  useEffect(() => {
    if (isOpen && carModel) {
      setFormData({
        id: carModel.id || "",
        modelName: carModel.modelName || "",
        modelYear: carModel.modelYear || "",
        brandId: carModel.brandId || "",
        carCategoryId: carModel.carCategoryId || "",
        createdAt: carModel.createdAt || "",
        updatedAt: carModel.updatedAt || ""
      });
    }
  }, [isOpen, carModel]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🔄 Updating Car Model:", formData);
    onCarModelUpdated(formData);
    onClose();
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

          <div>
            <label className="block text-sm font-medium">Mã thương hiệu</label>
            <input
              type="text"
              name="brandId"
              value={formData.brandId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Mã danh mục xe</label>
            <input
              type="text"
              name="carCategoryId"
              value={formData.carCategoryId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={onClose}
            >
              Đóng
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
