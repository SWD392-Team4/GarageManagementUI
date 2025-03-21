import React from "react";
import BookingInfo from "./BookingInfo";
import Breadcrumb from "./Breadcrumb";
import PackeagesINAppointment from "./PackeagesINAppointment";
import ServicesInAppointment from "./ServicesInAppointment";

export default function appointmentDetail() {
  return (
    <div className="md:p-6">
      <Breadcrumb title="Detail appointment: " />
      <BookingInfo />

      <ServicesInAppointment />

      <PackeagesINAppointment />
    </div>
  );
}
