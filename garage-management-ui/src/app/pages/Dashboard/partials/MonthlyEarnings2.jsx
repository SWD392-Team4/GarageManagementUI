import React from "react";
import ReactApexChart from "react-apexcharts";

export default function MonthlyEarnings2() {
  const options = {
    colors: ["#28bbe3", "#F0F1F4"],
    chart: {
      stacked: true,
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        columnWidth: "70%",
      },
    },
    grid: {
      borderColor: "#f8f8fa",
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      labels: {
        formatter: function (val) {
          return val;
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      title: { text: undefined },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    fill: { opacity: 1 },
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
    },
  };

  const series = [
    {
      name: "Series A",
      data: [45, 75, 100, 75, 100, 75, 50, 75, 50, 75, 100, 80],
    },
    {
      name: "Series B",
      data: [180, 65, 90, 65, 90, 65, 40, 65, 40, 65, 90, 65],
    },
  ];

  return (
    <div className="bg-white rounded shadow p-4 pb-6">
      <h2 className="text-xl font-bold mb-4">Monthly Earnings</h2>

      <div className="flex justify-around text-center mt-4">
        <div>
          <h5 className="text-lg font-semibold">$2548</h5>
          <p className="text-gray-600">Marketplace</p>
        </div>
        <div>
          <h5 className="text-lg font-semibold">$6985</h5>
          <p className="text-gray-600">Total Income</p>
        </div>
      </div>

      <div className="mt-4">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height="290"
        />
      </div>
    </div>
  );
}
