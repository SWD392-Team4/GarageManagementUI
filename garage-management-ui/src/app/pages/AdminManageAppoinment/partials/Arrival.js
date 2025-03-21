import React from "react";
import FilterTablePost from "./FilterTablePosts";
import ListAppoinment from "./ListAppoinment";

export default function Arrival() {
  return (
    <>
      <FilterTablePost />

      <ListAppoinment status="arrival" />
    </>
  );
}
