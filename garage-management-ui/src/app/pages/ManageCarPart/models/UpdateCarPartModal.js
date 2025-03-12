import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { updateCarPart } from "../services/CarPartService";
import { getAllCarPartCate } from "../services/CarPartService";

export default function UpdateCarPartModal({ isOpen, onClose, carPart, onCarPartUpdated }) {
    const [formData, setFormData] = useState({
        id: "",
        carPartCategoryId: "",
        partName: "",
        status: "Active",
        createdAt: "",
        updatedAt: "",
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Gọi API để lấy danh mục phụ tùng
        const fetchCategories = async () => {
            const response = await getAllCarPartCate();
            if (response) {
                setCategories(response);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (carPart) {
            setFormData({
                id: carPart.id || "",
                carPartCategoryId: carPart.carPartCategoryId || "",
                partName: carPart.partName || "",
                status: carPart.status || "Active",
                createdAt: carPart.createdAt || "",
                updatedAt: carPart.updatedAt || "",
            });
        }
    }, [carPart]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCarPart(formData.id, {
                carPartCategoryId: formData.carPartCategoryId,
                partName: formData.partName,
                status: formData.status,
                createdAt: carPart.createdAt,
                updatedAt: carPart.updatedAt,
                partCategory: carPart.partCategory
            });
            onCarPartUpdated();
            onClose();
        } catch (error) {
            console.error("Error updating car part:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                {/* Tiêu đề */}
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-lg font-semibold text-black">Cập nhật phụ tùng</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Danh mục phụ tùng */}
                    <div>
                        <label className="block text-black">Danh mục phụ tùng</label>
                        <select
                            name="carPartCategoryId"
                            value={formData.carPartCategoryId}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-black bg-white"
                            required
                        >
                            <option value="" >Chọn danh mục</option>
                            {/* <option value="" >{carPart.PartCategory}</option> */}
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.partCategory}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tên phụ tùng */}
                    <div>
                        <label className="block text-black">Tên phụ tùng</label>
                        <input
                            type="text"
                            name="PartName"
                            value={formData.partName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-black bg-white"
                            required
                        />
                    </div>

                    {/* Trạng thái */}
                    <div>
                        <label className="block text-black">Trạng thái</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-black bg-white"
                        >
                            <option value="Active">Hoạt động</option>
                            <option value="Inactive">Không hoạt động</option>
                        </select>
                    </div>

                    {/* Ngày tạo (không chỉnh sửa) */}
                    <div>
                        <label className="block text-gray-600">Ngày tạo</label>
                        <input
                            type="text"
                            value={formData.createdAt}
                            className="w-full p-2 border rounded bg-gray-200 text-gray-700"
                            readOnly
                        />
                    </div>

                    {/* Ngày cập nhật (không chỉnh sửa) */}
                    <div>
                        <label className="block text-gray-600">Ngày cập nhật</label>
                        <input
                            type="text"
                            value={formData.updatedAt}
                            className="w-full p-2 border rounded bg-gray-200 text-gray-700"
                            readOnly
                        />
                    </div>

                    {/* Nút Hủy & Lưu */}
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded">
                            Hủy
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
