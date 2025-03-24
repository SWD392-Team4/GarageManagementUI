import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getGarageRevenueYear } from "../Services/dashboardService";
import { AppointmentSignify } from "../../AdminManageAppoinment/services/store/AppointmentSignify";

const formatCurrencyShort = (value) => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value;
};

const GarageRevenueChart = ({ data, isAnimating }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isAnimating ? 0.5 : 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-white p-4 rounded-lg shadow-md flex-1 min-w-[280px]"
    >
      <h2 className="text-md font-semibold mb-3">Monthly Revenue Chart</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data.map((item) => ({
            name: item.month,
            totalRevenue: item.totalRevenue,
          }))}
          margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 12 }} />
          <YAxis
            tick={{ fill: "#555", fontSize: 12 }}
            tickFormatter={formatCurrencyShort}
          />
          <Tooltip formatter={(value) => formatCurrencyShort(value)} />
          <Legend verticalAlign="top" height={25} />
          <Bar
            dataKey="totalRevenue"
            fill="#4CAF50"
            name="Total Revenue"
            radius={[5, 5, 0, 0]}
            isAnimationActive={true}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

const GarageRevenue = () => {
  const [year, setYear] = useState(2025);
  const [revenueData, setRevenueData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const render = AppointmentSignify.use();

  useEffect(() => {
    const fetchPackageData = async () => {
      setIsAnimating(true);

      setTimeout(async () => {
        try {
          const response = await getGarageRevenueYear(year);
          setRevenueData(response.data);
        } catch (error) {
          console.error("Error fetching package data:", error);
        }
        setIsAnimating(false);
      }, 300);
    };

    fetchPackageData();
  }, [year, AppointmentSignify.value.garaCurrent]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-5 rounded-lg shadow-lg w-full"
    >
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm">
        <h2 className="text-lg font-semibold">Garage Revenue Dashboard</h2>
        <select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="p-1 border rounded-md shadow-sm bg-white text-sm"
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
      <div className="flex flex-row flex-wrap gap-4 w-full mt-3">
        <GarageRevenueChart data={revenueData} isAnimating={isAnimating} />
      </div>
    </motion.div>
  );
};

export default GarageRevenue;
