import React from "react";
import HeroSection from "./partials/HeroSection";
import Preloader from "./partials/Preloader/Preloader";
import Services1 from "./partials/Services1/Services1";

export default function Home() {
  document.title = "HOME | Gara | 2KS1.NET";

  return (
    <>
      <Preloader />
      <HeroSection />
      <Services1 />
    </>
  );
}
