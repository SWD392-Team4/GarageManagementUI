import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
