import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getDashBoardPackageYear } from "../Services/dashboardService";
import { AppointmentSignify } from "../../AdminManageAppoinment/services/store/AppointmentSignify";

const formatCurrencyShort = (value) => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value;
};

const PackageChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex-[1.8] min-w-[280px] transition-all duration-500 ease-in-out">
      <h2 className="text-md font-semibold mb-3">Revenue vs Usage Chart</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 12 }} />
          <YAxis
            yAxisId="left"
            tick={{ fill: "#555", fontSize: 12 }}
            tickFormatter={formatCurrencyShort}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: "#555", fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => formatCurrencyShort(value)}
            contentStyle={{ backgroundColor: "#f5f5f5", borderRadius: "5px" }}
          />
          <Legend
            verticalAlign="top"
            height={25}
            wrapperStyle={{ fontSize: 12 }}
          />
          <Bar
            yAxisId="left"
            dataKey="totalRevenue"
            fill="#4CAF50"
            name="Total Revenue"
            radius={[5, 5, 0, 0]}
          />
          <Bar
            yAxisId="right"
            dataKey="totalUsed"
            fill="#2196F3"
            name="Total Used"
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const TopUsedPackages = ({ data }) => {
  const sortedPackages = [...data].sort((a, b) => b.totalUsed - a.totalUsed);
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex-[1] min-w-[300px] transition-all duration-500 ease-in-out">
      <h2 className="text-lg font-semibold mb-4">Top Used Packages</h2>
      <ul className="divide-y divide-gray-300">
        {sortedPackages.map((pkg) => (
          <li
            key={pkg.id}
            className="flex justify-between py-2 px-4 bg-gray-100 shadow-sm rounded-lg mb-2"
          >
            <span className="text-gray-700 font-semibold">{pkg.name}</span>
            <span className="text-green-600 font-bold">
              {pkg.totalUsed} times
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PackageDashboard = () => {
  const [packageData, setPackageData] = useState([]);
  const [year, setYear] = useState(2025);
  const [isAnimating, setIsAnimating] = useState(false);
  const render = AppointmentSignify.use();

  useEffect(() => {
    const fetchPackageData = async () => {
      setIsAnimating(true); // Bắt đầu hiệu ứng fade-out

      setTimeout(async () => {
        try {
          const response = await getDashBoardPackageYear(year);
          setPackageData(response.data);
        } catch (error) {
          console.error("Error fetching package data:", error);
        }

        setIsAnimating(false); // Kết thúc hiệu ứng fade-in
      }, 300); // Độ trễ để animation diễn ra
    };

    fetchPackageData();
  }, [year, AppointmentSignify.value.garaCurrent]);

  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-lg w-full transition-all duration-500 ease-in-out ${
        isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm">
        <h2 className="text-xl font-semibold">Dashboard - Package Report</h2>
        <select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="p-2 border rounded-md shadow-sm bg-white"
        >
          {[...Array(5)].map((_, index) => {
            const optionYear = new Date().getFullYear() - index;
            return (
              <option key={optionYear} value={optionYear}>
                {optionYear}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-row flex-wrap gap-6 w-full mt-4">
        <PackageChart data={packageData} />
        <TopUsedPackages data={packageData} />
      </div>
    </div>
  );
};

export default PackageDashboard;
