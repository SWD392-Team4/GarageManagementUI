import React, { useEffect, useState, useRef } from "react";
import { Element, scroller } from "react-scroll";
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

  // Danh sách các section để điều hướng
  const sections = ["overlayText", "quality", "engineer", "feature"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrolling = useRef(false); // Chặn spam cuộn nhanh

  useEffect(() => {
    const handleWheel = (event) => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000); // Chặn spam cuộn trong 1 giây

      if (event.deltaY > 0 && currentIndex < sections.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (event.deltaY < 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentIndex]);

  useEffect(() => {
    scroller.scrollTo(sections[currentIndex], {
      duration: 800,
      smooth: "easeInOutQuart",
    });
  }, [currentIndex]);

  return (
    <>
      <PageTitle
        image={commpagesbg}
        title={t("about_title.title")}
        title1={t("about_title.breadcrumb_home")}
        subtitle={t("about_title.title")}
        height="500"
      />

      {/* Đánh dấu từng section để cuộn đến */}
      <Element name="overlayText">
        <OverlayText />
      </Element>

      <Element name="quality">
        <QualitySection />
      </Element>

      <Element name="engineer">
        <EngineerSlider />
      </Element>

      <Element name="feature">
        <FeatureSection />
      </Element>

      <Footer />
    </>
  );
}
