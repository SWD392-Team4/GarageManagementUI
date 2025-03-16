import React from "react";
import PageTitle from "../../components/common/PageTitle";
import PackageDetail from "./partials/PackageDetail";
import { useTranslation } from "react-i18next";

export default function CustomerPackageList() {
  const { t } = useTranslation("customer_package_title");
  return (
    <>
      <PageTitle
        title={t("customer_package_title.details")}
        title1={t("customer_package_title.home")}
        subtitle={t("customer_package_title.packages")}
      />
      <PackageDetail />
    </>
  );
}
