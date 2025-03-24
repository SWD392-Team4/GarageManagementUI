import React from "react";
import FilterTablePost from "./FilterTablePosts";
import ListAppoinment from "./ListAppoinment";

export default function Rejected() {
  return (
    <>
      <FilterTablePost />

      <ListAppoinment status="Rejected" />
    </>
  );
}
