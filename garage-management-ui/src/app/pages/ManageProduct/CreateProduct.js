import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import MDEditor from "@uiw/react-md-editor";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { getAllCategory, getAllBrand, createProduct, createProductImage } from "./services/ProductService";

export default function CreateProduct() {
    const { register, handleSubmit, setValue, watch } = useForm();
    const { t } = useTranslation("create_product");
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getAllCategory();
            if (response?.data?.value) setCategories(response.data.value);
        };

        const fetchBrands = async () => {
            const response = await getAllBrand();
            if (response?.data?.value) setBrands(response.data.value);
        };

        fetchCategories();
        fetchBrands();
    }, []);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setSelectedImages([...selectedImages, ...files]);
    };

    const removeImage = (index) => {
        setSelectedImages(selectedImages.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {
        setLoading(true);
        const payload = {
            productName: data.name,
            productBarcode: data.barcode,
            productDescription: data.description,
            productCategoryId: data.category,
            brandId: data.brand,
            productPrice: parseFloat(data.price),
        };

        const response = await createProduct(payload);
        console.log("check respone: ", response);
        if (response.data.id) {
            const productId = response.data.id;
            if (selectedImages.length > 0) {
                const formData = new FormData();
                selectedImages.forEach((image) => {
                    formData.append("fileDtos", image);
                });
                await createProductImage(productId, formData);
            }
            navigate("/admin/product");
        }
        setLoading(false);
    };

    return (
        <div className="bg-white shadow-lg p-6">
            <Breadcrumb />
            <button className="flex items-center gap-2 text-blue-500 hover:underline mb-4" onClick={() => navigate("/admin/product")}>
                <FaArrowLeft /> {t("create_product.back")}
            </button>
            <h1 className="text-2xl font-semibold mb-4">{t("create_product.title")}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label className="block text-gray-700 font-semibold">{t("create_product.name")}</label>
                    <input {...register("name")} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">{t("create_product.category")}</label>
                    <select {...register("category")} className="border rounded p-2 w-full" required>
                        <option value="">{t("create_product.select_category")}</option>
                        {categories.map((cat) => (
                            <option key={cat.Id} value={cat.Id}>{cat.Category}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">{t("create_product.price")}</label>
                    <input type="number" {...register("price")} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">{t("create_product.barcode")}</label>
                    <input {...register("barcode")} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">{t("create_product.brand")}</label>
                    <select {...register("brand")} className="border rounded p-2 w-full" required>
                        <option value="">{t("create_product.select_brand")}</option>
                        {brands.map((brand) => (
                            <option key={brand.Id} value={brand.Id}>{brand.BrandName}</option>
                        ))}
                    </select>
                </div>
                <div className="col-span-2" data-color-mode="light">
                    <label className="block text-gray-700 font-semibold">{t("create_product.description")}</label>
                    <MDEditor value={watch("description")} onChange={(value) => setValue("description", value)} />
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-700 font-semibold">{t("create_product.upload_images")}</label>
                    <input type="file" multiple onChange={handleImageUpload} className="border rounded p-2 w-full" />
                    <div className="mt-4 grid grid-cols-6 gap-3">
                        {selectedImages.length > 0 ? selectedImages.map((file, index) => (
                            <div key={index} className="relative rounded-lg overflow-hidden shadow-lg group">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Preview"
                                    className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-105"
                                />
                                <button
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-75 hover:opacity-100"
                                    onClick={() => removeImage(index)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        )) : (
                            <div className="grid grid-cols-3 gap-4">
                                {[...Array(1)].map((_, index) => (
                                    <div key={index} className="w-64 h-64 bg-gray-300 animate-pulse rounded-lg"></div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-span-2 flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg" disabled={loading}>
                        {loading ? "Loading..." : t("create_product.submit")}
                    </button>
                </div>
            </form>
        </div>
    );
}