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
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import { FaTrash, FaCamera, FaPlus, FaTimes } from "react-icons/fa";


export default function CreatePackageServicePage() {
  const { register, handleSubmit, setValue, control, watch, reset } = useForm({
    defaultValues: {
      PackageConditions: [],
      ServiceList: [],
      imagePackage: [],
      ServiceCategory: "",
      CarCategoryId: "",
      PackageName: "",
      Description: "",
      Type: "",
      PackagePrice: "",
      ValidityPeriod: "",
      TimeUnit: "",
      UsageLimit: "",
    },
  });

  const [carCategories, setCarCategories] = useState([]);
  const [packageTypes, setPackageTypes] = useState([]);
  const [timeUnits, setTimeUnits] = useState([]);
  const [conditionTypes, setConditionTypes] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [isServiceModalOpen, setServiceModalOpen] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [serviceDetails, setServiceDetails] = useState([]);

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

  // Hàm này sẽ được truyền xuống modal để lưu thông tin chi tiết của dịch vụ
  const handleServiceDetails = (selectedDetails) => {
    setServiceDetails(selectedDetails);
  };

  // Xoá dịch vụ khỏi danh sách đã chọn
  const handleRemoveService = (serviceId) => {
    const updatedServices = selectedServices.filter((id) => id !== serviceId);
    handleServiceSelection(updatedServices); // Cập nhật danh sách ID
    setServiceDetails(serviceDetails.filter((service) => service.id !== serviceId)); // Cập nhật thông tin chi tiết
  };

  // Xóa ảnh khỏi danh sách
  const handleRemoveImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setValue("imagePackage", updatedImages, { shouldValidate: false });

    console.log("🗑️ Removed image at index:", index);
    console.log("✅ Updated selectedImages:", updatedImages);
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

      // ✅ Reset form
      reset({
        PackageConditions: [],
        ServiceList: [],
        imagePackage: [],
        ServiceCategory: "",
        CarCategoryId: "",
        PackageName: "",
        Description: "",
        Type: "",
        PackagePrice: "",
        ValidityPeriod: "",
        TimeUnit: "",
        UsageLimit: "",
      });

      // ✅ Đặt lại state sau khi reset
      setServiceDetails([]);
      setValue("ServiceList", []); // Cập nhật `ServiceList` trong `useForm`
      setValue("imagePackage", []); // Cập nhật `imagePackage` trong `useForm`
      setImageModalOpen(false);
      setServiceModalOpen(false);

      console.log("✅ Form reset thành công!");

    } catch (error) {
      console.error("Lỗi khi gửi gói dịch vụ:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <Breadcrumb />
      <h2 className="text-xl font-bold mb-6">Create Package Service</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cột 1 */}
          <div className="space-y-4">
            <select {...register("ServiceCategory")} className="border p-3 w-full rounded">
              <option value="">Select Service Category</option>
              {serviceCategories.map((service, index) => (
                <option key={index} value={service.serviceCategory}>
                  {service.serviceCategory}
                </option>
              ))}
            </select>

            <select {...register("CarCategoryId")} className="border p-3 w-full rounded">
              <option value="">Select Car Category</option>
              {carCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category}
                </option>
              ))}
            </select>

            <input {...register("PackageName")} placeholder="Package Name" className="border p-3 w-full rounded" />
            <textarea {...register("Description")} placeholder="Description" className="border p-3 w-full rounded h-24" />
          </div>

          {/* Cột 2 */}
          <div className="space-y-4">
            <select {...register("Type")} className="border p-3 w-full rounded">
              <option value="">Select Type</option>
              {packageTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>

            <input {...register("PackagePrice")} placeholder="Package Price" type="number" className="border p-3 w-full rounded" />

            <div className="grid grid-cols-2 gap-4">
              <input {...register("ValidityPeriod")} placeholder="Validity Period" type="number" className="border p-3 w-full rounded" />
              <select {...register("TimeUnit")} className="border p-3 w-full rounded">
                <option value="">Select Time Unit</option>
                {timeUnits.map((unit, index) => (
                  <option key={index} value={unit}>{unit}</option>
                ))}
              </select>
            </div>

            <input {...register("UsageLimit")} placeholder="Usage Limit" type="number" className="border p-3 w-full rounded" />
          </div>
        </div>

        {/* Package Conditions */}
        <div className="border p-4 rounded-lg">
          <h3 className="font-bold mb-3">Package Conditions</h3>
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-3 mb-2">
              <span className="text-gray-500">#{index + 1}</span>
              <select
                {...register(`PackageConditions.${index}.ConditionType`)}
                className="border p-2 w-full rounded"
                onChange={(e) => handleConditionChange(index, e.target.value)}
              >
                <option value="">Select Condition Type</option>
                {getAvailableConditions(watch(`PackageConditions.${index}.ConditionType`)).map((condition, idx) => (
                  <option key={idx} value={condition}>{condition}</option>
                ))}
              </select>
              <input {...register(`PackageConditions.${index}.ConditionValue`)} placeholder="Condition Value" className="border p-2 w-full rounded" />
              <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white px-2 rounded">-</button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ ConditionType: "", ConditionValue: "" })}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            + Add Condition
          </button>
        </div>

        {/* Service Selection */}
        <div className="border p-4 rounded-lg bg-white shadow-md">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-700">Service Selection</h2>
            <button
              type="button"
              onClick={() => setServiceModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              <FaPlus /> Select Service
            </button>
          </div>

          {/* Danh sách dịch vụ đã chọn */}
          {serviceDetails.length > 0 ? (
            <div className="mt-3">
              <table className="w-full border-collapse border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 text-left">
                    <th className="p-3 border border-gray-300">Service Name</th>
                    <th className="p-3 border border-gray-300">Car Category</th>
                    <th className="p-3 border border-gray-300">Car Part</th>
                    <th className="p-3 border border-gray-300">Price</th>
                    <th className="p-3 border border-gray-300">Service Category</th>
                    <th className="p-3 border border-gray-300 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceDetails.map((service) => (
                    <tr key={service.id} className="border border-gray-300">
                      <td className="p-3 border border-gray-300">{service.serviceName || "N/A"}</td>
                      <td className="p-3 border border-gray-300">{service.carCategory || "N/A"}</td>
                      <td className="p-3 border border-gray-300">{service.carPart || "N/A"}</td>
                      <td className="p-3 border border-gray-300 text-green-600 font-semibold">${service.price || "0.00"}</td>
                      <td className="p-3 border border-gray-300">{service.serviceCategory || "N/A"}</td>
                      <td className="p-3 border border-gray-300 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveService(service.id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-sm mt-2">No services selected.</p>
          )}

          {/* Modal chọn dịch vụ */}
          <SelectServiceModal
            isOpen={isServiceModalOpen}
            onClose={() => setServiceModalOpen(false)}
            onSelect={handleServiceSelection} // Giữ nguyên logic chọn dịch vụ
            selectedServices={selectedServices}
            onServiceDetailsSelect={(services) => {
              setServiceDetails(services);
              console.log("✅ Selected service details from modal:", services);
            }} // Hàm để cập nhật `serviceDetails`
          />
        </div>

        {/* Phan hinh anh */}
        <div className="border p-6 rounded-lg bg-white shadow-md">
          {/* Nút chọn hình ảnh với icon (giống Service Selection) */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-700">Image Selection</h2>
            <button
              type="button"
              onClick={() => {
                setImageModalOpen(true);
                console.log("📌 Opening Image Selection Modal...");
              }}
              className="bg-blue-500 text-white flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <FaCamera /> Select Images
            </button>
          </div>

          {/* Hiển thị danh sách hình ảnh */}
          {selectedImages?.length > 0 ? (
            <div
              className="grid gap-4 mt-4"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(auto-fill, minmax(150px, 1fr))`,
                gap: "12px",
                maxWidth: "100%",
              }}
            >
              {selectedImages.map((file, index) => (
                <div
                  key={index}
                  className="relative border rounded-lg overflow-hidden bg-gray-100 shadow hover:shadow-md transition"
                  style={{
                    width: "100%",
                    aspectRatio: "1/1", // Giữ ảnh vuông
                  }}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Selected ${index}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Nút Xóa hình ảnh */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs flex items-center gap-1 hover:bg-red-600 transition"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm mt-2">No image selected</p>
          )}

          {/* Modal chọn ảnh */}
          <SelectImageModal
            isOpen={isImageModalOpen}
            onClose={() => setImageModalOpen(false)}
            onSelect={handleImageSelection}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded-lg">
          Tạo gói dịch vụ
        </button>
      </form>
    </div>
  );
}
