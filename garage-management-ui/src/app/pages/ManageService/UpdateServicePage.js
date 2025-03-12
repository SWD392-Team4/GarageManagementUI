import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getServiceDetails, getCarCategory, getCarPart, createServiceImage, updateService } from "./services/ServiceAPI";
import MDEditor from "@uiw/react-md-editor";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import { useTranslation } from "react-i18next";


export default function UpdateServicePage() {
    const { t } = useTranslation("update_service_page");
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);

    // luu tru cac thong tin
    const serviceCategoryKeys = ["repair", "maintenance", "upgrade", "car_wash", "detailing"];
    const actionKeys = ["inspect", "replace", "lubricate", "align", "refill", "repair", "clean", "upgrade", "restore", "update", "polish", "protect", "deodorize", "condition", "remove", "restore_lighting"];
    const workNatureKeys = ["preventive", "corrective", "enhancement", "digital", "aesthetic"];
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
                setValue("ServicePrice", serviceData.price);
                setValue("Description", serviceData.description);
                setValue("Status", serviceData.status);


                // console.log("check thong tin :", serviceData);

                // Chuyển imageLink thành mảng để hiển thị
                if (serviceData.imageLink) {
                    setSelectedImages(Array.isArray(serviceData.imageLink) ? serviceData.imageLink : [serviceData.imageLink]);
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

        setSelectedImages((prev) => [
            ...prev.filter((img) => typeof img === "string"), // Giữ lại ảnh từ API
            ...files, // Thêm ảnh mới vào
        ]);
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
                carPartName: carParts.find((part) => part.id === data.CarPart)?.partName || "", // Lấy tên từ ID
                carCategoryId: data.CarCategory,
                carCategoryName: carCategories.find((category) => category.id === data.CarCategory)?.category || "", // Lấy tên từ ID
                status: data.Status,
            };

            console.log("thong tin gui cho api : ", updatedService);

            // Gửi yêu cầu cập nhật dịch vụ trước
            const updateResponse = await updateService(id, updatedService);
            // console.log("Check response: ", updateResponse);
            // Lọc ra chỉ những ảnh mới (file)
            const newImages = selectedImages.filter((img) => typeof img !== "string");

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



    return (
        <div className="bg-white shadow-lg p-6">
            <Breadcrumb />

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">{t("update_service_page.title")}</h1>
            </div>




            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-semibold">{t("update_service_page.form.service_name")}</label>
                        <input
                            {...register("ServiceName", { required: "Tên dịch vụ là bắt buộc" })}
                            placeholder={t("update_service_page.placeholders.service_name")}
                            className="border p-2 w-full"
                            disabled={!isEditing}
                        />
                        {errors.ServiceName && <p className="text-red-500 text-sm">{errors.ServiceName.message}</p>}
                    </div>

                    {/* Select Service Category */}
                    <div>
                        <label className="block text-gray-700 font-semibold">
                            {t("update_service_page.form.service_category")}
                        </label>

                        <select {...register("ServiceCategory", { required: "Danh mục xe là bắt buộc" })} className="border p-2 w-full" disabled={!isEditing}>
                            {service && <option value={service.serviceCategory}>{service.serviceCategory}</option>}
                            {serviceCategoryKeys.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {errors.ServiceCategory && <p className="text-red-500 text-sm">{errors.ServiceCategory.message}</p>}
                    </div>


                    {/* Đợi api thêm trường id của car part và car category cho đỡ so sánh name */}

                    {/* Select Car Part */}
                    <div>
                        <label className="block text-gray-700 font-semibold">
                            {t("update_service_page.form.car_part")}
                        </label>
                        <select {...register("CarPart")} className="border p-2 w-full" disabled={!isEditing} defaultValue={service?.carPartId}>
                            {service && <option value={service.carPartId}>{service.carPart}</option>}
                            {isEditing && carParts.map((part) => (
                                <option key={part.id} value={part.id} selected={part.id === service?.carPartId}>
                                    {part.partName}
                                </option>
                            ))}
                        </select>


                        {errors.CarPartName && <p className="text-red-500 text-sm">{errors.CarPartName.message}</p>}
                    </div>


                    {/* Select Car Category */}
                    <div>
                        <label className="block text-gray-700 font-semibold">
                            {t("update_service_page.form.car_category")}
                        </label>
                        <select {...register("CarCategory")} className="border p-2 w-full" disabled={!isEditing} defaultValue={service?.carCategoryId}>
                            {service && <option value={service.carCategoryId}>{service.carCategory}</option>}
                            {isEditing && carCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.category}
                                </option>
                            ))}
                        </select>


                        {errors.CarCategory && <p className="text-red-500 text-sm">{errors.CarCategory.message}</p>}
                    </div>



                    {/* Select Action */}
                    <div>
                        <label className="block text-gray-700 font-semibold">
                            {t("update_service_page.form.action")}
                        </label>
                        <select {...register("Action", { required: "Hành động là bắt buộc" })} className="border p-2 w-full" disabled={!isEditing}>
                            {service && <option value={service.action}>{service.action}</option>}
                            {actionKeys.map((key, index) => (
                                <option key={index} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                        {errors.Action && <p className="text-red-500 text-sm">{errors.Action.message}</p>}
                    </div>

                    {/* Select Work Nature */}
                    <div>
                        <label className="block text-gray-700 font-semibold">
                            {t("update_service_page.form.work_nature")}
                        </label>
                        <select {...register("WorkNature", { required: "Bản chất công việc là bắt buộc" })} className="border p-2 w-full" disabled={!isEditing}>
                            {service && <option value={service.workNature}>{service.workNature}</option>}
                            {workNatureKeys.map((key, index) => (
                                <option key={index} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                        {errors.WorkNature && <p className="text-red-500 text-sm">{errors.WorkNature.message}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">
                            {t("update_service_page.form.estimated_hours")}
                        </label>

                        <input
                            type="number"
                            {...register("EstimatedHours", { required: "Số giờ ước tính là bắt buộc", min: 0 })}
                            placeholder={t("update_service_page.placeholders.estimated_hours")}
                            className="border p-2 w-full"
                            disabled={!isEditing}
                        />
                        {errors.EstimatedHours && <p className="text-red-500 text-sm">{errors.EstimatedHours.message}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">
                            {t("update_service_page.form.price")}
                        </label>
                        <input
                            type="number"
                            {...register("ServicePrice", { required: "Giá dịch vụ là bắt buộc", min: 0 })}
                            placeholder={t("update_service_page.placeholders.price")}
                            className="border p-2 w-full"
                            disabled={!isEditing}
                        />
                        {errors.ServicePrice && <p className="text-red-500 text-sm">{errors.ServicePrice.message}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">
                            {t("update_service_page.form.status")}
                        </label>
                        <select {...register("Status")} className="border p-2 w-full" disabled={!isEditing}>
                            <option value="">{t("update_service_page.form.select_status")}</option>
                            <option value="Active">{t("update_service_page.form.status_active")}</option>
                            <option value="Inactive">{t("update_service_page.form.status_inactive")}</option>
                        </select>
                        {errors.Status && <p className="text-red-500 text-sm">{errors.Status.message}</p>}
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

                <label className="block text-gray-700 font-semibold">
                    {t("update_service_page.form.images")}
                </label>

                <div className="mt-4 grid grid-cols-6 gap-3">
                    {selectedImages.length > 0 ? (
                        selectedImages.map((file, index) => (
                            <div key={index} className="relative rounded-lg overflow-hidden shadow-lg group">
                                <img
                                    src={typeof file === "string" ? file : URL.createObjectURL(file)}
                                    alt="Preview"
                                    className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-105"
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
                        <div className="grid grid-cols-3 gap-4">
                            {[...Array(1)].map((_, index) => (
                                <div key={index} className="w-64 h-64 bg-gray-300 animate-pulse rounded-lg"></div>
                            ))}
                        </div>
                    )}
                </div>


                {isEditing && (
                    <div className="w-1/4">
                        <input type="file" multiple onChange={handleImageChange} className="border rounded p-2 w-full" />
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
                    <div className="flex justify-end mt-6">

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
