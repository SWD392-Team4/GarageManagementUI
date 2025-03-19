import React, { useEffect, useState } from "react";
import UserService from "../../../hooks/services/UserService";
import { BookingSignify } from "../Services/BookingSignify";
import { formatVietnameseCurrency } from "../../ManageGoodsIssued/schemas/GoodsIssuedSchemas";

const ReservationServicesSelected = () => {
  const [appointment, setAppointment] = useState(null);
  const userService = new UserService();
  useEffect(() => {
    const fetchWorkplace = async () => {
      try {
        const payload = {
          services: BookingSignify.value.services,
          packages: BookingSignify.value.package,
        };
        const response = await userService.sendAjax(
          `/api/workplaces/${BookingSignify.value.garaId}/appointments/checkPirce`,
          "POST",
          payload,
          true
        );
        setAppointment(response.data.value);
      } catch (error) {
        console.log("Failed to fetch checkPirce", error);
      }
    };

    fetchWorkplace();
  }, []);
  return (
    <>
      <div className="bg-gray-100/70 p-4">
        <h2 className="text-xl font-semibold mb-2 border-b border-gray-800 text-center font-title">
          Select Services
        </h2>

        <div className="mb-4">
          <h6 className="font-semibold mb-1">Package booking</h6>
          <span className="block text-gray-600 mb-2">
            {" "}
            Package name - nếu có
          </span>

          {/* Tên loại phòng */}
          <div className="mb-2">
            <h6 className="font-semibold mb-1">Services booking</h6>
          </div>

          <div>
            <ul className="mb-2 space-y-1">
              <li className="flex justify-between">
                <span>Service 1</span>
                <span>$250.00</span>
              </li>
            </ul>
          </div>

          {/* Tổng giá phòng */}
          <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
            <span>TOTAL </span>
            <span className="text-blue-600">
              {formatVietnameseCurrency(
                appointment ? appointment.price : "2.000.000"
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-orange-300/70 text-white p-4  flex justify-between items-center font-title">
        <label className="font-semibold">TOTAL</label>
        <span className="text-lg font-bold">
          {formatVietnameseCurrency(
            appointment ? appointment.price : "2.000.000"
          )}
        </span>
      </div>
    </>
  );
};

export default ReservationServicesSelected;
