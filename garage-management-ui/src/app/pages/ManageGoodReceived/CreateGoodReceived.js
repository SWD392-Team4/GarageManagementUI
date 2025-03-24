import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import {
  getAllWarehouse,
  SupplierContact,
  createGoodsReceived,
  getAllProduct,
} from "./service/GoodsReceivedService";
import { useTranslation } from "react-i18next";
import ProductSelectWithSearch from "./partials/ProductSelectWithSearch";
import {
  formatVietnameseCurrency,
  getGoodsReceivedSchema,
} from "./schemas/GoodsReceivedSchema";

const CreateGoodReceived = () => {
  const { t } = useTranslation("create_good_received");

  // Tạo schema validate với hàm t để đảm bảo thông báo lỗi được dịch
  const schema = getGoodsReceivedSchema(t);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      supplierContactId: "",
      warehouseId: "",
      refereneceNumber: "",
      invoiceCode: "",
      sourceAddress: "",
      sourceProvince: "",
      sourceDistrict: "",
      sourceWards: "",
    },
  });

  const [supplier, setSupplier] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      let response = await SupplierContact();
      setSupplier(response.data.value);

      response = await getAllWarehouse();
      setWarehouse(response.data.value);

      response = await getAllProduct();
      setProducts(response.data.value);
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddProduct = () => {
    if (!selectedProductId) return;
    const productFound = products.find((p) => p.id === selectedProductId);
    if (!productFound) return;

    setSelectedProducts((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === productFound.id
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          productId: productFound.id,
          productName: productFound.productName,
          quantity: 1,
          unitPrice: 1000,
        },
      ];
    });
    setSelectedProductId(null);
    clearErrors("goodsReceivedDetailDtoForCreations");
  };

  const handleRemoveProduct = (index) => {
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index, newQuantity) => {
    setSelectedProducts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], quantity: Number(newQuantity) };
      return updated;
    });
  };

  const handleUpdatePrice = (index, newPrice) => {
    setSelectedProducts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], unitPrice: Number(newPrice) };
      return updated;
    });
  };

  // Khi submit form, chuyển mảng selectedProducts thành mảng goodsReceivedDetailDtoForCreations
  const onSubmit = async (formData) => {
    const detailArray = selectedProducts.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }));
    if (detailArray.length === 0) {
      setError("goodsReceivedDetailDtoForCreations", {
        type: "manual",
        message: t("error.at_least_one_product"),
      });
      return;
    }
    const payload = {
      ...formData,
      goodsReceivedDetailDtoForCreations: detailArray,
    };

    await createGoodsReceived(payload);
    reset();
    setSelectedProducts([]);
  };

  const handleResetForm = () => {
    reset();
    setSelectedProducts([]);
    setSelectedProductId(null);
  };

  return (
    <div className="md:p-6">
      <Breadcrumb title={t("title", "Create Goods Received Invoice")} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border bg-white border-gray-300 shadow-md p-4 w-full"
      >
        {/* ================== Thông tin chung ================== */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5 sm:grid-cols-2">
          {/* Cột 1: Supplier + Warehouse */}
          <div>
            <LabelSelectWithSearch
              labelKey="supplier"
              name="supplierContactId"
              control={control}
              options={supplier}
              t={t}
              error={errors.supplierContactId?.message}
            />
            <LabelSelectWithSearch
              labelKey="warehouse"
              name="warehouseId"
              control={control}
              options={warehouse}
              t={t}
              error={errors.warehouseId?.message}
            />
          </div>

          {/* Cột 2: Reference Number + Invoice Code */}
          <div>
            <LabelInput
              labelKey="reference_number"
              name="refereneceNumber"
              register={register}
              t={t}
              error={errors.refereneceNumber?.message}
            />
            <LabelInput
              labelKey="invoice_code"
              name="invoiceCode"
              register={register}
              t={t}
              error={errors.invoiceCode?.message}
            />
          </div>

          {/* Cột 3: Source Address + Source Wards */}
          <div>
            <LabelInput
              labelKey="source_address"
              name="sourceAddress"
              register={register}
              t={t}
              error={errors.sourceAddress?.message}
            />
            <LabelInput
              labelKey="source_wards"
              name="sourceWards"
              register={register}
              t={t}
              error={errors.sourceWards?.message}
            />
          </div>

          {/* Cột 4: Source Province + Source District */}
          <div>
            <LabelInput
              labelKey="source_province"
              name="sourceProvince"
              register={register}
              t={t}
              error={errors.sourceProvince?.message}
            />
            <LabelInput
              labelKey="source_district"
              name="sourceDistrict"
              register={register}
              t={t}
              error={errors.sourceDistrict?.message}
            />
          </div>

          {/* Cột 5: Nút Submit và Reset */}
          <div className="flex flex-col justify-center items-start space-y-7 mt-3">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-sm hover:bg-green-600 w-1/3 duration-300"
            >
              {t("buttons.create")}
            </button>
            <button
              type="button"
              onClick={handleResetForm}
              className="bg-gray-400 text-white py-2 px-4 rounded-sm hover:bg-gray-500 w-1/3"
            >
              {t("buttons.reset")}
            </button>
          </div>
        </div>

        {/* ================== Thêm sản phẩm vào chi tiết ================== */}
        <div className="bg-gray-200 text-sm uppercase mt-5 p-2 font-title font-bold flex items-center justify-between">
          <span>{t("labels.product_in_invoice", "Product in Invoice")}</span>
          <div className="flex items-center space-x-2">
            <ProductSelectWithSearch
              products={products}
              selectedProductId={selectedProductId}
              setSelectedProductId={setSelectedProductId}
              t={t}
            />
            <button
              type="button"
              className="bg-gray-300 p-1 rounded-sm"
              onClick={handleAddProduct}
            >
              {t("buttons.add")}
            </button>
          </div>
        </div>
        {errors.goodsReceivedDetailDtoForCreations && (
          <p className="text-red-500 text-sm mt-2">
            {errors.goodsReceivedDetailDtoForCreations.message}
          </p>
        )}
        {/* ================== Bảng hiển thị sản phẩm đã chọn ================== */}
        {selectedProducts.length > 0 && (
          <div className="mt-4">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100 border-b border-gray-300 uppercase text-xs font-medium text-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left">
                    {t("labels.product_name", "Product Name")}
                  </th>
                  <th scope="col" className="px-4 py-3 text-left">
                    {t("labels.quantity", "Quantity")}
                  </th>
                  <th scope="col" className="px-4 py-3 text-left">
                    {t("labels.unit_price", "Unit Price")}
                  </th>
                  <th scope="col" className="px-4 py-3 text-left">
                    {t("labels.action", "Action")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedProducts.map((item, index) => {
                  // Lấy giá sản phẩm từ danh sách products
                  console.log(item);
                  const product = products.find((p) => p.id === item.productId);
                  const productPrice = product ? product.productPrice : 0; // Mặc định 0 nếu không tìm thấy

                  // Tính toán chênh lệch giá
                  const difference = item.unitPrice - productPrice;

                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap">
                        {item.productName}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(index, e.target.value)
                          }
                          className="w-20 border border-gray-300 rounded-sm px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <input
                          type="number"
                          min={1000}
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleUpdatePrice(index, e.target.value)
                          }
                          className="w-1/2 border border-gray-300 rounded-sm px-2 py-1 text-sm"
                        />
                        {difference !== 0 && (
                          <span
                            className={`ml-2 text-xs ${
                              difference > 0 ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {difference > 0
                              ? `Trên giá cửa hàng ${formatVietnameseCurrency(
                                  difference
                                )} `
                              : `Dưới giá cửa hàng ${formatVietnameseCurrency(
                                  difference
                                )} `}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleRemoveProduct(index)}
                          className="text-red-500 hover:underline"
                        >
                          {t("buttons.remove")}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </form>
    </div>
  );
};

// Component Input với thông báo lỗi và nhãn dịch
const LabelInput = ({ labelKey, name, register, t, error }) => (
  <div className="flex flex-col mb-2 ">
    <label htmlFor={name} className="text-sm font-medium text-gray-600">
      {t(`labels.${labelKey}`)}
    </label>
    <input
      id={name}
      type="text"
      {...register(name)}
      className="border border-gray-300 rounded-sm p-2 text-sm bg-white"
    />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

// Component Select với react-select
const LabelSelectWithSearch = ({
  labelKey,
  name,
  control,
  options,
  t,
  error,
}) => {
  const selectOptions = options.map((option) => ({
    value: option.id,
    label: option.contactPersonName ? option.contactPersonName : option.name,
  }));

  return (
    <div className="flex flex-col mb-2">
      <label className="text-sm font-medium text-gray-600">
        {t(`labels.${labelKey}`)}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={selectOptions}
            placeholder={t(`labels.${labelKey}`)}
            className="react-select-container"
            classNamePrefix="react-select"
            onChange={(selectedOption) => field.onChange(selectedOption.value)}
            value={
              selectOptions.find((option) => option.value === field.value) ||
              null
            }
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />
        )}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default CreateGoodReceived;
