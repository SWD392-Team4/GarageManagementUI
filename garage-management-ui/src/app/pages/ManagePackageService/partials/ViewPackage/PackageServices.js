import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SelectServiceModal from "../../models/SelectServiceModal";

export default function PackageServices({ services, isEditing, onServicesChange, onAddServiceChange, onRemoveServiceChange }) {
    const { t } = useTranslation("manage_package");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addServices, setAddServices] = useState([]); // Dịch vụ được thêm
    const [removeServices, setRemoveServices] = useState([]); // Dịch vụ bị xóa
    const [displayServices, setDisplayServices] = useState(services); // Danh sách hiển thị
    // Xóa dịch vụ (chuyển vào removeServices hoặc xóa khỏi addServices)
    const handleRemoveService = (serviceId) => {
        if (addServices.includes(serviceId)) {
            setAddServices((prev) => prev.filter((id) => id !== serviceId));
            onAddServiceChange((prev) => prev.filter((id) => id !== serviceId));
        } else {
            setRemoveServices((prev) => [...prev, serviceId]);
            onRemoveServiceChange((prev) => [...prev, serviceId]);
        }
        setDisplayServices((prev) => prev.filter((s) => s.id !== serviceId));
        onServicesChange((prev) => prev.filter((s) => s.id !== serviceId));
    };

    // Thêm dịch vụ mới
    const handleSelectServices = (selectedServiceIds) => {
        const newServices = selectedServiceIds.filter(
            (id) => !displayServices.some((s) => s.id === id)
        );

        setAddServices((prev) => [...prev, ...newServices]);
        onAddServiceChange((prev) => [...prev, ...newServices]);

        setRemoveServices((prev) => prev.filter((id) => !newServices.includes(id)));
        onRemoveServiceChange((prev) => prev.filter((id) => !newServices.includes(id)));
    };

    // Nhận chi tiết dịch vụ
    const handleServiceDetailsSelect = (selectedServiceDetails) => {
        const newServiceDetails = selectedServiceDetails.filter(
            (service) => !displayServices.some((s) => s.id === service.id)
        );

        setDisplayServices((prev) => [...prev, ...newServiceDetails]);
        onServicesChange((prev) => [...prev, ...newServiceDetails]);
    };

    return (
        <div className="mt-6 border p-6 rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-4 flex justify-between items-center">
                {t("manage_package.services.title")}
                {isEditing && (
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="text-blue-500 text-xl hover:text-blue-700"
                    >
                        ➕
                    </button>
                )}
            </h2>

            {displayServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {displayServices.map((service) => {
                        const isNew = addServices.includes(service.id);
                        const isRemoved = removeServices.includes(service.id);

                        return (
                            <div
                                key={service.id}
                                className={`border p-4 rounded-lg relative ${isNew ? "border-green-500 bg-green-50" : ""
                                    } ${isRemoved ? "border-red-500 bg-red-50 opacity-50" : ""}`}
                            >
                                {/* Nút xoá hoặc khôi phục dịch vụ */}
                                {isEditing && (
                                    <button
                                        onClick={() =>
                                            isRemoved
                                                ? handleRestoreService(service.id)
                                                : handleRemoveService(service.id)
                                        }
                                        className={`absolute top-2 right-2 text-xl ${isRemoved
                                            ? "text-green-500 hover:text-green-700"
                                            : "text-red-500 hover:text-red-700"
                                            }`}
                                    >
                                        {isRemoved ? "↩️" : "🗑️"}
                                    </button>
                                )}

                                <p className="text-lg font-semibold">{service.serviceName}</p>
                                <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                                    <p><span className="font-semibold">{t("manage_package.services.service_category")}:</span> {service.serviceCategory}</p>
                                    <p><span className="font-semibold">{t("manage_package.services.car_part")}:</span> {service.carPart}</p>
                                    <p><span className="font-semibold">{t("manage_package.services.car_category")}:</span> {service.carCategory}</p>
                                    <p><span className="font-semibold">{t("manage_package.services.work_nature")}:</span> {service.workNature}</p>
                                    <p><span className="font-semibold">{t("manage_package.services.action")}:</span> {service.action}</p>
                                    <p><span className="font-semibold">{t("manage_package.services.estimated_hours")}:</span> {service.estimatedHours} giờ</p>
                                    <p>
                                        <span className="font-semibold">{t("manage_package.services.status")}:</span>
                                        {service.status === 0
                                            ? t("manage_package.services.status_enum.inactive")
                                            : t("manage_package.services.status_enum.active")}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-gray-500">{t("manage_package.services.no_services")}</p>
            )}

            {/* Modal chọn dịch vụ */}
            <SelectServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleSelectServices}
                onServiceDetailsSelect={handleServiceDetailsSelect}
                selectedServices={[...addServices, ...services.map((s) => s.id)]}
            />
        </div>
    );
}
