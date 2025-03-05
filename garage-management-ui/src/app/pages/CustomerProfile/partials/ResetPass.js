import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { FaKey, FaLock } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
import { getResetSchema } from "../../AuthCustomer/schemas/validationSchema";
import UserService from "../../../hooks/services/UserService";
import { sAccount } from "../../AuthCustomer/services/store";

export default function ResetPass() {
  const { t } = useTranslation("customer_profile");

  // Sử dụng schema validation từ Yup
  const validationSchema = getResetSchema(t);

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const handleForgetPassword = async () => {
    try {
      const email = sAccount.value.email;
      const result = await userService.sendAjax(
        "/api/auth/forgot-password",
        "POST",
        { email: email },
        false
      );

      if (result) {
        userService.showToast(
          result.status,
          t("personal_info.successMessagePass")
        );
        navigate("/authen");
      } else {
        userService.showToast(
          result.status,
          result.message || t("personal_info.errorMessagePass")
        );
      }
    } catch (error) {
      userService.showToast(error.status, t("personal_info.errorMessagePass"));
    }
  };
  const userService = new UserService();
  const [isLoading, setIsLoading] = useState(false);

  // Theo dõi giá trị password để kiểm tra điều kiện
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const onSubmit = async (data) => {
    if (password !== confirmPassword) {
      userService.showToast(400, "Mật khẩu xác nhận không khớp");
      return;
    }

    setIsLoading(true);
    try {
      const result = await userService.sendAjax(
        "/api/auth/change-password",
        "POST",

        {
          CurrentPassword: data.CurrentPassword,
          NewPassword: data.password,
          ConfirmNewPassword: data.confirmPassword,
        },

        true
      );

      if (result.status === 200) {
        userService.showToast(result.status, t("change_password.success"));
      }
    } catch (error) {
      userService.showToast(error.status, t("change_password.error"));
    }
    setIsLoading(false);
  };

  // Yêu cầu mật khẩu
  const passwordRequirements = [
    { text: t("passwordRequirements.re1"), regex: /.{10,}/ },
    { text: t("passwordRequirements.re2"), regex: /[A-Z]/ },
    { text: t("passwordRequirements.re3"), regex: /[a-z]/ },
    { text: t("passwordRequirements.re4"), regex: /[!@#$%^&*(),.?":{}|<>]/ },
    { text: t("passwordRequirements.re5"), regex: /[0-9]/ },
  ];

  return (
    <>
      <div className="bg-gray-100 p-4 rounded-md shadow border my-2 border-gray-300">
        <h3 className="text-lg font-semibold mb-2">
          {t("forgot_password.title")}
        </h3>
        <p className="text-gray-600">{t("forgot_password.description")}</p>
        <button
          onClick={() => handleForgetPassword()}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mt-4 flex items-center gap-2"
        >
          <FaLock /> {t("forgot_password.button")}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Form Đổi Mật Khẩu */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-100 p-4 rounded-md shadow border border-gray-300 w-full"
        >
          <h3 className="text-lg font-semibold mb-2">
            {t("change_password.title")}
          </h3>

          {/* Mật khẩu hiện tại */}
          <div>
            <input
              type="password"
              {...register("CurrentPassword")}
              className="border border-gray-400 bg-gray-100 p-2 w-full rounded mb-2"
              placeholder={t("change_password.current")}
            />
            {errors.CurrentPassword && (
              <p className="text-red-500">{errors.currentPassword.message}</p>
            )}
          </div>

          {/* Mật khẩu mới */}
          <div>
            <input
              type="password"
              {...register("password")}
              className="border border-gray-400 bg-gray-100 p-2 w-full rounded mb-2"
              placeholder={t("change_password.new")}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Xác nhận mật khẩu mới */}
          <div>
            <input
              type="password"
              {...register("confirmPassword")}
              className="border border-gray-400 bg-gray-100 p-2 w-full rounded mb-2"
              placeholder={t("change_password.confirm")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Nút Đổi Mật Khẩu */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md mt-2 flex items-center gap-2"
          >
            <FaKey />
            {isLoading
              ? t("change_password.loading")
              : t("change_password.button")}
          </button>
        </form>

        {/* Hiển thị yêu cầu mật khẩu */}
        <div className="bg-gray-100 p-4 rounded-md shadow border border-gray-300 w-full">
          <h3 className="text-lg font-semibold text-black mb-4">
            {t("passwordRequirements.title")}
          </h3>
          <ul className="space-y-2">
            {passwordRequirements.map((req, index) => (
              <li
                key={index}
                className={`flex items-center gap-x-2 ${
                  password.match(req.regex) ? "text-green-500" : "text-red-500"
                }`}
              >
                {password.match(req.regex) ? (
                  <CiCircleCheck size={20} />
                ) : (
                  <AiOutlineCloseCircle size={20} />
                )}
                <span className="text-base">{req.text}</span>
              </li>
            ))}
            {/* Kiểm tra mật khẩu khớp nhau */}
            <li
              className={`flex items-center gap-x-2 ${
                password === confirmPassword ? "text-green-500" : "text-red-500"
              }`}
            >
              {password === confirmPassword ? (
                <CiCircleCheck size={20} />
              ) : (
                <AiOutlineCloseCircle size={20} />
              )}
              {t("passwordRequirements.passwordsMatch")}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
