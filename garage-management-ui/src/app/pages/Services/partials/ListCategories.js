import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BiDownArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { sServiceHome } from "../services/SignifyServiceHome";

export default function ListCategories() {
  const { t } = useTranslation("Service_Home");
  const navigate = useNavigate();
  const handleClick = (e) => {
    sServiceHome.set((v) => {
      v.value.action = e;
    });
    navigate("/services/view");
  };
  // Mảng danh sách service, mỗi item có value (dùng làm đường dẫn) và label (tên hiển thị)
  const serviceCategories = useMemo(
    () => [
      { value: "repair", label: t("service_category_repair") },
      { value: "maintenance", label: t("service_category_maintenance") },
      { value: "upgrade", label: t("service_category_upgrade") },
      { value: "car_wash", label: t("service_category_car_wash") },
      { value: "detailing", label: t("service_category_detailing") },
    ],
    [t]
  );

  return (
    <div className="bg-white rounded-sm p-6 mb-6 border">
      <h3 className="md:text-3xl text-xl font-handjet font-bold mb-4 border-b-4 border-red-600/45 max-w-12">
        {t("service_categories_title") || "Categories"}
      </h3>

      {/* Dùng .map để hiển thị danh sách button/link */}
      <ul className="space-y-3">
        {serviceCategories.map((category) => (
          <button
            key={category.value}
            onClick={() => handleClick(category.value)}
            className="hover:bg-red-400 bg-gray-100 border border-gray-200 w-full group duration-300"
          >
            <li className="flex justify-between items-center m-2 text-black font-medium">
              {category.label}
              <BiDownArrowAlt className="-rotate-90 text-2xl group-hover:text-white duration-300" />
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
}
