import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ prevLink = "#", nextLink = "" }) => {
  return (
    <nav className="flex justify-center items-end transition-all duration-300">
      <div className="group/link p-2">
        <div className="border-b border-orange-700 h-1 w-5 ml-auto group-hover/link:w-[60px] transition-all duration-300"></div>
        <Link
          to={prevLink}
          className="inline-flex items-center text-gray-700 font-semibold uppercase text-sm md:text-2xl group-hover/link:text-rose-700 transition-colors duration-300"
        >
          Prev
        </Link>
        <div className="border-t border-orange-700 h-1 w-0 group-hover/link:w-[50px] ml-auto transition-all duration-300"></div>
      </div>
      {nextLink && (
        <div className="group/link p-2">
          <div className="border-b border-orange-700 h-1 w-0 group-hover/link:w-[50px] mr-auto transition-all duration-300"></div>
          <Link
            to={nextLink}
            className="inline-flex items-center text-gray-700 font-semibold uppercase text-sm md:text-2xl group-hover/link:text-rose-700 transition-colors duration-300"
          >
            Next
          </Link>
          <div className="border-t border-orange-700 h-1 w-5 group-hover/link:w-[60px] transition-all duration-300"></div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
