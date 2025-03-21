import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BookingSignify } from "../Services/BookingSignify";
import UserService from "../../../hooks/services/UserService";

const ReservationDate = () => {
  const { t } = useTranslation("BookingOnline");
  const [workPlaceData, setWorkPlaceData] = useState(null);
  const userService = new UserService();

  useEffect(() => {
    const fetchWorkplace = async () => {
      try {
        const response = await userService.sendAjax(
          `/api/workplaces/${BookingSignify.value.garaId}`,
          "GET",
          null,
          true
        );
        setWorkPlaceData(response.data.value);
      } catch (error) {
        console.log("Failed to fetch workplace", error);
      }
    };

    fetchWorkplace();
  }, []);

  if (!workPlaceData) {
    return (
      <div className="bg-gray-100/70 p-4 mb-4">
        {/* Tiêu đề */}
        <h2 className="text-xl font-semibold mb-2 border-b border-gray-800 text-center font-title">
          {t("title1")}
        </h2>

        {/* Danh sách thông tin */}
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span className="text-sm font-raleway"> {t("title2")}: </span>
            <span className="max-w-40 text-right">FPTU Gara 503</span>
          </li>
          <li className="flex justify-between">
            <span className="text-sm font-raleway"> {t("title3")} </span>
            <span className="max-w-40 md:max-w-80 text-right">
              421 Phường Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh
            </span>
          </li>
          <li className="flex justify-between">
            <span className="text-sm font-raleway"> {t("title4")} </span>
            <span className="max-w-40 text-right">+84-962-418-452</span>
          </li>
          <li className="flex justify-between">
            <span className="text-sm font-raleway"> {t("title5")} </span>
            <div className="max-w-55 text-right">turbotrackgara@gmail.com</div>
          </li>
          <li className="flex justify-between">
            <span className="text-sm font-raleway"> {t("title6")} </span>
            <div className="max-w-55 text-right">7AM - 5PM</div>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-gray-100/70 p-4 mb-4">
      {/* Tiêu đề */}
      <h2 className="text-xl font-semibold mb-2 border-b border-gray-800 text-center font-title">
        {t("title1")}
      </h2>

      {/* Danh sách thông tin */}
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span className="text-sm font-raleway"> {t("title2")} </span>
          <span className="max-w-40 text-right">{workPlaceData.name}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-sm font-raleway"> {t("title3")} </span>
          <span className="max-w-40 md:max-w-80 text-right">
            {workPlaceData.fullAddress}
          </span>
        </li>
        <li className="flex justify-between">
          <span className="text-sm font-raleway"> {t("title4")} </span>
          <span className="max-w-40 text-right">
            {workPlaceData.phoneNumber}
          </span>
        </li>
        <li className="flex justify-between">
          <span className="text-sm font-raleway"> {t("title5")} </span>
          <div className="max-w-55 text-right">turbotrackgara@gmail.com</div>
        </li>
        <li className="flex justify-between">
          <span className="text-sm font-raleway"> {t("title6")} </span>
          <div className="max-w-55 text-right">7AM - 5PM</div>
        </li>
      </ul>
    </div>
  );
};

export default ReservationDate;
