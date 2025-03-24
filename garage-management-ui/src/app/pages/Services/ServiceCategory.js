import React from "react";
import PageTitle from "../../components/common/PageTitle";
import { useTranslation } from "react-i18next";
import commpagesbg from "../../assets/HomePage/commpagesbg.jpg";

// import Sidebar from "./partials/Sidebar";
import Content from "./partials/Content";

export default function ServiceCategory() {
  const { t } = useTranslation("dedicatedServicesA");

  return (
    <>
      <PageTitle
        image={commpagesbg}
        title={t("about_title.title")}
        title1={t("about_title.breadcrumb_home")}
        subtitle={t("about_title.title")}
        height="500"
      />

      <div className="flex md:flex-row min-h-screen lg:p-12 p-4 ">
        {/* <Sidebar /> */}

        {/* Nội dung chính */}
        <Content />
      </div>
    </>
  );
}
