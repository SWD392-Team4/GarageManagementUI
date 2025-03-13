import React, { useEffect, useState } from "react";
import { getAllService } from "../services/PackageServiceAPI";
import { FaCheckCircle, FaSearch, FaTimes } from "react-icons/fa";

export default function SelectServiceModal({ isOpen, onClose, onSelect, selectedServices, onServiceDetailsSelect }) {
    const [services, setServices] = useState([]);
    const [selected, setSelected] = useState(selectedServices || []);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchServices() {
            try {
                const response = await getAllService();
                setServices(response?.data?.value || []);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        }
        if (isOpen) {
            fetchServices();
        }
    }, [isOpen]);

    const toggleServiceSelection = (serviceId) => {
        setSelected((prevSelected) =>
            prevSelected.includes(serviceId)
                ? prevSelected.filter((id) => id !== serviceId)
                : [...prevSelected, serviceId]
        );
    };

    const handleConfirm = () => {
        onSelect(selected); // Giữ nguyên logic chọn dịch vụ
        // Lọc thông tin dịch vụ đã chọn
        const selectedDetails = services.filter((service) => selected.includes(service.id));
        onServiceDetailsSelect(selectedDetails); // Lưu thông tin chi tiết của dịch vụ
        onClose();
    };

    // Lọc danh sách theo từ khóa tìm kiếm (nếu API hỗ trợ search, thay thế bằng API call)
    const filteredServices = services.filter(service =>
        service.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.serviceCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.carCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-2/3 max-h-[80vh] overflow-y-auto">

                {/* Nút đóng modal */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                >
                    <FaTimes size={18} />
                </button>

                {/* Header */}
                <h2 className="text-lg font-bold mb-4">Select Services</h2>

                {/* Ô tìm kiếm */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search services..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-4 pl-10 focus:ring focus:ring-blue-200"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-500" />
                </div>

                {/* Danh sách dịch vụ */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredServices.length > 0 ? filteredServices.map((service) => (
                        <div
                            key={service.id}
                            className={`relative border p-4 rounded-lg cursor-pointer transition hover:shadow-md ${selected.includes(service.id) ? "bg-blue-100 border-blue-500" : "bg-white"
                                }`}
                            onClick={() => toggleServiceSelection(service.id)}
                        >
                            {/* Dấu chọn */}
                            {selected.includes(service.id) && (
                                <FaCheckCircle className="absolute top-2 right-2 text-blue-500" />
                            )}

                            {/* Tiêu đề dịch vụ */}
                            <h3 className="text-gray-800 font-semibold mb-2">{service.serviceName}</h3>

                            {/* Grid nội dung trong card */}
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <p className="text-gray-600"><b>Category:</b> {service.serviceCategory}</p>
                                <p className="text-gray-600"><b>Car Type:</b> {service.carCategory}</p>
                                <p className="text-gray-600"><b>Car Part:</b> {service.carPart}</p>
                                <p className="text-gray-600"><b>Work Nature:</b> {service.workNature}</p>
                                <p className="text-gray-600"><b>Action:</b> {service.action}</p>
                                <p className="text-gray-600"><b>Estimated Hours:</b> {service.estimatedHours} hrs</p>
                                <p className={`font-semibold ${service.status === 0 ? "text-red-500" : "text-green-600"}`}>
                                    {service.status === 0 ? "Inactive" : "Active"}
                                </p>
                                <p className="font-semibold text-green-600">
                                    {service.price ? `${service.price}` : <span className="text-red-500">Price Not Set</span>}
                                </p>
                            </div>
                        </div>
                    )) : (
                        <p className="text-gray-500 text-center py-4">No services found.</p>
                    )}
                </div>

                {/* Nút hành động */}
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className={`px-4 py-2 rounded-lg text-white transition ${selected.length > 0 ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
                            }`}
                        disabled={selected.length === 0}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
