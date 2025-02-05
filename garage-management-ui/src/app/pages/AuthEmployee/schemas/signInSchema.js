import * as yup from "yup";

export const signInSchema = yup.object().shape({
  userName: yup.string().required("email/user name"),
  password: yup
    .string()
    .min(8, "Password must be at least 10 characters long")
    .required("Password is required"),
});
