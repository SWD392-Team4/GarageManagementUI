import React from "react";
import { Link, useLocation } from "react-router-dom";
import Notification from "../../Notification/Notification";

export default function Breadcrumb({ title }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="flex border-b bg-white shadow-md p-4 md:mb-4 md:mt-0 mt-12 justify-between items-center">
      <nav>
        <ul className="flex space-x-2 text-gray-600">
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            // Sử dụng key duy nhất cho mỗi <li>
            return (
              <li key={to} className="flex items-center">
                {!isLast ? (
                  <>
                    <Link
                      to={to}
                      className="text-blue-500 uppercase font-title font-bold text-sm hover:underline"
                    >
                      {value}
                    </Link>
                    <span className="mx-2">/</span>
                  </>
                ) : (
                  <span className="text-gray-500 uppercase">
                    {title} {value}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <Notification />
    </div>
  );
}
