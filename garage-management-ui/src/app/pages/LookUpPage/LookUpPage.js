import React from "react";
import LookUp from "./partials/LookUp";
import PageTitle from "../../components/common/PageTitle";

export default function LookUpPage() {
  return (
    <>
      <PageTitle title="Look up" title1="Home" subtitle="Find invoice" />
      <LookUp />
    </>
  );
}
