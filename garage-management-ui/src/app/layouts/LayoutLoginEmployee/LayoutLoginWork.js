import React from "react";
import { Outlet } from "react-router-dom";
import backgroundImage from "../../assets/auth/1.jpg"; // Adjust the path as needed

export default function LayoutLoginWork() {
  return (
    <>
      <section
        className="relative flex items-center justify-center bg-cover bg-center min-h-screen"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto relative z-10">
          <Outlet />
        </div>
      </section>
    </>
  );
}
