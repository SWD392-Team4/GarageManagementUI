import React from "react";
import ProfileCard from "./partials/ProfileCard";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";

export default function AdminProfile() {
  return (
    <div className="pt-10 md:p-3 bg-gray-100 h-screen w-full   p-5 flex flex-col">
      <Breadcrumb />
      <ProfileCard />
    </div>
  );
}
