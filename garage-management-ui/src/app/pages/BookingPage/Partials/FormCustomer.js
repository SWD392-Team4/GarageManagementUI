import React, { useEffect } from "react";
import { BookingSignify } from "../Services/BookingSignify";
import BillingDetails from "./BillingDetails";
import ReservationDate from "./ReservationDate";
import ReservationServicesSelected from "./ReservationServicesSelected";
import { useNavigate } from "react-router-dom";

export default function FormCustomer() {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      brandId,
      carCategoryId,
      carModel,
      garaId,
      package: pkg,
      services,
      type,
    } = BookingSignify.value;

    if (
      brandId === "" ||
      carCategoryId === "" ||
      carModel === "" ||
      garaId === "" ||
      type === "" ||
      (Array.isArray(services) &&
        services.length === 0 &&
        Array.isArray(pkg) &&
        pkg.length === 0)
    ) {
      navigate("/booking");
    }
  }, [navigate]);

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
