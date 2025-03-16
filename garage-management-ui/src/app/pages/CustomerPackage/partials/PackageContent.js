import React from "react";
import { useTranslation } from "react-i18next";
import { IoChevronForward } from "react-icons/io5";

export default function PackageContent({ packageData, services, conditions }) {
  const { t } = useTranslation("customer_package_content");
  return (
    <div className="w-full p-8 rounded-lg bg-gray-50 shadow-lg">
      {/* Package Details */}
      <h3 className="text-3xl font-extrabold mb-6 relative pb-3 border-b-4 border-red-500 inline-block text-gray-900">
        {packageData.packageName}
      </h3>

      <p className="text-xl text-gray-800 mb-8 leading-relaxed">{packageData.description}</p>

      {/* Package Conditions */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4 relative pb-2 border-b-4 border-red-500 inline-block text-gray-900">
        {t("customer_package_content.conditions")}
        </h3>
        <ul className="space-y-4 mt-5 text-xl text-gray-700 bg-white p-6 rounded-lg shadow-md">
          {conditions.map((condition) => (
            <li
              key={condition.id}
              className="flex items-center space-x-4 border-b pb-2 last:border-b-0 text-xl font-medium"
            >
              <span className="font-semibold text-gray-900">{condition.conditionType}:</span>
              <span className="text-gray-600">{condition.conditionValue}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Service List */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4 relative pb-2 border-b-4 border-red-500 inline-block text-gray-900">
        {t("customer_package_content.services")}
        </h3>
        <ul className="space-y-4 mt-5 text-xl bg-white p-6 rounded-lg shadow-md">
          {services.map((service) => (
            <li
              key={service.id}
              className="text-xl flex items-center space-x-4 text-gray-800 hover:text-red-600 transition-all duration-300 border-b pb-2 last:border-b-0"
            >
              <IoChevronForward className="text-red-500 text-xl" />
              <a href="/package-details" className="hover:underline font-semibold">
                {service.serviceName}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
