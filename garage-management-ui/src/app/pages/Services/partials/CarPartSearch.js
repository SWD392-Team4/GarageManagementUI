import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiCar } from "react-icons/bi";
import UserService from "../../../hooks/services/UserService";
import { sServiceHome } from "../services/SignifyServiceHome";
export default function CarPartSearch() {
  const { t } = useTranslation("Service_Home");
  const userService = new UserService();
  const serviceHome = sServiceHome.use();

  // State để lưu danh sách các car parts, giá trị được chọn và trạng thái loading
  const [carParts, setCarParts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCarParts = async () => {
      try {
        const response = await userService.sendAjax(
          `/api/car-parts`,
          "GET",
          null,
          false
        );
        setCarParts(response.data.value);
      } catch (error) {
        console.log("Failed to fetch car parts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarParts();
  }, []);

  return (
    <div className="relative">
      <BiCar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
      <select
        disabled={loading}
        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        value={serviceHome.carPartName}
        onChange={(e) => {
          const value = e.target.value;
          sServiceHome.set((v) => {
            v.value.carPartName = value;
          });
        }}
      >
        {loading ? (
          <option value="">{t("loading") || "Loading..."}</option>
        ) : (
          <>
            <option value="">{t("all_car_parts") || "All Car Parts"}</option>
            {carParts.map((part) => (
              <option key={part.id} value={part.partName}>
                {part.partName}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
}
