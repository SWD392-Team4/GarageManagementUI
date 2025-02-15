
import React from "react";
import PageTitle from "../../components/common/PageTitle";
import ProductDetail from "./partials/ProductDetail";

const CustomerProductDetail = () => {
  
  return (
    <>
    <PageTitle
          title={"Detail"}
          title1="Home"
          subtitle={"Products"}
        />
        <ProductDetail/>
    </>
  );
};

export default CustomerProductDetail;
