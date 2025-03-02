import React from "react";
import PageTitle from "../../components/common/PageTitle";
import PackageDetail from "./partials/PackageDetail";

export default function CustomerPackageList() {
  return (
    <>
      <PageTitle title="Details" title1="Home" subtitle="Packages" />
      <PackageDetail />
    </>
  );
}
