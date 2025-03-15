import React from "react";
import { useTranslation } from "react-i18next";

const Category = ({packageData}) => {
  const { t } = useTranslation("customer_package_category");
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full">
      <div className="text-lg font-semibold">
        <p className="mb-2">
          <span className="text-black font-bold">{t("customer_package_category.service_category")}: {packageData.serviceCategory}</span> 
        </p>
        <hr className="border-gray-300 mb-2" />
        <p className="mb-2">
          <span className="text-black font-bold">{t("customer_package_category.car_type")}: {packageData.category}</span> 
        </p>
        <hr className="border-gray-300 mb-2" />
        <p className="mb-2">
          <span className="text-black font-bold">{t("customer_package_category.package_type")}: {packageData.type}</span> 
        </p>
        <hr className="border-gray-300 mb-2" />
        <p className="mb-2">
          <span className="text-black font-bold">{t("customer_package_category.price")}: {packageData.packagePrice}</span> 
        </p>
        
      </div>
    </div>
  );
};

export default Category;
