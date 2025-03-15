import React from "react";
import FilterTablePost from "./FilterTablePosts";
import ListAppoinment from "./ListAppoinment";

export default function Approved() {
  return (
    <>
      <FilterTablePost />

      <ListAppoinment status="Approved" />
    </>
  );
}
