import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export default function LayoutHome() {
  return (
    <>
      <Header />
      <Outlet></Outlet>
    </>
  );
}
