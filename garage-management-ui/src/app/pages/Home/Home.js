import React, { useEffect, useState, useRef } from "react";
import { Element, scroller } from "react-scroll";
import HeroSection from "./partials/HeroSection";
import Preloader from "./partials/Preloader/Preloader";
import Services1 from "./partials/Services1/Services1";
import Contact1 from "./partials/Contact/Contact1";
import PaneSwitcher from "./partials/PaneSwitcher/PaneSwitcher";
import { useTranslation } from "react-i18next";
import DedicatedServices from "./partials/DedicatedServices/DedicatedServices";
import Footer from "./partials/Footer/Footer";

export default function Home() {
  document.title = "HOME | Gara | TURBO TRACK";
  const { t } = useTranslation("ver1");

  const sections = [
    "hero",
    "services",
    "dedicated",
    "paneSwitcher",
    "contact",
    "footer",
  ]; // Tên các section
  const [currentIndex, setCurrentIndex] = useState(0); // Section hiện tại
  const isScrolling = useRef(false); // Chặn spam cuộn nhanh

  useEffect(() => {
    const handleWheel = (event) => {
      if (isScrolling.current) return; // Chặn spam cuộn liên tục
      isScrolling.current = true;

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000); // Giới hạn 1 giây mới cho phép cuộn tiếp

      if (event.deltaY > 0 && currentIndex < sections.length - 1) {
        // Cuộn xuống
        setCurrentIndex((prev) => prev + 1);
      } else if (event.deltaY < 0 && currentIndex > 0) {
        // Cuộn lên
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
      <Preloader />

      <Element name="hero">
        <HeroSection />
      </Element>

      <Element name="services">
        <Services1 />
      </Element>

      <Element name="dedicated">
        <DedicatedServices />
      </Element>

      <Element name="paneSwitcher">
        <PaneSwitcher
          title2="After"
          title1="Before"
          beforeImg="/assets/img/before.png"
          afterImg="/assets/img/after.png"
          backgroundIMG="/assets/img/before_after_bg_1.svg"
        />
      </Element>

      <Element name="contact">
        <Contact1
          Title={t(`Contact.title`)}
          subTitle={t(`Contact.subTitle`)}
          address={t(`Contact.address`)}
          email={t(`Contact.email`)}
          number={t(`Contact.number`)}
          clientNumber={t(`Contact.clientNumber`)}
          img={t(`Contact.img`)}
          client={t(`Contact.client`)}
          subtitle2={t(`Contact.subtitle2`)}
          title2={t(`Contact.title2`)}
          submit={t(`Contact.submit`)}
          thankyou={t(`Contact.thankyou`)}
        />
      </Element>

      <Element name="footer">
        <Footer />
      </Element>
    </>
  );
}
