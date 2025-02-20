import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { createCategory } from "../services/CatePService";

const schema = yup.object().shape({
    category: yup.string().required("Tên danh mục không được để trống"),
});

export default function CreateCateForm({ isOpen, onClose, onCategoryCreated }) {
    const { t } = useTranslation("manage_product_category");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            category: "",
        },
    });

    useEffect(() => {
        if (isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            await createCategory(data);
            onCategoryCreated();
            onClose();
        } catch (err) {
            console.error("Lỗi tạo danh mục:", err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">{t("manage_product_category.create_title")}</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input
                            type="text"
                            {...register("category")}
                            className="w-full p-2 border rounded"
                            placeholder={t("manage_product_category.category")}
                        />
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded-lg"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
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