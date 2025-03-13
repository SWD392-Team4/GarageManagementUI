import React, { useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PackageContent from "./PackageContent";
import Banner from "../../Services/partials/Banner";
import Category from "./Category";
import Contact from "./Contact";

export default function PackageDetail() {
  const packages = [
    {
      id: 1,
      title: "Minor Maintenance Package (5,000 km / 6 months)",
      description: [
        "This package covers essential maintenance services to keep your vehicle in top shape.",
        "It includes fluid checks, tire and brake inspections, and minor adjustments to ensure smooth operation.",
        "Ideal for new vehicles reaching their first maintenance milestone or regular small check-ups.",
      ],
      services: [
        "Brake fluid and transmission fluid check",
        "Headlights and horn functionality test",
        "Coolant and windshield washer fluid check",
        "Engine oil change",
        "Tire pressure check and tread wear inspection",
        "Battery health and electrode wear check",
        "Cabin air filter and engine air filter check",
      ],
    },
  ];
  const [packageData, setPackageData] = useState(packages[0]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const sliderImages = [
    "/assets/img/service-details.jpg",
    "/assets/img/service-details2.jpg",
    "/assets/img/service-details3.jpg",
  ];

  return (
    <div className="pt-5 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row ">
          {/* Main Content*/}
          <div className="lg:w-2/3 p-6 rounded-lg">
            {/* Image Slider */}
            <Slider {...sliderSettings} className="mb-6">
              {sliderImages.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt="package"
                    className="w-full rounded-lg"
                  />
                </div>
              ))}
            </Slider>

            {/* Package Details */}
            <PackageContent packageData={packageData} />
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 p-6">
            <Contact />
            <div className=" mb-6 ">
              <Category />
            </div>
            <Banner />
          </div>
        </div>
      </div>
    </div>
  );
}
