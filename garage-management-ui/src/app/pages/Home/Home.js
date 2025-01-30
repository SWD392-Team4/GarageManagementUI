import React from "react";
import HeroSection from "./partials/HeroSection";
import Preloader from "./partials/Preloader/Preloader";
import Services1 from "./partials/Services1/Services1";
import Contact1 from "./partials/Contact/Contact1";
import PaneSwitcher from "./partials/PaneSwitcher/PaneSwitcher";
import { useTranslation } from "react-i18next";
import DedicatedServices from "./partials/DedicatedServices/DedicatedServices";
import Footer from "./partials/Footer/Footer";

export default function Home() {
  document.title = "HOME | Gara | 2KS1.NET";
  const { t } = useTranslation();

  return (
    <>
      <Preloader />
      <HeroSection />
      <Services1 />
      <DedicatedServices />
      <PaneSwitcher
        title2="After"
        title1="Before"
        beforeImg="/assets/img/before.png"
        afterImg="/assets/img/after.png"
        backgroundIMG="/assets/img/before_after_bg_1.svg"
      />
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
      ></Contact1>
      <Footer />
    </>
  );
}
