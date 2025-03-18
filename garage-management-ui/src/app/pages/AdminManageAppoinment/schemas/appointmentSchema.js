import * as Yup from "yup";

export const getAppointmentSchema = (t) =>
  Yup.object().shape({
    carModelId: Yup.string().required(t("error2.required_carModelId")),
    mileage: Yup.number()
      .required(t("error2.required_mileage"))
      .min(0, t("error2.invalid_mileage")),
    customerName: Yup.string().required(t("error2.required_customerName")),
    customerPhoneNumber: Yup.string().required(
      t("error2.required_customerPhoneNumber")
    ),
    customerEmail: Yup.string()
      .email(t("error2.invalid_email"))
      .required(t("error2.required_customerEmail")),
    estimatedAppointmentTime: Yup.date().required(
      t("error2.required_estimatedAppointmentTime")
    ),
    // estimatedEndTime: Yup.date().required(
    //   t("error2.required_estimatedEndTime", "Vui lòng chọn thời gian kết thúc")
    // ),
    carLicensePlateNumber: Yup.string()
      .matches(
        /^(?:\d{2}[A-Z]-\d{5,6})$/,
        t("error2.required_carLicensePlateNumber2")
      )
      .required(t("error2.required_carLicensePlateNumber")),
  });
export const formatDate = (dateString) => {
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
