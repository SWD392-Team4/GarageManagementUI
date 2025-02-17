import React from "react";
import Breadcrumb from "./Breadcrumb";
import BookingInfo from "./BookingInfo";
import ServicesInAppointment from "./ServicesInAppointment";
import PackeagesINAppointment from "./PackeagesINAppointment";

export default function appointmentDetail() {
  return (
    <>
      <Breadcrumb title="Detail appointment: " />
      <BookingInfo />
      <ServicesInAppointment />
      <PackeagesINAppointment />
    </>
  );
}
