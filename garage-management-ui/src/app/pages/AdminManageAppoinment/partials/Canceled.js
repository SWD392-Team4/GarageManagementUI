import React from "react";
import FilterTablePost from "./FilterTablePosts";
import ListAppoinment from "./ListAppoinment";

export default function Canceled() {
  return (
    <>
      <FilterTablePost />

      <ListAppoinment status="Canceled" />
    </>
  );
}
