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

import * as Yup from "yup";

export const getGoodsIssuedSchema = (t) => {
  return Yup.object().shape({
    warehouseId: Yup.string().required(
      t("error.required", { field: t("labels.warehouse") })
    ),
    garageId: Yup.string().required(
      t("error.required", { field: t("labels.garage") })
    ),
    gooodsIssuedDetails: Yup.array()
      .of(
        Yup.object().shape({
          productAtWareHouseId: Yup.string().required(
            t("error.required", { field: t("labels.product_name") })
          ),
          quantity: Yup.number()
            .required(t("error.required", { field: t("labels.quantity") }))
            .min(1, t("error.min", { field: t("labels.quantity"), min: 1 })),
          goodsReceivedId: Yup.string().required(
            t("error.required", { field: t("labels.goods_received_id") })
          ),
        })
      )
      .min(1, t("error.at_least_one_product")),
  });
};
