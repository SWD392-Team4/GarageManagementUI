import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { createBrand, createBrandImage } from "../services/BrandService";

const schema = yup.object().shape({
    brandName: yup.string().required("Tên thương hiệu không được để trống"),
});

export default function BrandModal({ isOpen, onClose, onBrandCreated }) {
    const { t } = useTranslation("manage_brand");
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { brandName: "" },
    });

    useEffect(() => {
        if (isOpen) {
            reset();
            setImagePreview(null);
            setSelectedFile(null);
        }
    }, [isOpen, reset]);

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            const brandResponse = await createBrand(data);

            if (brandResponse?.data?.value && selectedFile) {
                await uploadImage(brandResponse.data.value.id, selectedFile);
            }

            onBrandCreated();
            onClose();
        } catch (err) {
            console.error("Lỗi tạo thương hiệu:", err);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const uploadImage = async (brandId, file) => {
        try {
            const formData = new FormData();
            formData.append("fileDto", file);
            await createBrandImage(brandId, formData);
        } catch (error) {
            console.error("Lỗi khi tải ảnh thương hiệu:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
                <h2 className="text-xl font-semibold mb-4">{t("manage_brand.createBrand")}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Cột 1: Nhập thông tin thương hiệu */}
                        <div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    {...register("brandName")}
                                    className="w-full p-2 border rounded"
                                    placeholder={t("manage_brand.brandName")}
                                />
                                {errors.brandName && <p className="text-red-500 text-sm">{errors.brandName.message}</p>}
                            </div>
                        </div>

                        {/* Cột 2: Chọn hình ảnh */}
                        <div>
                            <div className="w-full h-32 border rounded flex items-center justify-center bg-gray-200">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded" />
                                ) : (
                                    <div className="w-full h-32 animate-pulse bg-gray-300 rounded"></div>
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full p-2 border rounded mt-2"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
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
