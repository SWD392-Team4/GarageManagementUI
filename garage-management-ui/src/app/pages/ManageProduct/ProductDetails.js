import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaEdit, FaSave } from "react-icons/fa";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import MDEditor from "@uiw/react-md-editor";
import { getProduct, updateProduct, getAllCategory, getAllBrand } from "./services/ProductService";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("product_details");
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);


  const fetchData = async () => {
    try {
      const [productData, categoryData, brandData] = await Promise.all([
        getProduct(id),
        getAllCategory(),
        getAllBrand()
      ]);

      if (productData) {
        setProduct(productData);
        setFormData({
          productName: productData.productName,
          productBarcode: productData.productBarcode,
          productDescription: productData.productDescription,
          productCategoryId: categoryData?.data?.value.find(cat => cat.category === productData.category)?.id || "",
          brandId: brandData?.data?.value.find(brand => brand.brandName === productData.brandName)?.id || "",
          imageLink: productData.imageLink,
          productPrice: productData.productPrice,
          status: productData.status
        });

      } else {
      }

      if (categoryData?.data?.value) setCategories(categoryData.data.value);
      if (brandData?.data?.value) setBrands(brandData.data.value);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, i18n.language]);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      productName: product?.productName ?? "",
      productBarcode: product?.productBarcode ?? "",
      productDescription: product?.productDescription ?? "",
      productCategoryId: categories.find(cat => cat.category === product.category)?.id || "",
      brandId: brands.find(brand => brand.brandName === product.brandName)?.id || "",
      imageLink: product?.imageLink ?? "",
      productPrice: product?.productPrice ?? 0,
      status: product?.status ?? "active"
    });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "productPrice" ? Number(value) || 0 : value,
    }));
  };


  const handleSave = async () => {
    setLoading(true);

    try {
      //check file moi 
      let imageFormData = null;
      if (imageFiles.length > 0) {
        imageFormData = new FormData();
        imageFiles.forEach((image) => {
          imageFormData.append("fileDtos", image);
        });
      }

      //goi api
      await updateProduct(id, formData, imageFormData);
      fetchData();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }

    setLoading(false);
  };


  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <Breadcrumb />
      <button className="flex items-center gap-2 text-blue-500 hover:underline mb-4" onClick={() => navigate("/admin/product")}>
        <FaArrowLeft /> {t("product_details.back")}
      </button>


      {product ? (
        <>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image Product */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {formData.imageLink?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg object-cover"
                />
              ))}
            </div>

            {isEditing && (
              <div className="mt-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = [...e.target.files];
                    setImageFiles(files);

                    // Hiển thị preview ảnh ngay lập tức
                    const previews = files.map(file => URL.createObjectURL(file));
                    setFormData(prev => ({
                      ...prev,
                      imageLink: [...(prev.imageLink || []), ...previews]
                    }));
                  }}
                  className="border p-2 rounded w-full"
                />
              </div>
            )}


            <div className="flex-1" data-color-mode="light">
              <h1 className="text-3xl font-bold mb-4">
                {t("product_details.name")}
                : {isEditing ?
                  <input
                    name="productName"
                    value={formData.productName ?? ""}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                  : product.ProductName}
              </h1>
              <p className="text-gray-600 text-lg mb-2">
                <strong>{t("product_details.barcode")}:</strong> {product.productBarcode}
              </p>
              <p className="text-gray-600 text-lg mb-2"><strong>{t("product_details.category")}: </strong>
                {isEditing ?
                  <select name="productCategoryId" value={formData.productCategoryId} onChange={handleChange} className="border p-2 rounded w-full">
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.category}</option>)}
                  </select>
                  : product.category}
              </p>
              <p className="text-gray-600 text-lg mb-2"><strong>{t("product_details.brand")}: </strong>
                {isEditing ?
                  <select name="BrandName" value={formData.brandName} onChange={handleChange} className="border p-2 rounded w-full">
                    {brands.map(brand => <option key={brand.id} value={brand.brandName}>{brand.brandName}</option>)}
                  </select> : product.brandName}
              </p>
              <p className="text-gray-600 text-lg mb-2">
                <strong>{t("product_details.status")}: </strong>
                {isEditing ?
                  <select name="Status" value={formData.status} onChange={handleChange} className="border p-2 rounded w-full">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  : product.status}
              </p>
              <p className="text-gray-600 text-lg mb-2">
                <strong>{t("product_details.price")}: </strong>
                {isEditing ?
                  <input
                    name="productPrice"
                    type="number"
                    value={formData.productPrice ?? ""}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />

                  : `$${product.productPrice}`}
              </p>
              <p className="text-gray-600 text-lg mb-2">
                <strong>{t("product_details.created_at")}: </strong> {product.createdAt}
              </p>
              <p className="text-gray-600 text-lg mb-2">
                <strong>{t("product_details.updated_at")}: </strong> {product.updatedAt}
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 border-t" data-color-mode="light">
            <h2 className="text-xl font-semibold mb-2">{t("product_details.description")}</h2>
            {isEditing ? (
              <MDEditor
                value={formData.productDescription ?? ""}
                onChange={(value) =>
                  setFormData((prevData) => ({ ...prevData, productDescription: value ?? "" }))
                }
              />

            ) : (
              <MDEditor.Markdown source={product.productDescription || ''} />
            )}
          </div>

          <div className="flex justify-end mt-6">
            {isEditing ? (
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2" onClick={handleSave} disabled={loading}>
                <FaSave /> {loading ? t("product_details.saving") : t("product_details.save")}
              </button>
            ) : (
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2" onClick={handleEdit}>
                <FaEdit /> {t("product_details.edit")}
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-red-500">{t("product_details.not_found")}</p>
      )}
    </div>

  );
}