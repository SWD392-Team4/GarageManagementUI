import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import {
  getAllWarehouse,
  getAllGarage,
  createGoodsIssued,
  getAllProductAtWarehouse,
} from "./services/ServiceGoodsIssued";
import { useTranslation } from "react-i18next";
import { getGoodsIssuedSchema } from "./schemas/GoodsIssuedSchemas";
import { CurrentWarehouse } from "./services/SiginifyGoodsIssued";
import ProductSelectWithSearch from "./partials/ProductSelectWithSearch";

const CreateGoodsIssued = () => {
  const { t } = useTranslation("create_goods_issued");

  const currentWarehouse = CurrentWarehouse.use();
  const schema = getGoodsIssuedSchema(t);

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
      referenceNumber: "",
      invoiceCode: "",
      warehouseId: "",
      garageId: "",
    },
  });

  const [warehouse, setWarehouse] = useState([]);
  const [garages, setGarages] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      let response = await getAllWarehouse();
      setWarehouse(response.data.value);

      response = await getAllGarage();
      setGarages(response.data.value);
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, []);
  const fetchProduct = useCallback(async () => {
    try {
      let response = await getAllProductAtWarehouse();
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
    CurrentWarehouse.set((v) => {
      v.value.id = "";
    });
  }, [fetchData]);
  useEffect(() => {
    fetchProduct();
    setSelectedProducts([]);
    setSelectedProductId(null);
  }, [CurrentWarehouse.value.id]);

  const handleAddProduct = () => {
    if (!selectedProductId) return;
    const productFound = products.find((p) => p.id === selectedProductId);
    if (!productFound) return;

    setSelectedProducts((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productAtWareHouseId === productFound.id
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        // Kiểm tra nếu số lượng hiện tại nhỏ hơn maxQuantity thì mới tăng lên
        if (
          updated[existingIndex].quantity < updated[existingIndex].maxQuantity
        ) {
          updated[existingIndex].quantity += 1;
        }
        return updated;
      }
      return [
        ...prev,
        {
          productAtWareHouseId: productFound.id,
          productName: productFound.productName,
          quantity: 1,
          goodsReceivedId: "",
          maxQuantity: productFound.totalQuantity,
        },
      ];
    });
    setSelectedProductId(null);
    clearErrors("gooodsIssuedDetails");
  };

  const handleRemoveProduct = (index) => {
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index, newQuantity) => {
    setSelectedProducts((prev) => {
      const updated = [...prev];
      const parsedQuantity = Number(newQuantity);
      const max = updated[index].maxQuantity;
      updated[index].quantity = parsedQuantity > max ? max : parsedQuantity;
      return updated;
    });
  };

  const handleUpdateGoodsReceivedId = (index, newValue) => {
    setSelectedProducts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], goodsReceivedId: newValue };
      return updated;
    });
  };

  const onSubmit = async (formData) => {
    const detailArray = selectedProducts.map((item) => ({
      productId: item.productAtWareHouseId,
      quantity: item.quantity,
      // goodsReceivedId: item.goodsReceivedId,
    }));

    if (detailArray.length === 0) {
      setError("gooodsIssuedDetails", {
        type: "manual",
        message: t("error.at_least_one_product"),
      });
      return;
    }

    const payload = {
      ...formData,
      gooodsIssuedDetails: detailArray,
    };

    await createGoodsIssued(payload);
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
      <Breadcrumb />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border bg-white border-gray-300 shadow-md p-4 w-full"
      >
        {/* ================== Thông tin chung ================== */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-1">
          {/* Cột 1: Warehouse + Garage */}
          <div>
            <LabelSelectWithSearch
              labelKey="warehouse"
              name="warehouseId"
              control={control}
              options={warehouse}
              t={t}
              error={errors.warehouseId?.message}
            />
            <LabelSelectWithSearch
              labelKey="garage"
              name="garageId"
              control={control}
              options={garages}
              t={t}
              error={errors.garageId?.message}
            />
          </div>

          {/* Cột 2: Reference Number + Invoice Code */}
          <div>
            <LabelInput
              labelKey="reference_number"
              name="referenceNumber"
              register={register}
              t={t}
              error={errors.referenceNumber?.message}
            />
            <LabelInput
              labelKey="invoice_code"
              name="invoiceCode"
              register={register}
              t={t}
              error={errors.invoiceCode?.message}
            />
          </div>

          {/* Cột 3: Nút Submit và Reset */}
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
          <span>
            {t("labels.product_in_invoice", "Product in Goods Issued Invoice")}
          </span>
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
        {errors.gooodsIssuedDetails && (
          <p className="text-red-500 text-sm mt-2">
            {errors.gooodsIssuedDetails.message}
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
                    {t("labels.action", "Action")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedProducts.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item.productName}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        min={1}
                        max={item.maxQuantity}
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(index, e.target.value)
                        }
                        className="w-20 border border-gray-300 rounded-sm px-2 py-1 text-sm"
                      />
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
                ))}
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
    type: option.workplaceType,
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
            onChange={(selectedOption) => {
              field.onChange(selectedOption.value);
              selectedOption.type === "Warehouse" &&
                CurrentWarehouse.set((v) => {
                  v.value.id = selectedOption.value;
                  return v;
                });
            }}
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

export default CreateGoodsIssued;
