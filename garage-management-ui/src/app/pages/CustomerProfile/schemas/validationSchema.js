import * as Yup from "yup";

export const getUpdateUserSchema = (t) => {
  return Yup.object().shape({
    firstName: Yup.string().required(t("validation.firstNameRequired")),
    lastName: Yup.string().required(t("validation.lastNameRequired")),
  });
};
