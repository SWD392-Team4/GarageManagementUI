import React from "react";
import FilterTablePost from "./FilterTablePosts";
import ListAppoinment from "./ListAppoinment";

export default function InProgess() {
  return (
    <>
      <FilterTablePost />

      <ListAppoinment status="InProgress" />
    </>
  );
}
