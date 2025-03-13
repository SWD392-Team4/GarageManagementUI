import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PackageContent from "./PackageContent";
import Banner from "../../Services/partials/Banner";
import Category from "./Category";
import Contact from "./Contact";
import { getPackage, getPackageConditions, getPackageServices } from "../services/PackageServiceAPI";
import LoadingSpinner from "../../CustomerProduct/partials/LoadingSpinner";

export default function PackageDetail() {
 
  const { id } = useParams(); 
  const [packageData, setPackageData] = useState(null);
  const [services, setServices] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const sliderImages = [
    "/assets/img/service-details.jpg",
    "/assets/img/service-details2.jpg",
    "/assets/img/service-details3.jpg",
  ];
  useEffect(() => {
    const fetchPackageDetails = async () => {
      setLoading(true);
      try {
        const packageData = await getPackage(id);
        const serviceData = await getPackageServices(id);
        const conditionData = await getPackageConditions(id); 
        if (packageData && serviceData) {
          setPackageData(packageData);
          setServices(serviceData); 
          setConditions(conditionData);
        } else {
          setError("Package not found");
        }
      } catch (err) {
        setError("Failed to fetch package details");
      }
      setLoading(false);
    };

    fetchPackageDetails();
  }, [id]);
  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500 p-6">{error}</p>;
  if (!packageData) return null;


  return (
    <div className="pt-5 pb-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row ">
          {/* Main Content*/}
          <div className="lg:w-2/3 p-6 rounded-lg">
            {/* Image Slider */}
            <Slider {...sliderSettings} className="mb-6">
              {sliderImages.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt="package"
                    className="w-full rounded-lg"
                  />
                </div>
              ))}
            </Slider>

            {/* Package Details */}
            <PackageContent packageData={packageData} services={services} conditions={conditions} />
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 p-6">
            <Contact />
            <div className=" mb-6 ">
              <Category packageData={packageData}/>
            </div>
            <Banner />
          </div>
        </div>
      </div>
    </div>
  );
}
