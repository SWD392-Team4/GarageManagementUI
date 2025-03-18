import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAllServicesOnPackages } from "../services/AppointmentService";
import { packagePick } from "../services/store/AppointmentSignify";
import MDEditor from "@uiw/react-md-editor";
import {
  FaInfoCircle,
  FaListAlt,
  FaCar,
  FaDollarSign,
  FaTools,
  FaPlay,
  FaFileAlt,
  FaTimes,
} from "react-icons/fa";

export default function ListServiceinPackage() {
  const { t } = useTranslation("create_appointment");
  const [services, setServices] = useState([]);
  const sPackage = packagePick.use();

  // State quản lý modal và service được chọn
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const fetchData = async () => {
    try {
      if (!sPackage.Packages || sPackage.Packages.length === 0) {
        packagePick.set((v) => {
          v.value.servicesOnPackage = [];
        });
        setServices([]);
        return;
      }
      // Gọi API cho từng package theo id và hợp nhất kết quả
      const responses = await Promise.all(
        sPackage.Packages.map((pkg) => getAllServicesOnPackages(pkg))
      );

      // Giả sử mỗi response trả về mảng service trong res.data.value
      const allServices = responses.reduce((acc, res) => {
        return acc.concat(res?.data?.value || []);
      }, []);

      // Loại bỏ các service trùng lặp dựa trên id
      const uniqueServices = allServices.filter(
        (service, index, self) =>
          index === self.findIndex((s) => s.id === service.id)
      );

      setServices(uniqueServices);

      // Gắn mảng các id của service vào packagePick.value.servicesOnPackage
      packagePick.set((v) => {
        v.value.servicesOnPackage = uniqueServices.map((service) => service.id);
      });
    } catch (error) {
      console.error("Error fetching ListServiceinPackage: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sPackage.Packages]);

  const openModal = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setModalOpen(false);
  };

  return (
    <>
      <div className="bg-gray-200 text-sm uppercase mt-5 p-2 font-title font-bold flex items-center justify-between">
        <span>
          {t("labels.detailOnSelectPackage", "Dịch vụ trong package")}
        </span>
      </div>
      <div className="mt-4">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 border-b border-gray-300 uppercase text-xs font-medium text-gray-700">
            <tr>
              <th scope="col" className="px-4 py-3 text-left">
                {t("tableHeaders.stt", "STT")}
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                {t("tableHeaders.serviceName", "Tên Dịch Vụ")}
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                {t("tableHeaders.action", "Action")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((item, index) => (
              <tr className="hover:bg-gray-50" key={item.id}>
                <td className="px-4 py-2 whitespace-nowrap">{index + 1}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {item.serviceName}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <button
                    type="button"
                    className="text-blue-500 hover:underline"
                    onClick={() => openModal(item)}
                  >
                    {t("buttons.viewDetail", "View Detail")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal hiển thị chi tiết của service */}
      {modalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50">
          <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 mt-10 p-6 rounded shadow-lg transform transition-all duration-300 animate-slideDown">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-bold">
                <FaInfoCircle className="inline mr-2" />
                {t("labels.serviceDetail", "Chi tiết dịch vụ")}
              </h2>
              <button onClick={closeModal}>
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <span className="font-semibold">
                  <FaInfoCircle className="inline mr-1" />
                  {t("labels.serviceName", "Service Name")}:
                </span>
                <span className="ml-2">{selectedService.serviceName}</span>
              </div>
              <div>
                <span className="font-semibold">
                  <FaListAlt className="inline mr-1" />
                  {t("labels.serviceCategory", "Service Category")}:
                </span>
                <span className="ml-2">{selectedService.serviceCategory}</span>
              </div>
              <div>
                <span className="font-semibold">
                  <FaCar className="inline mr-1" />
                  {t("labels.carPart", "Car Part")}:
                </span>
                <span className="ml-2">{selectedService.carPart}</span>
              </div>
              <div>
                <span className="font-semibold">
                  <FaDollarSign className="inline mr-1" />
                  {t("labels.price", "Price")}:
                </span>
                <span className="ml-2">{selectedService.price}</span>
              </div>
              <div>
                <span className="font-semibold">
                  <FaTools className="inline mr-1" />
                  {t("labels.workNature", "Work Nature")}:
                </span>
                <span className="ml-2">{selectedService.workNature}</span>
              </div>
              <div>
                <span className="font-semibold">
                  <FaPlay className="inline mr-1" />
                  {t("labels.action", "Action")}:
                </span>
                <span className="ml-2">{selectedService.action}</span>
              </div>
              <div>
                <span className="font-semibold">
                  <FaFileAlt className="inline mr-1" />
                  {t("labels.description", "Description")}:
                </span>
                <div className="prose mt-2">
                  <MDEditor.Markdown
                    source={selectedService.description || ""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
