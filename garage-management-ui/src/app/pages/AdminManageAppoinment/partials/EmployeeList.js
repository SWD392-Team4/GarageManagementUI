import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaTrash } from "react-icons/fa";
import UnAssginEmployee from "./UnAssginEmployee";

export default function EmployeeList({ id, serviceDetail, onCancel2 }) {
  // State để mở modal và lưu employee được chọn
  const [isUpdateModalOpen4, setIsUpdateModalOpen4] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Hàm mở modal với dữ liệu của employee được chọn
  const handleRemoveEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsUpdateModalOpen4(true);
  };

  return (
    <div>
      <h6 className="font-semibold">Employee active</h6>
      {serviceDetail.employeeSchedules &&
      serviceDetail.employeeSchedules.length > 0 ? (
        (() => {
          const filteredEmployees = serviceDetail.employeeSchedules.filter(
            (employeeSchedule) => employeeSchedule.status === "Assigned"
          );
          return filteredEmployees.length > 0 ? (
            filteredEmployees.map((employeeSchedule) => {
              const { employee } = employeeSchedule;
              return (
                <div
                  key={employee.id}
                  className="grid grid-cols-6 items-center w-full max-w-full overflow-hidden space-x-2 mb-2 "
                >
                  <div className="col-span-1 flex-shrink-0">
                    {employee.imageLink ? (
                      <img
                        src={employee.imageLink}
                        alt={`${employee.firstName} ${employee.lastName}`}
                        className="w-full h-14 object-cover rounded-sm"
                      />
                    ) : (
                      <div className="w-full h-14 flex items-center justify-center bg-gray-200 rounded-sm">
                        <FaUser className="text-gray-500 text-xl" />
                      </div>
                    )}
                  </div>
                  <div className="col-span-4 overflow-hidden ">
                    <div className="font-medium truncate">
                      {employee.firstName} {employee.lastName}
                    </div>
                    <div className="flex text-xs items-center">
                      <div className="flex items-center mr-2 truncate">
                        <FaEnvelope className="mr-1" /> {employee.email}
                      </div>
                      <div className="flex items-center truncate">
                        <FaPhone className="mr-1" /> {employee.phoneNumber}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => handleRemoveEmployee(employee)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="font-normal italic text-gray-600 text-sm">
              Không có nhân viên nào được chọn
            </div>
          );
        })()
      ) : (
        <div className="font-normal italic text-gray-600 text-sm">
          Không có nhân viên nào được chọn
        </div>
      )}

      {/* Modal UnAssginEmployee */}
      <UnAssginEmployee
        isOpen={isUpdateModalOpen4}
        onCancel={() => setIsUpdateModalOpen4(false)}
        onCancel2={onCancel2}
        appointmentId={id}
        serviceDetail={serviceDetail}
        employee={selectedEmployee}
      />
    </div>
  );
}
