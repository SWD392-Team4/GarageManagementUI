import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { getAllMechanic } from "../services/AppointmentService";

export default function SelectEmployee({ setEmployeeId, employeeid }) {
  const [employees, setEmployees] = useState([]);

  // Hàm formatOptionLabel để tùy chỉnh hiển thị option
  const formatOptionLabel = (option) => {
    return (
      <div className="grid grid-cols-6 items-center w-full max-w-full overflow-hidden space-x-2">
        <div className="col-span-1 flex-shrink-0">
          {option.image !== "N/A" ? (
            <img
              src={option.image}
              alt={option.label}
              className="w-full h-14 object-cover rounded-sm"
            />
          ) : (
            <div className="w-full h-14 flex items-center justify-center bg-gray-200 rounded-sm">
              <FaUser className="text-gray-500 text-xl" />
            </div>
          )}
        </div>
        <div className="col-span-5 overflow-hidden">
          <div className="font-medium">{option.label}</div>
          <div className="flex text-xs items-center">
            <div className="flex items-center mr-2">
              <FaEnvelope className="mr-1" /> {option.email}
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-1" /> {option.phone}
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllMechanic();
      setEmployees(result?.data.value || []);
    };
    fetchData();
  }, []);

  const employeesOptions = employees.map((emp) => ({
    value: emp.id,
    label: `${emp.firstName} ${emp.lastName}`,
    email: emp.email,
    image: emp.imageLink,
    phone: emp.phoneNumber,
  }));

  return (
    <Select
      value={
        employeesOptions.find((option) => option.value === employeeid) || null
      }
      onChange={(option) => {
        setEmployeeId(option.value);
      }}
      options={employeesOptions}
      getOptionLabel={formatOptionLabel}
    />
  );
}
