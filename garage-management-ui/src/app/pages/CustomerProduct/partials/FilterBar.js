import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch, FaSave } from "react-icons/fa";

const FilterBar = ({ categories = [], brands = [], onFilterChange }) => {
  const {t} = useTranslation("customer_product_filter");
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "",
    brand: "",
    price: [0, 500000], // Adjust max range based on data
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
    console.log("Filters Applied:", filters);
  };

  return (
    <div className="  rounded-lg  w-full  mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">{t("customer_product_filter.title")}</h2>

      {/* Search Bar */}
      <div className="mb-4 relative w-full">
        <input
          type="text"
          placeholder={t("customer_product_filter.search")}
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
          className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Category Dropdown */}
      <div className="mb-4 w-full">
        <label className="block mb-2 font-semibold text-gray-700">{t("customer_product_filter.category")}</label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{t("customer_product_filter.category_all")}</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Brand Dropdown */}
      <div className="mb-4 w-full">
        <label className="block mb-2 font-semibold text-gray-700">{t("customer_product_filter.brand")}</label>
        <select
          value={filters.brand}
          onChange={(e) => handleFilterChange("brand", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{t("customer_product_filter.brand_all")}</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

       {/* Price Range Slider */}
       <div className="mb-4 w-full">
        <label className="block mb-2 font-semibold text-gray-700">{t("customer_product_filter.price_range")}</label>
        <input
          type="range"
          min="0"
          max="500000"
          step="10000"
          value={filters.price[1]}
          onChange={(e) =>
            handleFilterChange("price", [filters.price[0], parseInt(e.target.value)])
          }
          className="w-full accent-red-500"
        />
        {/* Moved price display below */}
        <div className="text-gray-600 text-center mt-2">
          {filters.price[0]}đ - {filters.price[1]}đ
        </div>
      </div>      
      {/* Apply Filters Button */}
      <button
        onClick={applyFilters}
        className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center"
      >
        <FaSave className="mr-2" />
        {t("customer_product_filter.apply")}
      </button>
    </div>
  );
};

export default FilterBar;
