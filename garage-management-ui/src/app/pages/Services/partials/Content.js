import React from "react";
import SearchService from "./SearchService";
import ListCardService from "./ListCardService";
import { HiWrenchScrewdriver, HiClipboardDocumentCheck, HiBuildingOffice2 } from "react-icons/hi2";
import InspectImage from "../../../assets/services/inspect.jpg";

const services = [
  {
    id: 1,
    image: InspectImage,
    icon: <HiWrenchScrewdriver />,
    title: "Garage Repair",
    description: "Professional repair and maintenance services for all vehicles.",
  },
  {
    id: 2,
    image: InspectImage,
    icon: <HiClipboardDocumentCheck />,
    title: "Insurance Assistance",
    description: "Helping you handle insurance claims and documentation with ease.",
  },
  {
    id: 3,
    image: InspectImage,
    icon: <HiBuildingOffice2 />,
    title: "Infrastructure Services",
    description: "Reliable solutions for commercial and residential buildings.",
  },
  {
    id: 1,
    image: InspectImage,
    icon: <HiWrenchScrewdriver />,
    title: "Garage Repair",
    description: "Professional repair and maintenance services for all vehicles.",
  },
  {
    id: 2,
    image: InspectImage,
    icon: <HiClipboardDocumentCheck />,
    title: "Insurance Assistance",
    description: "Helping you handle insurance claims and documentation with ease.",
  },
  {
    id: 3,
    image: InspectImage,
    icon: <HiBuildingOffice2 />,
    title: "Infrastructure Services",
    description: "Reliable solutions for commercial and residential buildings.",
  },
];

const Content = () => {
  return (
    <div className="flex-1">
      <SearchService />

      {/* Danh sách dịch vụ */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ListCardService
            key={service.id}
            {...service}
            onBook={() => alert(`Booking service: ${service.title}`)}
            onView={() => alert(`Viewing details for: ${service.title}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Content;
