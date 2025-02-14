import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../hooks/services/UserService";
import LoaddingPage from "../../layouts/LoadingPage";
import PageTitle from "../../components/common/PageTitle";
import { onSubmit } from "./services/authService";
import CarModelViewer from "./partials/CarModelViewer";
import { TypeAnimation } from "react-type-animation";

export default function LoginPage() {
  const { t } = useTranslation("ver1");
  document.title = t(`loginCustomer.pageTitle`);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userService = new UserService();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading.current && <LoaddingPage />}
      <section className="bg-black ">
        <PageTitle title="Sign In" title1="Home" subtitle="Sign In" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-8 mx-auto border-t border-white">
          {/* Cột 1: Model Car */}
          <div className="flex flex-col items-center justify-center md:col-span-1">
            {/* Thay thế nội dung này bằng hình ảnh hoặc thông tin model xe */}
            <CarModelViewer />
          </div>

          {/* Cột 2: Biểu mẫu đăng nhập */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full shadow-md sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form
                  onSubmit={handleSubmit((data) =>
                    onSubmit(data, userService, navigate, setIsLoading)
                  )}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      {t(`loginCustomer.userNameLabel`)}
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: t(`loginCustomer.emailRequired`),
                      })}
                      className="bg-black focus:bg-gray-50/10 text-white block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                      placeholder={t(`loginCustomer.emailPlaceholder`)}
                      autoComplete="username"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm pt-2">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      {t(`loginCustomer.passwordLabel`)}
                    </label>
                    <input
                      type="password"
                      id="password"
                      {...register("password", {
                        required: t(`loginCustomer.passwordRequired`),
                        minLength: {
                          value: 8,
                          message: t(`loginCustomer.passwordMinLength`),
                        },
                      })}
                      className="bg-black focus:bg-gray-50/10 text-white block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                      placeholder="••••••••"
                      autoComplete="current-password"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm pt-2">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-1/3 bg-white/55 text-white py-2 hover:bg-gray-600 duration-500"
                    >
                      {isLoading
                        ? t(`loginCustomer.bttnSigningIn`)
                        : t(`loginCustomer.bttnSignIn`)}
                    </button>
                    <div>
                      <p className="text-sm font-light text-gray-500">
                        {t(`loginCustomer.newMemberText`)}{" "}
                        <Link
                          to="register"
                          className="font-medium text-primary-600 hover:underline hover:text-gray-600"
                        >
                          {t(`loginCustomer.signUpLink`)}
                        </Link>
                      </p>
                      <p className="text-sm font-light text-gray-500">
                        {t(`loginCustomer.forgotPasswordText`)}{" "}
                        <Link
                          to="forget-pass"
                          className="font-medium text-primary-600 hover:underline hover:text-gray-600"
                        >
                          {t(`loginCustomer.resetPassLink`)}
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Cột 3: Slogan về trải nghiệm dịch vụ và phụ kiện */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center text-white space-y-4">
              <TypeAnimation
                sequence={[
                  t(`slogan.customerSatisfaction`),
                  2000,
                  t("slogan.accessoryVariety"),
                  2000,
                  t("slogan.trustworthy"),
                  2000,
                  t("slogan.innovation"),
                  2000,
                  t("slogan.bestDeals"),
                  2000,
                  t("slogan.ecoFriendly"),
                  2000,
                  t("slogan.professionalSupport"),
                  2000,
                ]}
                wrapper="p"
                speed={50}
                repeat={Infinity}
                className="text-3xl font-light text-center text-gray-300"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
