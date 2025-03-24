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
      )
      .test("businessHours", t("Chỉ được chọn giờ từ 7AM đến 5PM"), (value) => {
        if (!value) return false;
        const hour = value.getHours();
        // Cho phép từ 7:00 đến trước 17:00 (tức 5PM)
        return hour >= 7 && hour < 17;
      }),
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
// Hàm chuyển đổi chuỗi datetime-local thành chuỗi ISO với offset địa phương
export function formatLocalDatetimeWithOffset(datetimeLocalString) {
  // Tạo đối tượng Date từ chuỗi (được hiểu là thời gian địa phương)
  const date = new Date(datetimeLocalString);

  // Hàm bổ sung số 0 nếu số có 1 chữ số
  const pad = (num) => String(num).padStart(2, "0");

  // Tạo chuỗi thời gian theo định dạng: YYYY-MM-DDTHH:mm:ss
  const formattedDate = `${date.getFullYear()}-${pad(
    date.getMonth() + 1
  )}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}:00`;

  // Lấy offset của múi giờ (số phút chênh lệch so với UTC)
  const offsetMinutes = -date.getTimezoneOffset(); // getTimezoneOffset trả về số phút lùi UTC
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const offsetHours = pad(Math.floor(Math.abs(offsetMinutes) / 60));
  const offsetMins = pad(Math.abs(offsetMinutes) % 60);

  // Trả về chuỗi thời gian kèm offset, ví dụ: "2025-03-26T07:00:00+07:00"
  return `${formattedDate}${sign}${offsetHours}:${offsetMins}`;
}
