import React, { useEffect, useState, useCallback } from "react";
import { formatVietnameseCurrency } from "../../ManageProduct/schemas/ProductValid";
import {
  FaTimes,
  FaConciergeBell,
  FaCar,
  FaMoneyBillWave,
  FaRegStickyNote,
  FaCog,
} from "react-icons/fa";
import { ServiceOnPackage } from "../Services/BookingPageService";
import ServiceDetailModal from "./ServiceDetailModal";

export default function DetailModal({ pack, onClose }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      let response = await ServiceOnPackage(pack.id);
      setServices(response.data.value);
    } catch (error) {
      console.error("Error loading data", error);
    } finally {
      setLoading(false);
    }
  }, [pack.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // SkeletonCard mô phỏng bố cục khi chưa load xong
  const SkeletonCard = () => {
    return (
      <div className="space-y-4">
        <div className="flex space-x-4 animate-pulse">
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
        <div className="flex space-x-4 animate-pulse">
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 duration-500 transition-all">
      <div className="bg-white/90 p-6 rounded shadow-lg relative max-w-2xl w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-semibold mb-2 border-b border-gray-800 text-center font-title">
          Detail package
        </h2>
        {/* Hiển thị thông tin package */}
        <div className="mb-4 grid grid-cols-2">
          <h3 className="text-sm font-title font-extrabold text-left">
            <FaConciergeBell className="inline-block mr-1" />
            Service Category:
          </h3>
          <h3 className="text-base font-medium text-gray-600 text-right">
            {pack.serviceCategory}
          </h3>
          <h3 className="text-sm font-title font-extrabold text-left">
            <FaCar className="inline-block mr-1" />
            Car Category:
          </h3>
          <h3 className="text-base font-medium text-gray-600 text-right">
            {pack.category}
          </h3>
          <h3 className="text-sm font-title font-extrabold text-left">
            <FaMoneyBillWave className="inline-block mr-1" />
            Price:
          </h3>
          <h3 className="text-base font-medium text-gray-600 text-right">
            {formatVietnameseCurrency(pack.packagePrice)}
          </h3>
          <h3 className="text-sm font-title font-extrabold text-left">
            <FaRegStickyNote className="inline-block mr-1" />
            Description:
          </h3>
          <h3 className="text-base font-medium text-gray-600 text-right">
            {pack.description}
          </h3>
        </div>
        <h2 className="text-xl font-semibold mb-2 border-b border-gray-800 text-center font-title">
          Service in packages
        </h2>
        {/* Danh sách services */}
        <div className="mt-4">
          {loading ? (
            <SkeletonCard />
          ) : services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} className="border p-2 rounded mb-2">
                <div className="grid grid-cols-5 mb-2 ">
                  <p className="font-bold col-span-4 max-w-full truncate flex items-end justify-center">
                    {service.serviceName}
                  </p>
                  <div className="mt-2 flex justify-end col-span-1">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="group/link p-3 cursor-pointer relative text-sm flex items-center justify-center bg-transparent text-black font-shadows h-auto w-[60px] overflow-hidden transition-all duration-100"
                    >
                      <span className="group-hover/link:w-full absolute left-0 h-full w-3 border-y border-l border-black transition-all duration-500"></span>
                      <p className="group-hover/link:opacity-0 group-hover/link:translate-x-[-100%] absolute translate-x-0 transition-all duration-200">
                        Detail
                      </p>
                      <span className="group-hover/link:translate-x-0 group-hover/link:opacity-100 absolute translate-x-full opacity-0 transition-all duration-200">
                        View
                      </span>
                      <span className="group-hover/link:w-full absolute right-0 h-full w-3 border-y border-r border-black transition-all duration-500"></span>
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No services found</p>
          )}
        </div>
      </div>
      {/* Modal hiển thị chi tiết của service */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}
