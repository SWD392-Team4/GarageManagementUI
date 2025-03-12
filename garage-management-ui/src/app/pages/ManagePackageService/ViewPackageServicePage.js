import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  getPackageDetail,
  GetServiceByPackageId,
  updatePackage,
} from "./services/PackageServiceAPI";
import PackageInfo from "./partials/ViewPackage/PackageInfo";
import PackageImages from "./partials/ViewPackage/PackageImages";
import PackageServices from "./partials/ViewPackage/PackageServices";
import SelectServiceModal from "./models/SelectServiceModal";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import PackageConditionType from "./partials/ViewPackage/PackageConditionType";
import PackageHistory from "./partials/ViewPackage/PackageHistory";
import { useTranslation } from "react-i18next";

export default function ViewPackageServicePage() {
  const { t, i8ln } = useTranslation("manage_package");
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [services, setServices] = useState([]); // Danh sách dịch vụ hiển thị
  const [packageImages, setPackageImages] = useState([]); // Danh sách hình ảnh (Không đăng ký vào form)
  const [addServices, setAddServices] = useState([]); // Dịch vụ được thêm
  const [removeServices, setRemoveServices] = useState([]); // Dịch vụ bị xóa
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const response = await getPackageDetail(id);
    if (response?.data?.value) {
      const packageInfo = response.data.value;
      setPackageData(packageInfo);
      setPackageImages(packageInfo.packageImages || []);
      Object.keys(packageInfo).forEach((key) => {
        if (key !== "packageImages") {
          setValue(key, packageInfo[key]);
        }
      });
    }

    const serviceResponse = await GetServiceByPackageId(id);
    if (serviceResponse?.data?.value) {
      setServices(serviceResponse.data.value);
    }

    setLoading(false);
  }, [id, setValue]);

  // API lần đầu khi component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // **Xóa dịch vụ** (Thêm vào RemoveServices, xóa khỏi danh sách hiển thị)
  const handleRemoveService = (serviceId) => {
    if (addServices.includes(serviceId)) {
      // Nếu dịch vụ mới thêm thì chỉ xóa khỏi danh sách thêm
      setAddServices((prev) => prev.filter((id) => id !== serviceId));
    } else {
      // Nếu dịch vụ từ trước thì thêm vào danh sách RemoveServices
      setRemoveServices((prev) => [...prev, serviceId]);
    }

    // Xóa khỏi danh sách hiển thị
    setServices((prev) => prev.filter((s) => s.id !== serviceId));
  };

  // **Thêm dịch vụ** (Chỉ thêm nếu chưa có)
  const handleSelectServices = (selectedServiceIds) => {
    const newServices = selectedServiceIds.filter(
      (id) => !services.some((s) => s.id === id) // Kiểm tra nếu đã có thì bỏ qua
    );

    setAddServices((prev) => [...prev, ...newServices]); // Lưu ID vào danh sách thêm

    // Nếu dịch vụ nằm trong danh sách RemoveServices thì xóa nó khỏi đó
    setRemoveServices((prev) => prev.filter((id) => !newServices.includes(id)));
  };

  // **Nhận danh sách chi tiết dịch vụ để hiển thị**
  const handleServiceDetailsSelect = (selectedServiceDetails) => {
    const newServiceDetails = selectedServiceDetails.filter(
      (service) => !services.some((s) => s.id === service.id)
    );

    setServices((prev) => [...prev, ...newServiceDetails]); // Cập nhật danh sách hiển thị
  };

  // **Gửi dữ liệu cập nhật**
  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      AddServices: addServices,
      RemoveServices: removeServices,
    };

    console.log("Dữ liệu gửi API:", updatedData);
    // Gọi API cập nhật package
    await updatePackage(updatedData.id, updatedData);
    //thanh cong thi thiet lap giao dien
    fetchData();
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }


  if (!packageData) {
    return <div className="text-center text-red-500 py-6">{t("manage_package.view.not_found")}</div>;
  }

  return (
    <>
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <Breadcrumb />
        {/* Tiêu đề + Nút Chỉnh Sửa */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">{packageData.packageName}</h1>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? t("manage_package.view.cancel") : t("manage_package.view.edit")}
          </button>
        </div>

        {/* Form chỉnh sửa */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="mt-6 border p-6 rounded-lg shadow-md bg-white"> */}
          <PackageInfo register={register} setValue={setValue} watch={watch} packageData={packageData} isEditing={isEditing} />
          {/* </div> */}

          <PackageImages packageImages={packageImages} setPackageImages={setPackageImages} packageId={packageData.id} /> {/* Hiển thị hình ảnh mà không đăng ký */}

          <PackageServices
            services={services}
            handleRemoveService={handleRemoveService}
            handleAddService={() => setIsModalOpen(true)}
          />

          <PackageConditionType id={packageData.id} />

          <PackageHistory id={packageData.id} />

          {isEditing && (
            <div className="mt-6 text-center">
              <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                {t("manage_package.view.save_changes")}
              </button>
            </div>
          )}
        </form>


      </div>

      {/* Modal chọn dịch vụ */}
      <SelectServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectServices}
        onServiceDetailsSelect={handleServiceDetailsSelect}
        selectedServices={[...addServices, ...services.map((s) => s.id)]}
      />
    </>
  );
}
