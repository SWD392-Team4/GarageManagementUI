import React from "react";

const Category = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
      <div className="text-lg font-semibold">
        <p className="mb-2">
          <span className="text-black font-bold">Category:</span> 
        </p>
        <hr className="border-gray-300 mb-2" />
        <p className="mb-2">
          <span className="text-black font-bold">Customer:</span> 
        </p>
        <hr className="border-gray-300 mb-2" />
        <p className="mb-2">
          <span className="text-black font-bold">Start Date:</span> 
        </p>
        <hr className="border-gray-300 mb-2" />
        <p className="mb-2">
          <span className="text-black font-bold">End Date:</span> 
        </p>
        
      </div>
    </div>
  );
};

export default Category;
