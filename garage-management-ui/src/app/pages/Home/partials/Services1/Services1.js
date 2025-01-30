import { GiAutoRepair } from "react-icons/gi";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { GiMechanicGarage } from "react-icons/gi";

import data from "../../Data/services1.json";

import "swiper/css";

const Services1 = () => {
  return (
    <section className="bg-gray-50 z-20 relative w-full h-screen overflow-hidden">
      <div className="h-32 lg:h-20"></div>
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
          <div className="lg:w-1/2">
            <div className="text-center lg:text-left">
              {/* Subtitle */}
              <h3 className="text-4xl text-red-500 font-semibold uppercase mb-3 flex items-center justify-center lg:justify-start gap-2">
                {/* Icon */}
                <GiAutoRepair className="text-5xl animate-spin-slow" />
                Best Services
              </h3>

              {/* Title */}
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-0 leading-tight">
                Where Your Car Gets Pride the Best Care
              </h2>
            </div>
          </div>
          <div className="lg:w-1/2 text-gray-600 text-sm lg:text-base mt-6 lg:mt-0">
            Regular tire rotation ensures even wear, extending the life of your
            tires and improving vehicle performance. If your car struggles to
            start, the lights dim when idling or the battery is over.
          </div>
        </div>

        {/* Swiper */}
        <div className="relative w-full h-full">
          <Swiper
            // modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".custom-button-next",
              prevEl: ".custom-button-prev",
            }}
            // autoplay={{ delay: 5000 }}
            // speed={600}
            // loop={true}
            breakpoints={{
              575: { slidesPerView: 1 },
              1199: { slidesPerView: 2 },
              1399: { slidesPerView: 3 },
            }}
            className="overflow-hidden"
          >
            {data.map((item, index) => (
              <SwiperSlide key={index} className="p-4 bg-gray-50">
                {/* Image */}
                <div>
                  <div className="relative top-10 flex justify-center">
                    <img
                      src={item.img}
                      alt="Service Image"
                      className="w-80 h-56 object-cover border-b-4 border-rose-700"
                    />
                  </div>
                  {/* Info */}
                  <div className="p-4 pt-16 shadow-lg bg-white text-center border border-transparent hover:border-rose-700 rounded-lg transition-all group  duration-300">
                    <div className="absolute top-[43%] left-1/2 transform -translate-x-1/2 w-24 h-24 flex items-center justify-center bg-blue-950 group-hover:bg-rose-700 transition-colors duration-200">
                      <GiMechanicGarage className="text-white w-12 h-12" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mt-8 hover:text-rose-700 duration-300 transition-colors">
                      <Link to={item.btnLink}>{item.title}</Link>
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
                    <Link
                      to={item.btnLink}
                      className="inline-flex items-center text-blue-500 font-semibold uppercase text-sm mt-4 hover:text-rose-700 duration-300 transition-colors "
                    >
                      {item.btnText}
                      <i className="bi bi-arrow-right ml-2"></i>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Navigation Buttons */}
          <div
            className="absolute top-1/2 -translate-y-1/2 left-[-70px] z-10 custom-button-prev xl:flex hidden 
           items-center justify-center w-10 h-10 bg-blue-950 text-white  shadow-lg hover:bg-rose-700
           transition-all cursor-pointer"
          >
            <HiOutlineArrowNarrowLeft className="w-4 h-4 transition-transform transform hover:-translate-x-2" />
          </div>

          <div
            className="absolute top-1/2 -translate-y-1/2 right-[-70px] z-10 custom-button-next xl:flex hidden
           items-center justify-center w-10 h-10 bg-blue-950 text-white  shadow-lg hover:bg-rose-700 
          transition-all cursor-pointer"
          >
            <HiOutlineArrowNarrowRight className="w-4 h-4 transition-transform transform hover:translate-x-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services1;
