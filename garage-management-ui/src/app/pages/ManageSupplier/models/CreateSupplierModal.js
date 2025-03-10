import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { creatSupplier } from "../services/SupplierService";

export default function CreateSupplierModal({ isOpen, onClose, onSupplierCreated }) {
  if (!isOpen) return null;

  const { t } = useTranslation("manage_supplier");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await creatSupplier(data);
      onSupplierCreated(); // Refresh danh sách nhà cung cấp
      reset(); // Xóa dữ liệu trong form
      onClose(); // Đóng modal
    } catch (error) {
      console.error("Error creating supplier:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{t("manage_supplier.create")}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">{t("manage_supplier.name")}</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="p-2 border rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{t("manage_supplier.required")}</p>}
          </div>

          {/* Tax Code */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">{t("manage_supplier.taxCode")}</label>
            <input
              type="text"
              {...register("taxCode", { required: true })}
              className="p-2 border rounded-md"
            />
            {errors.taxCode && <p className="text-red-500 text-sm">{t("manage_supplier.required")}</p>}
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">{t("manage_supplier.address")}</label>
            <input
              type="text"
              {...register("address", { required: true })}
              className="p-2 border rounded-md"
            />
            {errors.address && <p className="text-red-500 text-sm">{t("manage_supplier.required")}</p>}
          </div>

          {/* Province */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">{t("manage_supplier.province")}</label>
            <input
              type="text"
              {...register("province", { required: true })}
              className="p-2 border rounded-md"
            />
            {errors.province && <p className="text-red-500 text-sm">{t("manage_supplier.required")}</p>}
          </div>

          {/* District */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">{t("manage_supplier.district")}</label>
            <input
              type="text"
              {...register("district", { required: true })}
              className="p-2 border rounded-md"
            />
            {errors.district && <p className="text-red-500 text-sm">{t("manage_supplier.required")}</p>}
          </div>

          {/* Wards */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">{t("manage_supplier.wards")}</label>
            <input
              type="text"
              {...register("wards", { required: true })}
              className="p-2 border rounded-md"
            />
            {errors.wards && <p className="text-red-500 text-sm">{t("manage_supplier.required")}</p>}
          </div>

          {/* Supplier Category */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">{t("manage_supplier.supplierCategory")}</label>
            <input
              type="text"
              {...register("supplierCategory", { required: true })}
              className="p-2 border rounded-md"
            />
            {errors.supplierCategory && <p className="text-red-500 text-sm">{t("manage_supplier.required")}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              {t("manage_supplier.cancel")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {isSubmitting ? t("manage_supplier.creating") : t("manage_supplier.create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
