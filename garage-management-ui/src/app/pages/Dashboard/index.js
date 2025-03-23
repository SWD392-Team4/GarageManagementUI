import React, { useState, useEffect } from "react";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import GarageRevenue from "./partials/GarageRevenue";
import GarageSelect from "./partials/GarageSelect";
import PackageDashboard from "./partials/PackageDashboard";
import ServiceDashboard from "./partials/ServiceDashboard";
import DashboardOverview from "./partials/DashboardOverview";

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Kích hoạt hiệu ứng sau khi component mount
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="md:p-6 space-y-0">
      <div
        className={`transition-opacity duration-700 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Breadcrumb />
      </div>

      {/* <div
        className={`transition-opacity duration-700 ease-out delay-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <GarageRevenue />
      </div> */}

      <div
        className={`transition-opacity duration-700 ease-out delay-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <GarageSelect />
      </div>

      <div
        className={`transition-opacity duration-700 ease-out delay-400 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <DashboardOverview />
      </div>

      <div
        className={`transition-opacity duration-700 ease-out delay-600 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <ServiceDashboard />
      </div>

      <div
        className={`transition-opacity duration-700 ease-out delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <PackageDashboard />
      </div>
    </div>
  );
}
