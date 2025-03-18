import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { formatVietnameseCurrency } from "../../ManageGoodsIssued/schemas/GoodsIssuedSchemas";

// Modal mở từ trên xuống
const UpdateServiceModal = ({ isOpen, onClose, services, appointmentId }) => {
  const { t } = useTranslation("appoinment-admin");
  // state để theo dõi service đang được chỉnh sửa (dựa theo id)
  const [editingServiceId, setEditingServiceId] = useState(null);
  // state lưu dữ liệu form cho service đang được chỉnh sửa
  const [formData, setFormData] = useState({});

  // Khi nhấn edit, chuyển hàng đó sang chế độ chỉnh sửa
  const handleEditClick = (service) => {
    setEditingServiceId(service.id);
    setFormData({
      serviceNote: service.serviceNote || "",
      price: service.price || 0,
    });
  };

  // Hủy chỉnh sửa: reset state và quay về hiển thị bình thường
  const handleCancelEdit = () => {
    setEditingServiceId(null);
    setFormData({});
  };

  // Xử lý thay đổi input trong form inline
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý gửi request cập nhật cho 1 service
  const handleUpdateService = async (serviceId) => {
    // Ví dụ: gọi API updateService với formData
    console.log("Updating service", serviceId, formData);
    // await updateService(serviceId, formData);
    // Sau khi update thành công, quay lại hiển thị hàng bình thường
    setEditingServiceId(null);
    setFormData({});
  };

  // Xử lý gửi request xóa cho 1 service
  const handleDeleteService = async (serviceId) => {
    // Ví dụ: gọi API deleteService
    console.log("Deleting service", serviceId);
    // await deleteService(serviceId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start pt-10 transition-all duration-300">
      <div className="bg-white w-full max-w-4xl rounded shadow-lg overflow-auto">
        {/* Header của modal */}
        <div className="p-4 border-b border-gray-300 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {t("updateServiceModal.title", "Update Services")}
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 font-bold hover:underline"
          >
            {t("common.close", "Close")}
          </button>
        </div>
        {/* Nội dung modal: bảng hiển thị service */}
        <div className="p-4">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 border-b border-gray-300 uppercase text-xs font-medium text-gray-700">
              <tr>
                <th scope="col" className="px-4 py-3 text-left">
                  {t("tableHeaders.stt", "STT")}
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  {t("tableHeaders.serviceName", "Service Name")}
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  {t("tableHeaders.serviceNote", "Service Note")}
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  {t("tableHeaders.priceService", "Service Price")}
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  {t("tableHeaders.action", "Action")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((service, index) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap">{index + 1}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {service.serviceName}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {editingServiceId === service.id ? (
                      <input
                        type="text"
                        name="serviceNote"
                        value={formData.serviceNote}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      service.serviceNote || "N/A"
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {editingServiceId === service.id ? (
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      formatVietnameseCurrency(service.price)
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {editingServiceId === service.id ? (
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleUpdateService(service.id)}
                          className="text-green-500 hover:underline"
                        >
                          {t("buttons.save", "Save")}
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="text-gray-500 hover:underline"
                        >
                          {t("buttons.cancel", "Cancel")}
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleEditClick(service)}
                          className="text-blue-500 hover:underline"
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteService(service.id)}
                          className="text-red-500 hover:underline"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UpdateServiceModal;
