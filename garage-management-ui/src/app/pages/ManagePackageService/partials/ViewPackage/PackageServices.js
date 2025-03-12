import React from "react";
import { useTranslation } from "react-i18next";

export default function PackageServices({ services, handleRemoveService, handleAddService }) {
    const { t, i8ln } = useTranslation("manage_package");
    return (
        <div className="mt-6 border p-6 rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-4 flex justify-between items-center">
                {t("manage_package.services.title")}
                <button
                    type="button"
                    onClick={handleAddService}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    + {t("manage_package.services.add_service")}
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
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">{t("manage_package.services.no_services")}</p>
            )}
        </div>
    );
}
