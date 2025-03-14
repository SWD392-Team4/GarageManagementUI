import React, { useState } from "react";
import { FaCheckSquare, FaRegSquare, FaCar, FaStar } from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";
import { PiGear, PiPackageLight } from "react-icons/pi";
import { BookingSignify } from "../Services/BookingSignify";
import { useTranslation } from "react-i18next";

const ToggleCards = () => {
  const sBooking = BookingSignify.use();
  const handleSelect = (option) => {
    BookingSignify.set((v) => {
      v.value.type = option;
    });
  };
  const { t } = useTranslation("BookingOnline");
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Card 1 */}
      <div
        onClick={() => handleSelect("sigle-service")}
        className="relative group cursor-pointer p-20  overflow-hidden transition-all duration-300"
      >
        <span className="absolute left-0 top-0 h-full w-5 border-y-2 border-l-2 border-red-700/60 transition-all duration-500 group-hover:w-full"></span>
        <span className="absolute right-0 top-0 h-full w-5 border-y-2 border-r-2 border-red-700/60 transition-all duration-500 group-hover:w-full"></span>

        <div className="absolute top-2 left-2 z-20 text-xl text-red-700">
          {sBooking.type === "sigle-service" ? (
            <FaCheckSquare />
          ) : (
            <FaRegSquare />
          )}
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-20 transition-all duration-500 ">
          <div className="relative">
            <GiAutoRepair
              size={250}
              className="transition-all duration-500 group-hover:hidden opacity-20"
            />
            <PiGear
              size={280}
              className="transition-all absolute  inset-x-14 -inset-y-52  duration-500 hidden group-hover:block opacity-20 animate-spin-slow"
            />
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full text-red-700">
          <p className="transition-all font-bold text-2xl font-title duration-500 group-hover:opacity-0 group-hover:-translate-x-full">
            {t("select.toggle.individualService.title")}
          </p>
          <p className="absolute transition-all duration-500 opacity-0 font-semibold font-title translate-x-full group-hover:opacity-100 group-hover:translate-x-0">
            {t("select.toggle.individualService.description")}
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div
        onClick={() => handleSelect("package-service")}
        className="relative group cursor-pointer p-5  overflow-hidden transition-all duration-300"
      >
        <span className="absolute left-0 top-0 h-full w-5 border-y-2 border-l-2 border-orange-700/60 transition-all duration-500 group-hover:w-full"></span>
        <span className="absolute right-0 top-0 h-full w-5 border-y-2 border-r-2 border-orange-700/60 transition-all duration-500 group-hover:w-full"></span>

        <div className="absolute top-2 left-2 z-20 text-xl text-orange-700/60">
          {sBooking.type === "package-service" ? (
            <FaCheckSquare />
          ) : (
            <FaRegSquare />
          )}
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-20 transition-all duration-500 ">
          <div className="relative">
            <PiPackageLight
              size={250}
              className="transition-all duration-500 group-hover:hidden opacity-20"
            />
            <PiGear
              size={280}
              className="transition-all absolute  -inset-x-[350px] -inset-y-52  duration-500 hidden group-hover:block opacity-20 animate-spin-slow"
            />
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full text-orange-700">
          <p className="transition-all font-bold text-2xl font-title duration-500 group-hover:opacity-0 group-hover:-translate-x-full">
            {t("select.toggle.comboService.title")}
          </p>
          <p className="absolute transition-all duration-500 opacity-0 font-semibold font-title translate-x-full group-hover:opacity-100 group-hover:translate-x-0">
            {t("select.toggle.comboService.description")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToggleCards;
