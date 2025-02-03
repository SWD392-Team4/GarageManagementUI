import React from "react";

const PageTitle = () => {
  return (
    <div className="relative bg-black text-white h-[350px] flex items-center justify-center">
      {/* Background Wrapper */}
      <div className="absolute inset-0 flex items-end justify-center">
        {/* Background Image */}
        <img
          src="assets/car-bg.png"
          alt="Title"
          className="w-auto h-[200px] md:h-[300px] object-contain opacity-30"
        />
      </div>

      {/* Title Content */}
      <div className="relative text-center">
        <h2 className="text-xl md:text-5xl font-bold">Sign In</h2>
        <ul className="flex items-center justify-center space-x-2 mt-2 text-sm">
          <li>
            <a href="index.html" className="hover:text-yellow-500">
              Home
            </a>
          </li>
          <li>
            <span className="text-gray-300">/</span>
          </li>
          <li>Sign In</li>
        </ul>
      </div>
    </div>
  );
};

export default PageTitle;
