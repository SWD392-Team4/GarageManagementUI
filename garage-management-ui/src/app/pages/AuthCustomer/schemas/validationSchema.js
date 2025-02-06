import * as Yup from "yup";

// Hàm nhận `t` từ i18n để đảm bảo ngôn ngữ được cập nhật
export const getRegisterSchema = (t) => {
  return Yup.object().shape({
    userName: Yup.string().required(t("validation.userNameRequired")),
    firstName: Yup.string().required(t("validation.firstNameRequired")),
    lastName: Yup.string().required(t("validation.lastNameRequired")),
    email: Yup.string()
      .email(t("validation.emailInvalid"))
      .required(t("validation.emailRequired")),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, t("validation.phoneNumberInvalid"))
      .min(10, t("validation.phoneNumberMin"))
      .required(t("validation.phoneNumberRequired")),
    password: Yup.string()
      .min(10, t("validation.passwordMin"))
      .matches(/[A-Z]/, t("validation.passwordUppercase"))
      .matches(/[a-z]/, t("validation.passwordLowercase"))
      .matches(/[0-9]/, t("validation.passwordNumberRequired"))
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        t("validation.passwordSpecialCharacter")
      )
      .required(t("validation.passwordRequired")),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        t("validation.confirmPasswordMismatch")
      )
      .required(t("validation.confirmPasswordRequired")),
  });
};
