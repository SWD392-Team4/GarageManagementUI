import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { updateBrand } from "../services/BrandService";
import { formatDate } from "../schemas/BrandValid";

const schema = yup.object().shape({
    BrandName: yup.string().required("Tên thương hiệu không được để trống"),
    LogoLink: yup.string().url("Link logo phải là URL hợp lệ").required("Link logo không được để trống"),
    Status: yup.string().oneOf(["Active", "Inactive"], "Trạng thái không hợp lệ"),
});

export default function UpdateBrandModal({ isOpen, onClose, brand, onBrandUpdated }) {
    const { t } = useTranslation("manage_brand");

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            BrandName: "",
            LogoLink: "",
            Status: "None",
        },
    });

    useEffect(() => {
        if (brand) {
            setValue("BrandName", brand.BrandName || "");
            setValue("LogoLink", brand.LogoLink || "");
            setValue("Status", brand.Status || "None");
        } else {
            reset();
        }
    }, [brand, setValue, reset]);

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            const updatedBrand = { ...brand, ...data };
            await updateBrand(brand.Id, updatedBrand);
            onBrandUpdated(updatedBrand);
            onClose();
        } catch (err) {
            console.error("Lỗi cập nhật thương hiệu:", err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">{t("manage_brand.edit")}</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* ID (chỉ đọc) */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">{t("manage_brand.id")}</label>
                        <input type="text" className="w-full p-2 border rounded bg-gray-200" value={brand?.Id || ""} readOnly />
                    </div>

                    {/* Input Tên thương hiệu */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">{t("manage_brand.brandName")}</label>
                        <input
                            type="text"
                            {...register("BrandName")}
                            className="w-full p-2 border rounded"
                        />
                        {errors.BrandName && <p className="text-red-500 text-sm">{errors.BrandName.message}</p>}
                    </div>

                    {/* Input Link Logo */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">{t("manage_brand.LogoLink")}</label>
                        <input
                            type="text"
                            {...register("LogoLink")}
                            className="w-full p-2 border rounded"
                        />
                        {errors.LogoLink && <p className="text-red-500 text-sm">{errors.LogoLink.message}</p>}
                    </div>

                    {/* Trạng thái (Dropdown chọn) */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">{t("manage_brand.status")}</label>
                        <select
                            {...register("Status")}
                            className="w-full p-2 border rounded"
                        >
                            <option value="Active">{t("manage_brand.active")}</option>
                            <option value="Inactive">{t("manage_brand.inactive")}</option>
                        </select>
                        {errors.Status && <p className="text-red-500 text-sm">{errors.Status.message}</p>}
                    </div>

                    {/* Ngày tạo (chỉ đọc) */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">{t("manage_brand.createdAt")}</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded bg-gray-200"
                            value={brand?.CreatedAt ? formatDate(brand.CreatedAt) : ""}
                            readOnly
                        />
                    </div>

                    {/* Ngày cập nhật (chỉ đọc) */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">{t("manage_brand.updatedAt")}</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded bg-gray-200"
                            value={brand?.UpdatedAt ? formatDate(brand.UpdatedAt) : ""}
                            readOnly
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button type="button" className="px-4 py-2 bg-gray-300 rounded-lg" onClick={onClose} disabled={isSubmitting}>
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
