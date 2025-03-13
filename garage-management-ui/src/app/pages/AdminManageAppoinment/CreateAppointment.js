import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { getAppointmentSchema } from "./schemas/appointmentSchema";
import {
  CreateAppointmentApi,
  getAllCarModel,
  getAllServices,
  getAllPackages,
  getAllProductsOnService,
} from "./services/AppointmentService";
import Breadcrumb from "./partials/Breadcrumb";

export default function CreateAppointment() {
  // Sử dụng useTranslation và lấy schema validate từ file riêng
  const { t } = useTranslation("create_appointment");
  const schema = getAppointmentSchema(t);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      carModelId: "",
      mileage: "",
      customerName: "",
      customerPhoneNumber: "",
      customerEmail: "",
      estimatedAppointmentTime: "",
      estimatedEndTime: "",
      carLicensePlateNumber: "",
    },
  });

  // State chứa dữ liệu cho dropdown
  const [carModels, setCarModels] = useState([]);
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [productsOnService, setProductsOnService] = useState([]);

  // State quản lý danh sách dịch vụ đã chọn (mỗi dịch vụ có danh sách replacementParts)
  const [selectedServices, setSelectedServices] = useState([]);
  // State cho lựa chọn hiện tại của service và danh sách product (multi-select)
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedProductsForService, setSelectedProductsForService] = useState(
    []
  );
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(1);

  // State cho các package được chọn (multi select)
  const [selectedPackageIds, setSelectedPackageIds] = useState([]);

  // Load dữ liệu từ API
  const fetchData = useCallback(async () => {
    try {
      const carModelsResponse = await getAllCarModel();
      setCarModels(carModelsResponse.data.value);

      const servicesResponse = await getAllServices();
      setServices(servicesResponse.data.value);

      const productsResponse = await getAllProductsOnService();
      setProductsOnService(productsResponse.data.value);

      const packagesResponse = await getAllPackages();
      setPackages(packagesResponse.data.value);
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Thêm dịch vụ với replacementParts (cho phép không chọn product)
  const handleAddService = () => {
    if (!selectedServiceId) return;

    setSelectedServices((prev) => {
      const partsToAdd =
        selectedProductsForService && selectedProductsForService.length > 0
          ? selectedProductsForService.map((product) => ({
              productId: product.value,
              quantity: selectedProductQuantity,
            }))
          : []; // cho phép rỗng nếu không chọn sản phẩm

      const existingService = prev.find(
        (s) => s.serviceId === selectedServiceId
      );
      if (existingService) {
        // Nếu service đã tồn tại thì cập nhật mảng replacementParts
        return prev.map((s) => {
          if (s.serviceId === selectedServiceId) {
            const updatedParts = [...s.replacementParts];
            partsToAdd.forEach((np) => {
              const index = updatedParts.findIndex(
                (p) => p.productId === np.productId
              );
              if (index !== -1) {
                updatedParts[index].quantity += np.quantity;
              } else {
                updatedParts.push(np);
              }
            });
            return { ...s, replacementParts: updatedParts };
          }
          return s;
        });
      } else {
        return [
          ...prev,
          { serviceId: selectedServiceId, replacementParts: partsToAdd },
        ];
      }
    });

    // Reset lựa chọn của service
    setSelectedServiceId(null);
    setSelectedProductsForService([]);
    setSelectedProductQuantity(1);
  };

  // Xóa toàn bộ service đã chọn
  const handleRemoveService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.filter((s) => s.serviceId !== serviceId)
    );
  };

  // Xử lý thay đổi lựa chọn cho package (multi select)
  const handlePackageChange = (selectedOptions) => {
    setSelectedPackageIds(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  // Xóa package khỏi danh sách đã chọn
  const handleRemovePackage = (packageId) => {
    setSelectedPackageIds((prev) => prev.filter((id) => id !== packageId));
  };

  // Khi submit form, chuyển đổi payload theo định dạng API yêu cầu
  const onSubmit = async (data) => {
    if (selectedServices.length === 0) {
      alert(
        t(
          "error.add_service",
          "Vui lòng thêm ít nhất một dịch vụ (có thể không chọn sản phẩm)"
        )
      );
      return;
    }
    const payload = {
      carModelId: data.carModelId,
      mileage: Number(data.mileage),
      customerName: data.customerName,
      customerPhoneNumber: data.customerPhoneNumber,
      customerEmail: data.customerEmail,
      estimatedAppointmentTime: new Date(
        data.estimatedAppointmentTime
      ).toISOString(),
      estimatedEndTime: new Date(data.estimatedEndTime).toISOString(),
      carLicensePlateNumber: data.carLicensePlateNumber,
      services: selectedServices, // mỗi object: { serviceId, replacementParts: [ { productId, quantity } ] }
      packages: selectedPackageIds.map((pkgId) => ({ packageId: pkgId })),
    };

    try {
      await CreateAppointmentApi(payload);
      alert(t("success.create", "Tạo appointment thành công!"));
      reset();
      setSelectedServices([]);
      setSelectedPackageIds([]);
    } catch (error) {
      console.error("Error creating appointment", error);
      alert(t("error.create", "Có lỗi xảy ra khi tạo appointment"));
    }
  };

  // Chuyển đổi dữ liệu API thành options cho react-select
  const carModelOptions = carModels.map((model) => ({
    value: model.id,
    label: model.brandName,
  }));
  const serviceOptions = services.map((s) => ({
    value: s.id,
    label: s.serviceName,
  }));
  const productOptions = productsOnService.map((p) => ({
    value: p.id,
    label: p.productName,
  }));
  const packageOptions = packages.map((pkg) => ({
    value: pkg.id,
    label: pkg.packageName,
  }));

  return (
    <div className=" p-4">
      <Breadcrumb />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border bg-white border-gray-300 shadow-md p-4 w-full"
      >
        {/* Thông tin cơ bản */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5 sm:grid-cols-2">
          <div>
            <label className="block mb-1">
              {t("labels.carModel", "Model Xe")}
            </label>
            <Controller
              name="carModelId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={carModelOptions}
                  onChange={(option) => field.onChange(option.value)}
                  value={
                    carModelOptions.find(
                      (option) => option.value === field.value
                    ) || null
                  }
                  placeholder={t("placeholder.selectCarModel", "Chọn Model Xe")}
                />
              )}
            />
            {errors.carModelId && (
              <p className="text-red-500 text-sm">
                {errors.carModelId.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1">
              {t("labels.mileage", "Mileage")}
            </label>
            <input
              type="number"
              {...register("mileage")}
              className="border p-2 rounded w-full"
              placeholder={t("placeholder.enterMileage", "Nhập số km")}
            />
            {errors.mileage && (
              <p className="text-red-500 text-sm">{errors.mileage.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1">
              {t("labels.customerName", "Tên Khách Hàng")}
            </label>
            <input
              type="text"
              {...register("customerName")}
              className="border p-2 rounded w-full"
              placeholder={t(
                "placeholder.enterCustomerName",
                "Nhập tên khách hàng"
              )}
            />
            {errors.customerName && (
              <p className="text-red-500 text-sm">
                {errors.customerName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1">
              {t("labels.customerPhoneNumber", "Số Điện Thoại")}
            </label>
            <input
              type="text"
              {...register("customerPhoneNumber")}
              className="border p-2 rounded w-full"
              placeholder={t(
                "placeholder.enterPhoneNumber",
                "Nhập số điện thoại"
              )}
            />
            {errors.customerPhoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.customerPhoneNumber.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1">
              {t("labels.customerEmail", "Email")}
            </label>
            <input
              type="email"
              {...register("customerEmail")}
              className="border p-2 rounded w-full"
              placeholder={t("placeholder.enterEmail", "Nhập email")}
            />
            {errors.customerEmail && (
              <p className="text-red-500 text-sm">
                {errors.customerEmail.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1">
              {t("labels.estimatedAppointmentTime", "Thời Gian Hẹn")}
            </label>
            <input
              type="datetime-local"
              {...register("estimatedAppointmentTime")}
              className="border p-2 rounded w-full"
            />
            {errors.estimatedAppointmentTime && (
              <p className="text-red-500 text-sm">
                {errors.estimatedAppointmentTime.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1">
              {t("labels.estimatedEndTime", "Thời Gian Kết Thúc")}
            </label>
            <input
              type="datetime-local"
              {...register("estimatedEndTime")}
              className="border p-2 rounded w-full"
            />
            {errors.estimatedEndTime && (
              <p className="text-red-500 text-sm">
                {errors.estimatedEndTime.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1">
              {t("labels.carLicensePlateNumber", "Biển Số Xe")}
            </label>
            <input
              type="text"
              {...register("carLicensePlateNumber")}
              className="border p-2 rounded w-full"
              placeholder={t(
                "placeholder.enterCarLicensePlateNumber",
                "Nhập biển số xe"
              )}
            />
            {errors.carLicensePlateNumber && (
              <p className="text-red-500 text-sm">
                {errors.carLicensePlateNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* Phần thêm dịch vụ và replacement parts */}
        <div className="bg-gray-200 text-sm uppercase mt-5 p-2 font-title font-bold flex items-center justify-between">
          <span>
            {t("labels.serviceAndProduct", "Services and Replacement Parts")}
          </span>
          <div className="md:flex items-center space-x-2">
            <Select
              options={serviceOptions}
              value={
                serviceOptions.find(
                  (option) => option.value === selectedServiceId
                ) || null
              }
              onChange={(option) => setSelectedServiceId(option.value)}
              placeholder={t("placeholder.selectService", "Chọn Service")}
              className="min-w-64"
            />
            <Select
              options={productOptions}
              isMulti
              value={selectedProductsForService}
              onChange={(selectedOptions) =>
                setSelectedProductsForService(selectedOptions)
              }
              placeholder={t(
                "placeholder.selectProduct",
                "Chọn Product (có thể chọn nhiều)"
              )}
              className="min-w-64"
            />
            <input
              type="number"
              min="1"
              value={selectedProductQuantity}
              onChange={(e) =>
                setSelectedProductQuantity(Number(e.target.value))
              }
              className="border p-2 rounded w-20"
              placeholder={t("placeholder.enterQuantity", "SL")}
            />
            <button
              type="button"
              onClick={handleAddService}
              className="bg-blue-500 text-white p-2 rounded"
            >
              {t("buttons.add", "Thêm")}
            </button>
          </div>
        </div>

        {/* Hiển thị danh sách dịch vụ đã chọn */}
        <div className="mt-4 hidden md:block">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 border-b border-gray-300 uppercase text-xs font-medium text-gray-700">
              <tr>
                <th scope="col" className="px-4 py-3 text-left">
                  {t("tableHeaders.stt", "STT")}
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  {t("tableHeaders.serviceName", "Tên Dịch Vụ")}
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  {t("tableHeaders.products", "Replacement Parts")}
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  {t("tableHeaders.action", "Action")}
                </th>
              </tr>
            </thead>
            {selectedServices.length > 0 && (
              <tbody className="divide-y divide-gray-200">
                {selectedServices.map((service, index) => (
                  <tr key={service.serviceId} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap">{index + 1}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {serviceOptions.find(
                        (opt) => opt.value === service.serviceId
                      )?.label || service.serviceId}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {service.replacementParts &&
                      service.replacementParts.length > 0 ? (
                        service.replacementParts.map((part) => (
                          <div key={part.productId}>
                            {productOptions.find(
                              (opt) => opt.value === part.productId
                            )?.label || part.productId}{" "}
                            x {part.quantity}
                          </div>
                        ))
                      ) : (
                        <span>N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleRemoveService(service.serviceId)}
                        className="text-red-500 hover:underline"
                      >
                        {t("buttons.remove", "Xóa")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        <div className="mt-4 block md:hidden">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 border-b border-gray-300 uppercase text-lg font-medium text-gray-700">
              <tr>Service & Product</tr>
            </thead>
            {selectedServices.length > 0 && (
              <>
                {/* Mobile version: hiển thị dưới dạng card, ẩn bảng lớn */}
                <div className="">
                  {selectedServices.map((service, index) => (
                    <div key={service.serviceId} className="border p-2 mb-2">
                      <div className="flex justify-between items-center w-full">
                        <span className="font-bold">
                          {index + 1}.{" "}
                          {serviceOptions.find(
                            (opt) => opt.value === service.serviceId
                          )?.label || service.serviceId}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveService(service.serviceId)}
                          className="text-red-500 hover:underline"
                        >
                          {t("buttons.remove", "Xóa")}
                        </button>
                      </div>
                      <div className="mt-2">
                        {service.replacementParts &&
                        service.replacementParts.length > 0 ? (
                          service.replacementParts.map((part) => (
                            <div key={part.productId} className="ml-4">
                              {productOptions.find(
                                (opt) => opt.value === part.productId
                              )?.label || part.productId}{" "}
                              x {part.quantity}
                            </div>
                          ))
                        ) : (
                          <span className="ml-4">N/A</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </table>
        </div>
        {/* Phần chọn Package */}
        <div className="bg-gray-200 text-sm uppercase mt-5 p-2 font-title font-bold flex items-center justify-between">
          <span>{t("labels.selectPackage", "Chọn Package")}</span>
          <div className="flex items-center space-x-2 mt-2">
            <Select
              options={packageOptions}
              isMulti
              onChange={handlePackageChange}
              value={packageOptions.filter((option) =>
                selectedPackageIds.includes(option.value)
              )}
              placeholder={t("placeholder.selectPackage", "Chọn Package")}
              className="min-w-64"
            />
          </div>
        </div>
        <div className="mt-4">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 border-b border-gray-300 uppercase text-xs font-medium text-gray-700">
              <tr>
                <th scope="col" className="px-4 py-3 text-left">
                  {t("tableHeaders.stt", "STT")}
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  {t("tableHeaders.packageName", "Tên Package")}
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  {t("tableHeaders.action", "Action")}
                </th>
              </tr>
            </thead>
            {selectedPackageIds.length > 0 && (
              <tbody className="divide-y divide-gray-200">
                {selectedPackageIds.map((packageId, index) => {
                  const pkg = packageOptions.find(
                    (opt) => opt.value === packageId
                  );
                  return (
                    <tr key={packageId} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {pkg?.label || packageId}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleRemovePackage(packageId)}
                          className="text-red-500 hover:underline"
                        >
                          {t("buttons.remove", "Xóa")}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded mt-4"
        >
          {t("buttons.createAppointment", "Tạo Appointment")}
        </button>
      </form>
    </div>
  );
}
