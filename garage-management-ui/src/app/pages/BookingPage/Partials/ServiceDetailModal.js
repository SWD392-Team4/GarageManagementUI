import React from "react";
import {
  FaTimes,
  FaConciergeBell,
  FaCar,
  FaRegStickyNote,
  FaCog,
} from "react-icons/fa";
const ServiceDetailModal = ({ service, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-30">
      <div className="mt-10 relative w-full max-w-sm p-4 bg-white rounded shadow-lg animate-slideDown">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <FaTimes />
        </button>
        {/* Hiển thị hình ảnh nếu tồn tại imageLink */}
        {service.imageLink && (
          <img
            src={service.imageLink}
            alt={service.serviceName}
            className="w-full h-auto rounded mb-2"
          />
        )}
        <h3 className="text-xl font-semibold mb-2 border-b border-gray-800 text-center font-title">
          {service.serviceName}
        </h3>
        <p className="flex items-center text-sm text-gray-600 mb-1 text-left">
          <FaConciergeBell className="mr-2 text-base" />
          <span className="font-semibold">Category:</span>{" "}
          {service.serviceCategory}
        </p>
        <p className="flex items-center text-sm text-gray-600 mb-1 text-left">
          <FaCog className="mr-2 text-base" />
          <span className="font-semibold">Action:</span> {service.action}
        </p>
        <p className="flex items-center text-sm text-gray-600 mb-1 text-left">
          <FaCar className="mr-2 text-base" />
          <span className="font-semibold">Car Part:</span> {service.carPart}
        </p>
        <div className="text-left mb-1">
          <div className="flex items-center text-sm text-gray-600">
            <FaRegStickyNote className="mr-2 text-base" />
            <span className="font-semibold">Description:</span>
          </div>
          <p className="text-sm text-gray-600 ml-8">{service.description}</p>
        </div>
      </div>
    </div>
  );
};
export default ServiceDetailModal;
