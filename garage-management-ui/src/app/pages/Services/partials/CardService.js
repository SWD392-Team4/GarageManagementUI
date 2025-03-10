import React from "react";
import { HiCalendar, HiEye } from "react-icons/hi";
import { motion } from "framer-motion";
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
  FaListAlt,
  FaCogs,
  FaTags,
  FaDollarSign,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Mapping từ key sang icon
const iconMapping = {
  inspect: <FaSearch className="text-white w-8 md:w-12 h-8 md:h-12" />,
  replace: <FaSyncAlt className="text-white w-8 md:w-12 h-8 md:h-12" />,
  lubricate: <FaOilCan className="text-white w-8 md:w-12 h-8 md:h-12" />,
  align: <FaRuler className="text-white w-8 md:w-12 h-8 md:h-12" />,
  refill: <FaBolt className="text-white w-8 md:w-12 h-8 md:h-12" />,
  repair: <FaTools className="text-white w-8 md:w-12 h-8 md:h-12" />,
  clean: <FaSoap className="text-white w-8 md:w-12 h-8 md:h-12" />,
  upgrade: <FaRocket className="text-white w-8 md:w-12 h-8 md:h-12" />,
  restore: <FaRedo className="text-white w-8 md:w-12 h-8 md:h-12" />,
  update: <FaSave className="text-white w-8 md:w-12 h-8 md:h-12" />,
  polish: <FaStar className="text-white w-8 md:w-12 h-8 md:h-12" />,
  protect: <FaShieldAlt className="text-white w-8 md:w-12 h-8 md:h-12" />,
  deodorize: <FaWind className="text-white w-8 md:w-12 h-8 md:h-12" />,
  rondition: <FaTint className="text-white w-8 md:w-12 h-8 md:h-12" />,
  remove: <FaTrash className="text-white w-8 md:w-12 h-8 md:h-12" />,
  restoreLighting: (
    <FaLightbulb className="text-white w-8 md:w-12 h-8 md:h-12" />
  ),
};

const CardService = ({
  image,
  icon,
  title,
  serviceCategory,
  partName,
  category,
  price,
  id,
}) => {
  const displayIcon =
    typeof icon === "string"
      ? iconMapping[icon.toLowerCase()]
      : icon.toLowerCase();
  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="relative flex flex-col items-center">
        {/* Ảnh dịch vụ */}
        <img
          src={image}
          alt="Service"
          className="w-80 relative z-10 top-10 md:w-96 h-48 md:h-56 object-cover border-b-4 border-rose-700 "
        />

        {/* Nội dung */}
        <div className="p-4 pt-14 pb shadow-lg bg-white text-center border border-transparent hover:border-rose-700 rounded-lg transition-all group duration-300 relative w-full">
          {/* Icon */}
          <div className="absolute -top-10 z-20 left-1/2 transform -translate-x-1/2 w-16 md:w-28 h-16 md:h-28 flex items-center justify-center bg-blue-950 group-hover:bg-rose-700 transition-colors duration-200">
            <span className="text-white w-8 md:w-12 h-8 md:h-12">
              {displayIcon}
            </span>
          </div>
          <h3 className="text-xl md:text-xl truncate max-w-full font-semibold text-gray-800 mt-6 md:mt-8 hover:text-rose-700 duration-300 transition-colors">
            <Link>{title}</Link>
          </h3>

          <div className="grid grid-cols-2 ">
            <p className="flex items-center  text-sm md:text-lg truncate max-w-full font-normal  text-gray-600 mt-2">
              <FaListAlt className="mr-2" /> {serviceCategory}
            </p>
            <p className="flex items-center text-sm md:text-lg truncate max-w-full font-normal  text-gray-600 mt-2">
              <FaCogs className="mr-2" /> {partName}
            </p>
            <p className="flex items-center text-sm md:text-lg truncate max-w-full font-normal  text-gray-600 mt-2">
              <FaTags className="mr-2" /> {category}
            </p>
            <p className="flex items-center text-sm md:text-lg truncate max-w-full font-normal  text-gray-600 mt-2">
              <FaDollarSign className="mr-2" /> {price}
            </p>
          </div>

          <div className="grid grid-cols-2 mt-4">
            <div className="group/link flex justify-center">
              <div>
                <Link
                  to={`/services/detail/` + id}
                  className="inline-flex items-center text-blue-500 font-semibold uppercase text-sm md:text-sm mt-3 group-hover/link:text-rose-700 duration-300 transition-colors"
                >
                  READ MORE
                </Link>
                <div className="border-t  border-orange-700 h-1 w-0 group-hover/link:w-20 transition-all duration-300"></div>
              </div>
            </div>
            <div className="group/link flex justify-center">
              <div>
                <Link className="inline-flex items-center text-blue-500 font-semibold uppercase text-sm md:text-sm mt-3 group-hover/link:text-rose-700 duration-300 transition-colors">
                  BOOK NOW
                </Link>
                <div className="border-t  border-orange-700 h-1 w-0 group-hover/link:w-20 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CardService;
