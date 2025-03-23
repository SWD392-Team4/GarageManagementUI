import React, { useEffect, useState } from "react";
import { FaCalendarCheck, FaUserPlus, FaMoneyBillWave } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  getDashBoardAppointmentYear,
  getDashBoardCustomer,
  getDashBoardSale,
} from "../Services/dashboardService";
import { AppointmentSignify } from "../../AdminManageAppoinment/services/store/AppointmentSignify";

// Hàm format tiền ngắn gọn (K, M, B)
const formatCurrencyShort = (value) => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value;
};

export default function DashboardOverview() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [appointments, setAppointments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const render = AppointmentSignify.use();

  // Fetch dữ liệu từ API theo năm hoặc khi garage thay đổi
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsAnimating(true); // Bắt đầu animation fade-out

        setTimeout(async () => {
          const resAppointments = await getDashBoardAppointmentYear(
            selectedYear
          );
          const resCustomers = await getDashBoardCustomer(selectedYear);
          const resRevenue = await getDashBoardSale(selectedYear);

          setAppointments(resAppointments.data || []);
          setCustomers(resCustomers.data || []);
          setRevenue(resRevenue.data || []);

          setIsAnimating(false); // Kết thúc animation fade-in
        }, 300); // Delay để hiển thị hiệu ứng
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    };

    fetchData();
  }, [selectedYear, AppointmentSignify.value.garaCurrent]);

  // Hợp nhất dữ liệu từ 3 API để đưa vào biểu đồ
  const chartData = Array.from({ length: 12 }, (_, i) => ({
    month: `Tháng ${i + 1}`,
    appointments:
      appointments.find((a) => a.month === i + 1)?.totalAppointments || 0,
    customers: customers.find((c) => c.month === i + 1)?.number || 0,
    revenue: revenue.find((r) => r.month === i + 1)?.totalRevenue || 0,
  }));

  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-lg w-full transition-opacity transform ${
        isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
      } duration-500 ease-in-out`}
    >
      {/* Chọn năm */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Bảng điều khiển</h2>
        <select
          className="p-2 border rounded-lg text-gray-700"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {[2025, 2024, 2023, 2022, 2021, 2020].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Hàng Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          icon={<FaCalendarCheck className="text-blue-500" />}
          label="Lịch Hẹn"
          value={appointments.reduce((sum, a) => sum + a.totalAppointments, 0)}
        />
        <StatCard
          icon={<FaUserPlus className="text-green-500" />}
          label="Khách Hàng Mới"
          value={customers.reduce((sum, c) => sum + c.number, 0)}
        />
        <StatCard
          icon={<FaMoneyBillWave className="text-yellow-500" />}
          label="Doanh Thu"
          value={`${formatCurrencyShort(
            revenue.reduce((sum, r) => sum + r.totalRevenue, 0)
          )} VND`}
        />
      </div>

      {/* Biểu đồ xu hướng */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Xu hướng hoạt động</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value, name) =>
                name === "Doanh Thu (VNĐ)"
                  ? `${formatCurrencyShort(value)} VND`
                  : value
              }
            />
            <Legend />
            <Bar dataKey="appointments" fill="#3b82f6" name="Lịch Hẹn" />
            <Bar dataKey="customers" fill="#10b981" name="Khách Hàng Mới" />
            <Bar dataKey="revenue" fill="#f59e0b" name="Doanh Thu (VNĐ)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Component Card Thống Kê
const StatCard = ({ icon, label, value }) => (
  <div className="flex items-center p-4 bg-white rounded-lg shadow transition-transform transform hover:scale-105">
    <div className="text-3xl mr-4">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  </div>
);
