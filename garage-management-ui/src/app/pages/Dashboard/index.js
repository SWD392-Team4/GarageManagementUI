import React from "react";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import Miniwidget from "./partials/Miniwidget";
import MonthlyEarnings from "./partials/MonthlyEarnings";
import GaraPerformance from "./partials/GaraPerformance";
import MonthlyEarnings2 from "./partials/MonthlyEarnings2";

export default function Dashboard() {
  const reports = [
    {
      title: "Orders",
      iconClass: "cube-outline",
      total: "1,587",
      average: "+11%",
      badgecolor: "info",
    },
    {
      title: "Revenue",
      iconClass: "buffer",
      total: "$46,782",
      average: "-29%",
      badgecolor: "danger",
    },
    {
      title: "Average Price",
      iconClass: "tag-text-outline",
      total: "$15.9",
      average: "0%",
      badgecolor: "warning",
    },
    {
      title: "Product Sold",
      iconClass: "briefcase-check",
      total: "1890",
      average: "+89%",
      badgecolor: "info",
    },
  ];

  return (
    <div className="md:p-6">
      <Breadcrumb />
      <Miniwidget reports={reports} />
      <div className="flex flex-wrap -mx-2 mt-4">
        <div className="w-full xl:w-3/12 px-2">
          <MonthlyEarnings />
        </div>

        <div className="w-full xl:w-6/12 px-2">
          <GaraPerformance />
        </div>

        <div className="w-full xl:w-3/12 px-2">
          <MonthlyEarnings2 />
        </div>
      </div>
    </div>
  );
}
