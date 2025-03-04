import React from "react";
import { IoChevronForward } from "react-icons/io5";

export default function PackageContent({ packageData }) {
  return (
    <div className="w-full p-6 rounded-lg">
      {/* Package Details */}
      <h3 className="text-2xl font-semibold mb-2 relative pb-2 border-b-4 border-red-500 inline-block">
        {packageData.title}
      </h3>
      {packageData.description.map((text, index) => (
        <p key={index} className="text-gray-600 mb-4">
          {text}
        </p>
      ))}

      {/* Service List */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2 relative pb-2 border-b-4 border-red-500 inline-block">
          Included Services
        </h3>
        <ul className="space-y-2 mt-3">
          {packageData.services.map((service, index) => (
            <li key={index} className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition">
              <IoChevronForward className="text-red-500" />
              <a href="/service-details" className="hover:underline">
                {service}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
