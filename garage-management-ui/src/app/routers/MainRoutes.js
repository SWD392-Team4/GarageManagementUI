import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "../layouts/PageNotFound";
import Home from "../pages/Home";
import LayoutHome from "../layouts/LayoutHome";
export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path="/" element={<LayoutHome />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
