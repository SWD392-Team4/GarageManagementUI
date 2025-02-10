import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaEdit, FaSave } from "react-icons/fa";
import BreadcrumbProduct from "./partials/BreadcrumbProduct";
import MDEditor from "@uiw/react-md-editor";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("product_details");
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const fakeData = [
        {
          id: 1, name: "Lọc dầu động cơ", category: "Động cơ", price: "500,000 VND",
          stock: 50, brand: "Bosch", supplier: "Auto Parts VN", manufactureDate: "2024-01-10",
          warranty: "12 tháng", compatibility: "Xe sedan, SUV", weight: "500g", dimensions: "10x10x20 cm",
          color: "Đen", material: "Kim loại & nhựa", origin: "Đức",
          description: "### Lọc dầu động cơ Bosch\n\nLọc dầu giúp bảo vệ động cơ khỏi bụi bẩn và cặn bã, tăng hiệu suất hoạt động và kéo dài tuổi thọ động cơ.\n\n- Công nghệ lọc tiên tiến giúp loại bỏ cặn bẩn\n- Giảm hao mòn động cơ và tiết kiệm nhiên liệu\n- Chất liệu cao cấp, độ bền vượt trội\n- Chống ăn mòn tốt\n- Phù hợp nhiều dòng xe khác nhau",
          image: "data:image/jpeg;base64,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"
        },
      ];
      const foundProduct = fakeData.find(prod => prod.id === parseInt(id));
      setProduct(foundProduct || null);
      setFormData(foundProduct || {});
    };

    fetchProduct();
  }, [id, i18n.language]);

  const handleEdit = () => setIsEditing(true);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    setProduct(formData);
    setIsEditing(false);
  };

  if (!product) {
    return <p>{t("product_details.not_found")}</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <BreadcrumbProduct/>
      <button className="flex items-center gap-2 text-blue-500 hover:underline mb-4" onClick={() => navigate("/admin/product")}>
        <FaArrowLeft /> {t("product_details.back")}
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex justify-center items-center">
          <img src={product.image} alt={product.name} className="max-w-sm w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{t("product_details.name")} : {product.name}</h1>
          <p className="text-gray-600 text-lg mb-2"><strong>{t("product_details.brand")}:</strong> {product.brand}</p>
          <p className="text-gray-600 text-lg mb-2"><strong>{t("product_details.supplier")}:</strong> {product.supplier}</p>
          <p className="text-gray-600 text-lg mb-2"><strong>{t("product_details.manufacture_date")}:</strong> {product.manufactureDate}</p>
          <p className="text-gray-600 text-lg mb-2"><strong>{t("product_details.warranty")}:</strong> {product.warranty}</p>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-gray-500 font-semibold mb-2">{t("product_details.description")}</label>
        {isEditing ? (
          <div data-color-mode="light">
            <MDEditor
              value={formData.description || ''}
              onChange={(value) => setFormData((prevData) => ({ ...prevData, description: value }))}
              height="100%"
              visibleDragbar={false}
              preview="live"
            />
          </div>
        ) : (
          <div data-color-mode="light">
            <MDEditor.Markdown source={product.description || ''} />
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        {isEditing ? (
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2" onClick={handleSave}>
            <FaSave /> {t("product_details.save")}
          </button>
        ) : (
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2" onClick={handleEdit}>
            <FaEdit /> {t("product_details.edit")}
          </button>
        )}
      </div>
    </div>
  );
}
