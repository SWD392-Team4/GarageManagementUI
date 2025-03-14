import * as yup from "yup";

export const bookingSchema = (t) =>
  yup.object().shape({
    customerName: yup.string().required(t("requiredField")),
    customerEmail: yup
      .string()
      .email(t("invalidEmail"))
      .required(t("requiredField")),
    customerPhoneNumber: yup.string().required(t("requiredField")),
    carLicensePlateNumber: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value)),
    mileage: yup
      .number()
      .typeError(t("invalidMileage"))
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    estimatedAppointmentTime: yup
      .date()
      .typeError(t("bookingDateTimeRequired"))
      .required(t("bookingDateTimeRequired"))
      .min(
        new Date(Date.now() + 12 * 60 * 60 * 1000),
        t("bookingDateTimeMustBeAtLeast12HoursFromNow")
      ),
  });
export const formatDateTimeHour = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  // Lấy phần ngày/tháng/năm
  const datePart = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Lấy phần giờ/phút (24h)
  const timePart = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${datePart} ${timePart}`;
};
