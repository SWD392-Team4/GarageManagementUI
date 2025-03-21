import React from "react";

function AppointmentAddModal({ onClose }) {
  const handleSaveClick = () => {};

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
          Thêm Service
        </h2>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSaveClick}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Thêm services
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentAddModal;
