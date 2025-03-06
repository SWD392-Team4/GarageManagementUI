import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import MDEditor from "@uiw/react-md-editor";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { getAllCategory, getAllBrand, createProduct, createProductImage } from "./services/ProductService";
import AsyncSelect from 'react-select/async';

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

        let formData = null
        if (selectedImages.length > 0) {
            formData = new FormData();
            selectedImages.forEach((image) => {
                formData.append("fileDtos", image);
            });
        }
        await createProduct(payload, formData);

        // console.log("Check payload: ", payload);
        navigate("/admin/product");
        setLoading(false);
    };

    //xu ly select brands
    const filterBrands = (inputValue) => {
        return brands
            .filter((i) => i.brandName.toLowerCase().includes(inputValue.toLowerCase()))
            .map((i) => ({
                label: i.brandName,
                value: i.id
            }));
    };

    const loadBrandsOption = (inputValue, callback) => {
        setTimeout(() => {
            const filteredBrands = filterBrands(inputValue);
            callback(filteredBrands);
        }, 1000); // Giả lập API call với delay 1 giây
    };

    //xu ly select product category
    const filterProductCategories = (inputValue) => {
        return categories
            .filter((i) => i.category.toLowerCase().includes(inputValue.toLowerCase()))
            .map((i) => ({
                label: i.category,
                value: i.id
            }));
    };


    const loadProductCategoryOption = (inputValue, callback) => {
        setTimeout(() => {
            const filterProductCategory = filterProductCategories(inputValue);
            callback(filterProductCategory);
        }, 1000); // Giả lập API call với delay 1 giây
    };


    return (
        <div className="bg-white shadow-lg p-6">
            <Breadcrumb />
            <button className="flex items-center gap-2 text-blue-500 hover:underline mb-4" onClick={() => navigate("/admin/product")}>
                <FaArrowLeft /> {t("create_product.back")}
            </button>
            <h1 className="text-2xl font-semibold mb-4">{t("create_product.title")}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* Product name */}
                <div>
                    <label className="block text-gray-700 font-semibold">{t("create_product.name")}</label>
                    <input {...register("name")} className="border rounded p-2 w-full" required />
                </div>

                {/* category product */}
                {/* <div>
                    <label className="block text-gray-700 font-semibold">{t("create_product.category")}</label>
                    <select {...register("category")} className="border rounded p-2 w-full" required>
                        <option value="">{t("create_product.select_category")}</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.category}</option>
                        ))}
                    </select>
                </div> */}
                {/* Test select product category */}
                <div>
                    <label className="block text-gray-700 font-semibold">{t("create_product.category")}</label>
                    <AsyncSelect
                        cacheOptions
                        defaultOptions={categories.map((i) => ({ label: i.category, value: i.id }))}
                        placeholder={t("create_product.select_category")}
                        loadOptions={loadProductCategoryOption}
                        isSearchable
                        onChange={(selectedProductCategory) => {
                            setValue("category", selectedProductCategory.value);
                            console.log("Selectd Product Category ID: ", selectedProductCategory.value);
                        }}
                    />
                </div>

                {/* price */}
                <div>
                    <label className="block text-gray-700 font-semibold">{t("create_product.price")}</label>
                    <input type="number" {...register("price")} className="border rounded p-2 w-full" required />
                </div>

                {/* barcode  */}
                <div>
                    <label className="block text-gray-700 font-semibold">{t("create_product.barcode")}</label>
                    <input {...register("barcode")} className="border rounded p-2 w-full" required />
                </div>

                {/* Brands */}
                {/* <div>
                    <label className="block text-gray-700 font-semibold">{t("create_product.brand")}</label>
                    <select {...register("brand")} className="border rounded p-2 w-full" required>
                        <option value="">{t("create_product.select_brand")}</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>{brand.brandName}</option>
                        ))}
                    </select>
                </div> */}
                {/* Test select Brands */}
                <div>
                    <label className="block text-gray-700 font-semibold">{t("create_product.brand")}</label>
                    <AsyncSelect
                        cacheOptions
                        defaultOptions={brands.map((i) => ({ label: i.brandName, value: i.id }))}
                        placeholder={t("create_product.select_brand")}
                        loadOptions={loadBrandsOption}
                        isSearchable
                        onChange={(selecteBrands) => {
                            setValue("brand", selecteBrands.value);
                            console.log("Selectd Brand ID: ", selecteBrands.value);
                        }}
                    />
                </div>

                {/* Description */}
                <div className="col-span-2" data-color-mode="light">
                    <label className="block text-gray-700 font-semibold">{t("create_product.description")}</label>
                    <MDEditor value={watch("description")} onChange={(value) => setValue("description", value)} />
                </div>

                {/* Image Product */}
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