import { GiAutoRepair, GiMechanicGarage } from "react-icons/gi";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import {
  FaArrowRight,
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
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import data from "../../Data/services1.json";
import { useEffect, useState } from "react";
import UserService from "../../../../hooks/services/UserService";

import InspectImage from "../../../../assets/services/inspect.jpg";
import ReplaceImage from "../../../../assets/services/replace.jpg";
import LubricateImage from "../../../../assets/services/lubricate.jpg";
import AlignImage from "../../../../assets/services/align.jpg";
import RefillImage from "../../../../assets/services/refill.jpg";
import RepairImage from "../../../../assets/services/repair.jpg";
import CleanImage from "../../../../assets/services/clean.jpg";
import UpgradeImage from "../../../../assets/services/upgrade.jpg";
import RestoreImage from "../../../../assets/services/restore.jpg";
import UpdateImage from "../../../../assets/services/update.jpg";
import PolishImage from "../../../../assets/services/polish.jpg";
import ProtectImage from "../../../../assets/services/protect.jpg";
import DeodorizeImage from "../../../../assets/services/deodorize.jpg";
import ConditionImage from "../../../../assets/services/condition.jpg";
import RemoveImage from "../../../../assets/services/remove.jpg";
import RestoreLightingImage from "../../../../assets/services/restore-lighting.jpg";

// Mảng dịch vụ với icon và ảnh tương ứng
const services = [
  {
    image: InspectImage,
    icon: <FaSearch className="text-white w-8 md:w-12 h-8 md:h-12" />,
    key: "inspect",
  },
  {
    image: ReplaceImage,
    icon: <FaSyncAlt className="text-white w-8 md:w-12 h-8 md:h-12" />,
    key: "replace",
  },
  {
    image: LubricateImage,
    icon: <FaOilCan className="text-white w-8 md:w-12 h-8 md:h-12" />,
    key: "lubricate",
  },
  {
    image: AlignImage,
    icon: <FaRuler className="text-white w-8 md:w-12 h-8 md:h-12" />,
    key: "align",
  },
  {
    image: RefillImage,
    icon: <FaBolt className="text-white w-8 md:w-12 h-8 md:h-12" />,
    key: "refill",
  },
  {
    image: RepairImage,
    icon: <FaTools className="text-white w-8 md:w-12 h-8 md:h-12" />,
    key: "repair",
  },
  {
    image: CleanImage,
    icon: <FaSoap className="text-white w-8 md:w-12 h-8 md:h-12" />,
    key: "clean",
  },
  {
    image: UpgradeImage,
    icon: <FaRocket className="text-white w-8 md:w-12 h-8 md:h-12" />,
    key: "upgrade",
  },
  {
    image: RestoreImage,
    icon: <FaRedo className="text-white w-8 md:w-12 h-8 md:h-12" />,
    key: "restore",
  },
  {
    image: UpdateImage,
    icon: <FaSave className="text-white w-8 md:w-12 h-8 md:h-12" />,
    key: "update",
  },
  {
    image: PolishImage,
    icon: <FaStar className="text-white w-8 md:w-12 h-8 md:h-12" />,
    key: "polish",
  },
  {
    image: ProtectImage,
    icon: <FaShieldAlt className="text-white w-8 md:w-12 h-8 md:h-12" />,
    key: "protect",
  },
  {
    image: DeodorizeImage,
    icon: <FaWind className="text-white w-8 md:w-12 h-8 md:h-12" />,
    key: "deodorize",
  },
  {
    image: ConditionImage,
    icon: <FaTint className="text-white w-8 md:w-12 h-8 md:h-12" />,
    key: "condition",
  },
  {
    image: RemoveImage,
    icon: <FaTrash className="text-white w-8 md:w-12 h-8 md:h-12" />,
    key: "remove",
  },
  {
    image: RestoreLightingImage,
    icon: <FaLightbulb className="text-white w-8 md:w-12 h-8 md:h-12" />,
    key: "restoreLighting",
  },
];

// Hàm rút gọn mô tả: loại bỏ ký tự markdown cơ bản và cắt ngắn nếu quá dài
const getShortDescription = (description, maxLength = 150) => {
  const plainText = description.replace(/[#*_>`-]/g, "");
  return plainText.length > maxLength
    ? plainText.substring(0, maxLength) + "..."
    : plainText;
};

const Services1 = () => {
  const { t } = useTranslation("ver1");
  const [service, setService] = useState(data);
  const useService = new UserService();

  const getService = async () => {
    try {
      const response = await useService.sendAjax(
        `/api/services/random?number=5`,
        "GET",
        null,
        false
      );
      setService(response.data);
    } catch (error) {
      console.error("Error fetching service: ", error);
      return [];
    }
  };

  useEffect(() => {
    getService();
  }, []);

  return (
    <section className="bg-gray-50 relative w-full min-h-screen overflow-hidden">
      {/* Header */}
      <div className="h-24 md:h-20"></div>
      <div className="container mx-auto px-4">
        {/* Tiêu đề dịch vụ */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 lg:mb-12">
          <div className="lg:w-1/2">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl text-red-500 font-semibold uppercase mb-2 flex items-center justify-center lg:justify-start gap-2">
                <GiAutoRepair className="text-4xl md:text-5xl animate-spin-slow" />
                {t(`best_services.title`)}
              </h3>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                {t(`best_services.title2`)}
              </h2>
            </div>
          </div>
          <div className="lg:w-1/2 text-gray-600 text-sm md:text-base mt-4 lg:mt-0 px-2 md:px-0 text-center lg:text-left">
            {t(`best_services.description`)}
          </div>
        </div>

        {/* Slider */}
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".custom-button-next",
              prevEl: ".custom-button-prev",
            }}
            autoplay={{ delay: 5000 }}
            speed={600}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              575: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="overflow-hidden"
          >
            {service.map((item, index) => {
              const matchAction = services.find(
                (s) => s.key === item.action.toLowerCase()
              );
              return (
                <SwiperSlide key={index} className="p-3 md:p-4 bg-gray-50">
                  <div className="relative flex flex-col items-center">
                    <img
                      src={
                        item.imageLink && item.imageLink.length > 0
                          ? item.imageLink[0]
                          : matchAction
                          ? matchAction.image
                          : "/assets/img/service_img_1.jpg"
                      }
                      alt={item.action}
                      className="w-80 relative z-10 top-10 md:w-96 h-48 md:h-56 object-cover border-b-4 border-rose-700"
                    />

                    {/* Nội dung */}
                    <div className="p-4 pt-14 shadow-lg bg-white text-center border border-transparent hover:border-rose-700 rounded-lg transition-all group duration-300 relative w-full">
                      {/* Icon */}
                      <div className="absolute -top-10 z-20 left-1/2 transform -translate-x-1/2 w-16 md:w-28 h-16 md:h-28 flex items-center justify-center bg-blue-950 group-hover:bg-rose-700 transition-colors duration-200">
                        {matchAction ? (
                          matchAction.icon
                        ) : (
                          <GiMechanicGarage className="text-white w-8 md:w-12 h-8 md:h-12" />
                        )}
                      </div>
                      <h3 className="text-xl md:text-3xl font-semibold text-gray-800 mt-6 md:mt-8 hover:text-rose-700 duration-300 transition-colors">
                        <Link to={`/services/detail/${item.id}`}>
                          {item.serviceName}
                        </Link>
                      </h3>
                      <p className="text-sm md:text-lg font-normal mx-4 md:mx-10 text-gray-600 mt-2">
                        {getShortDescription(item.description, 150)}
                      </p>
                      <Link
                        to={`/services/detail/${item.id}`}
                        className="inline-flex items-center text-blue-500 font-semibold uppercase text-sm md:text-lg mt-3 hover:text-rose-700 duration-300 transition-colors"
                      >
                        READ MORE <FaArrowRight className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Nút điều hướng */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-[-60px] z-10 custom-button-prev flex items-center justify-center w-8 md:w-10 h-8 md:h-10 bg-blue-950 text-white shadow-lg hover:bg-rose-700 transition-all cursor-pointer">
            <HiOutlineArrowNarrowLeft className="w-4 md:w-5 h-4 md:h-5 transition-transform transform hover:-translate-x-1" />
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-2 md:right-[-60px] z-10 custom-button-next flex items-center justify-center w-8 md:w-10 h-8 md:h-10 bg-blue-950 text-white shadow-lg hover:bg-rose-700 transition-all cursor-pointer">
            <HiOutlineArrowNarrowRight className="w-4 md:w-5 h-4 md:h-5 transition-transform transform hover:translate-x-1" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services1;
