import React, { useState } from "react";
import { createImagePackage, createImagePackageUpdate, deteleImagePackage } from "../../services/PackageServiceAPI";
import { FaTrash, FaPlus } from "react-icons/fa";

export default function PackageImages({ packageImages, setPackageImages, packageId }) {
    const [isUploading, setIsUploading] = useState(false);
    const [previewImages, setPreviewImages] = useState([]); // ✅ State lưu ảnh preview

    console.log("check thong tin: ", packageId);

    // **Xóa ảnh**
    const handleDeleteImage = async (imageId) => {
        console.log("ID ảnh cần xóa:", imageId);
        console.log("Danh sách ảnh hiện tại:", packageImages);
        if (!packageId) {
            // Nếu chưa có packageId, chỉ xóa ảnh preview
            setPreviewImages((prev) => prev.filter((img) => img.id !== imageId));
            return;
        }

        try {
            const isDeleted = await deteleImagePackage(packageId, imageId);
            if (isDeleted) {
                setPackageImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
            }
        } catch (error) {
            console.error("Lỗi khi xóa ảnh:", error);
        }
    };

    // **Xử lý chọn ảnh - Chỉ preview, không gửi lên server ngay**
    const handleSelectImage = (event) => {
        const files = event.target.files;

        console.log("📥 File được chọn từ input:", files); // ✅ Kiểm tra file đầu vào

        if (!files || files.length === 0) {
            console.error("❌ Không có file nào được chọn!");
            return;
        }

        const newPreviews = [];
        for (const file of files) {
            console.log("✅ File đang xử lý:", file); // ✅ Kiểm tra từng file

            newPreviews.push({
                id: Math.random().toString(36).substr(2, 9), // Tạo ID tạm thời
                imageLink: URL.createObjectURL(file),
                file, // Lưu file gốc để gửi sau
            });
        }

        setPreviewImages((prev) => {
            const updatedPreviews = [...prev, ...newPreviews];
            console.log("📸 Danh sách ảnh preview sau khi chọn:", updatedPreviews);
            return updatedPreviews;
        });
    };


    const handleUploadImages = async () => {
        if (!packageId) {
            console.error("❌ Không có packageId, không thể tải ảnh lên!");
            return;
        }

        if (previewImages.length === 0) {
            console.error("❌ Không có ảnh nào để tải lên!");
            return;
        }

        console.log("📸 Danh sách ảnh trước khi gửi:", previewImages);

        const formData = new FormData();
        previewImages.forEach((img) => {
            formData.append("formFileDtos", img.file, img.file.name);
        });

        console.log("📦 Dữ liệu `FormData` trước khi gửi:", [...formData.entries()]); // ✅ Kiểm tra dữ liệu FormData

        setIsUploading(true);
        try {
            await createImagePackageUpdate(packageId, formData);
            setPackageImages((prev) => [...prev, ...previewImages]);
            setPreviewImages([]); // ✅ Xóa ảnh preview sau khi gửi
        } catch (error) {
            console.error("Lỗi khi tải ảnh lên:", error);
        } finally {
            setIsUploading(false);
        }
    };


    return (
        <div className="border p-6 rounded-lg shadow-md bg-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Hình ảnh gói</h2>

                {/* Nút chọn ảnh */}
                <label className="cursor-pointer bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center gap-2">
                    <FaPlus />
                    Thêm ảnh
                    <input type="file" accept="image/*" multiple onChange={handleSelectImage} className="hidden" />
                </label>
            </div>

            {/* Hiển thị ảnh preview */}
            {previewImages.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-md font-semibold mb-2">Ảnh xem trước</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {previewImages.map((img) => (
                            <div key={img.id} className="relative group">
                                <img
                                    src={img.imageLink}
                                    alt="Preview"
                                    className="w-full h-40 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
                                />
                                {/* Nút xóa ảnh preview */}
                                <button
                                    onClick={() => setPreviewImages((prev) => prev.filter((i) => i.id !== img.id))}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Hiển thị danh sách ảnh đã có trên server */}
            {packageImages.length > 0 ? (
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {packageImages.map((img) => (
                        <div key={img.id} className="relative group">
                            <img
                                src={img.imageLink}
                                alt="Package"
                                className="w-full h-40 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
                            />
                            {/* Nút xóa ảnh */}
                            <button
                                onClick={() => handleDeleteImage(img.id)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">Không có hình ảnh.</p>
            )}

            {/* Nút tải ảnh lên server */}
            {previewImages.length > 0 && (
                <div className="mt-4 text-center">
                    <button
                        onClick={handleUploadImages}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        disabled={isUploading}
                    >
                        {isUploading ? "Đang tải lên..." : "Tải ảnh lên"}
                    </button>
                </div>
            )}
        </div>

    );
}
