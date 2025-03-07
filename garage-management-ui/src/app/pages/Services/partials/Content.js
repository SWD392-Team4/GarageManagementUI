import React, { useState, useEffect } from "react";
import SearchService from "./SearchService";
import CardService from "./CardService";
import { getServicesWithSignify } from "../services/apiGetServices";
import { sServiceHome } from "../services/SignifyServiceHome";

// Component skeleton card, mô phỏng bố cục của CardService thật
const SkeletonCard = () => (
  <div className="relative flex flex-col items-center animate-pulse">
    <div className="w-80 relative z-10 top-10 md:w-90 h-48 md:h-56 bg-gray-300 border-b-4 border-gray-300" />

    <div className="p-4 pt-14 shadow-lg bg-white text-center border border-transparent rounded-lg transition-all relative w-full">
      <div className="absolute -top-10 z-20 left-1/2 transform -translate-x-1/2 w-16 md:w-28 h-16 md:h-28 bg-gray-300" />

      <div className="mt-6 md:mt-8 h-6 w-3/4 bg-gray-300 rounded" />

      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="h-4 bg-gray-300 rounded" />
        <div className="h-4 bg-gray-300 rounded" />
        <div className="h-4 bg-gray-300 rounded" />
        <div className="h-4 bg-gray-300 rounded" />
      </div>

      <div className="grid grid-cols-2 mt-4 gap-4">
        <div className="h-4 bg-gray-300 rounded" />
        <div className="h-4 bg-gray-300 rounded" />
      </div>
    </div>
  </div>
);

const Content = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const serviceHome = sServiceHome.use();

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      const data = await getServicesWithSignify();
      setServices(data);
      setLoading(false);
    }
    fetchServices();
  }, [serviceHome.search]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-12 gap-8">
        {/* Phần Filter Search - chiếm 3/12 */}
        <div className="col-span-12 md:col-span-3">
          <SearchService />
        </div>

        {/* Phần Danh sách dịch vụ - chiếm 9/12 */}
        <div className="col-span-12 md:col-span-9">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : services.length !== 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-slide-down">
              {services.map((service) => (
                <CardService
                  key={service.id}
                  id={service.id}
                  title={service.serviceName}
                  partName={service.partName}
                  category={service.category}
                  serviceCategory={service.serviceCategory}
                  image={
                    service.imageLink && service.imageLink.length > 0
                      ? service.imageLink[0]
                      : "/assets/img/service_img_5.jpg"
                  }
                  icon={service.action}
                  price={service.price}
                  onBook={() =>
                    alert(`Booking service: ${service.serviceName}`)
                  }
                  onView={() =>
                    alert(`Viewing details for: ${service.serviceName}`)
                  }
                />
              ))}
            </div>
          ) : (
            <div className="uppercase">
              No service found. Try adjusting your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
