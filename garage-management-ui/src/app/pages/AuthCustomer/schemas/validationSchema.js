import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  userName: Yup.string().required("Vui lòng nhập tên đăng nhập"),
  firstName: Yup.string().required("Vui lòng nhập họ"),
  lastName: Yup.string().required("Vui lòng nhập tên"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
    .required("Vui lòng nhập số điện thoại"),
  password: Yup.string()
    .min(10, "Mật khẩu phải có ít nhất 10 kí tự")
    .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ hoa")
    .matches(/[a-z]/, "Mật khẩu phải chứa ít nhất một chữ thường")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Mật khẩu phải chứa ít nhất một kí tự đặc biệt"
    )
    .required("Vui lòng nhập mật khẩu"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng nhập lại mật khẩu"),
});
