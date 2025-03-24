import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  createService,
  createServiceImage,
  getCarCategory,
  getCarPart,
} from "./services/ServiceAPI";
import { FaTrash } from "react-icons/fa";
import MDEditor from "@uiw/react-md-editor";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import AsyncSelect from "react-select/async";

export default function CreateServicePage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // const [payload, setPayload] = useState(null);
  const [carCategories, setCarCategories] = useState([]);
  const [carParts, setCarParts] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isCarCategoriesLoaded, setIsCarCategoriesLoaded] = useState(false);
  const [isCarPartsLoaded, setIsCarPartsLoaded] = useState(false);
  const { t } = useTranslation("create_service_page");

  const serviceCategoryKeys = [
    "Repair",
    "Maintenance",
    "Upgrade",
    "CarWash",
    "Detailing",
  ];
  const actionKeys = [
    "Inspect",
    "Replace",
    "Lubricate",
    "Align",
    "Refill",
    "Repair",
    "Clean",
    "Upgrade",
    "Restore",
    "Update",
    "Polish",
    "Protect",
    "Deodorize",
    "Condition",
    "Remove",
    "RestoreLighting",
  ];
  const workNatureKeys = [
    "preventive",
    "corrective",
    "enhancement",
    "digital",
    "aesthetic",
  ];

  const fetchCarCategories = async () => {
    try {
      const categories = await getCarCategory();
      setCarCategories(categories || []);
      setIsCarCategoriesLoaded(true);
    } catch (error) {
      console.error("❌ Error fetching car categories:", error);
    }
  };

  const fetchCarParts = async () => {
    try {
      const parts = await getCarPart();
      setCarParts(parts || []);
      setIsCarPartsLoaded(true);
    } catch (error) {
      console.error("❌ Error fetching car parts:", error);
    }
  };

  useEffect(() => {
    fetchCarCategories();
    fetchCarParts();
  }, []);

  const loadCarCategoryOption = (inputValue) => {
    return new Promise((resolve) => {
      if (!isCarCategoriesLoaded) {
        console.warn("⚠️ Car categories not loaded yet, waiting...");
        fetchCarCategories().then(() => {
          resolve(filterCarCategories(inputValue));
        });
      } else {
        resolve(filterCarCategories(inputValue));
      }
    });
  };

  const loadCarPartOption = (inputValue) => {
    return new Promise((resolve) => {
      if (!isCarPartsLoaded) {
        console.warn("⚠️ Car parts not loaded yet, waiting...");
        fetchCarParts().then(() => {
          resolve(filterCarPart(inputValue));
        });
      } else {
        resolve(filterCarPart(inputValue));
      }
    });
  };

  const filterCarPart = (inputValue) => {
    return carParts
      .filter((i) =>
        i?.partName?.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((i) => ({
        label: i.partName,
        value: i.id,
      }));
  };

  const filterCarCategories = (inputValue) => {
    return carCategories
      .filter((i) =>
        i?.category?.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((i) => ({
        label: i.category,
        value: i.id,
      }));
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    const formData = {
      serviceName: data.ServiceName,
      serviceCategory: data.Category,
      servicePrice: data.ServicePrice,
      workNature: data.WorkNature,
      action: data.Action,
      description: data.Description,
      estimatedHours: data.EstimatedHours,
      carPartId: data.CarPart, // Lưu đúng ID
      carPartName:
        carParts.find((part) => part.id === data.CarPart)?.partName || "", // Lấy tên từ ID
      carCategoryId: data.CarCategory, // Lưu đúng ID
      carCategoryName:
        carCategories.find((category) => category.id === data.CarCategory)
          ?.category || "", // Lấy tên từ ID
    };

    // setPayload(formData);

    let imageFormData = null;
    if (selectedImages.length > 0) {
      imageFormData = new FormData();
      selectedImages.forEach((image) => {
        imageFormData.append("fileDtos", image);
      });
    }
    await createService(formData, imageFormData);
    reset(); // Reset toàn bộ form về trạng thái ban đầu
    setSelectedImages([]); // Xóa ảnh đã chọn
  };

  return (
    <div className="bg-white shadow-lg p-6">
      <Breadcrumb />
      <h2 className="text-xl font-semibold mb-4">
        {t("create_service_page.title")}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold">
              {t("create_service_page.service_name")}
            </label>
            <input
              {...register("ServiceName", {
                required: t("errors.service_name"),
              })}
              placeholder={t("create_service_page.form.service_name")}
              className="border p-2 w-full"
            />
            {errors.ServiceName && (
              <p className="text-red-500 text-sm">
                {errors.ServiceName.message}
              </p>
            )}
          </div>

          {/* Car Category */}
          <div>
            <label className="block text-gray-700 font-semibold">
              {t("create_service_page.car_category")}
            </label>
            <AsyncSelect
              cacheOptions
              loadOptions={loadCarCategoryOption}
              defaultOptions={carCategories.map((i) => ({
                label: i.category,
                value: i.id,
              }))} // Giảm gọi API khi render lần đầu
              onChange={(selectedOption) => {
                console.log("Selected Car Category:", selectedOption);
                setValue(
                  "CarCategory",
                  selectedOption ? selectedOption.value : ""
                );
              }}
              placeholder={t(
                "create_service_page.form.select_service_category"
              )}
              isClearable
            />
          </div>

          {/* Car Parts */}
          <div>
            <label className="block text-gray-700 font-semibold">
              {t("create_service_page.car_part")}
            </label>
            <AsyncSelect
              cacheOptions
              loadOptions={loadCarPartOption}
              defaultOptions={carParts.map((i) => ({
                label: i.partName,
                value: i.id,
              }))} // Giảm gọi API khi render lần đầu
              onChange={(selectedOption) => {
                console.log("Selected Car Part:", selectedOption);
                setValue("CarPart", selectedOption ? selectedOption.value : "");
              }}
              placeholder={t("create_service_page.form.select_car_part")}
              isClearable
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              {t("create_service_page.service_category")}
            </label>
            <select
              {...register("Category", { required: t("errors.category") })}
              className="border p-2 w-full"
            >
              <option value="">
                {t("create_service_page.form.select_service_category")}
              </option>
              {serviceCategoryKeys.map((key, index) => (
                <option key={index} value={key}>
                  {t(`create_service_page.categories.${key}`)}
                </option>
              ))}
            </select>
            {errors.Category && (
              <p className="text-red-500 text-sm">{errors.Category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              {t("create_service_page.action")}
            </label>
            <select
              {...register("Action", { required: t("errors.action") })}
              className="border p-2 w-full"
            >
              <option value="">
                {t("create_service_page.form.select_action")}
              </option>
              {actionKeys.map((key, index) => (
                <option key={index} value={key}>
                  {t(`create_service_page.actions.${key}`)}
                </option>
              ))}
            </select>
            {errors.Action && (
              <p className="text-red-500 text-sm">{errors.Action.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              {t("create_service_page.work_nature")}
            </label>
            <select
              {...register("WorkNature", { required: t("errors.work_nature") })}
              className="border p-2 w-full"
            >
              <option value="">
                {t("create_service_page.form.select_work_nature")}
              </option>
              {workNatureKeys.map((key, index) => (
                <option key={index} value={key}>
                  {t(`create_service_page.work_natures.${key}`)}
                </option>
              ))}
            </select>
            {errors.WorkNature && (
              <p className="text-red-500 text-sm">
                {errors.WorkNature.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              {t("create_service_page.estimated_hours")}
            </label>
            <input
              type="number"
              {...register("EstimatedHours", {
                required: t("errors.estimated_hours"),
                min: 0,
              })}
              placeholder={t("create_service_page.form.estimated_hours")}
              className="border p-2 w-full"
            />
            {errors.EstimatedHours && (
              <p className="text-red-500 text-sm">
                {errors.EstimatedHours.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              {t("create_service_page.service_price")}
            </label>
            <input
              type="number"
              {...register("ServicePrice", {
                required: t("errors.service_price"),
                min: 0,
              })}
              placeholder={t("create_service_page.form.service_price")}
              className="border p-2 w-full"
            />
            {errors.ServicePrice && (
              <p className="text-red-500 text-sm">
                {errors.ServicePrice.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2" data-color-mode="light">
          <label className="block text-gray-700 font-semibold">
            {t("create_service_page.form.description")}
          </label>
          <MDEditor
            value={watch("Description")}
            onChange={(value) => setValue("Description", value)}
          />
        </div>

        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="border rounded p-2 w-full"
        />
        <div className="mt-4 grid grid-cols-6 gap-3">
          <label className="block text-gray-700 font-semibold">
            {t("create_service_page.form.service_image")}
          </label>
          {selectedImages.length > 0 ? (
            selectedImages.map((file, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden shadow-lg group"
              >
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
            ))
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {[...Array(1)].map((_, index) => (
                <div
                  key={index}
                  className="w-64 h-64 bg-gray-300 animate-pulse rounded-lg"
                ></div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {t("create_service_page.form.create_service")}
        </button>
      </form>
      {/* {payload && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Payload Preview:</h3>
          <pre className="text-sm text-gray-700">{JSON.stringify(payload, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
}
