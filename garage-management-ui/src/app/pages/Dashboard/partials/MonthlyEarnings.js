import React from "react";
import DonutChart from "./DonutChart";

export default function MonthlyEarnings() {
  return (
    <div className="bg-white rounded shadow p-4 pb-7">
      <h2 className="text-xl font-bold mb-4">Monthly Earnings</h2>

      {/* Các số liệu */}
      <div className="flex justify-around text-center mt-4">
        <div>
          <h5 className="text-lg font-semibold">$56241</h5>
          <p className="text-gray-600">Marketplace</p>
        </div>
        <div>
          <h5 className="text-lg font-semibold">$23651</h5>
          <p className="text-gray-600">Total Income</p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4">
        <DonutChart />
      </div>
    </div>
  );
}
