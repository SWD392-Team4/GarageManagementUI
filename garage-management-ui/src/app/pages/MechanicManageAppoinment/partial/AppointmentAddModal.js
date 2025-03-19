import React, { useState, useRef } from "react";

function AppointmentAddModal({ onClose, onSave }) {
  const [serviceData, setServiceData] = useState({
    id: "",
    serviceName: "",
    isFromPackage: false,
    serviceNote: "",
    status: "upcoming",
    price: "",
    estimatedHours: "",
    imagesBefore: [],
    imagesAfter: [],
    appointmentReplacementParts: [],
  });

  const fileInputBeforeRef = useRef(null);
  const fileInputAfterRef = useRef(null);

  const handleChange = (field, value) => {
    setServiceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBeforeImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setServiceData((prev) => ({
          ...prev,
          imagesBefore: [...(prev.imagesBefore || []), reader.result],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAfterImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setServiceData((prev) => ({
          ...prev,
          imagesAfter: [...(prev.imagesAfter || []), reader.result],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBeforeImage = (index) => {
    setServiceData((prev) => ({
      ...prev,
      imagesBefore: (prev.imagesBefore || []).filter((_, i) => i !== index),
    }));
  };

  const handleRemoveAfterImage = (index) => {
    setServiceData((prev) => ({
      ...prev,
      imagesAfter: (prev.imagesAfter || []).filter((_, i) => i !== index),
    }));
  };

  const handleSaveClick = () => {
    onSave(serviceData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-sm p-5 rounded shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-800 text-center">
          Tạo mới Service
        </h2>
        <div className="space-y-2">
          <div>
            <label className="font-semibold">Tên dịch vụ:</label>
            <input
              type="text"
              value={serviceData.serviceName}
              onChange={(e) => handleChange("serviceName", e.target.value)}
              className="w-full border rounded p-1"
            />
          </div>
          <div>
            <label className="font-semibold">Is From Package:</label>
            <input
              type="checkbox"
              checked={serviceData.isFromPackage}
              onChange={(e) => handleChange("isFromPackage", e.target.checked)}
            />
          </div>
          <div>
            <label className="font-semibold">Estimated Hours:</label>
            <input
              type="number"
              value={serviceData.estimatedHours}
              onChange={(e) => handleChange("estimatedHours", e.target.value)}
              className="w-full border rounded p-1"
            />
          </div>
          <div>
            <label className="font-semibold">Ghi chú dịch vụ:</label>
            <textarea
              value={serviceData.serviceNote}
              onChange={(e) => handleChange("serviceNote", e.target.value)}
              className="w-full border rounded p-1"
            />
          </div>
          {/* Các trường khác có thể thêm tương tự nếu cần */}
        </div>

        {/* Phần ảnh */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* Ảnh Before */}
          <div>
            <p className="font-semibold">Ảnh Before</p>
            <div className="flex flex-wrap gap-2">
              {(serviceData.imagesBefore || []).map((url, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={url}
                    alt={`before-${idx}`}
                    className="w-20 h-20 border"
                  />
                  <button
                    onClick={() => handleRemoveBeforeImage(idx)}
                    className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                onClick={() => fileInputBeforeRef.current.click()}
                className="w-20 h-20 border flex items-center justify-center bg-gray-200"
              >
                + Add
              </button>
              <input
                type="file"
                ref={fileInputBeforeRef}
                className="hidden"
                accept="image/*"
                onChange={handleBeforeImageChange}
              />
            </div>
          </div>

          {/* Ảnh After */}
          <div>
            <p className="font-semibold">Ảnh After</p>
            <div className="flex flex-wrap gap-2">
              {(serviceData.imagesAfter || []).map((url, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={url}
                    alt={`after-${idx}`}
                    className="w-20 h-20 border"
                  />
                  <button
                    onClick={() => handleRemoveAfterImage(idx)}
                    className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                onClick={() => fileInputAfterRef.current.click()}
                className="w-20 h-20 border flex items-center justify-center bg-gray-200"
              >
                + Add
              </button>
              <input
                type="file"
                ref={fileInputAfterRef}
                className="hidden"
                accept="image/*"
                onChange={handleAfterImageChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSaveClick}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Tạo Service
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentAddModal;
