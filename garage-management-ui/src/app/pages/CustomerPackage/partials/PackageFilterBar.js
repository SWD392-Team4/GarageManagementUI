import React, { useEffect, useState } from "react";
import { FaSearch, FaSave } from "react-icons/fa";

const PackageFilterBar = ({
  onFilterChange,
  initialFilters,
  serviceCategory,
  packageType,
  carCategory,
}) => {
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setFilters(initialFilters); // Update filters when initialFilters change
  }, [initialFilters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
    console.log("Applied filters:", filters);
  };

  return (
    <div className=" rounded-lg  w-full  mx-aut">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Filter Packages
      </h2>

      {/* Search Bar */}
      <div className="mb-4 relative w-full">
        <input
          type="text"
          placeholder="Search name..."
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
          className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Service Category Dropdown */}
      <div className="mb-4 w-full">
        <label className="block mb-2 font-semibold text-gray-700">
          Service Category
        </label>
        <select
          value={filters.serviceCategory}
          onChange={(e) =>
            handleFilterChange("serviceCategory", e.target.value)
          }
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {serviceCategory.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {/* Car Category Dropdown */}
      <div className="mb-4 w-full">
        <label className="block mb-2 font-semibold text-gray-700">
          Car Type
        </label>
        <select
          value={filters.carCategory}
          onChange={(e) => handleFilterChange("carCategory", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          {carCategory.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))}
        </select>
      </div>
      {/* Package Type Dropdown */}
      <div className="mb-4 w-full">
        <label className="block mb-2 font-semibold text-gray-700">
          Package Type
        </label>
        <select
          value={filters.packageType}
          onChange={(e) => handleFilterChange("packageType", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          {packageType.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      {/* Price Range Slider */}
      <div className="mb-4 w-full">
        <label className="block mb-2 font-semibold text-gray-700">
          Price Range
        </label>
        <input
          type="range"
          min="0"
          max="10000000"
          step="100000"
          value={filters.price[1]}
          onChange={(e) =>
            handleFilterChange("price", [
              filters.price[0],
              parseInt(e.target.value),
            ])
          }
          className="w-full accent-red-500"
        />
        <div className="text-gray-600 text-center mt-2">
          {filters.price[0]}đ - {filters.price[1]}đ
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={applyFilters}
        className="w-full bg-black text-white py-3 px-4 rounded-md border border-black hover:bg-red-500 hover:text-white transition duration-300 flex items-center justify-center"
      >
        <FaSave className="mr-2" />
        Apply Filters
      </button>
    </div>
  );
};

export default PackageFilterBar;
