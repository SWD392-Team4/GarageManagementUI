import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import anh1 from "../../../assets/HomePage/hero_slider_bg_1.png";
import anh2 from "../../../assets/HomePage/hero_slider_bg_2.png";
import {
  HiOutlineArrowNarrowRight,
  HiOutlineArrowNarrowLeft,
} from "react-icons/hi";

const slides = [
  {
    id: 1,
    title1: "Car Repair & Auto",
    title2: "Services",
    description:
      "Our skilled team of certified technicians is here to provide top-notch car repair and auto services to ensure your vehicle performs at its best.",
    img: anh1,
  },
  {
    id: 2,
    title1: "AUTOMOTIVE REPAIR",
    title2: "MAINTENANCE",
    description:
      "Our skilled team of certified technicians is here to provide top-notch car repair and auto services to ensure your vehicle performs at its best.",
    img: anh2,
  },
];

const HeroSection = () => {
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
          {slides.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="relative flex items-center justify-center"
            >
              {/* Background Image */}
              <img
                src={slide.img}
                alt="Slide Background"
                className="absolute w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center px-6 text-center">
                <div className="max-w-2xl text-white">
                  <h1 className="text-6xl md:text-7xl font-bold uppercase leading-tight drop-shadow-lg">
                    {slide.title1}
                  </h1>
                  <h2 className="text-red-500 text-5xl md:text-6xl font-bold uppercase drop-shadow-lg">
                    {slide.title2}
                  </h2>
                  <p className="text-gray-300 text-lg mt-4 leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="mt-6">
                    <a
                      href="appointment.html"
                      className="px-6 py-3 bg-red-600 text-white font-semibold uppercase rounded-md hover:bg-red-700 transition-all shadow-lg"
                    >
                      Appointment
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons (Góc dưới bên phải) */}
        <div className="absolute bottom-16 right-16 flex text-3xl space-x-4 z-30">
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
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-10 text-white text-sm">
        <a
          href="tel:(406)555-0120"
          className="hover:text-red-500 transition-all"
        >
          📞 (406) 555-0120
        </a>
        <a
          href="mailto:example@email.com"
          className="hover:text-red-500 transition-all"
        >
          📧 example@email.com
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
