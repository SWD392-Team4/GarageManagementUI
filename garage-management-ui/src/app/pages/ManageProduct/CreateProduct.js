import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import BreadcrumbProduct from "./partials/BreadcrumbProduct";
import MDEditor from "@uiw/react-md-editor";
import { FaArrowLeft } from "react-icons/fa";

export default function CreateProduct() {
    const { register, handleSubmit, setValue, watch } = useForm();
    const { t, i18n } = useTranslation("create_product");
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log("Product Created:", data);
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
                    <input {...register("category")} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">{t("create_product.price")}</label>
                    <input type="number" {...register("price")} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">{t("create_product.stock")}</label>
                    <input type="number" {...register("stock")} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">{t("create_product.brand")}</label>
                    <input {...register("brand")} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">{t("create_product.supplier")}</label>
                    <input {...register("supplier")} className="border rounded p-2 w-full" required />
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
