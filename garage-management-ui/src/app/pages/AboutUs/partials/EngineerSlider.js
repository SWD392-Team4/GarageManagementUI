import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";

const engineers = [
  {
    id: 1,
    name: "Jerry Hudson",
    role: "mechanical_engineer",
    img: "/assets/img/engineer-1.jpg",
  },
  {
    id: 2,
    name: "Tom Henry",
    role: "system_engineer",
    img: "/assets/img/engineer-2.jpg",
  },
  {
    id: 3,
    name: "Jac Jacson",
    role: "head_engineer",
    img: "/assets/img/engineer-3.jpg",
  },
  {
    id: 4,
    name: "Micheal Shon",
    role: "automobile_engineer",
    img: "/assets/img/engineer-4.jpg",
  },
];

const EngineerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  const { t } = useTranslation("about_engineer");
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <div className="mb-8">
          <span className="text-lg text-red-500 font-semibold">{t("about_engineer.engineer")}</span>
          <h2 className="text-3xl font-bold text-gray-800">{t("about_engineer.meet_experts")}</h2>
        </div>

        <Slider {...settings}>
          {engineers.map((engineer) => (
            <div key={engineer.id} className="px-4 max-w-full">
              <div className="w-full rounded-lg overflow-hidden relative text-center mb-[30px] group">
                <img
                  src={engineer.img}
                  alt={engineer.name}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-white w-2/3 shadow-lg p-4  mx-auto mt-[-35px] relative z-10 transition-all duration-500 group-hover:bg-red-600 group-hover:w-full group-hover:h-full">
                  <h3 className="text-xl font-semibold text-gray-800 transition-all duration-500 group-hover:text-white">
                    {engineer.name}
                  </h3>
                  <span className="block text-base text-gray-500 transition-all duration-500 group-hover:text-white"> {t(`about_engineer.${engineer.role}`)}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default EngineerSlider;
