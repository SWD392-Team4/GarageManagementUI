import React from "react";
import { useForm } from "react-hook-form";
import MDEditor from "@uiw/react-md-editor";
import { useTranslation } from "react-i18next";
import { CreateCarCategory } from "../services/ServiceCarCategory";

export default function CreateCarCategoryModal({ isOpenModal, onClose, onCreateCarCategory }) {
    const { register, handleSubmit, setValue, watch, reset } = useForm();
    const { t } = useTranslation("manage_car_category");

    if (!isOpenModal) return null;

    const onSubmit = async (data) => {
        try {
            await CreateCarCategory({
                category: data.category,
                description: data.description,
            });
            onCreateCarCategory(); // Refresh danh sách
            reset();
            onClose();
        } catch (error) {
            console.error("Create failed", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                <h2 className="text-xl font-semibold mb-4">{t("manage_car_category.create")}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Category */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium">{t("manage_car_category.category")}</label>
                        <input
                            type="text"
                            {...register("category", { required: true })}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-3" data-color-mode="light">
                        <label className="block text-sm font-medium">{t("manage_car_category.description")}</label>
                        <MDEditor
                            value={watch("description") || ""}
                            onChange={(value) => setValue("description", value)}
                            preview="edit"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-2">
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">
                            {t("save")}
                        </button>
                        <button type="button" className="px-4 py-2 bg-gray-700 text-white rounded-lg" onClick={onClose}>
                            {t("close")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
