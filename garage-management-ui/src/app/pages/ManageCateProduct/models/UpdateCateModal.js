import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { updateCategory } from "../services/CatePService";
import { formatDate } from "../schemas/CateValid";

const schema = yup.object().shape({
    CategoryName: yup.string().required("Tên danh mục không được để trống"),
    Status: yup.string().required("Trạng thái không được để trống"),
});

export default function UpdateCateModal({ isOpen, onClose, category, onCategoryUpdated }) {
    const { t } = useTranslation("manage_product_category");
    const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { Id: "", CategoryName: "", Status: "", CreatedAt: "", UpdatedAt: "" },
    });

    useEffect(() => {
        if (category) {
            console.log(category.Status);
            reset({
                Id: category.Id || "",
                CategoryName: category.Category || "",
                Status: category.Status ? category.Status.toLowerCase() : "active",
                CreatedAt: category.CreatedAt ? formatDate(category.CreatedAt) : "",
                UpdatedAt: category.UpdatedAt ? formatDate(category.UpdatedAt) : "",
            });
        }
    }, [category, reset]);

    const onSubmit = async (data) => {
        console.log("check data update: ", data);
        try {
            const updatedData = {
                category: data.CategoryName,
                status: data.Status,
            };

            const response = await updateCategory(category.Id, updatedData); // Truyền category.Id đúng cách

            if (response.success) {
                onCategoryUpdated(response.data);
                onClose();
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật danh mục:", error);
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">{t("manage_product_category.edit")}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">ID</label>
                        <input {...register("Id")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100" readOnly />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">{t("manage_product_category.name")}</label>
                        <input {...register("CategoryName")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">{t("manage_product_category.status")}</label>
                        <select {...register("Status")} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                            <option value="active">{t("manage_product_category.active")}</option>
                            <option value="inactive">{t("manage_product_category.inactive")}</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">{t("manage_product_category.createdAt")}</label>
                        <input
                            {...register("CreatedAt")}
                            value={formatDate(watch("CreatedAt"))}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">{t("manage_product_category.updatedAt")}</label>
                        <input
                            {...register("UpdatedAt")}
                            value={formatDate(watch("UpdatedAt"))}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                            readOnly
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">
                            {t("cancel")}
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md" disabled={isSubmitting}>
                            {isSubmitting ? t("updating") : t("save")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}