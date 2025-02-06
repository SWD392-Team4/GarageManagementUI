import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../components/common/PageTitle";
import UserService from "../../hooks/services/UserService";
import LoaddingPage from "../../layouts/LoadingPage";

export default function LoginPage() {
  const { t } = useTranslation();
  document.title = t(`loginCustomer.pageTitle`);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userService = new UserService();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    if (isLoading) return;
    setIsLoading(true);
    const userName = data.email.toLowerCase();
    const password = data.password;
    try {
      const result = await userService.login(
        userName,
        password,
        "/api/auth/login"
      );

      setIsLoading(false);
      if (result.success) {
        navigate(userService.navigateBasedOnRole());
      } else {
        userService.showToast(400, "Invalid email or password");
      }
    } catch (error) {
      setIsLoading(false);
      userService.showToast(404, "onSubmit Error");
    }
  };
  return (
    <>
      {isLoading.current && <LoaddingPage />}
      <section className="bg-black ">
        <PageTitle title="Sign In" title1="Home" subtitle="Sign In" />

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-[45vh] lg:py-0 border-t border-white">
          <div className="w-full   shadow-md md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
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
                    className="bg-black focus:bg-gray-50/10  text-white  block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
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
                    className="bg-black focus:bg-gray-50/10  text-white  block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
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
                    className="w-1/3 bg-white/55 text-white py-2 hover:bg-gray-600 duration-500 "
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
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
                        to="register"
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
      </section>
    </>
  );
}
