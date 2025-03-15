import React from "react";
import { BiCalendar } from "react-icons/bi";
import { FaUser, FaPhoneAlt, FaTachometerAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import ReservationDate from "./ReservationDate";
import BillingDetails from "./BillingDetails";
import ReservationServicesSelected from "./ReservationServicesSelected";
export default function FormCustomer() {
  return (
    <div className="flex flex-wrap -mx-4">
      <div className="w-full md:w-1/3 lg:w-1/3 px-4 mb-8 md:mb-0">
        <ReservationDate />
        <ReservationServicesSelected />
      </div>
      <div className="w-full md:w-2/3 lg:w-2/3 px-4">
        <BillingDetails />
      </div>
    </div>
  );
}
