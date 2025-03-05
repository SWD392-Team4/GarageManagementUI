import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MDEditor from "@uiw/react-md-editor";
import { useTranslation } from "react-i18next";
import { UpdateCarCategory } from "../services/ServiceCarCategory";

export default function UpdateCarCategoryModal({ isOpen, onClose, carCategory, onCarCategoryUpdate }) {
    const { register, setValue, handleSubmit, reset, watch } = useForm();
    const [isEditing, setIsEditing] = useState(false);
    const { t } = useTranslation("manage_car_category");

    useEffect(() => {
        if (carCategory) {
            reset({
                id: carCategory.id,
                category: carCategory.category,
                description: carCategory.description,
                status: carCategory.status,
                createdAt: carCategory.createdAt,
                updatedAt: carCategory.updatedAt,
            });
            setIsEditing(false);
        }
    }, [carCategory, reset]);

    if (!isOpen || !carCategory) return null;

    const onSubmit = async (data, e) => {
        e.preventDefault();
        if (!isEditing) return;

        try {
            await UpdateCarCategory(carCategory.id, {
                category: data.category,
                description: data.description,
                status: data.status,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            });
            setIsEditing(false);
            onCarCategoryUpdate();
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
                <h2 className="text-xl font-semibold mb-4">{t("manage_car_category.title")}</h2>
                <form>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">{t("manage_car_category.id")}</label>
                            <input type="text" {...register("id")} className="w-full px-3 py-2 border rounded-lg bg-gray-100" readOnly />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">{t("manage_car_category.createdAt")}</label>
                            <input type="text" {...register("createdAt")} className="w-full px-3 py-2 border rounded-lg bg-gray-100" readOnly />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                            <label className="block text-sm font-medium">{t("manage_car_category.category")}</label>
                            <input type="text" {...register("category")} className="w-full px-3 py-2 border rounded-lg" disabled={!isEditing} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">{t("manage_car_category.updatedAt")}</label>
                            <input type="text" {...register("updatedAt")} className="w-full px-3 py-2 border rounded-lg bg-gray-100" readOnly />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">{t("manage_car_category.status")}</label>
                            <select {...register("status")} className="w-full px-3 py-2 border rounded-lg" disabled={!isEditing}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-3" data-color-mode="light">
                        <label className="block text-sm font-medium">{t("description")}</label>
                        <MDEditor
                            value={watch("description") || ""}
                            onChange={(value) => isEditing && setValue("description", value)}
                            disabled={!isEditing}
                            preview={isEditing ? "edit" : "preview"}
                        />
                    </div>

                </form>
                <div className="flex justify-end mt-4 space-x-2">
                    {!isEditing ? (
                        <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={() => setIsEditing(true)}>
                            {t("edit")}
                        </button>
                    ) : (
                        <button type="button" className="px-4 py-2 bg-green-600 text-white rounded-lg" onClick={handleSubmit(onSubmit)}>
                            {t("save")}
                        </button>
                    )}
                    <button type="button" className="px-4 py-2 bg-gray-700 text-white rounded-lg" onClick={() => { setIsEditing(false); onClose(); }}>
                        {t("close")}
                    </button>
                </div>
            </div>
        </div>
    );
}
