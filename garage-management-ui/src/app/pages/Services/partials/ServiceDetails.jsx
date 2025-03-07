import React from "react";
import PageTitle from "../../../components/common/PageTitle";
import Footer from "../../Home/partials/Footer/Footer";
import ListCategories from "./ListCategories";
import Banner from "./Banner";
import Tags from "./Tags";
import ContentServiceDetail from "./ContentServiceDetail";

export default function ServiceDetails() {
  return (
    <>
      <PageTitle title={"Service Detail"} title1="Home" subtitle={"Detail"} />
      <section className="w-full bg-white py-10">
        <div className="max-w-screen-xl mx-auto px-4">
          {/* Bắt đầu phần bố cục 2 cột */}
          <div className="flex flex-wrap -mx-4">
            {/* Cột trái (tương đương col-lg-8) */}
            <ContentServiceDetail />

            {/* Cột phải (tương đương col-lg-4) */}
            <div className="w-full lg:w-4/12 px-4">
              <ListCategories />

              {/* Banner */}
              <Banner />

              {/* Tags */}
              <Tags />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
