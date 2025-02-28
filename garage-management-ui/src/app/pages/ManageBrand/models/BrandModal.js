import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { createBrand } from "../services/BrandService";

// Schema validation sử dụng Yup
const schema = yup.object().shape({
    brandName: yup.string().required("Tên thương hiệu không được để trống"),
    LogoLink: yup.string().url("Link logo phải là URL hợp lệ").required("Link logo không được để trống"),
});

export default function BrandModal({ isOpen, onClose, onBrandCreated }) {
    const { t } = useTranslation("manage_brand");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            brandName: "",
            LogoLink: "",
        },
    });

    // Khi modal mở lại, reset form
    useEffect(() => {
        if (isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            await createBrand(data);
            onBrandCreated();
            onClose();
        } catch (err) {
            console.error("Lỗi tạo thương hiệu:", err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">{t("manage_brand.createBrand")}</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Input Tên thương hiệu */}
                    <div className="mb-3">
                        <input
                            type="text"
                            {...register("brandName")}
                            className="w-full p-2 border rounded"
                            placeholder={t("manage_brand.brandName")}
                        />
                        {errors.brandName && <p className="text-red-500 text-sm">{errors.brandName.message}</p>}
                    </div>

                    {/* Input Link Logo */}
                    <div className="mb-3">
                        <input
                            type="text"
                            {...register("LogoLink")}
                            className="w-full p-2 border rounded"
                            placeholder={t("manage_brand.LogoLink")}
                        />
                        {errors.LogoLink && <p className="text-red-500 text-sm">{errors.LogoLink.message}</p>}
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded-lg"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            {t("manage_brand.cancel")}
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? t("manage_brand.saving") : t("manage_brand.save")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
