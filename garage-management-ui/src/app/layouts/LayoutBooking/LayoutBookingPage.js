import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export default function LayoutBookingPage() {
  return (
    <div className="relative min-h-screen">
      {/* Video nền */}
      <div className="bg-black absolute top-0 left-0 w-full h-full object-cover"></div>
      <video
        autoPlay
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/assets/video/carvideo.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Nội dung */}
      <div className="relative z-10">
        <Header />

        <div className="w-full min-h-screen flex items-center justify-center">
          {/* Nền mờ và blur */}
          <div className="max-w-6xl w-full mx-auto px-4 py-5 z-40 bg-white/50 backdrop-blur-sm shadow-xl my-16 border">
            {/* Tiêu đề */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
