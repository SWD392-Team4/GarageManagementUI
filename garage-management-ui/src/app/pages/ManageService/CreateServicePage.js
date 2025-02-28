import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createService, createServiceImage, getCarCategory, getCarPart } from "./services/ServiceAPI";
import { FaTrash } from "react-icons/fa";
import MDEditor from "@uiw/react-md-editor";
import { useTranslation } from "react-i18next";

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

  const serviceCategories = ["Sửa chữa", "Bảo dưỡng", "Nâng cấp", "Rửa xe", "Detailing"];
  const actions = [
    "Inspect/Check", "Replace", "Lubricate", "Align", "Refill/Recharge",
    "Repair", "Clean", "Upgrade", "Restore", "Update",
    "Polish", "Protect", "Deodorize", "Condition", "Remove",
    "Restore Lighting"
  ];
  const workNatures = [
    "Preventive Actions", "Corrective Actions", "Enhancement Actions", "Digital Actions", "Aesthetic Actions"
  ];

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

    // const response = await createService(formData);
    if (response) {
      console.log("Service created successfully", response);

      if (selectedImages.length > 0) {
        const imageFormData = new FormData();
        selectedImages.forEach((image) => {
          imageFormData.append("images", image);
        });
        await createServiceImage(response.data.id, imageFormData);
      }
    }
  };

  return (
    <div className="bg-white shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Service</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input {...register("ServiceName", { required: "Service name is required" })} placeholder="Service Name" className="border p-2 w-full" />
            {errors.ServiceName && <p className="text-red-500 text-sm">{errors.ServiceName.message}</p>}
          </div>

          <div>
            <select {...register("CarCategoryName", { required: "Car category is required" })} className="border p-2 w-full">
              <option value="">Select Car Category</option>
              {carCategories.map((category) => (
                <option key={category.Id} value={category.Id}>{category.PartCategory}</option>
              ))}
            </select>
            {errors.CarCategoryName && <p className="text-red-500 text-sm">{errors.CarCategoryName.message}</p>}
          </div>

          <div>
            <select {...register("CarPartName", { required: "Car part is required" })} className="border p-2 w-full">
              <option value="">Select Car Part</option>
              {carParts.map((part) => (
                <option key={part.Id} value={part.Id}>{part.PartName}</option>
              ))}
            </select>
            {errors.CarPartName && <p className="text-red-500 text-sm">{errors.CarPartName.message}</p>}
          </div>

          <div>
            <select {...register("Category", { required: "Category is required" })} className="border p-2 w-full">
              <option value="">Select Service Category</option>
              {serviceCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            {errors.Category && <p className="text-red-500 text-sm">{errors.Category.message}</p>}
          </div>

          <div>
            <select {...register("Action", { required: "Action is required" })} className="border p-2 w-full">
              <option value="">Select Action</option>
              {actions.map((action, index) => (
                <option key={index} value={action}>{action}</option>
              ))}
            </select>
            {errors.Action && <p className="text-red-500 text-sm">{errors.Action.message}</p>}
          </div>

          <div>
            <select {...register("WorkNature", { required: "Work nature is required" })} className="border p-2 w-full">
              <option value="">Select Work Nature</option>
              {workNatures.map((nature, index) => (
                <option key={index} value={nature}>{nature}</option>
              ))}
            </select>
            {errors.WorkNature && <p className="text-red-500 text-sm">{errors.WorkNature.message}</p>}
          </div>

          <div>
            <input type="number" {...register("EstimatedHours", { required: "Estimated hours is required", min: 0 })} placeholder="Estimated Hours" className="border p-2 w-full" />
            {errors.EstimatedHours && <p className="text-red-500 text-sm">{errors.EstimatedHours.message}</p>}
          </div>

          <div>
            <input type="number" {...register("ServicePrice", { required: "Service Price is required", min: 0 })} placeholder="Service Price" className="border p-2 w-full" />
            {errors.ServicePrice && <p className="text-red-500 text-sm">{errors.ServicePrice.message}</p>}
          </div>
        </div>


        <div className="col-span-2" data-color-mode="light">
          <label className="block text-gray-700 font-semibold">{t("create_service.description")}</label>
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

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Create Service</button>
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
