import React from "react";

const garageData = [
  {
    garageName: "Garage A",
    revenue: 12000000,
  },
  {
    garageName: "Garage B",
    revenue: 9500000,
  },
];

export default function GarageRevenue() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {garageData.map((garage, index) => (
        <div
          key={index}
          className="relative rounded-md p-6 text-white bg-indigo-900/60 overflow-hidden"
        >
          {/* Hiệu ứng sóng ở nền */}
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
            {garage.garageName}
          </h6>

          {/* Total */}
          <h2 className="text-2xl font-bold mb-4">
            {garage.revenue.toLocaleString()} VND
          </h2>
        </div>
      ))}
    </div>
  );
}
