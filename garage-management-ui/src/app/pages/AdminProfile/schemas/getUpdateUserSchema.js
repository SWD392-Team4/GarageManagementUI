import * as yup from "yup";

export const getUpdateUserSchema = (t) =>
  yup.object().shape({
    firstName: yup.string().required(t("error_info.first")),
    lastName: yup.string().required(t("error_info.last")),
    dateOfBirth: yup
      .date()
      .required(t("error_info.dateOfBirth1"))
      .typeError(t("error_info.dateOfBirth2")),
    citizenId: yup.string().required(t("error_info.Citizen")),
    gender: yup
      .string()
      .oneOf(["true", "false"], t("error_info.Gender"))
      .required(t("error_info.Gender")),
  });
