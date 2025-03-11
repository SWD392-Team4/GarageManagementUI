import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  getPackageType,
  getPakageTimeUnit,
  getAllCarCategory,
  getAllServiceCategory,
  getAllConditionType,
  createPackage,
} from "./services/PackageServiceAPI";
import SelectServiceModal from "./models/SelectServiceModal";
import SelectImageModal from "./models/SelectImageModal";

export default function CreatePackageServicePage() {
  const { register, handleSubmit, setValue, control, watch } = useForm({
    defaultValues: {
      PackageConditions: [],
      ServiceList: [],
      imagePackage: [],
    },
  });

  const [carCategories, setCarCategories] = useState([]);
  const [packageTypes, setPackageTypes] = useState([]);
  const [timeUnits, setTimeUnits] = useState([]);
  const [conditionTypes, setConditionTypes] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [isServiceModalOpen, setServiceModalOpen] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "PackageConditions",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const carData = await getAllCarCategory();
        const packageData = await getPackageType();
        const timeUnitData = await getPakageTimeUnit();
        const serviceData = await getAllServiceCategory();
        const allConditionTypes = await getAllConditionType();

        setCarCategories(carData?.data?.value || []);
        setPackageTypes(packageData || []);
        setTimeUnits(timeUnitData?.data?.value || []);
        setConditionTypes(allConditionTypes?.data?.value || []);
        setServiceCategories(serviceData?.data?.value || []);
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    }
    fetchData();
  }, []);

  const selectedConditions = watch("PackageConditions")
    .map((c) => c.ConditionType)
    .filter(Boolean);
  const selectedServices = watch("ServiceList");
  const selectedImages = watch("imagePackage");

  const getAvailableConditions = (currentCondition) => {
    return conditionTypes.filter(
      (c) => !selectedConditions.includes(c) || c === currentCondition
    );
  };

  const handleConditionChange = (index, value) => {
    setValue(`PackageConditions.${index}.ConditionType`, value);
    setValue(`PackageConditions.${index}.id`, `${value}_${index}`);
  };

  const handleServiceSelection = (selectedIds) => {
    setValue("ServiceList", selectedIds);
  };

  const handleImageSelection = (selectedFiles) => {
    setValue("imagePackage", [...watch("imagePackage"), ...selectedFiles]);
  };

  const onSubmit = async (data) => {
    try {
      // Tạo FormData để gửi theo định dạng multipart/form-data
      const formData = new FormData();

      // Các trường đơn giản
      formData.append("ServiceCategory", data.ServiceCategory);
      formData.append("CarCategoryId", data.CarCategoryId);
      formData.append("PackageName", data.PackageName);
      formData.append("Description", data.Description);
      formData.append("Type", data.Type);
      formData.append("PackagePrice", data.PackagePrice);
      formData.append("ValidityPeriod", data.ValidityPeriod);
      formData.append("TimeUnit", data.TimeUnit);
      formData.append("UsageLimit", data.UsageLimit);

      // Xử lý mảng ServiceList (nhiều giá trị với cùng key)
      if (data.ServiceList && Array.isArray(data.ServiceList)) {
        data.ServiceList.forEach((serviceId) => {
          formData.append("ServiceList", serviceId);
        });
      }

      // Xử lý mảng PackageConditions
      if (data.PackageConditions && Array.isArray(data.PackageConditions)) {
        data.PackageConditions.forEach((condition, index) => {
          formData.append(
            `PackageConditions[${index}].ConditionType`,
            condition.ConditionType
          );
          formData.append(
            `PackageConditions[${index}].ConditionValue`,
            condition.ConditionValue
          );
        });
      }

      // Xử lý danh sách ảnh (imagePackage)
      if (data.imagePackage && Array.isArray(data.imagePackage)) {
        data.imagePackage.forEach((file) => {
          formData.append("imagePackage", file, file.name);
        });
      }
      await createPackage(formData);
    } catch (error) {
      console.error("🚨 Lỗi khi gửi gói dịch vụ:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 shadow-lg max-w-2xl mx-auto rounded-lg">
      <h2 className="text-lg font-bold mb-4">Create Package Service</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <select {...register("ServiceCategory")} className="border p-2 w-full">
          <option value="">Select Service Category</option>
          {serviceCategories.map((service, index) => (
            <option key={index} value={service.serviceCategory}>
              {service.serviceCategory}
            </option>
          ))}
        </select>
        <select {...register("CarCategoryId")} className="border p-2 w-full">
          <option value="">Select Car Category</option>
          {carCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.category}
            </option>
          ))}
        </select>
        <input
          {...register("PackageName")}
          placeholder="Package Name"
          className="border p-2 w-full"
        />
        <textarea
          {...register("Description")}
          placeholder="Description"
          className="border p-2 w-full"
        />
        <select {...register("Type")} className="border p-2 w-full">
          <option value="">Select Type</option>
          {packageTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input
          {...register("PackagePrice")}
          placeholder="Package Price"
          type="number"
          className="border p-2 w-full"
        />
        <input
          {...register("ValidityPeriod")}
          placeholder="Validity Period"
          type="number"
          className="border p-2 w-full"
        />
        <select {...register("TimeUnit")} className="border p-2 w-full">
          <option value="">Select Time Unit</option>
          {timeUnits.map((unit, index) => (
            <option key={index} value={unit}>
              {unit}
            </option>
          ))}
        </select>
        <input
          {...register("UsageLimit")}
          placeholder="Usage Limit"
          type="number"
          className="border p-2 w-full"
        />

        {/* Điều kiện của gói */}
        <div>
          <h3 className="font-bold">Package Conditions</h3>
          {fields.map((item, index) => (
            <div key={item.id} className="flex space-x-2 mb-2">
              <span className="text-gray-500">#{index + 1}</span>
              <select
                {...register(`PackageConditions.${index}.ConditionType`)}
                className="border p-2 w-full"
                value={watch(`PackageConditions.${index}.ConditionType`) || ""}
                onChange={(e) => handleConditionChange(index, e.target.value)}
              >
                <option value="">Select Condition Type</option>
                {getAvailableConditions(
                  watch(`PackageConditions.${index}.ConditionType`)
                ).map((condition, idx) => (
                  <option key={idx} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
              <input
                {...register(`PackageConditions.${index}.ConditionValue`)}
                placeholder="ConditionValue"
                type="text"
                className="border p-2 w-full"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white px-2"
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ ConditionType: "", ConditionValue: "" })}
            className="bg-green-500 text-white px-4 py-1 rounded"
            disabled={conditionTypes.length === selectedConditions.length}
          >
            + Add Condition
          </button>
        </div>

        {/* Chọn các service */}
        <div>
          <button
            type="button"
            onClick={() => setServiceModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
          >
            Select Service
          </button>
          <SelectServiceModal
            isOpen={isServiceModalOpen}
            onClose={() => setServiceModalOpen(false)}
            onSelect={handleServiceSelection}
            selectedServices={selectedServices}
          />
        </div>

        {/* Chọn ảnh */}
        <div>
          <button
            type="button"
            onClick={() => setImageModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
          >
            Select Images
          </button>
          {selectedImages?.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-4">
              {selectedImages.map((file, index) => (
                <div key={index} className="border p-2 rounded-lg relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Selected ${index}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    onClick={() =>
                      setValue(
                        "imagePackage",
                        selectedImages.filter((_, i) => i !== index)
                      )
                    }
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          <SelectImageModal
            isOpen={isImageModalOpen}
            onClose={() => setImageModalOpen(false)}
            onSelect={handleImageSelection}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 w-full rounded-lg"
        >
          Tạo gói dịch vụ
        </button>
      </form>
    </div>
  );
}
