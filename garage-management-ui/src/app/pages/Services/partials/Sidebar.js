import React from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaSyncAlt,
  FaOilCan,
  FaRuler,
  FaBolt,
  FaTools,
  FaSoap,
  FaRocket,
  FaRedo,
  FaSave,
  FaStar,
  FaShieldAlt,
  FaWind,
  FaTint,
  FaTrash,
} from "react-icons/fa";

const sidebarItems = [
  { icon: <FaSearch />, key: "inspect", label: "Kiểm tra" },
  { icon: <FaSyncAlt />, key: "replace", label: "Thay thế" },
  { icon: <FaOilCan />, key: "lubricate", label: "Bôi trơn" },
  { icon: <FaRuler />, key: "align", label: "Căn chỉnh" },
  { icon: <FaBolt />, key: "refill", label: "Nạp" },
  { icon: <FaTools />, key: "repair", label: "Sửa chữa" },
  { icon: <FaSoap />, key: "clean", label: "Làm sạch" },
  { icon: <FaRocket />, key: "upgrade", label: "Nâng cấp" },
  { icon: <FaRedo />, key: "restore", label: "Phục hồi" },
  { icon: <FaSave />, key: "update", label: "Cập nhật phần mềm" },
  { icon: <FaStar />, key: "polish", label: "Đánh bóng" },
  { icon: <FaShieldAlt />, key: "protect", label: "Bảo vệ" },
  { icon: <FaWind />, key: "deodorize", label: "Khử mùi" },
  { icon: <FaTint />, key: "condition", label: "Dưỡng" },
  { icon: <FaTrash />, key: "remove", label: "Loại bỏ" },
];

const Sidebar = () => {
  return (
    <div className=" p-6 rounded-md border-black/30 border xl:w-1/6 lg:w-1/4 ">
      <h2 className="text-2xl font-bold mb-4">Our Services</h2>
      <div className="border-t  border-black h-2 w-full"></div>

      <ul className="space-y-2">
        {sidebarItems.map((item) => (
          <li key={item.key}>
            <div className="group mt-5">
              <Link
                to={`/services/${item.key}`}
                className="flex items-center space-x-3 p-2  transition "
              >
                <span className="text-xl text-gray-700">{item.icon}</span>
                <span className="text-lg text-gray-700">{item.label}</span>
              </Link>
              <div className="border-t  border-gray-700 h-1 w-0 group-hover:w-full transition-all duration-500"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
