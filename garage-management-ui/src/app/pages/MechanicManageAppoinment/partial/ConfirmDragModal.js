import React from "react";

function ConfirmDragModal({
  sourceStatus,
  destinationStatus,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <p className="mb-4">
          Xác nhận chuyển trạng thái từ <strong>{sourceStatus}</strong> sang{" "}
          <strong>{destinationStatus}</strong>?
        </p>
        <div className="flex justify-end space-x-3">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={onConfirm}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDragModal;
