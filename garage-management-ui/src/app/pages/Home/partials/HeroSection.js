import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import anh1 from "../../../assets/HomePage/hero_slider_bg_1.png";
import anh2 from "../../../assets/HomePage/hero_slider_bg_2.png";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdAlternateEmail, MdSchedule } from "react-icons/md";

import {
  HiOutlineArrowNarrowRight,
  HiOutlineArrowNarrowLeft,
} from "react-icons/hi";
import { useTranslation } from "react-i18next";
const imageMap = {
  hero_slider_bg_1: anh1,
  hero_slider_bg_2: anh2,
};
const HeroSection = () => {
  const { t } = useTranslation("ver1");
  return (
    <section className="relative z-10 w-full h-screen bg-gray-900 overflow-hidden">
      <div className="relative w-full h-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="w-full h-full"
        >
          {t("slides", { returnObjects: true }).map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="relative flex items-center justify-center"
            >
              {/* Background Image */}
              <img
                src={imageMap[slide.img]}
                alt="Slide Background"
                className="absolute w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-left lg:pl-36 pl-6 text-left">
                <div className="max-w-2xl text-white">
                  <h1 className="text-2xl lg:text-7xl font-bold uppercase leading-tight drop-shadow-lg">
                    {slide.title1}
                  </h1>
                  <h2 className="text-red-500 text-5xl lg:text-6xl font-bold uppercase drop-shadow-lg">
                    {slide.title2}
                  </h2>
                  <p className="text-gray-300 text-xl lg:text-2xl mt-4 leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="mt-16">
                    <a
                      href="appointment.html"
                      className="px-14 py-6 mt-6 bg-red-600 text-white font-title text-xl uppercase rounded-sm shadow-lg 
               transition-all transform hover:-translate-y-2 hover:bg-white hover:text-black hover:shadow-xl duration-300"
                    >
                      {t("appointment")}
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons (Góc dưới bên phải) */}
        <div className="absolute bottom-16 right-16  text-3xl space-x-4 z-30 xl:flex hidden">
          {/* Previous Button */}
          <button className="custom-prev bg-white/20 backdrop-blur-sm text-white w-14 h-14 flex items-center justify-center rounded-full  ">
            <HiOutlineArrowNarrowLeft className="transition-transform transform hover:-translate-x-2" />
          </button>

          {/* Next Button */}
          <button className="custom-next  bg-white/20 backdrop-blur-sm text-white w-14 h-14 flex items-center justify-center rounded-full  ">
            <HiOutlineArrowNarrowRight className="transition-transform transform hover:translate-x-2" />
          </button>
        </div>
      </div>

      {/* Contact Information */}
      <div className="absolute z-20 top-32 left-1/3  gap-32 text-white font-semibold hidden xl:flex">
        <a className="flex items-center  space-x-2  text-white ">
          <div className="bg-red-500/50 p-3 rounded-full text-white">
            <MdAlternateEmail />
          </div>
          <span>example@email.com</span>
        </a>
        <a className="flex items-center space-x-2 text-white ">
          <div className="bg-red-500/50 p-3 rounded-full text-white">
            <FaMapLocationDot />
          </div>
          <span>Address: Lô 1, Thành Phố Thủ Đức</span>
        </a>
        <a className="flex items-center space-x-2  text-white ">
          <div className="bg-red-500/50 p-3 rounded-full text-white">
            <MdSchedule />
          </div>
          <span>Sun - Thu: Open 27/7</span>
        </a>
      </div>

      {/* Social Media */}
      <div className="absolute top-1/2 left-6 transform -translate-y-1/2 flex flex-col items-center gap-4">
        <a href="#" className="text-white hover:text-red-500 transition-all">
          🔵 Facebook
        </a>
        <a href="#" className="text-white hover:text-red-500 transition-all">
          🟣 Instagram
        </a>
        <a href="#" className="text-white hover:text-red-500 transition-all">
          🔵 Twitter
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
