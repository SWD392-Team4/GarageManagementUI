import React, { useCallback, useEffect, useState } from "react";
import { getAllPackage } from "../Services/BookingPageService";
import Navigation from "./Navigation";
import PackageCard from "./PackageCard";
import { BookingSignify } from "../Services/BookingSignify";
const services = [
  {
    value: "repair",
    icon: "🚗",
  },
  {
    value: "repair",
    icon: "🔌",
  },
  {
    value: "maintenance",
    icon: "🧰",
  },
  {
    value: "upgrade",
    icon: "⚙️",
  },
  {
    value: "car_wash",
    icon: "🚙",
  },
  {
    value: "detailing",
    icon: "🛠️",
  },
];
export default function PackageSelect() {
  const [packages, setPackages] = useState([]);
  const sBooking = BookingSignify.use();

  // Fetch dữ liệu cho Brand và Car Category
  const fetchData = useCallback(async () => {
    try {
      let response = await getAllPackage();
      setPackages(response.data.value);
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="p-4">
        <div className="text-gray-800 opacity-60 text-5xl font-extrabold font-space text-center pb-10 ">
          Suitable Packages
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl px-4">
          {packages.map((pack) => {
            const actionKey = pack.serviceCategory
              ? pack.serviceCategory.toLowerCase()
              : "";
            // Tìm icon tương ứng trong servicesFake
            const iconObj = services.find((item) => item.value === actionKey);
            const icon = iconObj ? iconObj.icon : null;

            return <PackageCard key={pack.id} icon={icon} pack={pack} />;
          })}
        </div>
        <Navigation
          prevLink="/booking/select-options"
          nextLink="/booking/customer-info"
        />
      </div>
    </>
  );
}
