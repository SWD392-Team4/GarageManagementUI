import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createService, createServiceImage, getCarCategory, getCarPart } from "./services/ServiceAPI";
import { FaTrash } from "react-icons/fa";
import MDEditor from "@uiw/react-md-editor";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";


export default function CreateServicePage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [payload, setPayload] = useState(null);
  const [carCategories, setCarCategories] = useState([]);
  const [carParts, setCarParts] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const { t } = useTranslation("create_service_page");

  const serviceCategoryKeys = ["repair", "maintenance", "upgrade", "car_wash", "detailing"];
  const actionKeys = ["inspect", "replace", "lubricate", "align", "refill", "repair", "clean", "upgrade", "restore", "update", "polish", "protect", "deodorize", "condition", "remove", "restore_lighting"];
  const workNatureKeys = ["preventive", "corrective", "enhancement", "digital", "aesthetic"];



  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCarCategory();
      const parts = await getCarPart();
      setCarCategories(categories || []);
      setCarParts(parts || []);
    };
    fetchData();
  }, []);


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
      carPartId: data.CarPartName,
      carCategoryId: data.CarCategoryName,
    };

    setPayload(formData);

    let imageFormData = null;
    if (selectedImages.length > 0) {
      imageFormData = new FormData();
      selectedImages.forEach((image) => {
        imageFormData.append("images", image);
      });
    }
    await createService(formData, imageFormData);

  };

  return (
    <div className="bg-white shadow-lg p-6">
      <Breadcrumb />
      <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input {...register("ServiceName", { required: t("errors.service_name") })} placeholder={t("form.service_name")} className="border p-2 w-full" />
            {errors.ServiceName && <p className="text-red-500 text-sm">{errors.ServiceName.message}</p>}
          </div>

          <div>
            <select {...register("CarCategoryName", { required: t("errors.car_category") })} className="border p-2 w-full">
              <option value="">{t("form.select_car_category")}</option>
              {carCategories.map((category) => (
                <option key={category.id} value={category.id}>{category.category}</option>
              ))}
            </select>
            {errors.CarCategoryName && <p className="text-red-500 text-sm">{errors.CarCategoryName.message}</p>}
          </div>

          <div>
            <select {...register("CarPartName", { required: t("errors.car_part") })} className="border p-2 w-full">
              <option value="">{t("form.select_car_part")}</option>
              {carParts.map((part) => (
                <option key={part.id} value={part.id}>{part.partName}</option>
              ))}
            </select>
            {errors.CarPartName && <p className="text-red-500 text-sm">{errors.CarPartName.message}</p>}
          </div>

          <div>
            <select {...register("Category", { required: t("errors.category") })} className="border p-2 w-full">
              <option value="">{t("form.select_service_category")}</option>
              {serviceCategoryKeys.map((key, index) => (
                <option key={index} value={key}>{t(`categories.${key}`)}</option>
              ))}
            </select>
            {errors.Category && <p className="text-red-500 text-sm">{errors.Category.message}</p>}
          </div>

          <div>
            <select {...register("Action", { required: t("errors.action") })} className="border p-2 w-full">
              <option value="">{t("form.select_action")}</option>
              {actionKeys.map((key, index) => (
                <option key={index} value={key}>{t(`actions.${key}`)}</option>
              ))}
            </select>
            {errors.Action && <p className="text-red-500 text-sm">{errors.Action.message}</p>}
          </div>

          <div>
            <select {...register("WorkNature", { required: t("errors.work_nature") })} className="border p-2 w-full">
              <option value="">{t("form.select_work_nature")}</option>
              {workNatureKeys.map((key, index) => (
                <option key={index} value={key}>{t(`work_natures.${key}`)}</option>
              ))}
            </select>
            {errors.WorkNature && <p className="text-red-500 text-sm">{errors.WorkNature.message}</p>}
          </div>


          <div>
            <input type="number" {...register("EstimatedHours", { required: t("errors.estimated_hours"), min: 0 })} placeholder={t("form.estimated_hours")} className="border p-2 w-full" />
            {errors.EstimatedHours && <p className="text-red-500 text-sm">{errors.EstimatedHours.message}</p>}
          </div>

          <div>
            <input type="number" {...register("ServicePrice", { required: t("errors.service_price"), min: 0 })} placeholder={t("form.service_price")} className="border p-2 w-full" />
            {errors.ServicePrice && <p className="text-red-500 text-sm">{errors.ServicePrice.message}</p>}
          </div>
        </div>

        <div className="col-span-2" data-color-mode="light">
          <label className="block text-gray-700 font-semibold">{t("form.description")}</label>
          <MDEditor value={watch("Description")} onChange={(value) => setValue("Description", value)} />
        </div>

        <input type="file" multiple onChange={handleImageChange} className="border rounded p-2 w-full" />
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

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">{t("form.create_service")}</button>
      </form>
      {payload && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Payload Preview:</h3>
          <pre className="text-sm text-gray-700">{JSON.stringify(payload, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
