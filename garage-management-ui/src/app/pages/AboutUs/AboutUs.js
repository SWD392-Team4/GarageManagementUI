import React from "react";
import PageTitle from "../../components/common/PageTitle";
import commpagesbg from "../../assets/HomePage/commpagesbg.jpg";
import OverlayText from "./partials/OverlayText";
import Footer from "../Home/partials/Footer/Footer";
import QualitySection from "./partials/Quality";
import FeatureSection from "./partials/Features";
import EngineerSlider from "./partials/EngineerSlider";
export default function AboutUs() {
  return (
    <>
      <PageTitle
        image={commpagesbg}
        title="About Us"
        title1="Home"
        subtitle="Aboutus"
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
