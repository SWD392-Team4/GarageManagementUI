import React from "react";
import PageTitle from "../../components/common/PageTitle";
import commpagesbg from "../../assets/HomePage/commpagesbg.jpg";
import OverlayText from "./partials/OverlayText";
import Footer from "../Home/partials/Footer/Footer";
import QualitySection from "./partials/Quality";
import FeatureSection from "./partials/Features";
import EngineerSlider from "./partials/EngineerSlider";
import { useTranslation } from "react-i18next";
export default function AboutUs() {
  const { t } = useTranslation("about_title");
  return (
    <>
      <PageTitle
        image={commpagesbg}
        title={t("about_title.title")}
        title1={t("about_title.breadcrumb_home")}
        subtitle={t("about_title.title")}
        height="500"
      />

      <OverlayText />
      <QualitySection/>
      <EngineerSlider/>
      <FeatureSection/>
      <Footer />
    </>
  );
}
