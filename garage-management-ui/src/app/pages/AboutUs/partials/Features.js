

import { FaBox, FaTruck, FaMoneyBillWave } from "react-icons/fa";
import React from "react";

const features = [
  {
    icon: <FaBox size={24} />,
    title: "Trusted & Quality Work",
    description:
      "We prioritize quality and reliability in every service, ensuring your vehicle gets the best care possible.",
  },
  {
    icon: <FaTruck size={24} />,
    title: "Fast Service",
    description:
      "Our efficient team works quickly without compromising quality, so you can get back on the road sooner.",
  },
  {
    icon: <FaMoneyBillWave size={24} />,
    title: "Money-Back Guarantee",
    description:
      "Customer satisfaction is our priority. If you're not happy, we offer a hassle-free money-back guarantee.",
  },
];

const FeatureSection = () => {
  return (
    <div className="bg-black relative overflow-hidden">
      {/* Feature Shape */}
      <div className="absolute right-16 bottom-0 opacity-10 z-10 hidden lg:block">
        <img src="/assets/img/feature-shape.png" alt="Feature"  />
      </div>

      <div className="container mx-auto sm:pt-8 lg:pt-0 ">
        <div className="flex flex-col lg:flex-row">
          {/* Feature Image */}
          <div className="w-full lg:w-1/2 p-0 relative">
            <div
              className="relative bg-cover bg-center bg-no-repeat w-full h-[400px] lg:h-full"
              style={{ backgroundImage: "url('/assets/img/feature-bg.jpg')" }}
            >
              <div className="absolute right-[-200px] top-[-70px] w-[285px] h-[700px] bg-black transform rotate-[-14deg] hidden lg:block"></div>
            </div>
          </div>

          {/* Feature Content */}
          <div className="w-full lg:w-1/2 p-0 flex items-center justify-center">
            <div className="max-w-[670px] mx-auto lg:mx-auto pt-10 pb-10 lg:pt-[100px] lg:pb-[100px] relative z-10 px-4 lg:px-0">
              <h2 className="font-semibold text-3xl lg:text-[38px] text-white mb-8 lg:mb-10">
                Our Features
              </h2>
              <ul className="list-none p-0">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className={`relative pl-16 mb-8 lg:mb-10 ${
                      index === 0
                        ? "lg:ml-[50px]"
                        : index === 1
                        ? "lg:ml-[100px]"
                        : "lg:ml-[150px]"
                    }`}
                  >
                    <div className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center text-white bg-red-600 rounded-lg">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-xl lg:text-[20px] text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[#aeadad] text-sm lg:text-[14px] max-w-[380px]">
                      {feature.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;