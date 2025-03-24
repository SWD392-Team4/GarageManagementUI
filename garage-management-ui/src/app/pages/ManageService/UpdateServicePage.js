import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  getServiceDetails,
  getCarCategory,
  getCarPart,
  createServiceImage,
  updateService,
} from "./services/ServiceAPI";
import MDEditor from "@uiw/react-md-editor";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import { useTranslation } from "react-i18next";
import AsyncSelect from "react-select/async";
import { parseVietnameseCurrency } from "./schemas/ServiceSchemas";

export default function UpdateServicePage() {
  const { t } = useTranslation("update_service_page");
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  // luu tru cac thong tin
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
    "Preventive",
    "Corrective",
    "Enhancement",
    "Digital",
    "Aesthetic",
  ];
  const [carCategories, setCarCategories] = useState([]);
  const [carParts, setCarParts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const fetchData = async () => {
    try {
      const [carPartData, carCategoryData, serviceData] = await Promise.all([
        getCarPart(),
        getCarCategory(),
        getServiceDetails(id),
      ]);

      if (carCategoryData) {
        setCarCategories(carCategoryData);
      }
      if (carPartData) {
        setCarParts(carPartData);
      }
      if (serviceData) {
        setService(serviceData);
        setValue("ServiceName", serviceData.serviceName);
        setValue("ServiceCategory", serviceData.serviceCategory);
        setValue("CarCategory", serviceData.carCategoryId); // Lưu ID danh mục xe
        setValue("CarCategoryName", serviceData.carCategory); // Lưu tên danh mục xe
        setValue("CarPart", serviceData.carPartId); // Lưu ID phụ tùng
        setValue("CarPartName", serviceData.carPart); // Lưu tên phụ tùng
        setValue("Action", serviceData.action);
        setValue("WorkNature", serviceData.workNature);
        setValue("EstimatedHours", serviceData.estimatedHours);
        setValue("ServicePrice", parseVietnameseCurrency(serviceData.price));
        setValue("Description", serviceData.description);
        setValue("Status", serviceData.status);

        // console.log("check thong tin :", serviceData);

        // Chuyển imageLink thành mảng để hiển thị
        if (serviceData.imageLink) {
          setSelectedImages(
            Array.isArray(serviceData.imageLink)
              ? serviceData.imageLink
              : [serviceData.imageLink]
          );
        }
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, setValue]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setSelectedImages((prev) => {
      // Lọc ra file mới chưa có trong danh sách
      const uniqueFiles = files.filter(
        (file) => !prev.some((prevFile) => prevFile.name === file.name)
      );

      return [
        ...prev, // Giữ lại tất cả ảnh cũ
        ...uniqueFiles, // Thêm ảnh mới vào danh sách
      ];
    });
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    if (!isEditing) return;

    console.log("check data gui ve back end", data);

    try {
      // Chuẩn bị dữ liệu cập nhật dịch vụ
      const updatedService = {
        serviceName: data.ServiceName,
        serviceCategory: data.ServiceCategory,
        servicePrice: data.ServicePrice,
        workNature: data.WorkNature,
        action: data.Action,
        description: data.Description,
        estimatedHours: data.EstimatedHours,
        carPartId: data.CarPart, // Đảm bảo đây là ID
        carPartName:
          carParts.find((part) => part.id === data.CarPart)?.partName || "", // Lấy tên từ ID
        carCategoryId: data.CarCategory,
        carCategoryName:
          carCategories.find((category) => category.id === data.CarCategory)
            ?.category || "", // Lấy tên từ ID
        status: data.Status,
      };

      console.log("thong tin gui cho api : ", updatedService);

      // Gửi yêu cầu cập nhật dịch vụ trước
      await updateService(id, updatedService);
      // console.log("Check response: ", updateResponse);
      // Lọc ra chỉ những ảnh mới (file)
      const newImages = selectedImages.filter((img) => img instanceof File);

      if (newImages.length > 0) {
        const formData = new FormData();
        newImages.forEach((image) => {
          formData.append("fileDtos", image);
        });
        await createServiceImage(id, formData);
      }

      setIsEditing(false);
      fetchData();
    } catch (error) {
      console.error("Lỗi khi cập nhật dịch vụ:", error);
    }
  };

  const loadCarCategoryOption = async (inputValue) => {
    return carCategories
      .filter((category) =>
        category.category.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((category) => ({
        label: category.category,
        value: category.id,
      }));
  };

  const loadCarPartOption = async (inputValue) => {
    return carParts
      .filter((part) =>
        part.partName.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((part) => ({
        label: part.partName,
        value: part.id,
      }));
  };

  return (
    <div className="bg-white shadow-lg p-6">
      <Breadcrumb />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">
          {t("update_service_page.title")}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold">
              {t("update_service_page.form.service_name")}
            </label>
            <input
              {...register("ServiceName", {
                required: "Tên dịch vụ là bắt buộc",
              })}
              placeholder={t("update_service_page.placeholders.service_name")}
              className="border p-2 w-full bg-white"
              disabled={!isEditing}
            />
            {errors.ServiceName && (
              <p className="text-red-500 text-sm">
                {errors.ServiceName.message}
              </p>
            )}
          </div>

          {/* Select Service Category */}
          <div>
            <label className="block text-gray-700 font-semibold">
              {t("update_service_page.form.service_category")}
            </label>

            <select
              {...register("ServiceCategory", {
                required: "Danh mục xe là bắt buộc",
              })}
              className="border p-2 w-full"
              disabled={!isEditing}
            >
              {service && (
                <option value={service.serviceCategory}>
                  {service.serviceCategory}
                </option>
              )}
              {serviceCategoryKeys.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.ServiceCategory && (
              <p className="text-red-500 text-sm">
                {errors.ServiceCategory.message}
              </p>
            )}
          </div>

          {/* Select Car Part */}
          <div>
            <label className="block text-gray-700 font-semibold">
              {t("update_service_page.form.car_part")}
            </label>
            <AsyncSelect
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: "white",
                  borderColor: state.isFocused ? "grey" : "grey",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "white",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                  color: "black",
                }),
              }}
              cacheOptions
              defaultOptions={carParts.map((part) => ({
                label: part.partName,
                value: part.id,
              }))}
              loadOptions={loadCarPartOption}
              isDisabled={!isEditing}
              value={
                carParts.find((part) => part.id === watch("CarPart"))
                  ? {
                      label: carParts.find(
                        (part) => part.id === watch("CarPart")
                      ).partName,
                      value: watch("CarPart"),
                    }
                  : null
              }
              onChange={(selectedOption) => {
                setValue("CarPart", selectedOption ? selectedOption.value : "");
              }}
              placeholder={t("update_service_page.form.select_car_part")}
              isClearable
            />
            {errors.CarPart && (
              <p className="text-red-500 text-sm">{errors.CarPart.message}</p>
            )}
          </div>

          {/* Select Car Category */}
          <div>
            <label className="block text-gray-700 font-semibold">
              {t("update_service_page.form.car_category")}
            </label>
            <AsyncSelect
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: "white",
                  borderColor: state.isFocused ? "grey" : "grey",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "white",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                  color: "black",
                }),
              }}
              cacheOptions
              defaultOptions={carCategories.map((category) => ({
                label: category.category,
                value: category.id,
              }))}
              loadOptions={loadCarCategoryOption}
              isDisabled={!isEditing}
              value={
                carCategories.find(
                  (category) => category.id === watch("CarCategory")
                )
                  ? {
                      label: carCategories.find(
                        (category) => category.id === watch("CarCategory")
                      ).category,
                      value: watch("CarCategory"),
                    }
                  : null
              }
              onChange={(selectedOption) => {
                setValue(
                  "CarCategory",
                  selectedOption ? selectedOption.value : ""
                );
              }}
              placeholder={t("update_service_page.form.select_car_category")}
              isClearable
            />
            {errors.CarCategory && (
              <p className="text-red-500 text-sm">
                {errors.CarCategory.message}
              </p>
            )}
          </div>

          {/* Select Action */}
          <div>
            <label className="block text-gray-700 font-semibold">
              {t("update_service_page.form.action")}
            </label>
            <select
              {...register("Action", { required: "Hành động là bắt buộc" })}
              className="border p-2 w-full"
              disabled={!isEditing}
            >
              {service && (
                <option value={service.action}>{service.action}</option>
              )}
              {actionKeys.map((key, index) => (
                <option key={index} value={key}>
                  {key}
                </option>
              ))}
            </select>
            {errors.Action && (
              <p className="text-red-500 text-sm">{errors.Action.message}</p>
            )}
          </div>

          {/* Select Work Nature */}
          <div>
            <label className="block text-gray-700 font-semibold">
              {t("update_service_page.form.work_nature")}
            </label>
            <select
              {...register("WorkNature", {
                required: "Bản chất công việc là bắt buộc",
              })}
              className="border p-2 w-full"
              disabled={!isEditing}
            >
              {service && (
                <option value={service.workNature}>{service.workNature}</option>
              )}
              {workNatureKeys.map((key, index) => (
                <option key={index} value={key}>
                  {key}
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
              {t("update_service_page.form.estimated_hours")}
            </label>

            <input
              type="number"
              {...register("EstimatedHours", {
                required: "Số giờ ước tính là bắt buộc",
                min: 0,
              })}
              placeholder={t(
                "update_service_page.placeholders.estimated_hours"
              )}
              className="border p-2 w-full bg-white"
              disabled={!isEditing}
            />
            {errors.EstimatedHours && (
              <p className="text-red-500 text-sm">
                {errors.EstimatedHours.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              {t("update_service_page.form.price")}
            </label>

            {!isEditing ? (
              // Chế độ hiển thị (format currency)
              <input
                type="currency"
                value={service?.price} // Hiển thị dạng tiền tệ
                className="border p-2 w-full bg-white"
                disabled
              />
            ) : (
              // Chế độ chỉnh sửa (chỉ nhập số)
              <input
                type="text"
                {...register("ServicePrice", {
                  required: "Giá dịch vụ là bắt buộc",
                  min: 0,
                })}
                defaultValue={service?.price}
                placeholder={t("update_service_page.placeholders.price")}
                className="border p-2 w-full"
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, ""); // Chỉ giữ lại số
                  setValue("ServicePrice", rawValue); // Cập nhật giá trị nhập
                }}
              />
            )}

            {errors.ServicePrice && (
              <p className="text-red-500 text-sm">
                {errors.ServicePrice.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              {t("update_service_page.form.status")}
            </label>
            <select
              {...register("Status")}
              className="border p-2 w-full"
              disabled={!isEditing}
            >
              <option value="">
                {t("update_service_page.form.select_status")}
              </option>
              <option value="Active">
                {t("update_service_page.form.status_active")}
              </option>
              <option value="Inactive">
                {t("update_service_page.form.status_inactive")}
              </option>
            </select>
            {errors.Status && (
              <p className="text-red-500 text-sm">{errors.Status.message}</p>
            )}
          </div>
        </div>

        {/* Mô tả */}
        <div className="col-span-2" data-color-mode="light">
          <label className="block text-gray-700 font-semibold">
            {t("update_service_page.form.description")}
          </label>
          <MDEditor
            value={watch("Description")}
            onChange={(value) => isEditing && setValue("Description", value)}
            placeholder={t("update_service_page.placeholders.description")}
          />
        </div>

        {/* Upload ảnh */}

        {/* Upload Images */}
        <label className="block text-gray-700 font-semibold">
          {t("update_service_page.form.images")}
        </label>

        <div className="mt-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {selectedImages.length > 0 ? (
            selectedImages.map((file, index) => (
              <div
                key={index}
                className="relative group rounded-lg overflow-hidden shadow-lg border border-gray-200"
              >
                <img
                  src={
                    typeof file === "string" ? file : URL.createObjectURL(file)
                  }
                  alt="Preview"
                  className="w-full h-40 object-cover transition-transform duration-300 transform group-hover:scale-105"
                />
                {isEditing && (
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-75 hover:opacity-100"
                    onClick={() => removeImage(index)}
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">
              {t("update_service_page.form.no_images")}
            </p>
          )}
        </div>

        {/* Input file upload */}
        {isEditing && (
          <div className="mt-4">
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="border rounded p-2 w-full"
              accept="image/*"
            />
          </div>
        )}

        {/* Nút Chỉnh sửa bên ngoài form */}
        {!isEditing && (
          <div className="flex justify-end mt-6">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 flex items-center gap-2"
              onClick={() => setIsEditing(true)}
            >
              <FaEdit />
              {t("update_service_page.buttons.edit")}
            </button>
          </div>
        )}

        {/* Nút "Cập nhật dịch vụ" chỉ hiển thị khi đang chỉnh sửa */}
        {isEditing && (
          <div className="flex justify-end mt-6 space-x-2">
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center gap-2"
              onClick={() => {
                setIsEditing(false);
                fetchData(); // Load lại dữ liệu cũ từ API
              }}
            >
              <FaTrash />
              {t("update_service_page.buttons.cancel")}
            </button>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center gap-2"
            >
              <FaSave />
              {t("update_service_page.buttons.save_changes")}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
