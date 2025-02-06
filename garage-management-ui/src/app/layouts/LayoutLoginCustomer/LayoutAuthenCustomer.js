import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../pages/Home/partials/Footer/Footer";
import Header from "../Header/Header";
import PageTitle from "../../components/common/PageTitle";

export default function LayoutAuthenCustomer() {
  return (
    <div>
      <Header />

      <Outlet></Outlet>

      <Footer />
    </div>
  );
}
