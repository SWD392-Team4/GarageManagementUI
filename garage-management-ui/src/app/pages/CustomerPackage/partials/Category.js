import React from "react";

const Category = ({packageData}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full">
      <div className="text-lg font-semibold">
        <p className="mb-2">
          <span className="text-black font-bold">Category: {packageData.serviceCategory}</span> 
        </p>
        <hr className="border-gray-300 mb-2" />
        <p className="mb-2">
          <span className="text-black font-bold">Car Type: {packageData.category}</span> 
        </p>
        <hr className="border-gray-300 mb-2" />
        <p className="mb-2">
          <span className="text-black font-bold">Package Type: {packageData.type}</span> 
        </p>
        <hr className="border-gray-300 mb-2" />
        <p className="mb-2">
          <span className="text-black font-bold">Price: {packageData.packagePrice}</span> 
        </p>
        
      </div>
    </div>
  );
};

export default Category;
