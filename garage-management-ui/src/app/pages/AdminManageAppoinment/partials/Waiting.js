import React from "react";
import ListAppoinment from "./ListAppoinment";
import FilterTablePost from "./FilterTablePosts";

export default function Waiting() {
  return (
    <>
      <FilterTablePost />

      <ListAppoinment status="Pending" />
    </>
  );
}
