import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../pages/Home/partials/Footer/Footer";
import Header from "../Header/Header";
import PageTitle from "../../components/common/PageTitle";

export default function LayoutAuthenCustomer() {
  return (
    <div>
      <Header />
      <section className="bg-black ">
        <PageTitle title="Sign In" title1="Home" subtitle="Sign In" />
        <Outlet></Outlet>
      </section>

      <Footer />
    </div>
  );
}
