import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../../pages/Home/partials/Footer/Footer";

export default function LayoutProduct() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
