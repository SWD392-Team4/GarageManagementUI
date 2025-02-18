import React from "react";
import PageTitle from "../../../components/common/PageTitle";
import commpagesbg from "../../../assets/HomePage/commpagesbg.jpg";
import OverlayText from "./OverlayText";
import Footer from "../../Home/partials/Footer/Footer";
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
      <Footer />
    </>
  );
}
