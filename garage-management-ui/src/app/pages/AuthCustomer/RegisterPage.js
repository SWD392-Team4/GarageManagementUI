import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../hooks/services/UserService";
import PageTitle from "../../components/common/PageTitle";
import { getRegisterSchema } from "./schemas/validationSchema";

export default function RegisterPage() {
  const { t } = useTranslation("register");
  document.title = t("register.pageTitle");
  const validationSchema = getRegisterSchema(t);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const userService = new UserService();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
        "/api/auth/register",
        "POST",
        data,
        false
      );
      if (response.ok) {
        userService.showToast(response.status, "Đăng ký thành công!");
        navigate("/authen");
      } else {
        userService.showToast(
          response.status,
          result.message || "Đăng ký thất bại"
        );
      }
    } catch (error) {
      userService.showToast(error.status, error.message);
    }
    setIsLoading(false);
  };

  const passwordRequirements = [
    { text: t("passwordRequirements.re1"), regex: /.{10,}/ },
    { text: t("passwordRequirements.re2"), regex: /[A-Z]/ },
    { text: t("passwordRequirements.re3"), regex: /[a-z]/ },
    { text: t("passwordRequirements.re4"), regex: /[!@#$%^&*(),.?":{}|<>]/ },
    { text: t("passwordRequirements.re5"), regex: /[0-9]/ },
  ];

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <section className="bg-black ">
        <PageTitle title="Sign Up" title1="Home" subtitle="Sign Up" />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-[65vh] lg:py-0 border-t border-white">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="md:w-1/2 flex flex-col gap-4"
            >
              {/* User Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  {t("register.userNameLabel")}
                </label>
                <input
                  {...register("userName")}
                  className="bg-black focus:bg-gray-50/10  text-white  block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                  placeholder={t("register.userNamePlaceholder")}
                />
                {errors.userName && (
                  <p className="text-red-500 mt-2 text-sm">
                    {errors.userName.message}
                  </p>
                )}
              </div>

              <div className="flex space-x-4">
                {/* First Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    {t("register.firstName")}
                  </label>
                  <input
                    {...register("firstName")}
                    className="bg-black focus:bg-gray-50/10  text-white  block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                    placeholder={t("register.firstNamePlaceholder")}
                  />
                  {errors.firstName && (
                    <p className="text-red-500  mt-2 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    {t("register.lastName")}
                  </label>
                  <input
                    {...register("lastName")}
                    className="bg-black focus:bg-gray-50/10  text-white  block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                    placeholder={t("register.lastNamePlaceholder")}
                  />
                  {errors.lastName && (
                    <p className="text-red-500  mt-2 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="bg-black focus:bg-gray-50/10  text-white  block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                  placeholder={t("register.emailPlaceholder")}
                />
                {errors.email && (
                  <p className="text-red-500  mt-2 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  {t("register.phone")}
                </label>
                <input
                  {...register("phoneNumber")}
                  className="bg-black focus:bg-gray-50/10  text-white  block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                  placeholder={t("register.phonePlaceholder")}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500  mt-2 text-sm">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  {t("register.passwordLabel")}
                </label>
                <input
                  type="password"
                  {...register("password")}
                  className="bg-black focus:bg-gray-50/10  text-white  block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500  mt-2 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  {t("register.comfirmPasswordLabel")}
                </label>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  className="bg-black focus:bg-gray-50/10  text-white  block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500  mt-2 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-1/3 bg-white/55 text-white py-2 hover:bg-gray-600 duration-500 "
                >
                  {isLoading
                    ? t("register.signingUpButton")
                    : t("register.signUpButton")}
                </button>
                <p className="text-sm font-light text-gray-500">
                  {t(`register.MemberText`)}{" "}
                  <Link
                    to="/authen"
                    className="font-medium text-primary-600 hover:underline hover:text-gray-600"
                  >
                    {t(`register.signInLink`)}
                  </Link>
                </p>
              </div>
            </form>

            {/* Password Requirements */}
            <div className="md:w-1/2 flex flex-col items-center justify-center text-center">
              {/* Mô tả */}
              <h3 className="text-lg font-semibold text-white mb-4">
                Yêu cầu mật khẩu
              </h3>

              {/* Danh sách yêu cầu mật khẩu */}
              <ul className="space-y-2">
                {passwordRequirements.map((req, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-x-2 ${
                      password.match(req.regex)
                        ? "text-green-500"
                        : "text-red-500"
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

                <li
                  className={`flex items-center gap-x-2 ${
                    password === confirmPassword
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {password === confirmPassword ? (
                    <CiCircleCheck size={20} />
                  ) : (
                    <AiOutlineCloseCircle size={20} />
                  )}
                  {t(`passwordRequirements.passwordsMatch`)}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
