import React from "react";
import { Link } from "react-router-dom";
import anh1 from "../../assets/car-bg.png";
const PageTitle = ({ title, title1, subtitle }) => {
  return (
    <div className="relative bg-black text-white h-[350px] flex items-center justify-center">
      {/* Background Wrapper */}
      <div className="absolute inset-0 flex items-end justify-center">
        {/* Background Image */}
        <img
          src={anh1}
          alt="Title"
          className="w-auto h-[200px] md:h-[300px] object-contain opacity-30"
        />
      </div>

      {/* Title Content */}
      <div className="relative text-center">
        <h2 className="text-xl md:text-5xl font-bold">{title}</h2>
        <ul className="flex items-center justify-center space-x-2 mt-2 text-sm">
          <li>
            <Link to="/" className="hover:text-yellow-500">
              {title1}
            </Link>
          </li>
          <li>
            <span className="text-gray-300">/</span>
          </li>
          <li>{subtitle}</li>
        </ul>
      </div>
    </div>
  );
};

export default PageTitle;
