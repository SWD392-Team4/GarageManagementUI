import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import UserService from "../../hooks/services/UserService";
import { formatVietnameseCurrency } from "../ManageGoodsIssued/schemas/GoodsIssuedSchemas";
import Breadcrumb from "./partials/Breadcrumb";
import { getAppointmentSchema } from "./schemas/appointmentSchema";
import {
  createAppointmentApi,
  getAllCarModel,
  getAllPackages,
  getAllProductSuitable,
  getAllServiceByCarModel,
} from "./services/AppointmentService";
import ListServiceinPackage from "./partials/ListServiceinPackage";
import { packagePick } from "./services/store/AppointmentSignify";
import { formatLocalDatetimeWithOffset } from "../BookingPage/schemas/bookingSchema";

export default function CreateAppointment() {
  // Sử dụng useTranslation và lấy schema validate từ file riêng
  const { t } = useTranslation("create_appointment");
  const schema = getAppointmentSchema(t);
  const useService = new UserService();
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
      // estimatedEndTime: "",
      carLicensePlateNumber: "",
    },
  });
  const spackage = packagePick.use();
  const [loading, setLoading] = useState(false);
  // State chứa dữ liệu cho dropdown
  const [carModels, setCarModels] = useState([]);
  const [carModelSelectId, setCarModelSelectId] = useState("");
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [productsOnService, setProductsOnService] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    fetchDataService();
    if (Array.isArray(packagePick.value.servicesOnPackage)) {
      setSelectedServices((prevSelectedServices) =>
        prevSelectedServices.filter(
          (service) =>
            !packagePick.value.servicesOnPackage.includes(service.serviceId)
        )
      );
    }
  }, [packagePick.value.servicesOnPackage]);

  // State quản lý danh sách dịch vụ đã chọn (mỗi dịch vụ có danh sách replacementParts)
  // State cho lựa chọn hiện tại của service và danh sách product (multi-select)
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [carPartId, setCarPartId] = useState("");
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
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, []);
  const fetchPackage = useCallback(async () => {
    try {
      const packagesResponse = await getAllPackages();
      setPackages(packagesResponse.data.value);
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, []);

  const fetchDataService = useCallback(async () => {
    try {
      const servicesResponse = await getAllServiceByCarModel(carModelSelectId);
      setServices(servicesResponse.data.value);
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, [carModelSelectId]);

  useEffect(() => {
    if (carModelSelectId !== "") {
      packagePick.reset();
      fetchPackage();
      fetchDataService();
      setSelectedServiceId("");
      setAllProduct([]);
      setSelectedServices([]);
      setPackages([]);
      setProductsOnService([]);
      setSelectedProductsForService([]);
      setSelectedPackageIds([]);
    }
  }, [carModelSelectId]);

  const fetchDataProduct = useCallback(async () => {
    try {
      const productsResponse = await getAllProductSuitable(
        carModelSelectId,
        carPartId
      );
      setProductsOnService(productsResponse.data.value);
      setAllProduct((prev) => {
        const newProducts = productsResponse.data.value.filter(
          (newProd) => !prev.some((oldProd) => oldProd.id === newProd.id)
        );
        return [...prev, ...newProducts];
      });
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, [carModelSelectId, carPartId]);

  useEffect(() => {
    if (selectedServiceId !== "") {
      fetchDataProduct();
    }
  }, [selectedServiceId]);

  useEffect(() => {
    packagePick.reset();
    fetchData();
  }, [fetchData]);

  const handleAddService = () => {
    if (!selectedServiceId) return;

    setSelectedServices((prev) => {
      // Tính tổng số lượng hiện có của từng sản phẩm trên toàn bộ các service đã chọn
      const cumulativeQuantities = {};
      prev.forEach((service) => {
        service.replacementParts.forEach((part) => {
          cumulativeQuantities[part.productId] =
            (cumulativeQuantities[part.productId] || 0) + part.quantity;
        });
      });

      // Tạo danh sách các sản phẩm sẽ thêm kèm theo thông tin productName
      const partsToAdd =
        selectedProductsForService && selectedProductsForService.length > 0
          ? selectedProductsForService.map((product) => ({
              productId: product.value,
              productName: product.label, // Giả sử label chứa tên sản phẩm
              quantity: selectedProductQuantity,
              totalQuantity: product.totalQuantity,
            }))
          : [];

      // Kiểm tra cho từng sản phẩm trong danh sách sẽ thêm
      for (const np of partsToAdd) {
        // Nếu số lượng được chọn là 0, hiển thị thông báo "đã hết hàng"
        if (selectedProductQuantity === 0) {
          useService.showToast(400, `${np.productName} đã hết hàng`);
          return prev;
        }

        // Lấy số lượng đã được cộng dồn của sản phẩm đó trên tất cả các service đã chọn
        const currentQuantity = cumulativeQuantities[np.productId] || 0;
        // Nếu tổng số lượng (hiện có + số lượng muốn thêm) vượt quá tồn kho
        if (currentQuantity + np.quantity > np.totalQuantity) {
          const remaining = np.totalQuantity - currentQuantity;
          if (remaining <= 0) {
            useService.showToast(400, `${np.productName} đã hết hàng`);
          } else {
            useService.showToast(
              400,
              `${np.productName} chỉ còn ${remaining} sản phẩm`
            );
          }
          return prev;
        }
      }

      // Nếu service đã tồn tại, cập nhật mảng replacementParts
      const existingServiceIndex = prev.findIndex(
        (s) => s.serviceId === selectedServiceId
      );
      if (existingServiceIndex !== -1) {
        const updatedServices = [...prev];
        const updatedService = { ...updatedServices[existingServiceIndex] };
        const updatedParts = [...updatedService.replacementParts];

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
        updatedService.replacementParts = updatedParts;
        updatedServices[existingServiceIndex] = updatedService;
        return updatedServices;
      } else {
        // Nếu service chưa tồn tại, thêm service mới
        return [
          ...prev,
          { serviceId: selectedServiceId, replacementParts: partsToAdd },
        ];
      }
    });
    setSelectedServiceId("");
    setSelectedProductsForService([]);
    setProductsOnService([]);
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
  useEffect(() => {
    packagePick.set((v) => {
      v.value.Packages = selectedPackageIds;
    });
  }, [selectedPackageIds]);

  // Khi submit form, chuyển đổi payload theo định dạng API yêu cầu
  const onSubmit = async (data) => {
    if (selectedServices.length === 0 && selectedPackageIds.length === 0) {
      useService.showToast(
        400,
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
      estimatedAppointmentTime: formatLocalDatetimeWithOffset(
        data.estimatedAppointmentTime
      ),
      // estimatedEndTime: new Date(data.estimatedEndTime).toISOString(),
      carLicensePlateNumber: data.carLicensePlateNumber,
      services: selectedServices, // mỗi object: { serviceId, replacementParts: [ { productId, quantity } ] }
      packages: selectedPackageIds.map((pkgId) => ({ packageId: pkgId })),
    };

    try {
      setLoading(true);
      await createAppointmentApi(payload);
      setLoading(false);

      reset();
      setServices([]);
      setPackages([]);
      setSelectedServices([]);
      setSelectedPackageIds([]);
    } catch (error) {
      console.error("Error creating appointment", error);
    }
  };

  // Chuyển đổi dữ liệu API thành options cho react-select
  const carModelOptions = carModels.map((model) => ({
    value: model.id,
    label: `${model.modelName} - ${new Date(model.modelYear).getFullYear()}`,
  }));

  // Tính toán serviceOptions dựa trên services và packagePick.value.servicesOnPackage
  const serviceOptions = useMemo(() => {
    return services
      .filter((s) => !packagePick.value.servicesOnPackage.includes(s.id))
      .map((s) => ({
        value: s.id,
        label: s.serviceName,
        price: s.price,
        carPartId: s.carPartId,
      }));
  }, [services, packagePick.value.servicesOnPackage]);

  // Tính tổng số lượng đã chọn cho mỗi productId
  const aggregatedQuantities = selectedServices.reduce((acc, service) => {
    service.replacementParts.forEach((part) => {
      acc[part.productId] = (acc[part.productId] || 0) + part.quantity;
    });
    return acc;
  }, {});

  const productOptions = productsOnService
    .filter((p) => {
      const selectedQty = aggregatedQuantities[p.id] || 0;
      return p.totalQuantity - selectedQty > 0;
    })
    .map((p) => ({
      value: p.id,
      label: p.productName,
      totalQuantity: p.totalQuantity,
    }));

  const packageOptions = packages.map((pkg) => ({
    value: pkg.id,
    label: pkg.packageName,
    price: pkg.packagePrice,
  }));
  const totalServicePrice = selectedServices.reduce((acc, service) => {
    const serviceOption = services.find((opt) => opt.id === service.serviceId);
    // Nếu không tìm thấy thì mặc định giá là 0
    const servicePrice = serviceOption.price || 0;
    return acc + servicePrice;
  }, 0);

  const totalProductPrice = selectedServices.reduce((acc, service) => {
    const partsTotal =
      service.replacementParts?.reduce((sum, part) => {
        const product = allProduct.find((p) => p.id === part.productId);
        return sum + (product ? product.productPrice * part.quantity : 0);
      }, 0) || 0;
    return acc + partsTotal;
  }, 0);

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
                  onChange={(option) => {
                    field.onChange(option.value);
                    setCarModelSelectId(option.value);
                  }}
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
          {/* <div>
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
          </div> */}
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
              onChange={(option) => {
                setSelectedServiceId(option.value);
                setCarPartId(option.carPartId);
              }}
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
                  {t("tableHeaders.priceService", "Giá Dịch vụ")}
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  {t("tableHeaders.priceProduct", "Giá Phụ Tùng")}
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  {t("tableHeaders.action", "Action")}
                </th>
              </tr>
            </thead>
            {selectedServices.length > 0 && (
              <>
                <tbody className="divide-y divide-gray-200">
                  {selectedServices.map((service, index) => (
                    <tr key={service.serviceId} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap">
                        {index + 1}
                      </td>
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
                              {allProduct.find(
                                (product) => product.id === part.productId
                              )?.productName || part.productId}{" "}
                              x {part.quantity}
                            </div>
                          ))
                        ) : (
                          <span>N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {" "}
                        {formatVietnameseCurrency(
                          serviceOptions.find(
                            (opt) => opt.value === service.serviceId
                          )?.price || service.serviceId
                        )}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {service.replacementParts &&
                        service.replacementParts.length > 0 ? (
                          service.replacementParts.map((part) => {
                            const product = allProduct.find(
                              (product) => product.id === part.productId
                            );
                            const totalPrice = product
                              ? product.productPrice * part.quantity
                              : 0;
                            return (
                              <div key={part.productId}>
                                {formatVietnameseCurrency(totalPrice)}
                              </div>
                            );
                          })
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
                <tfoot className="bg-gray-100 border-b border-gray-300 uppercase text-xs font-medium text-gray-700">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left" colSpan={3}>
                      {t("tableHeaders.Total", "Total price")}
                    </th>
                    <th scope="col" className="px-4 py-3 text-left">
                      {formatVietnameseCurrency(totalServicePrice)}
                    </th>
                    <th scope="col" className="px-4 py-3 text-left" colSpan={2}>
                      {formatVietnameseCurrency(totalProductPrice)}
                    </th>
                  </tr>
                </tfoot>
              </>
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
                            <div key={part.productId}>
                              {allProduct.find(
                                (product) => product.id === part.productId
                              )?.productName || part.productId}{" "}
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
                  {t("tableHeaders.packagePrice", "Giá Package")}
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
                        {formatVietnameseCurrency(pkg?.price) || packageId}
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
        <ListServiceinPackage />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white p-2 rounded mt-4"
        >
          {loading
            ? t("common.loading")
            : t("buttons.createAppointment", "Tạo Appointment")}
        </button>
      </form>
    </div>
  );
}
