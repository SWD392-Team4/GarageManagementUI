import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import { motion } from "framer-motion";
const ServiceCard = ({ image, icon, title, description }) => {
  return (
    <motion.div
      className="bg-white rounded-3xl overflow-hidden transition-transform group "
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="relative ">
        {/* Ảnh với rounded-top */}
        <div className="relative group overflow-hidden rounded-t-lg group ">
          {/* Hình ảnh chính */}
          <img
            src={image}
            alt={title}
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
          />

          {/* Lớp phủ màu đỏ lan ra ngoài */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="absolute w-5 h-6 bg-red-500/80  opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[20] rounded-t-lg group-hover:opacity-80"></span>
          </div>
        </div>

        {/* SVG đường cong đặt absolute để nằm trên ảnh */}
        <svg
          className="absolute -bottom-3 left-0 right-0 w-full z-10 "
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            className="fill-white"
            d="M0,288L60,245.3C120,203,240,117,360,112C480,107,600,181,720,229.3C840,277,960,299,1080,256C1200,213,1320,107,1380,53.3L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Phần icon hình tròn */}
      <div className="flex justify-center mt-3 relative z-20">
        <div className="w-24 h-24  bg-red-100/30 flex items-center justify-center rounded-full  transition-all duration-500 ease-out  group-hover:bg-red-600 group-hover:opacity-100">
          <span className="text-3xl  text-red-500 group-hover:text-white duration-300">
            {icon}
          </span>
        </div>
      </div>

      {/* Phần nội dung */}
      <div className="p-6 text-center">
        <h3 className="text-4xl  font-shadows font-semibold">{title}</h3>
        <p className="text-gray-700 text-xl font-title my-6">{description}</p>
        <div className="my-4 flex justify-center ">
          {/* Group Con Hoạt Động Riêng */}
          <div className="relative group-btn">
            <button className="w-16 h-16 flex items-center text-red-500  justify-center bg-red-100 hover:text-red-100 duration-200 rounded-full shadow-md hover:bg-red-600 hover:animate-spin-once2">
              <HiOutlineArrowNarrowRight className="text-2xl " />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
