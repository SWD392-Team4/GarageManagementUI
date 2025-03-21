import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Banner() {
  const { t } = useTranslation("Service_Home");
  return (
    <div className="bg-yellow-100  rounded-sm p-6 mb-6 border border-yellow-200">
      <div className="text-center">
        <a href="index.html">
          <img
            className="mx-auto mb-3"
            src="/assets/img/logoDark.png"
            alt={t("banner.logo_alt")}
          />
        </a>
        <h3 className="text-xl font-semibold mb-2">
          {t("banner.title")}{" "}
          <span className="text-yellow-600">TURBO TRACK!</span>
        </h3>

        <p className="text-red-400 mb-3">{t("banner.subtitle")}</p>
        <h2 className="text-2xl font-bold text-yellow-700 mb-4">
          {t("banner.offer")}
        </h2>

        <Link to={"/booking"}>
          <div className="flex justify-center">
            <button
              className=" group p-5 cursor-pointer  relative      text-xl     border-0  flex  items-center 
      justify-center bg-transparent text-red-400 font-shadows font-bold  h-auto   w-[190px]   overflow-hidden    transition-all duration-100"
            >
              <span className="group-hover:w-full  absolute left-0  h-full w-5 border-y-2 border-l-2 border-red-400 transition-all duration-500"></span>
              <p
                className="group-hover:opacity-0  group-hover:translate-x-[-100%] absolute translate-x-0 transition-all
         duration-200"
              >
                {t("banner.button")}
              </p>
              <span className="group-hover:translate-x-0   group-hover:opacity-100 absolute  translate-x-full opacity-0  transition-all duration-200">
                {t("banner.button2")}
              </span>
              <span className="group-hover:w-full absolute right-0 h-full w-5  border-y-2 border-r-2  border-red-400 transition-all duration-500"></span>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
