import React from "react";
import PageTitle from "../../components/common/PageTitle";
import ProductDetail from "./partials/ProductDetail";
import { useTranslation } from "react-i18next";

const CustomerProductDetail = () => {
  const { t } = useTranslation("customer_product_detail");
  return (
    <>
      <PageTitle
        title={t("customer_product_detail.product_detail_heading")}
        title1={t("customer_product_detail.product_list_heading_home")}
        subtitle={t("customer_product_detail.product_list_heading")}
      />
      <ProductDetail />
    </>
  );
};

export default CustomerProductDetail;
