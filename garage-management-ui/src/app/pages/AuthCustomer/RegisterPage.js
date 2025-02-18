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
import CarModelBMW from "./partials/CarModelBMW";

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
        <div className="flex flex-col items-center justify-center sm:px-6 py-6 sm:py-8 h-max-screen mx-auto md:min-h-[65vh] lg:py-0 ">
          <div className="grid grid-cols-12 gap-6 md:gap-8 w-full max-w-screen-xl">
            {/* Model Car */}
            <div className="col-span-12 md:col-span-4 flex flex-col items-start justify-between text-center 
                    rounded-lg p-6 shadow-lg bg-black text-white 
                    transition-all duration-500 w-1/2">
              <CarModelBMW />
            </div>

            {/* Container chứa Form + Nội dung phụ */}
            <div className="col-span-12 md:col-span-8 flex flex-col lg:flex-row items-stretch rounded-lg overflow-hidden shadow-lg 
                   ">

              {/* Form sign up */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full lg:w-7/12 flex flex-col gap-4 p-6 bg-black text-white transition-all duration-500"
              >
                {/* Các input form */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    {t("register.userNameLabel")}
                  </label>
                  <input
                    {...register("userName")}
                    className="bg-black focus:bg-gray-50/10 text-white block w-full p-2.5 outline-none 
        ring-2 ring-white/55 border border-white focus:ring-0 rounded-none"
                    placeholder={t("register.userNamePlaceholder")}
                  />
                  {errors.userName && (
                    <p className="text-red-500 mt-2 text-sm">{errors.userName.message}</p>
                  )}
                </div>

                {/* Grid chia 2 cột */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      {t("register.firstName")}
                    </label>
                    <input
                      {...register("firstName")}
                      className="bg-black focus:bg-gray-50/10 text-white block w-full p-2.5 outline-none 
          ring-2 ring-white/55 border border-white focus:ring-0 rounded-none"
                      placeholder={t("register.firstNamePlaceholder")}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      {t("register.lastName")}
                    </label>
                    <input
                      {...register("lastName")}
                      className="bg-black focus:bg-gray-50/10 text-white block w-full p-2.5 outline-none 
          ring-2 ring-white/55 border border-white focus:ring-0 rounded-none"
                      placeholder={t("register.lastNamePlaceholder")}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    className="bg-black focus:bg-gray-50/10 text-white block w-full p-2.5 outline-none 
        ring-2 ring-white/55 border border-white focus:ring-0 rounded-none"
                    placeholder={t("register.emailPlaceholder")}
                  />
                </div>

                {/* Grid chia 2 cột */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phone Number */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      {t("register.phone")}
                    </label>
                    <input
                      {...register("phoneNumber")}
                      className="bg-black focus:bg-gray-50/10 text-white block w-full p-2.5 outline-none 
          ring-2 ring-white/55 border border-white focus:ring-0 rounded-none"
                      placeholder={t("register.phonePlaceholder")}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      {t("register.passwordLabel")}
                    </label>
                    <input
                      type="password"
                      {...register("password")}
                      className="bg-black focus:bg-gray-50/10 text-white block w-full p-2.5 outline-none 
          ring-2 ring-white/55 border border-white focus:ring-0 rounded-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    {t("register.comfirmPasswordLabel")}
                  </label>
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    className="bg-black focus:bg-gray-50/10 text-white block w-full p-2.5 outline-none 
        ring-2 ring-white/55 border border-white focus:ring-0 rounded-none"
                    placeholder="••••••••"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-1/3 bg-white/55 text-white py-2 hover:bg-gray-600 
        duration-500 rounded-none shadow-md"
                  >
                    {isLoading ? t("register.signingUpButton") : t("register.signUpButton")}
                  </button>
                  <p className="text-sm font-light text-gray-500 mt-4 sm:mt-0">
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


              {/* Nội dung phụ */}
              <div className="w-full lg:w-5/12 flex flex-col items-center justify-center p-6 bg-black text-white shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Yêu cầu mật khẩu</h3>
                <ul className="space-y-2">
                  {passwordRequirements.map((req, index) => (
                    <li
                      key={index}
                      className={`flex items-center gap-x-2 ${password.match(req.regex) ? "text-green-500" : "text-red-500"}`}
                    >
                      {password.match(req.regex) ? <CiCircleCheck size={20} /> : <AiOutlineCloseCircle size={20} />}
                      <span className="text-base">{req.text}</span>
                    </li>
                  ))}
                  <li
                    className={`flex items-center gap-x-2 ${password === confirmPassword ? "text-green-500" : "text-red-500"}`}
                  >
                    {password === confirmPassword ? <CiCircleCheck size={20} /> : <AiOutlineCloseCircle size={20} />}
                    {t(`passwordRequirements.passwordsMatch`)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
