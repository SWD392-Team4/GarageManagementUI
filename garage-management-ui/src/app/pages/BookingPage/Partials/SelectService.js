import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAllServiceByCarModel } from "../Services/BookingPageService";
import ServiceCard from "./ServiceCard";
import {
  FaSearch,
  FaSyncAlt,
  FaOilCan,
  FaRuler,
  FaBolt,
  FaTools,
  FaSoap,
  FaRocket,
  FaRedo,
  FaSave,
  FaStar,
  FaShieldAlt,
  FaWind,
  FaTint,
  FaTrash,
  FaLightbulb,
} from "react-icons/fa";
import { BookingSignify } from "../Services/BookingSignify";
import Navigation from "./Navigation";

// Mảng mapping icon (dữ liệu fake)
const servicesFake = [
  { icon: <FaSearch />, key: "inspect" },
  { icon: <FaSyncAlt />, key: "replace" },
  { icon: <FaOilCan />, key: "lubricate" },
  { icon: <FaRuler />, key: "align" },
  { icon: <FaBolt />, key: "refill" },
  { icon: <FaTools />, key: "repair" },
  { icon: <FaSoap />, key: "clean" },
  { icon: <FaRocket />, key: "upgrade" },
  { icon: <FaRedo />, key: "restore" },
  { icon: <FaSave />, key: "update" },
  { icon: <FaStar />, key: "polish" },
  { icon: <FaShieldAlt />, key: "protect" },
  { icon: <FaWind />, key: "deodorize" },
  { icon: <FaTint />, key: "condition" },
  { icon: <FaTrash />, key: "remove" },
  { icon: <FaLightbulb />, key: "restorelighting" },
];

export default function SelectService() {
  const { t } = useTranslation("BookingOnline");
  const [services, setServices] = useState([]);
  const sBooking = BookingSignify.use();
  // Lấy dữ liệu từ API
  const fetchData = useCallback(async () => {
    try {
      let response = await getAllServiceByCarModel();
      setServices(response.data.value);
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="p-4">
        <div className="text-gray-800 opacity-60 text-5xl font-extrabold font-space text-center pb-10 ">
          Suitable services
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl px-4">
          {services.map((service) => {
            // Chuyển service.action về chữ thường để so sánh
            const actionKey = service.action
              ? service.action.toLowerCase()
              : "";
            // Tìm icon tương ứng trong servicesFake
            const iconObj = servicesFake.find((item) => item.key === actionKey);
            const icon = iconObj ? iconObj.icon : null;

            return (
              <ServiceCard
                key={service.id}
                id={service.id}
                carPartId={service.carPartId}
                icon={icon}
                title={service.serviceName}
                description={
                  service.description || t(`services.${actionKey}.description`)
                }
                service={service}
              />
            );
          })}
        </div>
        <Navigation
          prevLink="/booking/select-options"
          nextLink="/booking/customer-info"
        />
      </div>
    </>
  );
}
