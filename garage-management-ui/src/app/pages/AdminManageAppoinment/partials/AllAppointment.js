import React from "react";
import FilterTablePost from "./FilterTablePosts";
import ListAppoinment from "./ListAppoinment";

export default function AllAppointment() {
  return (
    <>
      <FilterTablePost />

      <ListAppoinment type="type" />
    </>
  );
}
