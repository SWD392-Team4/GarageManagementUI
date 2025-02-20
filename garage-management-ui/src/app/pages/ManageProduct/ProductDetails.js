import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaEdit, FaSave } from "react-icons/fa";
import BreadcrumbProduct from "./partials/BreadcrumbProduct";
import MDEditor from "@uiw/react-md-editor";
import { getProduct, updateProduct } from "./services/ProductService";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("product_details");
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        if (data) {
          setProduct(data.value);
          setFormData(data.value);
        } else {
          setErrorMessage("Product not found");
        }
      } catch (error) {
        setErrorMessage("Error fetching product");
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id, i18n.language]);

  const handleEdit = () => setIsEditing(true);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await updateProduct(id, formData);
      if (response) {
        setProduct(formData);
        setIsEditing(false);
      } else {
        setErrorMessage("Failed to update product");
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the product");
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

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {product ? (
        <>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 flex justify-center items-center">
              <img src={product.ProductImg || "/images/placeholder.png"} alt={product.ProductName} className="max-w-sm w-full h-auto rounded-lg shadow-lg" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{t("name")}: {isEditing ? <input name="ProductName" value={formData.ProductName} onChange={handleChange} className="border p-2 rounded w-full" /> : product.ProductName}</h1>
              <p className="text-gray-600 text-lg mb-2"><strong>{t("product_details.barcode")}:</strong> {product.ProductBarcode}</p>
              <p className="text-gray-600 text-lg mb-2"><strong>{t("product_details.status")}:</strong> {isEditing ? <input name="Status" value={formData.Status} onChange={handleChange} className="border p-2 rounded w-full" /> : product.Status}</p>
              <p className="text-gray-600 text-lg mb-2"><strong>{t("product_details.price")}:</strong> {isEditing ? <input name="ProductPrice" type="number" value={formData.ProductPrice} onChange={handleChange} className="border p-2 rounded w-full" /> : `$${product.ProductPrice}`}</p>
              <p className="text-gray-600 text-lg mb-2"><strong>{t("product_details.created_at")}:</strong> {product.CreatedAt}</p>
              <p className="text-gray-600 text-lg mb-2"><strong>{t("product_details.updated_at")}:</strong> {product.UpdatedAt}</p>
            </div>
          </div>

          <div className="mt-4" data-color-mode="light">
            <label className="block text-gray-500 font-semibold mb-2">{t("product_details.description")}</label>
            {isEditing ? (
              <MDEditor value={formData.ProductDescription || ''} onChange={(value) => setFormData((prevData) => ({ ...prevData, ProductDescription: value }))} />
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
