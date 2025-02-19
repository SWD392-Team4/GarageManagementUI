import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaEdit, FaSave } from "react-icons/fa";
import BreadcrumbProduct from "./partials/BreadcrumbProduct";
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
          productName: productData.ProductName,
          productBarcode: productData.ProductBarcode,
          productDescription: productData.ProductDescription,
          productCategoryId: categoryData?.data?.value.find(cat => cat.Category === productData.Category)?.Id || "",
          brandId: brandData?.data?.value.find(brand => brand.BrandName === productData.BrandName)?.Id || "",
          link: productData.ProductImg,
          productPrice: productData.ProductPrice,
          status: productData.Status
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
      productName: product?.ProductName ?? "",
      productBarcode: product?.ProductBarcode ?? "",
      productDescription: product?.ProductDescription ?? "",
      productCategoryId: categories.find(cat => cat.Category === product.Category)?.Id || "",
      brandId: brands.find(brand => brand.BrandName === product.BrandName)?.Id || "",
      link: product?.ProductImg ?? "",
      productPrice: product?.ProductPrice ?? 0,
      status: product?.Status ?? "active"
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
      const response = await updateProduct(id, formData);
      fetchData();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }

    setLoading(false);
  };


  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <BreadcrumbProduct />
      <button className="flex items-center gap-2 text-blue-500 hover:underline mb-4" onClick={() => navigate("/admin/product")}>
        <FaArrowLeft /> {t("product_details.back")}
      </button>


      {product ? (
        <>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 flex justify-center items-center">
              <img src={product.ProductImg || "/images/placeholder.png"} alt={product.ProductName} className="max-w-sm w-full h-auto rounded-lg shadow-lg" />
            </div>
            <div className="flex-1" data-color-mode="light">
              <h1 className="text-3xl font-bold mb-4">
                {t("name")}
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
                <strong>{t("product_details.barcode")}:</strong> {product.ProductBarcode}
              </p>
              <p className="text-gray-600 text-lg mb-2"><strong>{t("product_details.category")}:</strong>
                {isEditing ?
                  <select name="productCategoryId" value={formData.productCategoryId} onChange={handleChange} className="border p-2 rounded w-full">
                    {categories.map(cat => <option key={cat.Id} value={cat.Id}>{cat.Category}</option>)}
                  </select>
                  : product.Category}
              </p>
              <p className="text-gray-600 text-lg mb-2"><strong>{t("product_details.brand")}:</strong>
                {isEditing ?
                  <select name="BrandName" value={formData.BrandName} onChange={handleChange} className="border p-2 rounded w-full">
                    {brands.map(brand => <option key={brand.Id} value={brand.BrandName}>{brand.BrandName}</option>)}
                  </select> : product.BrandName}
              </p>
              <p className="text-gray-600 text-lg mb-2">
                <strong>{t("product_details.status")}:</strong>
                {isEditing ?
                  <select name="Status" value={formData.Status} onChange={handleChange} className="border p-2 rounded w-full">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  : product.Status}
              </p>
              <p className="text-gray-600 text-lg mb-2">
                <strong>{t("product_details.price")}:</strong>
                {isEditing ?
                  <input
                    name="productPrice"
                    type="number"
                    value={formData.productPrice ?? ""}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />

                  : `$${product.ProductPrice}`}
              </p>
              <p className="text-gray-600 text-lg mb-2">
                <strong>{t("product_details.created_at")}:</strong> {product.CreatedAt}
              </p>
              <p className="text-gray-600 text-lg mb-2">
                <strong>{t("product_details.updated_at")}:</strong> {product.UpdatedAt}
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
              <MDEditor.Markdown source={product.ProductDescription || ''} />
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