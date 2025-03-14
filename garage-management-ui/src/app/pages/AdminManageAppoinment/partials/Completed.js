import React from "react";
import FilterTablePost from "./FilterTablePosts";
import ListAppoinment from "./ListAppoinment";

export default function Completed() {
  return (
    <>
      <FilterTablePost />

      <ListAppoinment status="Completed" />
    </>
  );
}
