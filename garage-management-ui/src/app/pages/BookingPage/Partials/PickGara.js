import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { getAllGara } from "../Services/BookingPageService";
import { BookingSignify } from "../Services/BookingSignify";
import Navigation from "./Navigation";
import { useTranslation } from "react-i18next";

export default function PickGara() {
  const { t } = useTranslation("BookingOnline");
  const [garages, setGarages] = useState([]);
  const [selectedGara, setSelectedGara] = useState(null);
  useEffect(() => {
    if (garages.length > 0 && BookingSignify.value.garaId && !selectedGara) {
      const defaultOption = garaOptions.find(
        (option) => option.value === BookingSignify.value.garaId
      );
      if (defaultOption) {
        setSelectedGara(defaultOption);
      }
    }
  }, [garages, BookingSignify.value.garaId, selectedGara]);

  // Lấy dữ liệu gara
  const fetchData = useCallback(async () => {
    try {
      let response = await getAllGara();
      setGarages(response.data.value);
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  // Tạo option cho react-select
  const garaOptions = garages.map((gara) => ({
    value: gara.id,
    label: `${gara.name} ---- Address: ${gara.fullAddress}`,
    name: gara.name,
    fullAddress: gara.fullAddress,
    phoneNumber: gara.phoneNumber,
  }));

  // Xử lý khi chọn gara
  const handleSelect = (option) => {
    setSelectedGara(option);
    BookingSignify.set((v) => {
      v.value.garaId = option.value;
    });
  };

  return (
    <div className="p-4">
      {/* Hàng trên: chia làm 2 cột */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Cột chọn gara */}
        <div className="col-span-2">
          <Select
            options={garaOptions}
            value={selectedGara}
            className="bg-white/10"
            onChange={handleSelect}
            placeholder={t("choiceGara1")}
          />
        </div>

        {/* Cột hiển thị thông tin gara đã chọn */}
        <div className="flex p-1 ">
          {selectedGara ? (
            <div>
              <div>
                <div className="border-b border-red-950  mb-2 text-center text-red-700 text-sm max-w-7xl mx-auto">
                  <h3 className="text-xl font-semibold mb-2">
                    {t("choiceGara3")}
                  </h3>
                </div>
                <ul className="space-y-3 text-lg text-gray-800 font-semibold ">
                  <li className="flex items-center gap-3">
                    <span>🏬:</span>
                    <span>{selectedGara.name}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span>🗺️:</span>
                    <span>{selectedGara.fullAddress}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span>☎️:</span>
                    <span>{selectedGara.phoneNumber}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span>📧:</span>
                    <span>turbotrackgara@gmail.com</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span>⏰:</span>
                    <span>7AM - 5PM</span>
                  </li>
                </ul>
              </div>
              <Navigation
                nextLink="/booking/select-options"
                prevLink="/booking"
              />
            </div>
          ) : (
            <p className="text-gray-900">{t("choiceGara2")}</p>
          )}
        </div>
        <div className="w-full">
          {selectedGara && (
            <iframe
              title="Google Map"
              width="100%"
              height="300"
              style={{ border: 0 }}
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                selectedGara.fullAddress
              )}&output=embed`}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}
