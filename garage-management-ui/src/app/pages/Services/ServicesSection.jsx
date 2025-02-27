import React from "react";
import { useTranslation } from "react-i18next";
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
import ServiceCard from "./ServiceCard";
import Footer from "../Home/partials/Footer/Footer";
import PageTitle from "../../components/common/PageTitle";
import "./index.css";
import InspectImage from "../../assets/services/inspect.jpg";
import ReplaceImage from "../../assets/services/replace.jpg";
import LubricateImage from "../../assets/services/lubricate.jpg";
import AlignImage from "../../assets/services/align.jpg";
import RefillImage from "../../assets/services/refill.jpg";
import RepairImage from "../../assets/services/repair.jpg";
import CleanImage from "../../assets/services/clean.jpg";
import UpgradeImage from "../../assets/services/upgrade.jpg";
import RestoreImage from "../../assets/services/restore.jpg";
import UpdateImage from "../../assets/services/update.jpg";
import PolishImage from "../../assets/services/polish.jpg";
import ProtectImage from "../../assets/services/protect.jpg";
import DeodorizeImage from "../../assets/services/deodorize.jpg";
import ConditionImage from "../../assets/services/condition.jpg";
import RemoveImage from "../../assets/services/remove.jpg";
import RestoreLightingImage from "../../assets/services/restore-lighting.jpg";
import TestimonialSwiper from "./TestimonialSwiper";
const services = [
  { image: InspectImage, icon: <FaSearch />, key: "inspect" }, // Kiểm tra
  { image: ReplaceImage, icon: <FaSyncAlt />, key: "replace" }, // Thay thế
  { image: LubricateImage, icon: <FaOilCan />, key: "lubricate" }, // Bôi trơn
  { image: AlignImage, icon: <FaRuler />, key: "align" }, // Căn chỉnh
  { image: RefillImage, icon: <FaBolt />, key: "refill" }, // Nạp
  { image: RepairImage, icon: <FaTools />, key: "repair" }, // Sửa chữa
  { image: CleanImage, icon: <FaSoap />, key: "clean" }, // Làm sạch
  { image: UpgradeImage, icon: <FaRocket />, key: "upgrade" }, // Nâng cấp
  { image: RestoreImage, icon: <FaRedo />, key: "restore" }, // Phục hồi
  { image: UpdateImage, icon: <FaSave />, key: "update" }, // Cập nhật phần mềm
  { image: PolishImage, icon: <FaStar />, key: "polish" }, // Đánh bóng
  { image: ProtectImage, icon: <FaShieldAlt />, key: "protect" }, // Bảo vệ
  { image: DeodorizeImage, icon: <FaWind />, key: "deodorize" }, // Khử mùi
  { image: ConditionImage, icon: <FaTint />, key: "condition" }, // Dưỡng
  { image: RemoveImage, icon: <FaTrash />, key: "remove" }, // Loại bỏ
  {
    image: RestoreLightingImage,
    icon: <FaLightbulb />,
    key: "restoreLighting",
  }, // Phục hồi ánh sáng
];

const ServicesSection = () => {
  const { t } = useTranslation("dedicatedServicesA");

  return (
    <>
      <PageTitle
        title={t("pageTitle")}
        title1={t("home")}
        subtitle={t("pageTitle")}
      />
      <section className="pt-16 bg-gray-100 text-center relative ">
        <h2 className="text-red-500 uppercase text-2xl font-shadows font-semibold">
          {t("title")}
        </h2>
        <div className="flex justify-center pt-2">
          <h1 className="text-3xl md:text-6xl font-medium font-protest text-black mt-2 w-1/3">
            {t("subtitle")}
          </h1>
        </div>

        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl px-4">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              image={service.image}
              icon={service.icon}
              title={t(`services.${service.key}.title`)}
              description={t(`services.${service.key}.description`)}
            />
          ))}
        </div>
      </section>
      <div class="wave-divider ">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="fill-gray-100 "
          ></path>
        </svg>
      </div>
      <TestimonialSwiper />

      <Footer />
    </>
  );
};

export default ServicesSection;
