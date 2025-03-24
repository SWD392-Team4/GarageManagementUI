import React, { useState, useEffect } from "react";

const StartConfirmModal = ({ onConfirm, onCancel }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Cập nhật preview URLs mỗi khi selectedFiles thay đổi
  useEffect(() => {
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    // Cleanup: revoke URL khi component unmount hoặc khi selectedFiles thay đổi
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemove = (indexToRemove) => {
    setSelectedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleConfirm = async () => {
    if (selectedFiles.length > 0) {
      setIsLoading(true);
      await onConfirm(selectedFiles);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Xác nhận bắt đầu công việc</h2>
        <p className="mb-4">
          Vui lòng chụp ảnh "Before" làm bằng chứng trước khi bắt đầu (có thể
          chọn nhiều ảnh):
        </p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="mb-4"
        />

        {/* Hiển thị danh sách preview ảnh */}
        {previewUrls.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`preview ${index}`}
                  className="w-full h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="mr-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedFiles.length === 0 || isLoading}
            className={`px-4 py-2 rounded ${
              selectedFiles.length === 0 || isLoading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isLoading ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartConfirmModal;
