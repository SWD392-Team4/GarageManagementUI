import React from "react";

const ReservationServicesSelected = () => {
  return (
    <>
      <div className="bg-gray-100/70 p-4">
        <h2 className="text-xl font-semibold mb-2 border-b border-gray-800 text-center font-title">
          Select Services
        </h2>

        <div className="mb-4">
          <h6 className="font-semibold mb-1">Reservation Type</h6>
          <span className="block text-gray-600 mb-2"> Package Service</span>

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
              <li className="flex justify-between">
                <span>Service 2</span>
                <span>$320.00</span>
              </li>
            </ul>
            <ul className="mb-2 space-y-1">
              <li className="flex justify-between">
                <span>Service 3</span>
                <span>$320.00</span>
              </li>
              <li className="flex justify-between">
                <span>Tax</span>
                <span>$320.00</span>
              </li>
            </ul>
          </div>

          {/* Tổng giá phòng */}
          <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
            <span>TOTAL </span>
            <span className="text-blue-600">$470.00</span>
          </div>
        </div>
      </div>
      <div className="bg-orange-300/70 text-white p-4  flex justify-between items-center font-title">
        <label className="font-semibold">TOTAL</label>
        <span className="text-lg font-bold">$470.00</span>
      </div>
    </>
  );
};

export default ReservationServicesSelected;
