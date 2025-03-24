import React, { useState } from "react";
import { FilterAppointment } from "../services/store/FilterStore";

export default function FilterTablePost() {
  const [searchNameEmp, setSearchNameEmp] = useState("");
  const [searchNamecus, setSearchNamecus] = useState("");
  const [searchEmailCus, setSearchEmailCus] = useState("");
  const [filters, setFilters] = useState({
    searchNamecus: "",
    searchNameEmp: "",
    searchEmailCus: "",
    startDate: "",
    endDate: "",
    type: "",
  });

  const handleSearchEmp = (e) => {
    FilterAppointment.set((v) => {
      v.value.searchNameEmp = e.target.value;
    });
    setSearchNameEmp(e.target.value);
  };
  const handleSearchEmailCus = (e) => {
    FilterAppointment.set((v) => {
      v.value.searchEmailCus = e.target.value;
    });
    setSearchEmailCus(e.target.value);
  };
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
      searchEmailCus: "",
      startDate: "",
      endDate: "",
      type: "",
    };

    setFilters(clearedFilters);
    setSearchNameEmp("");
    setSearchNamecus("");
    setSearchEmailCus("");
    FilterAppointment.set((v) => {
      v.value.searchNamecus = "";
      v.value.searchNameEmp = "";
      v.value.startDate = "";
      v.value.endDate = "";
      v.value.type = "";
      v.value.searchEmailCus = "";
    });
  };
  const handerSearchWithFilter = () => {
    FilterAppointment.set((v) => {
      v.value.search = v.value.search + 1;
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
    <div className="flex bg-white flex-wrap items-center gap-4 p-1 shadow-md">
      {/* Search Input */}
      {/* <div className="flex flex-col">
        <label className="text-sm ml-1 font-medium text-gray-700">
          Search Employee
        </label>
        <input
          type="text"
          value={searchNameEmp}
          onChange={handleSearchEmp}
          placeholder="Search title..."
          className="w-36 p-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}
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
      <div className="flex flex-col">
        <label className="text-sm ml-1 font-medium text-gray-700">
          Search Customer Email{" "}
        </label>
        <input
          type="text"
          value={searchEmailCus}
          onChange={handleSearchEmailCus}
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
          type="datetime-local"
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
          type="datetime-local"
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
          <option value="ServiceBooking">Service booking</option>
          <option value="ServicePackageBooking">
            Service and package booking
          </option>
          <option value="ScheduledMaintenance">Scheduled maintenance</option>
          <option value="SellingProduct">Selling product</option>
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
          onClick={handerSearchWithFilter}
          className="p-2 border mt-5 border-gray-300 bg-blue-500 text-white  hover:bg-blue-600 duration-300 focus:outline-none"
          title="Clear Filters"
        >
          SEARCH
        </button>
      </div>
    </div>
  );
}
