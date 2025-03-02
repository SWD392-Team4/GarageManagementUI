import React, { useState } from "react";
import Slider from "react-slick";
import { IoChevronForward, IoLocationSharp, IoCall, IoMail } from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PackageContent from "./PackageContent";

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
        }]
    const [packageData, setPackageData] = useState(packages[0]);
  const packageList = [
    "Tyre Service",
    "Engine Service",
    "Tuning Service",
    "Motor Service",
    "System Service",
    "Washing Service",
  ];
  
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
    "https://templates.hibootstrap.com/audeck/default/assets/img/service-details.jpg",
    "https://templates.hibootstrap.com/audeck/default/assets/img/service-details2.jpg",
    "https://templates.hibootstrap.com/audeck/default/assets/img/service-details3.jpg",
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
                  <img src={image} alt="package" className="w-full rounded-lg" />
                </div>
              ))}
            </Slider>

            {/* Package Details */}
            <PackageContent packageData={packageData} />
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 p-6">
          <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 relative pb-2 border-b-4 border-red-500 inline-block">
                All Maintenance Packages
              </h3>
              <ul className="space-y-2 mt-3">
                {packageList.map((service, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition"
                  >
                    <IoChevronForward className="text-red-500" />
                    <a href="/service-details" className="hover:underline">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className=" p-6 ">
              <h3 className="text-xl font-semibold mb-2 relative pb-2 border-b-4 border-red-500 inline-block">
                Contact Us
              </h3>
              <ul className="space-y-2 mt-3 text-gray-700">
                <li className="flex items-center space-x-2">
                  <IoLocationSharp className="text-red-500" />
                  <span>FPT HCM City Long Thanh My, Thu Duc City</span>
                </li>
                <li className="flex items-center space-x-2">
                  <IoCall className="text-red-500" />
                  <a href="tel:+880123456789" className="hover:underline">
                    1-800-915-6271
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <IoMail className="text-red-500" />
                  <a href="mailto:info@example.com" className="hover:underline">
                    email@email.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
