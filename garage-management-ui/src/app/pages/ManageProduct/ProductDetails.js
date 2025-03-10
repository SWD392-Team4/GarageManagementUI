import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import MDEditor from "@uiw/react-md-editor";
import { getProduct, updateProduct, getAllCategory, getAllBrand } from "./services/ProductService";
import ImageCarousel from "./partials/ImageCarousel";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("product_details");
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const { register, handleSubmit, setValue, watch, reset } = useForm();


  //theo doi trang thai
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    try {
      const [productData, categoryData, brandData] = await Promise.all([
        getProduct(id),
        getAllCategory(),
        getAllBrand()
      ]);

      if (productData) {
        setProduct(productData);
        setValue("productName", productData.productName);
        setValue("productBarcode", productData.productBarcode);
        setValue("productDescription", productData.productDescription);
        setValue("productCategoryId", categoryData?.data?.value.find(cat => cat.category === productData.category)?.id || "");
        setValue("brandId", brandData?.data?.value.find(brand => brand.brandName === productData.brandName)?.id || "");
        // setValue("imageLink", productData.imageLink);
        setValue("productPrice", productData.productPrice);
        setValue("status", productData.status);
        setValue("createdAt", productData.createdAt);
        setValue("updatedAt", productData.updatedAt);
      }

      setCategories(categoryData?.data?.value || []);
      setBrands(brandData?.data?.value || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [i18n.language]);


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (data) => {
    if (!isEditing) return;

    try {
      let imageFormData = null;
      if (imageFiles.length > 0) {
        imageFormData = new FormData();
        imageFiles.forEach((image) => {
          imageFormData.append("fileDtos", image);
        });
      }

      await updateProduct(id, data, imageFormData);
      fetchData();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancel = () => {
    // Khôi phục lại dữ liệu gốc từ sản phẩm
    reset({
      productName: product.productName,
      productBarcode: product.productBarcode,
      productDescription: product.productDescription,
      productCategoryId: categories.find(cat => cat.category === product.category)?.id || "",
      brandId: brands.find(brand => brand.brandName === product.brandName)?.id || "",
      productPrice: product.productPrice,
      status: product.status,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
    setIsEditing(false);
  };



  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <Breadcrumb />
      {product ? (
        <form onSubmit={handleSubmit(handleSave)}>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Cột hình ảnh (7/12) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              <ImageCarousel
                linkImage={product.imageLink}
                imagesWatch={watch("imageLink") || []}
                setImages={(newImages) => setValue("imageLink", newImages)}
                setImageFiles={setImageFiles}
                isEditing={isEditing}
              />
            </div>

            {/* Cột thông tin sản phẩm (5/12) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              {/* Tiêu đề sản phẩm */}
              <h1 className="text-4xl font-bold mb-6">
                {isEditing ? (
                  <input
                    {...register("productName", { required: true })}
                    className="border p-3 rounded w-full text-2xl"
                  />
                ) : (
                  product.productName
                )}
              </h1>

              {/* Mã vạch */}
              <p className="text-gray-700 text-xl mb-4">
                <strong className="font-semibold">{t("product_details.barcode")}:</strong> {product.productBarcode}
              </p>

              {/* Danh mục */}
              <p className="text-gray-700 text-xl mb-4">
                <strong className="font-semibold">{t("product_details.category")}:</strong>
                {isEditing ? (
                  <select {...register("productCategoryId")} className="border p-2 rounded w-full text-lg">
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.category}</option>
                    ))}
                  </select>
                ) : (
                  product.category
                )}
              </p>

              {/* Thương hiệu */}
              <p className="text-gray-700 text-xl mb-4">
                <strong className="font-semibold">{t("product_details.brand")}:</strong>
                {isEditing ? (
                  <select {...register("brandId")} className="border p-2 rounded w-full text-lg">
                    {brands.map(brand => (
                      <option key={brand.id} value={brand.id}>{brand.brandName}</option>
                    ))}
                  </select>
                ) : (
                  product.brandName
                )}
              </p>

              {/* Giá sản phẩm */}
              <p className="text-gray-700 text-xl mb-4">
                <strong className="font-semibold">{t("product_details.price")}:</strong>
                {isEditing ? (
                  <input
                    {...register("productPrice", { required: true })}
                    className="border p-2 rounded w-full text-lg"
                  />
                ) : (
                  product.productPrice
                )}
              </p>

              {/* Ngày tạo & cập nhật */}
              <p className="text-gray-700 text-xl mb-4">
                <strong className="font-semibold">{t("product_details.created_at")}:</strong> {product.createdAt}
              </p>
              <p className="text-gray-700 text-xl mb-4">
                <strong className="font-semibold">{t("product_details.updated_at")}:</strong> {product.updatedAt}
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 border-t" data-color-mode="light">
            <h2 className="text-xl font-semibold mb-2">{t("product_details.description")}</h2>
            {isEditing ? (
              <MDEditor
                value={watch("productDescription")}
                onChange={(val) => setValue("productDescription", val)}
              />
            ) : (
              <MDEditor.Markdown source={watch("productDescription") || ''} />
            )}
          </div>


          {/* Nút Save và Cancel */}
          {isEditing && (
            <div className="flex justify-end mt-6 gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <FaTimes /> {t("product_details.cancel")}
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <FaSave /> {t("product_details.save")}
              </button>
            </div>
          )}


        </form>
      ) : (
        <p className="text-center text-red-500">{t("product_details.not_found")}</p>
      )}

      {/* Nút "Chỉnh sửa" được đặt bên ngoài form để không kích hoạt submit */}
      {/* 1 con bug khong duoc quyen quen  */}
      {!isEditing && (
        <div className="flex justify-end mt-6">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={handleEdit}
          >
            <FaEdit /> {t("product_details.edit")}
          </button>
        </div>
      )}
    </div>
  );
}
