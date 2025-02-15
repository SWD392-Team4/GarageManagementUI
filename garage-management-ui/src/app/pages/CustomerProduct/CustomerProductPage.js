import React, { useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import ProductsPage from "./partials/ProductsPage";



const CustomerProductPage = () => {
  return (
    <>
    <PageTitle
          title={"Products"}
          title1="Home"
          subtitle={"Products"}
        />
    <ProductsPage/>
    </>
  );
};

export default CustomerProductPage;
