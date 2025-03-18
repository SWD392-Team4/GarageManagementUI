import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { updateBrand } from "../services/BrandService";
import { formatDate } from "../schemas/BrandValid";
import { createBrandImage } from "../services/BrandService"; // Thêm hàm upload ảnh nếu cần
import { sAccount } from "../../AuthCustomer/services/store";

const schema = yup.object().shape({
  brandName: yup.string().required("Tên thương hiệu không được để trống"),
  status: yup.string().oneOf(["Active", "Inactive"], "Trạng thái không hợp lệ"),
});

export default function UpdateBrandModal({
  isOpen,
  onClose,
  brand,
  onBrandUpdated,
}) {
  const { t } = useTranslation("manage_brand");
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      brandName: "",
      status: "None",
    },
  });

  useEffect(() => {
    if (brand) {
      setValue("brandName", brand.brandName || "");
      setValue("status", brand.status || "None");

      // Hiển thị ảnh mặc định từ ImageLink nếu chưa chọn file mới
      setImagePreview(brand.imageLink || null);
      setSelectedFile(null);
    } else {
      reset();
      setImagePreview(null);
      setSelectedFile(null);
    }
  }, [brand, setValue, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      const updatedBrand = { ...brand, ...data };
      await updateBrand(brand.id, updatedBrand);

      // Nếu có file mới thì upload
      if (selectedFile) {
        await uploadImage(brand.id, selectedFile);
      }

      onBrandUpdated(updatedBrand);
      onClose();
    } catch (err) {
      console.error("Lỗi cập nhật thương hiệu:", err);
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

  const handleCancel = () => {
    setImagePreview(brand?.imageLink || null); // Khôi phục ảnh gốc
    setSelectedFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">{t("manage_brand.edit")}</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6"
        >
          {/* Cột Thông tin thương hiệu */}
          <div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                {t("manage_brand.id")}
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-200"
                value={brand?.id || ""}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                {t("manage_brand.brandName")}
              </label>
              <input
                type="text"
                {...register("brandName")}
                className="w-full p-2 border rounded"
              />
              {errors.brandName && (
                <p className="text-red-500 text-sm">
                  {errors.brandName.message}
                </p>
              )}
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                {t("manage_brand.status")}
              </label>
              <select
                {...register("status")}
                className="w-full p-2 border rounded"
              >
                <option value="Active">{t("manage_brand.active")}</option>
                <option value="Inactive">{t("manage_brand.inactive")}</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                {t("manage_brand.createdAt")}
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-200"
                value={brand?.createdAt ? formatDate(brand.createdAt) : ""}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                {t("manage_brand.updatedAt")}
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-200"
                value={brand?.updatedAt ? formatDate(brand.updatedAt) : ""}
                readOnly
              />
            </div>
          </div>

          {/* Cột Hình ảnh */}
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="w-full border rounded flex items-center justify-center bg-gray-200 overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-auto max-h-64 object-contain border rounded"
                />
              ) : (
                <div className="w-full h-64 animate-pulse bg-gray-300 rounded"></div>
              )}
            </div>
            <div className="w-full border rounded flex items-center justify-center bg-gray-200 p-2">
              <input
                type="file"
                accept="image/*"
                className="w-full"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Nút hành động */}
          {sAccount.value.role === "Administrator" ? (
            <div className="col-span-2 flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                {t("manage_brand.cancel")}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? t("manage_brand.saving")
                  : t("manage_brand.save")}
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-lg"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              {t("manage_brand.cancel")}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
