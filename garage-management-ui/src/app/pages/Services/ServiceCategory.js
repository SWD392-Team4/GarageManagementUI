import React from "react";
import PageTitle from "../../components/common/PageTitle";
import { useTranslation } from "react-i18next";
// import Sidebar from "./partials/Sidebar";
import Content from "./partials/Content";

export default function ServiceCategory() {
  const { t } = useTranslation("dedicatedServicesA");

  return (
    <>
      <PageTitle
        title={t("pageTitle")}
        title1={t("home")}
        subtitle={t("pageTitle2")}
      />
      <div className="flex md:flex-row min-h-screen lg:p-12 p-4 ">
        {/* Sidebar */}
        {/* <Sidebar /> */}

        {/* Nội dung chính */}
        <Content />
      </div>
    </>
  );
}
