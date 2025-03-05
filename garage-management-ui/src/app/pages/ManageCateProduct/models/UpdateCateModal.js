import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { updateCategory } from "../services/CatePService";
import { formatDate } from "../schemas/CateValid";

const schema = yup.object().shape({
    categoryName: yup.string().required("Tên danh mục không được để trống"),
    status: yup.string().oneOf(["active", "inactive"], "Trạng thái không hợp lệ"),
});

export default function UpdateCateModal({ isOpen, onClose, category, onCategoryUpdated }) {
    const { t } = useTranslation("manage_product_category");

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            categoryName: "",
            status: "active",
        },
    });

    useEffect(() => {
        if (category) {
            setValue("categoryName", category.category || "");
            setValue("status", category.Status ? category.status.toLowerCase() : "active");
        } else {
            reset();
        }
    }, [category, setValue, reset]);

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            const updatedCategory = { ...category, ...data };
            await updateCategory(category.id, updatedCategory);
            onCategoryUpdated(updatedCategory);
            onClose();
        } catch (err) {
            console.error("Lỗi cập nhật danh mục:", err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">{t("manage_product_category.edit")}</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* ID (chỉ đọc) */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">ID</label>
                        <input type="text" className="w-full p-2 border rounded bg-gray-200" value={category?.id || ""} readOnly />
                    </div>

                    {/* Tên danh mục */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">{t("manage_product_category.name")}</label>
                        <input
                            type="text"
                            {...register("categoryName")}
                            className="w-full p-2 border rounded"
                        />
                        {errors.categoryName && <p className="text-red-500 text-sm">{errors.categoryName.message}</p>}
                    </div>

                    {/* Trạng thái */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">{t("manage_product_category.status")}</label>
                        <select {...register("status")} className="w-full p-2 border rounded">
                            <option value="active">{t("manage_product_category.active")}</option>
                            <option value="inactive">{t("manage_product_category.inactive")}</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
                    </div>

                    {/* Ngày tạo (chỉ đọc) */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">{t("manage_product_category.createdAt")}</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded bg-gray-200"
                            value={category?.createdAt ? formatDate(category.createdAt) : ""}
                            readOnly
                        />
                    </div>

                    {/* Ngày cập nhật (chỉ đọc) */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">{t("manage_product_category.updatedAt")}</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded bg-gray-200"
                            value={category?.updatedAt ? formatDate(category.updatedAt) : ""}
                            readOnly
                        />
                    </div>

                    {/* Nút hành động */}
                    <div className="flex justify-end space-x-2">
                        <button type="button" className="px-4 py-2 bg-gray-300 rounded-lg" onClick={onClose} disabled={isSubmitting}>
                            {t("manage_product_category.cancel")}
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? t("manage_product_category.saving") : t("manage_product_category.save")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
