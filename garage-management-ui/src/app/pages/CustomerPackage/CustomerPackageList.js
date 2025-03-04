import React from "react";
import PageTitle from "../../components/common/PageTitle";
import PackageListPage from "./partials/PackageListPage";

export default function CustomerPackageList() {
  return (
    <>
      <PageTitle title="Packages" title1="Home" subtitle="Packages" />
      <PackageListPage />
    </>
  );
}
