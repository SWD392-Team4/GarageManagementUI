import React from "react";
import { useTranslation } from "react-i18next";

const DedicatedServices = () => {
  const { t, i18n } = useTranslation("dedicatedServices");

  const services = [
    {
      title: t("title1"),
      description: t("BRAKE SYSTEM REPAIR"),
      icon: "🚗",
    },
    {
      title: t("title2"),
      description: t("ELECTRICAL REPAIR"),
      icon: "🔌",
    },
    {
      title: t("title3"),
      description: t("MAINTENANCE"),
      icon: "🧰",
    },
    {
      title: t("title4"),
      description: t("UPGRADES"),
      icon: "⚙️",
    },
    {
      title: t("title5"),
      description: t("CAR WASH"),
      icon: "🚙",
    },
    {
      title: t("title6"),
      description: t("DETAILING"),
      icon: "🛠️",
    },
  ];
  return (
    <div className="min-h-screen bg-black/95 text-white flex flex-col items-center px-4 lg:px-0">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium my-4 mt-7">
          {t("title7")}
        </h1>
        <p className="text-sm sm:text-lg lg:text-xl max-w-3xl mx-auto">
          {t("description")}
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] p-6 group rounded-md shadow-md flex flex-col items-center text-center border-b-4 border-orange-700 transition-transform duration-300 "
          >
            {/* Icon */}
            <div className="bg-orange-700 p-4 rounded-2xl mb-4 group-hover:animate-spin-once">
              <span className="text-3xl">{service.icon}</span>
            </div>
            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              {service.title}
            </h3>
            {/* Description */}
            <p className="text-sm sm:text-base text-gray-400 mx-2 sm:mx-6 lg:mx-10">
              {service.description}
            </p>
            {/* View More */}
            <div className="group mt-5">
              <a
                className="uppercase my-2 inline-block text-sm font-normal font-title text-white group-hover:scale-110 duration-200"
                href="#"
              >
                View More
              </a>
              <div className="border-t  border-orange-700 h-1 w-16 group-hover:w-24 transition-all duration-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DedicatedServices;
