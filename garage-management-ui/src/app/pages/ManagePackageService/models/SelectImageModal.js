import React, { useState } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";

export default function SelectImageModal({ isOpen, onClose, onSelect }) {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    };

    const handleRemoveImage = (index) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleConfirm = () => {
        if (selectedFiles.length > 0) {
            onSelect(selectedFiles);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Select Images</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 transition"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* Upload Input */}
                <label className="block border-2 border-dashed border-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-100 transition">
                    <span className="text-gray-600">Click to upload images</span>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                {/* Hiển thị danh sách ảnh */}
                {selectedFiles.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="relative border rounded-lg overflow-hidden bg-gray-100 shadow hover:shadow-md transition">
                                <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} className="w-full h-24 object-cover" />
                                <p className="text-xs text-gray-600 text-center mt-1 truncate">{file.name}</p>

                                {/* Nút Xóa hình ảnh */}
                                <button
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs hover:bg-red-600 transition"
                                >
                                    <FaTrash size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Button Actions */}
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600 transition">Cancel</button>
                    <button onClick={handleConfirm} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Confirm</button>
                </div>
            </div>
        </div>
    );
}
