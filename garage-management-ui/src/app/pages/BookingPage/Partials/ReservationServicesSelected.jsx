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
          `/api/workplaces/${BookingSignify.value.garaId}/appointments/checkPrice`,
          "POST",
          payload,
          false
        );
        setAppointment(response.data.value);
      } catch (error) {
        console.log("Failed to fetch checkPrice", error);
      }
    };

    fetchWorkplace();
  }, []);

  return (
    <>
      <div className="bg-gray-100/70 p-4 md:max-h-[620px] md:overflow-y-auto">
        <h2 className="text-xl font-semibold mb-2 border-b border-gray-800 text-center font-title">
          Select Services
        </h2>

        {/* Nếu có thông tin package booking */}
        {appointment?.appointmentDetailPackages?.length > 0 && (
          <div className="mb-4">
            <h6 className="font-semibold mb-1">Package booking</h6>
            <span className="block text-gray-600 mb-2">
              {appointment.appointmentDetailPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex justify-between items-center py-1 border-b last:border-0"
                >
                  <span>{pkg.packageName}</span>
                  <span>{formatVietnameseCurrency(pkg.packagePrice)}</span>
                </div>
              ))}
            </span>
          </div>
        )}

        {/* Danh sách dịch vụ được chọn */}
        {appointment?.appointmentDetails?.length > 0 ? (
          appointment.appointmentDetails.map((detail) => (
            <div key={detail.id} className="mb-2 border p-2 rounded-sm">
              <div className="flex justify-between items-center">
                <h6 className="font-semibold">{detail.serviceName}</h6>
                {/* Nếu không có package booking, hiển thị giá của service detail */}
                {!(appointment?.appointmentDetailPackages?.length > 0) && (
                  <span className="text-blue-600 font-medium">
                    {formatVietnameseCurrency(detail.price)}
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                Estimated Hours: {detail.estimatedHours} hour(s)
              </div>
              {/* Danh sách sản phẩm thay thế của dịch vụ */}
              {detail.appointmentReplacementParts?.length > 0 && (
                <div className="ml-4">
                  <h6 className="font-semibold text-xs">Products:</h6>
                  <ul>
                    {detail.appointmentReplacementParts.map((part) => (
                      <li
                        key={part.id}
                        className="flex justify-between text-sm text-gray-700"
                      >
                        <span>
                          {part.productName} x {part.quantity}
                        </span>
                        <span>
                          {formatVietnameseCurrency(part.productPrice)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-gray-600">No services selected.</div>
        )}
      </div>

      <div className="bg-orange-300/70 text-white p-4 flex justify-between items-center font-title">
        <label className="font-semibold">TOTAL</label>
        <span className="text-lg font-bold">
          {appointment
            ? formatVietnameseCurrency(appointment.price)
            : formatVietnameseCurrency("0")}
        </span>
      </div>
    </>
  );
};

export default ReservationServicesSelected;
