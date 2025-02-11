import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../components/common/PageTitle";
import UserService from "../../hooks/services/UserService";
import { getRegisterSchema } from "./schemas/validationSchema";

export default function ForgetPass() {
  const { t } = useTranslation("forgetpass"); // Sử dụng namespace "forgetpass"

  // Cập nhật tiêu đề trang từ file JSON
  document.title = t("pageTitle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userService = new UserService();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await userService.sendAjax(
        "/api/auth/forgot-password",
        "POST",
        data,
        false
      );

      if (result) {
        userService.showToast(result.status, t("successMessage"));
        navigate("/authen");
      } else {
        userService.showToast(
          result.status,
          result.message || t("errorMessage")
        );
      }
    } catch (error) {
      userService.showToast(error.status, t("errorMessage"));
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <div>{t("loading")}</div>}
      <section className="bg-black">
        <PageTitle
          title={t("title")}
          title1={t("home")}
          subtitle={t("subtitle")}
        />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-[45vh] lg:py-0 border-t border-white">
          <div className="w-full shadow-md md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="md:w-full flex flex-col gap-4"
              >
                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    {t("emailLabel")}
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="bg-black focus:bg-gray-50/10 text-white block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                    placeholder={t("emailPlaceholder")}
                  />
                  {errors.email && (
                    <p className="text-red-500 mt-2 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-between">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-1/2 bg-white/55 text-white py-2 hover:bg-gray-600 duration-500"
                  >
                    {isLoading ? t("confirmingText") : t("confirmButton")}
                  </button>

                  <p className="text-sm font-light text-gray-500">
                    {t("alreadyMember")}
                    <Link
                      to="/authen"
                      className="font-medium text-primary-600 hover:underline hover:text-gray-600"
                    >
                      {t("signIn")}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
