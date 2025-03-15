import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { FaEdit, FaPlus, FaSave, FaTimes } from "react-icons/fa";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import MDEditor from "@uiw/react-md-editor";
import { getProduct, updateProduct, getAllCategory, getAllBrand } from "./services/ProductService";
import ImageCarousel from "./partials/ImageCarousel";
import { parseVietnameseCurrency } from "./schemas/ProductValid";
import AsyncSelect from 'react-select/async';
import ModelSelectCarPart from "./models/ModelSelectCarPart";
import ModelSelectCarModel from "./models/ModelSelectCarModel";

export default function ProductDetails() {
  const { id } = useParams();
  const { t, i18n } = useTranslation("product_details");
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false);
  const [isBrandsLoaded, setIsBrandsLoaded] = useState(false);
  const [selectedCarParts, setSelectedCarParts] = useState([]);
  const [selectedCarModels, setSelectedCarModels] = useState([]);
  const [isCarPartModalOpen, setIsCarPartModalOpen] = useState(false);
  const [isCarModelModalOpen, setIsCarModelModalOpen] = useState(false);


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
        setValue("productCategoryId", productData.productCategoryId);
        setValue("brandId", productData.brandId);
        setValue("productPrice", parseVietnameseCurrency(productData.productPrice));
        setValue("status", productData.status);
        setValue("createdAt", productData.createdAt);
        setValue("updatedAt", productData.updatedAt);
        setSelectedCarParts(productData.carParts || []);
        setSelectedCarModels(productData.carModels || []);

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
  ///////////////////////////////////////////////////////////////////////////////////

  const loadCategoryOptions = (inputValue) => {
    return new Promise((resolve) => {
      if (!isCategoriesLoaded) {
        fetchCategories().then(() => {
          resolve(filterCategories(inputValue));
        });
      } else {
        resolve(filterCategories(inputValue));
      }
    });
  };

  const loadBrandOptions = (inputValue) => {
    return new Promise((resolve) => {
      if (!isBrandsLoaded) {
        fetchBrands().then(() => {
          resolve(filterBrands(inputValue));
        });
      } else {
        resolve(filterBrands(inputValue));
      }
    });
  };

  // Lọc danh mục sản phẩm theo input
  const filterCategories = (inputValue) => {
    return categories
      .filter((cat) => cat.category.toLowerCase().includes(inputValue.toLowerCase()))
      .map((cat) => ({ value: cat.id, label: cat.category }));
  };

  // Lọc thương hiệu theo input
  const filterBrands = (inputValue) => {
    return brands
      .filter((brand) => brand.brandName.toLowerCase().includes(inputValue.toLowerCase()))
      .map((brand) => ({ value: brand.id, label: brand.brandName }));
  };

  // Hàm tải danh mục sản phẩm (chỉ gọi API 1 lần)
  const fetchCategories = async () => {
    try {
      const response = await getAllCategory();
      setCategories(response?.data?.value || []);
      setIsCategoriesLoaded(true);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Hàm tải thương hiệu (chỉ gọi API 1 lần)
  const fetchBrands = async () => {
    try {
      const response = await getAllBrand();
      setBrands(response?.data?.value || []);
      setIsBrandsLoaded(true);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };




  ///////////////////////////////////////////////////////////////////////////////////
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

      const payload = {
        ...data,
        carPartIds: selectedCarParts.map((part) => part.id), // ✅ Gửi danh sách Car Part
        carModelIds: selectedCarModels.map((model) => model.id) // ✅ Gửi danh sách Car Model
      };

      await updateProduct(id, payload, imageFormData);
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
      productCategoryId: product.productCategoryId,
      brandId: product.brandId,
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
                <strong className="font-semibold">{t("product_details.barcode")}: </strong>{product.productBarcode}
              </p>

              {/* Danh mục sản phẩm */}
              <p className="text-gray-700 text-xl mb-4">
                <strong className="font-semibold">{t("product_details.category")}: </strong>
                {isEditing ? (
                  <AsyncSelect
                    cacheOptions
                    loadOptions={loadCategoryOptions}
                    defaultOptions={categories.map(cat => ({ value: cat.id, label: cat.category }))}
                    isDisabled={!isEditing}
                    onChange={(selectedOption) => setValue("productCategoryId", selectedOption ? selectedOption.value : "")}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder={t("product_details.select_category")}
                    isClearable
                    defaultValue={
                      product.productCategoryId ? { value: product.productCategoryId, label: product.category } : null
                    }
                  />
                ) : (
                  product.category
                )}
              </p>

              {/* Thương hiệu */}
              <p className="text-gray-700 text-xl mb-4">
                <strong className="font-semibold">{t("product_details.brand")}: </strong>
                {isEditing ? (
                  <AsyncSelect
                    cacheOptions
                    loadOptions={loadBrandOptions}
                    defaultOptions={brands.map(brand => ({ value: brand.id, label: brand.brandName }))}
                    isDisabled={!isEditing}
                    onChange={(selectedOption) => setValue("brandId", selectedOption ? selectedOption.value : "")}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder={t("product_details.select_brand")}
                    isClearable
                    defaultValue={
                      product.brandId ? { value: product.brandId, label: product.brandName } : null
                    }
                  />
                ) : (
                  product.brandName
                )}
              </p>


              {/* Giá sản phẩm */}
              <p className="text-gray-700 text-xl mb-4">
                <strong className="font-semibold">{t("product_details.price")}: </strong>
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
                <strong className="font-semibold">{t("product_details.created_at")}: </strong> {product.createdAt}
              </p>
              <p className="text-gray-700 text-xl mb-4">
                <strong className="font-semibold">{t("product_details.updated_at")}: </strong> {product.updatedAt}
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 border-t" data-color-mode="light">

            {/* Car Parts */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">{t("product_details.car_parts")}</h2>

              {/* Nếu đang chỉnh sửa, hiển thị nút chọn Car Parts */}
              {isEditing && (
                <button
                  type="button"
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => setIsCarPartModalOpen(true)}
                >
                  <FaPlus /> {t("product_details.select_car_parts")}
                </button>
              )}

              {/* Hiển thị danh sách Car Parts từ product hoặc state */}
              <div className="mt-2 flex flex-wrap gap-2">
                {(isEditing ? selectedCarParts : product?.carParts || []).length > 0 ? (
                  (isEditing ? selectedCarParts : product.carParts).map((part) => (
                    <div key={part.id} className="bg-gray-200 px-3 py-1 rounded-lg text-gray-800 flex items-center gap-2">
                      {part.partName}

                      {/* Nếu đang chỉnh sửa, hiển thị nút xóa */}
                      {isEditing && (
                        <button
                          className="text-red-600"
                          onClick={() => setSelectedCarParts(selectedCarParts.filter((p) => p.id !== part.id))}
                        >
                          ✖
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">{t("product_details.no_car_parts")}</p>
                )}
              </div>
            </div>

            {/* Car Models */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">{t("product_details.car_models")}</h2>

              {/* Nếu đang chỉnh sửa, hiển thị nút chọn Car Models */}
              {isEditing && (
                <button
                  type="button"
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => setIsCarModelModalOpen(true)}
                >
                  <FaPlus /> {t("product_details.select_car_models")}
                </button>
              )}

              {/* Hiển thị danh sách Car Models từ product hoặc state */}
              <div className="mt-2 flex flex-wrap gap-2">
                {(isEditing ? selectedCarModels : product?.carModels || []).length > 0 ? (
                  (isEditing ? selectedCarModels : product.carModels).map((model) => (
                    <div key={model.id} className="bg-gray-200 px-3 py-1 rounded-lg text-gray-800 flex items-center gap-2">
                      {model.modelName}

                      {/* Nếu đang chỉnh sửa, hiển thị nút xóa */}
                      {isEditing && (
                        <button
                          className="text-red-600"
                          onClick={() => setSelectedCarModels(selectedCarModels.filter((m) => m.id !== model.id))}
                        >
                          ✖
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">{t("product_details.no_car_models")}</p>
                )}
              </div>
            </div>

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


          {/* Modal chọn Car Parts */}
          {isCarPartModalOpen && (
            <ModelSelectCarPart
              isOpen={isCarPartModalOpen}
              onClose={() => setIsCarPartModalOpen(false)}
              selectedCarParts={selectedCarParts}
              setSelectedCarParts={setSelectedCarParts}
            />
          )}

          {/* Modal chọn Car Models */}
          {isCarModelModalOpen && (
            <ModelSelectCarModel
              isOpen={isCarModelModalOpen}
              onClose={() => setIsCarModelModalOpen(false)}
              selectedCarModels={selectedCarModels}
              setSelectedCarModels={setSelectedCarModels}
            />
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
