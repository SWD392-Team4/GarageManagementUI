import React, { useState } from "react";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { BookingSignify } from "../Services/BookingSignify";
import ProductSelect from "./ProductSelect";
import ServiceDetailModal from "./ServiceDetailModal";

const ServiceCard = ({ icon, service }) => {
  const handleSelect = (id) => {
    BookingSignify.set((v) => {
      const idServiceExists = v.value.services.some(
        (service) => service.serviceId === id
      );
      if (!idServiceExists) {
        const currentServices = v.value.services || [];
        v.value.services = [
          ...currentServices,
          { serviceId: id, replacementParts: [] },
        ];
      } else {
        const currentServices = v.value.services || [];
        v.value.services = currentServices.filter(
          (service) => service.serviceId !== id
        );
      }
    });
  };
  const [selectedService, setSelectedService] = useState(null);

  const isSelected = BookingSignify.value.services.some(
    (service2) => service2.serviceId === service.id
  );

  return (
    <div className="relative p-6 text-center border-2 group">
      <div onClick={() => handleSelect(service.id)} className="cursor-pointer">
        <div className="absolute top-2 right-2 z-20 text-xl text-red-700">
          {isSelected ? <FaCheckSquare /> : <FaRegSquare />}
        </div>
      </div>

      <h3 className="text-4xl font-shadows font-semibold">
        {service.serviceName}
      </h3>
      <div className="my-4 flex justify-center">
        <div className="relative">
          <button className="w-16 h-16 flex items-center justify-center bg-gray-100/50 group-hover:bg-gray-600/50 text-red-500 group-hover:text-red-100 duration-200 rounded-full  group-hover:animate-spin-once2">
            {icon}
          </button>
        </div>
      </div>
      <div className="mt-2 flex justify-center col-span-1">
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
      {isSelected ? (
        <ProductSelect idServices={service.id} carPartId={service.carPartId} />
      ) : (
        ""
      )}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
};

export default ServiceCard;
