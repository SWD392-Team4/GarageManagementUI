import React from "react";
import ReactApexChart from "react-apexcharts";

export default function GaraPerformance() {
  const options = {
    colors: ["#ccc", "#7a6fbe", "#28bbe3"],
    chart: {
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 0.1,
    },
    grid: {
      borderColor: "#f8f8fa",
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: { show: false },
  };

  const series = [
    { name: "Gara A", data: [0, 150, 60, 180, 90, 75, 30] },
    { name: "Gara B", data: [0, 45, 150, 36, 60, 240, 30] },
    { name: "Gara C", data: [0, 15, 195, 21, 360, 120, 30] },
  ];

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-bold mb-4">Gara Performance</h2>

      <div className="flex justify-around text-center mt-4">
        <div>
          <h5 className="text-lg font-semibold">$89425</h5>
          <p className="text-gray-600">Marketplace</p>
        </div>
        <div>
          <h5 className="text-lg font-semibold">$56210</h5>
          <p className="text-gray-600">Total Income</p>
        </div>
        <div>
          <h5 className="text-lg font-semibold">$8974</h5>
          <p className="text-gray-600">Last Month</p>
        </div>
      </div>

      <div className="mt-4">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height="300"
        />
      </div>
    </div>
  );
}
