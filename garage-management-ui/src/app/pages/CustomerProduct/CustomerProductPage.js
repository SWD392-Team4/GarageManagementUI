import React, { useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import ProductsPage from "./partials/ProductsPage";
import { useTranslation } from "react-i18next";

const CustomerProductPage = () => {
  const { t } = useTranslation("customer_product_detail");
  return (
    <>
      <PageTitle
        title={t("customer_product_detail.product_list_heading")}
        title1={t("customer_product_detail.product_list_heading_home")}
        subtitle={t("customer_product_detail.product_list_heading")}
      />
      <ProductsPage />
    </>
  );
};

export default CustomerProductPage;
