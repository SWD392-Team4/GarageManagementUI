import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiCategory } from "react-icons/bi";
import UserService from "../../../hooks/services/UserService";
import { sServiceHome } from "../services/SignifyServiceHome";
export default function CarCategoriesSearch() {
  const { t } = useTranslation("Service_Home");
  const userService = new UserService();
  const serviceHome = sServiceHome.use();
  // State để lưu danh sách các danh mục và giá trị đã chọn
  const [carCategories, setCarCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarCategories = async () => {
      try {
        const response = await userService.sendAjax(
          `/api/car-categories`,
          "GET",
          null,
          false
        );
        setCarCategories(response.data.value);
      } catch (error) {
        console.log("Failed to fetch car categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarCategories();
  }, []);

  return (
    <div className="relative">
      <BiCategory className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
      <select
        disabled={loading}
        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        value={serviceHome.category}
        onChange={(e) => {
          const value = e.target.value;
          sServiceHome.set((v) => {
            v.value.category = value;
          });
        }}
      >
        {loading ? (
          <option value="">{t("loading") || "Loading..."}</option>
        ) : (
          <>
            <option value="">{t("all_car_category") || "All Car Parts"}</option>
            {carCategories.map((item) => (
              <option key={item.id} value={item.category}>
                {item.category}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
}
