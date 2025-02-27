import React, { useEffect, useState } from "react";
import UserService from "../../../hooks/services/UserService";
import { sAccount } from "../../../pages/AuthCustomer/services/store";

export default function WorkPlace() {
  const [workPlaceData, setWorkPlaceData] = useState(null);
  const userService = new UserService();

  useEffect(() => {
    const fetchWorkplace = async () => {
      try {
        const response = await userService.sendAjax(
          `/api/workplaces/${sAccount.value.WorkPlaceId}`,
          "GET",
          null,
          true
        );
        setWorkPlaceData(response.data.value); // Lưu dữ liệu API vào state
      } catch (error) {
        console.log("Failed to fetch workplace", error);
      }
    };

    fetchWorkplace();
  }, []);

  if (!workPlaceData) {
    return <div className="p-6">Loading...</div>; // Hiển thị khi đang tải dữ liệu
  }
  console.log("data: ", workPlaceData);
  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-6 border border-gray-300">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        WorkPlace Information
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input
            type="text"
            value={workPlaceData.Name}
            className="w-full p-2 border rounded-lg mt-1"
            readOnly
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Phone Number</label>
          <input
            type="tel"
            value={workPlaceData.PhoneNumber}
            className="w-full p-2 border rounded-lg mt-1"
            readOnly
          />
        </div>
        <div className="col-span-2">
          <label className="text-sm text-gray-600">Full Address</label>
          <input
            type="text"
            value={workPlaceData.FullAddress}
            className="w-full p-2 border rounded-lg mt-1"
            readOnly
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Workplace Type</label>
          <input
            type="text"
            value={workPlaceData.WorkplaceType}
            className="w-full p-2 border rounded-lg mt-1"
            readOnly
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Status</label>
          <input
            type="text"
            value={workPlaceData.Status}
            className="w-full p-2 border rounded-lg mt-1"
            readOnly
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Created At</label>
          <input
            type="text"
            value={new Date(workPlaceData.CreatedAt).toLocaleDateString()}
            className="w-full p-2 border rounded-lg mt-1"
            readOnly
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Updated At</label>
          <input
            type="text"
            value={new Date(workPlaceData.UpdatedAt).toLocaleDateString()}
            className="w-full p-2 border rounded-lg mt-1"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
