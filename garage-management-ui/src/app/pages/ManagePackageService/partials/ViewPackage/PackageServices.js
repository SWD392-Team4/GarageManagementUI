import React from "react";

export default function PackageServices({ services, handleRemoveService, handleAddService }) {
    return (
        <div className="mt-6 border p-6 rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-4 flex justify-between items-center">
                Dịch vụ trong gói
                <button
                type="button"
                    onClick={handleAddService}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    + Thêm dịch vụ
                </button>
            </h2>

            {services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                        <div key={service.id} className="border p-4 rounded-lg bg-gray-50 relative">
                            {/* Nút xóa dịch vụ */}
                            <button
                                onClick={() => handleRemoveService(service.id)}
                                className="absolute top-2 right-2 text-red-500 text-lg font-bold hover:text-red-700"
                            >
                                ❌
                            </button>

                            <p className="text-lg font-semibold">{service.serviceName}</p>
                            <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                                <p><span className="font-semibold">Danh mục:</span> {service.serviceCategory}</p>
                                <p><span className="font-semibold">Bộ phận xe:</span> {service.carPart}</p>
                                <p><span className="font-semibold">Loại xe:</span> {service.carCategory}</p>
                                <p><span className="font-semibold">Tính chất công việc:</span> {service.workNature}</p>
                                <p><span className="font-semibold">Hành động:</span> {service.action}</p>
                                <p><span className="font-semibold">Thời gian dự kiến:</span> {service.estimatedHours} giờ</p>
                                <p><span className="font-semibold">Trạng thái:</span> {service.status === 0 ? "Không hoạt động" : "Hoạt động"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">Gói này chưa có dịch vụ nào.</p>
            )}
        </div>
    );
}
