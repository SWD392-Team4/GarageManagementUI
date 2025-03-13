import * as Yup from "yup";

export const getAppointmentSchema = (t) =>
  Yup.object().shape({
    carModelId: Yup.string().required(
      t("error.required_carModelId", "Vui lòng chọn model xe")
    ),
    mileage: Yup.number()
      .required(t("error.required_mileage", "Vui lòng nhập số km"))
      .min(0, t("error.invalid_mileage", "Số km không hợp lệ")),
    customerName: Yup.string().required(
      t("error.required_customerName", "Vui lòng nhập tên khách hàng")
    ),
    customerPhoneNumber: Yup.string().required(
      t("error.required_customerPhoneNumber", "Vui lòng nhập số điện thoại")
    ),
    customerEmail: Yup.string()
      .email(t("error.invalid_email", "Email không hợp lệ"))
      .required(t("error.required_customerEmail", "Vui lòng nhập email")),
    estimatedAppointmentTime: Yup.date().required(
      t(
        "error.required_estimatedAppointmentTime",
        "Vui lòng chọn thời gian hẹn"
      )
    ),
    estimatedEndTime: Yup.date().required(
      t("error.required_estimatedEndTime", "Vui lòng chọn thời gian kết thúc")
    ),
    carLicensePlateNumber: Yup.string().required(
      t("error.required_carLicensePlateNumber", "Vui lòng nhập biển số xe")
    ),
  });
