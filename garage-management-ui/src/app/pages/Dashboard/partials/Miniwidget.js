import React from "react";
import { BiCube } from "react-icons/bi";
import { IoLogoBuffer } from "react-icons/io5";
import { GiPriceTag } from "react-icons/gi";
import { IoBagCheckSharp } from "react-icons/io5";

// Map chuỗi iconClass -> Component icon
const iconMap = {
  "cube-outline": BiCube,
  buffer: IoLogoBuffer,
  "tag-text-outline": GiPriceTag,
  "briefcase-check": IoBagCheckSharp,
};

export default function Miniwidget({ reports = [] }) {
  const badgeColorMap = {
    info: "bg-blue-500",
    danger: "bg-red-500",
    warning: "bg-yellow-500",
    success: "bg-green-500",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {reports.map((report, index) => {
        const IconComponent = iconMap[report.iconClass] || MdiCubeOutline;
        // Nếu không tìm thấy key badgecolor, mặc định bg-gray-500
        const badgeClass = badgeColorMap[report.badgecolor] || "bg-gray-500";

        return (
          <div
            key={index}
            className="relative rounded-md p-6 text-white bg-indigo-900/60 overflow-hidden"
          >
            {/* Icon góc phải */}
            <IconComponent className="text-3xl opacity-50 absolute right-4 top-4" />

            {/* Hiệu ứng sóng ở nền (wave) */}
            <div className="absolute bottom-0 left-0 w-full h-24 opacity-20">
              <svg
                className="w-full h-full"
                viewBox="0 0 1440 320"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0,256L80,224C160,192,320,128,480,128C640,128,800,192,960,224C1120,256,1280,256,1360,256L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
              </svg>
            </div>

            {/* Title */}
            <h6 className="text-xs uppercase mb-3 font-medium tracking-wider">
              {report.title}
            </h6>

            {/* Total */}
            <h2 className="text-2xl font-bold mb-4">{report.total}</h2>

            {/* Badge + from previous period */}
            <span
              className={`inline-block rounded px-2 py-1 text-xs font-semibold ${badgeClass}`}
            >
              {report.average}
            </span>
            <span className="ml-2 text-xs">From previous period</span>
          </div>
        );
      })}
    </div>
  );
}
