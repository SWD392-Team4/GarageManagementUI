import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import BreadcrumbProduct from "./partials/BreadcrumbProduct";
import MDEditor from "@uiw/react-md-editor";
import { FaArrowLeft } from "react-icons/fa";
import { getAllCategory } from "./services/ProductService";
import { getAllBrand } from "./services/ProductService";

export default function CreateProduct() {
    const { register, handleSubmit, setValue, watch } = useForm();
    const { t, i18n } = useTranslation("create_product");
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    // Gọi API để lấy danh sách categories & brands
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getAllCategory();
            if (response?.data?.value) {
                setCategories(response.data.value);
            }
        };

        const fetchBrands = async () => {
            const response = await getAllBrand();
            if (response?.data?.value) {
                setBrands(response.data.value);
            }
        };

        fetchCategories();
        fetchBrands();
    }, []);

    const onSubmit = (data) => {
        const payload = {
            productName: data.name,
            productBarcode: data.barcode,
            productDescription: data.description,
            productCategoryId: data.category,
            brandId: data.brand, // ID của brand
            link: data.link,
            productPrice: parseFloat(data.price),
        };
        navigate("/admin/product");
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <BreadcrumbProduct />
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
                <div>
                    <label className="block text-gray-700 font-semibold">{t("create_product.link")}</label>
                    <input {...register("link")} className="border rounded p-2 w-full" />
                </div>
                <div className="col-span-2" data-color-mode="light">
                    <label className="block text-gray-700 font-semibold">{t("create_product.description")}</label>
                    <MDEditor value={watch("description")} onChange={(value) => setValue("description", value)} />
                </div>
                <div className="col-span-2 flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">{t("create_product.submit")}</button>
                </div>
            </form>
        </div>
    );
}
