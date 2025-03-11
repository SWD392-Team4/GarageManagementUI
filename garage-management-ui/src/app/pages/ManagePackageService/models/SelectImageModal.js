import React, { useState } from "react";

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
                <h2 className="text-lg font-bold mb-4">Select Images</h2>
                <input type="file" multiple accept="image/*" onChange={handleFileChange} className="border p-2 w-full mb-4" />

                <div className="grid grid-cols-3 gap-4">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="border p-2 rounded-lg relative">
                            <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded" />
                            <p className="text-sm mt-2 truncate">{file.name}</p>
                            <button
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs">
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2">Cancel</button>
                    <button onClick={handleConfirm} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Confirm</button>
                </div>
            </div>
        </div>
    );
}
