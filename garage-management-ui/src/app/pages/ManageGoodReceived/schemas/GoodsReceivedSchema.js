export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatDateYearMonthDay = (date) => {
  if (!date) return "";
  const formattedDate = new Date(date).toISOString().split("T")[0];
  return formattedDate;
};

export const getFormattedCurrentDate = () => {
  const currentDate = new Date();
  return `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
};

export const formatVietnameseCurrency = (amount) => {
  return amount.toLocaleString("vi-VN") + " VND";
};

export const parseVietnameseCurrency = (formattedAmount) => {
  return Number(formattedAmount.replace(/\./g, "").replace(" VND", ""));
};

// goodsReceivedSchema.js
import * as yup from "yup";

export const getGoodsReceivedSchema = (t) =>
  yup.object().shape({
    supplierContactId: yup.string().required(t("error.supplier_required")),
    warehouseId: yup.string().required(t("error.warehouse_required")),
    refereneceNumber: yup
      .string()
      .required(t("error.reference_number_required")),
    invoiceCode: yup.string().required(t("error.invoice_code_required")),
    sourceAddress: yup.string().required(t("error.source_address_required")),
    sourceWards: yup.string().required(t("error.source_wards_required")),
    sourceProvince: yup.string().required(t("error.source_province_required")),
    sourceDistrict: yup.string().required(t("error.source_district_required")),
    goodsReceivedDetailDtoForCreations: yup
      .array()
      .min(1, t("error.at_least_one_product"))
      .of(
        yup.object().shape({
          productId: yup.string().required(),
          quantity: yup.number().required(),
          unitPrice: yup.number().min(1000, t("error.min_price")).required(),
        })
      ),
  });
