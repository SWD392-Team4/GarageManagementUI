import React, { useState } from "react";
import { FilterAppointment } from "../services/store/FilterStore";

export default function FilterTablePost() {
  const [searchNamecus, setSearchNamecus] = useState("");
  const [filters, setFilters] = useState({
    searchNameEmp: "",
    startDate: "",
    endDate: "",
    type: "",
    status: "",
  });

  const handleSearchCus = (e) => {
    FilterAppointment.set((v) => {
      v.value.searchNamecus = e.target.value;
    });
    setSearchNamecus(e.target.value);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      searchNamecus: "",
      searchNameEmp: "",
      startDate: "",
      endDate: "",
      type: "",
      status: "",
    };

    setFilters(clearedFilters);
    setSearchNamecus("");
    FilterAppointment.set((v) => {
      v.value.searchNamecus = "";
      v.value.startDate = "";
      v.value.endDate = "";
      v.value.type = "";
      v.value.status = "";
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    FilterAppointment.set((v) => {
      v.value[name] = value;
    });
  };

  return (
    <div className="flex bg-white flex-wrap items-center gap-4 p-2 shadow-md">
      {/* Search Input */}

      <div className="flex flex-col">
        <label className="text-sm ml-1 font-medium text-gray-700">
          Search Customer{" "}
        </label>
        <input
          type="text"
          value={searchNamecus}
          onChange={handleSearchCus}
          placeholder="Search title..."
          className="w-36 p-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Start Date Filter */}
      <div className="flex flex-col">
        <label className="text-sm ml-1 font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleInputChange}
          className="w-36 p-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* End Date Filter */}
      <div className="flex flex-col">
        <label className="text-sm ml-1 font-medium text-gray-700">
          End Date
        </label>
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleInputChange}
          className="w-36 p-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Type Filter */}
      <div className="flex flex-col">
        <label className="text-sm ml-1 font-medium text-gray-700">Type</label>
        <select
          name="type"
          value={filters.type}
          onChange={handleInputChange}
          className="w-36 p-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select</option>
          <option value="valid">Mua bán</option>
          <option value="expired">Sửa chữa và package</option>
        </select>
      </div>
      {/* Type status */}
      <div className="flex flex-col">
        <label className="text-sm ml-1 font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={filters.status}
          onChange={handleInputChange}
          className="w-36 p-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select</option>
          <option value="0">status 1</option>
          <option value="1">status 2</option>
          <option value="2">status 3</option>
          <option value="3">status 4</option>
          <option value="4">status 5</option>
        </select>
      </div>

      {/* Clear Filters */}
      <div className="flex flex-col">
        <button
          onClick={handleClearFilters}
          className="p-2 border mt-5 border-gray-300 text-gray-500  hover:bg-gray-200 duration-300  focus:outline-none"
          title="Clear Filters"
        >
          CLEAN
        </button>
      </div>
      <div className="flex flex-col">
        <button
          onClick={handleClearFilters}
          className="p-2 border mt-5 border-gray-300 bg-blue-500 text-white  hover:bg-blue-600 duration-300 focus:outline-none"
          title="Clear Filters"
        >
          SEARCH
        </button>
      </div>
    </div>
  );
}
