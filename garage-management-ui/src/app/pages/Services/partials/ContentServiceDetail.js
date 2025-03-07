import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailServices } from "../services/apiGetServices";
import { useLoading } from "../../../routers/LoadingContext";
import { BiCar, BiCategory, BiAccessibility } from "react-icons/bi";
import { GrServices } from "react-icons/gr";
import MDEditor from "@uiw/react-md-editor";
import { useTranslation } from "react-i18next";
import { LiaHandPointRight } from "react-icons/lia";

export default function ContentServiceDetail() {
  const { id } = useParams();
  const { t } = useTranslation("Service_Home");
  const [service, setService] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      const data = await getDetailServices(id);
      setService(data);
      setLoading(false);
    }
    fetchServices();
  }, [id, setLoading]);

  return (
    <div className="w-full lg:w-8/12 px-4 mb-8 lg:mb-0">
      <div className=" rounded-sm ">
        {/* Ảnh lớn */}
        <img
          src={
            service.imageLink
              ? service.imageLink[0]
              : `/assets/img/service_img_5.jpg`
          }
          alt="img"
          className="w-full h-auto rounded mb-6"
        />

        {/* Tên dịch vụ lấy từ API */}
        <h2 className="text-2xl font-bold mb-4">{service.serviceName}</h2>

        {/* Mô tả dịch vụ lấy từ API, nếu không có thì hiển thị text từ i18n */}
        {/* Danh sách 4 mục (Fast & Easy Pickups, ...) */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <li className="flex items-start gap-3  p-4 rounded bg-gray-100">
            <div>
              <h3 className="text-lg flex font-semibold mb-1 items-center text-yellow-600 ">
                <BiCar className="mr-2 text-2xl md:text-5xl " />{" "}
                {t("content_service_detail.label_service_car_part")}
              </h3>
              <p className="text-gray-800 text-xl ml-14">{service.partName}</p>
            </div>
          </li>
          <li className="flex items-start gap-3   p-4 rounded bg-gray-100">
            <div>
              <h3 className="text-lg flex font-semibold mb-1 items-center text-yellow-600">
                <BiCategory className="mr-2 text-2xl md:text-5xl " />{" "}
                {t("content_service_detail.label_service_car_category")}
              </h3>
              <p className="text-gray-800 text-xl ml-14">
                {service.serviceCategory}
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3  p-4 rounded bg-gray-100">
            <div>
              <h3 className="text-lg flex font-semibold mb-1 items-center text-yellow-600">
                <GrServices className="mr-2 text-2xl md:text-5xl " />{" "}
                {t("content_service_detail.label_service_type")}
              </h3>
              <p className="text-gray-800 text-xl ml-14">{service.category}</p>
            </div>
          </li>
          <li className="flex items-start gap-3   p-4 rounded bg-gray-100">
            <div>
              <h3 className="text-lg flex font-semibold mb-1 items-center text-yellow-600">
                <BiAccessibility className="mr-2 text-2xl md:text-5xl " />{" "}
                {t("content_service_detail.label_service_action")}
              </h3>
              <p className="text-gray-800 text-xl ml-14">{service.action}</p>
            </div>
          </li>
        </ul>
        <div data-color-mode="light" className="border-b-4  mb-5 pb-5">
          <MDEditor.Markdown
            source={
              service.description ||
              t("content_service_detail.label_no_content")
            }
          />
        </div>

        {/* Phần có ảnh nhỏ + nội dung Passenger Benefits */}
        <div className="flex flex-col md:flex-row items-start gap-4">
          <img
            src={
              service.imageLink
                ? service.imageLink[1]
                : `/assets/img/service_img_5.jpg`
            }
            alt="img"
            className="w-full md:w-1/2 h-auto rounded"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {t("content_service_detail.title_passenger_benefits")}
            </h3>
            <p className="mb-3 text-gray-600 leading-relaxed">
              {t("content_service_detail.desc_everything_your_taxi")}
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <LiaHandPointRight className="text-yellow-500 text-4xl" />
                <span>
                  {t(
                    "content_service_detail.desc_use_the_latest_diagnostic_equipment2"
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <LiaHandPointRight className="text-yellow-500 text-4xl" />
                <span>
                  {t(
                    "content_service_detail.desc_automotive_service_for_our_clients2"
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <LiaHandPointRight className="text-yellow-500 text-4xl" />
                <span>
                  {t(
                    "content_service_detail.desc_quick_dedicated_support_team2"
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
