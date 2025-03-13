import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createGoodsReceived } from "./service/GoodsReceivedService";
import ProductSelectionModal from "./modals/ProductSelectionModal";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
  supplierContactId: yup.string().required("Supplier Contact is required"),
  warehouseId: yup.string().required("Warehouse is required"),
  refereneceNumber: yup.string().required("Reference Number is required"),
  invoiceCode: yup.string().required("Invoice Code is required"),
  sourceAddress: yup.string().required("Source Address is required"),
  sourceProvince: yup.string().required("Source Province is required"),
  sourceDistrict: yup.string().required("Source District is required"),
  sourceWards: yup.string().required("Source Wards is required"),
  goodsReceivedDetailDtoForCreations: yup.array().of(
    yup.object().shape({
      quantity: yup.number().positive().required("Quantity is required"),
      unitPrice: yup.number().positive().required("Unit Price is required"),
      productId: yup.string().required("Product ID is required"),
    })
  ),
});

export default function CreateGoodsIssued() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      goodsReceivedDetailDtoForCreations: [],
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data) => {
    await createGoodsReceived(data);
  };

  const selectedProducts = watch("goodsReceivedDetailDtoForCreations");

  const handleAddProduct = (products) => {
    setValue("goodsReceivedDetailDtoForCreations", products);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">{t("create_goods_issued.title")}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {[
          "supplierContactId", "warehouseId", "refereneceNumber", "invoiceCode", "sourceAddress", "sourceProvince", "sourceDistrict", "sourceWards",
        ].map((field) => (
          <div key={field} className="flex flex-col">
            <label htmlFor={field} className="text-sm font-medium text-gray-700">{t(`create_goods_issued.${field}`)}</label>
            <input
              id={field}
              placeholder={t(`create_goods_issued.${field}`)}
              {...register(field)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            />
            {errors[field] && <p className="text-red-500 text-sm mt-1">{t(errors[field].message)}</p>}
          </div>
        ))}

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          {t("create_goods_issued.select_products")}
        </button>
        {selectedProducts.length > 0 && (
          <ul className="mt-4 border border-gray-200 p-4 rounded-md">
            {selectedProducts.map((product, index) => (
              <li key={index} className="text-gray-700">
                {`${t("create_goods_issued.product_id")}: ${product.productId}, ${t("create_goods_issued.quantity")}: ${product.quantity}, ${t("create_goods_issued.price")}: ${product.unitPrice}`}
              </li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          {t("create_goods_issued.submit")}
        </button>
      </form>

      {isModalOpen && (
        <ProductSelectionModal onSelect={handleAddProduct} selectedProducts={selectedProducts} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}