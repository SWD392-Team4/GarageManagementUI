import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { updateSupplier } from "../services/SupplierService"; // Gọi API update

export default function UpdateSupplierModal({ isOpen, onClose, supplier, onSupplierUpdated }) {
    const { t } = useTranslation("manage_supplier");
    const [isEditing, setIsEditing] = useState(false);

    // useForm để quản lý form
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    // Khi modal mở, set giá trị mặc định
    useEffect(() => {
        if (supplier) {
            reset({
                name: supplier.name || "",
                taxCode: supplier.taxCode || "",
                address: supplier.address || "",
                province: supplier.province || "",
                district: supplier.district || "",
                wards: supplier.wards || "",
                supplierCategory: supplier.supplierCategory || "",
                createdAt: supplier.createdAt || "",
                updatedAt: supplier.updatedAt || "",
            });
        }
    }, [supplier, reset]);

    const onSubmit = async (data) => {
        try {
            await updateSupplier(supplier.id, data);
            onSupplierUpdated(); // Refresh danh sách nhà cung cấp
            setIsEditing(false); // Tắt chế độ chỉnh sửa
            onClose(); // Đóng modal
        } catch (error) {
            console.error("Error updating supplier:", error);
        }
    };

    // Hủy chỉnh sửa, quay lại trạng thái ban đầu
    const handleCancelEdit = () => {
        reset(); // Khôi phục dữ liệu ban đầu
        setIsEditing(false); // Tắt chế độ chỉnh sửa
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">{t("manage_supplier.edit")}</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">{t("manage_supplier.name")}</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            disabled={!isEditing}
                            className={`p-2 border rounded-md ${isEditing ? "bg-white" : "bg-gray-100"}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{t("manage_supplier.required")}</p>}
                    </div>

                    {/* Tax Code */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">{t("manage_supplier.taxCode")}</label>
                        <input
                            type="text"
                            {...register("taxCode", { required: true })}
                            disabled={!isEditing}
                            className={`p-2 border rounded-md ${isEditing ? "bg-white" : "bg-gray-100"}`}
                        />
                        {errors.taxCode && <p className="text-red-500 text-sm">{t("manage_supplier.required")}</p>}
                    </div>

                    {/* Address */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">{t("manage_supplier.address")}</label>
                        <input
                            type="text"
                            {...register("address", { required: true })}
                            disabled={!isEditing}
                            className={`p-2 border rounded-md ${isEditing ? "bg-white" : "bg-gray-100"}`}
                        />
                        {errors.address && <p className="text-red-500 text-sm">{t("manage_supplier.required")}</p>}
                    </div>

                    {/* Province */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">{t("manage_supplier.province")}</label>
                        <input
                            type="text"
                            {...register("province", { required: true })}
                            disabled={!isEditing}
                            className={`p-2 border rounded-md ${isEditing ? "bg-white" : "bg-gray-100"}`}
                        />
                        {errors.province && <p className="text-red-500 text-sm">{t("manage_supplier.required")}</p>}
                    </div>

                    {/* District */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">{t("manage_supplier.district")}</label>
                        <input
                            type="text"
                            {...register("district", { required: true })}
                            disabled={!isEditing}
                            className={`p-2 border rounded-md ${isEditing ? "bg-white" : "bg-gray-100"}`}
                        />
                        {errors.district && <p className="text-red-500 text-sm">{t("manage_supplier.required")}</p>}
                    </div>

                    {/* Wards */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">{t("manage_supplier.wards")}</label>
                        <input
                            type="text"
                            {...register("wards", { required: true })}
                            disabled={!isEditing}
                            className={`p-2 border rounded-md ${isEditing ? "bg-white" : "bg-gray-100"}`}
                        />
                        {errors.wards && <p className="text-red-500 text-sm">{t("manage_supplier.required")}</p>}
                    </div>

                    {/* Supplier Category */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">{t("manage_supplier.supplierCategory")}</label>
                        <input
                            type="text"
                            {...register("supplierCategory", { required: true })}
                            disabled={!isEditing}
                            className={`p-2 border rounded-md ${isEditing ? "bg-white" : "bg-gray-100"}`}
                        />
                        {errors.supplierCategory && <p className="text-red-500 text-sm">{t("manage_supplier.required")}</p>}
                    </div>

                    {/* CreatedAt */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">{t("manage_supplier.createdAt")}</label>
                        <input
                            type="text"
                            {...register("createdAt")}
                            disabled
                            className="p-2 border rounded-md bg-gray-100"
                        />
                    </div>

                    {/* UpdatedAt */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">{t("manage_supplier.updatedAt")}</label>
                        <input
                            type="text"
                            {...register("updatedAt")}
                            disabled
                            className="p-2 border rounded-md bg-gray-100"
                        />
                    </div>
                </form>

                {/* Action Buttons */}
                <div className="flex justify-between mt-4">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleCancelEdit}
                                className="px-4 py-2 bg-gray-300 rounded-md"
                            >
                                {t("manage_supplier.cancel")}
                            </button>
                            <button
                                onClick={handleSubmit(onSubmit)}
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                {t("manage_supplier.save")}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                        >
                            {t("manage_supplier.edit")}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
