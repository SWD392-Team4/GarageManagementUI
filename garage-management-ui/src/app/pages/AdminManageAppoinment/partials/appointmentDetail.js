import React from "react";
import Breadcrumb from "./Breadcrumb";
import BookingInfo from "./BookingInfo";
import ServicesInAppointment from "./ServicesInAppointment";
import PackeagesINAppointment from "./PackeagesINAppointment";
import { currentAppointment } from "../services/store/AppointmentSignify";

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
