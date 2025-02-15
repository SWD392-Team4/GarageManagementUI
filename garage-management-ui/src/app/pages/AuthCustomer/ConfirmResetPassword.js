import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import signInImage from "../../assets/auth/sign-in.png";
import PageTitle from "../../components/common/PageTitle";
import Footer from "../Home/partials/Footer/Footer";
import Header from "../../layouts/Header/Header";
import UserService from "../../hooks/services/UserService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getResetSchema } from "./schemas/validationSchema";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
export default function ConfirmResetPassword() {
  const { t } = useTranslation("resetpass");
  const validationSchema = getResetSchema(t);
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements = [
    { text: t("passwordRequirements.re1"), regex: /.{10,}/ },
    { text: t("passwordRequirements.re2"), regex: /[A-Z]/ },
    { text: t("passwordRequirements.re3"), regex: /[a-z]/ },
    { text: t("passwordRequirements.re4"), regex: /[!@#$%^&*(),.?":{}|<>]/ },
    { text: t("passwordRequirements.re5"), regex: /[0-9]/ },
  ];
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userService = new UserService();
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");
  // Lấy email & token từ URL
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [status, setStatus] = useState("current"); // "loading", "current", "error","current"

  useEffect(() => {
    if (!email || !token) {
      setStatus("error");
      return;
    }
  }, [email, token, userService]);
  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    console.log("Errors:", errors);
    handleReConfirm(data);
  };
  // Gửi lại email xác nhận
  const handleReConfirm = async (data) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await userService.sendAjax(
        "/api/auth/reset-password",
        "POST",
        {
          email,
          password: data.password,
          confirmpassword: data.confirmPassword,
          token,
        },
        false
      );

      if (response.status === 200) {
        userService.showToast(200, "Đổi mật khẩu thành công", null, 5000);
        setTimeout(() => navigate("/"), 5000);
      } else {
        userService.showToast(
          400,
          "Đổi mật khẩu thất bại, vui lòng thử lại sau.",
          null,
          4000
        );
      }
    } catch (error) {
      userService.showToast(400, t("resendFailed"), null, 4000);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "current") {
    return (
      <>
        <Header />

        <section className="bg-black">
          <PageTitle
            title="Reset password"
            title1="Home"
            subtitle="Changes password"
          />
          <div className="grid grid-cols-3 gap-4 items-center justify-center px-6 py-8 mx-auto h-auto lg:pb-4 border-t border-white">
            <div className="md:col-span-2 flex flex-col text-white items-center justify-center text-center">
              <h5 className="text-2xl w-full font-semibold mb-6">
                🛠️ Changes password
              </h5>
              <div className="w-full shadow-md md:mt-0 sm:max-w-md xl:p-0 text-left">
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
                        Email Changes Password
                      </label>
                      <input
                        className="bg-black focus:bg-gray-50/10  text-white  block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                        defaultValue={email}
                        autoComplete="username"
                        readOnly
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        {...register("password")}
                        className="bg-black focus:bg-gray-50/10  text-white  block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                        placeholder="New-password"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm pt-2">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    {/* Confirm Password */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Confirm Password
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

                    <div className="flex justify-between">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-1/3 bg-white/55 text-white py-2 hover:bg-gray-600 duration-500 "
                      >
                        {isLoading ? "Loadding . . ." : "Changes password"}
                      </button>
                      <div>
                        <p className="text-sm font-light text-gray-500">
                          Already a member?
                          <Link
                            to="/authen"
                            className="font-medium text-primary-600 hover:underline hover:text-gray-600"
                          >
                            Sign In
                          </Link>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center text-center">
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
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <section className="bg-black">
        <PageTitle
          title="Reset password"
          title1="Home"
          subtitle="Changes password"
        />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-auto lg:pb-4 border-t border-white">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
            <div className="lg:w-1/4 flex items-center justify-center">
              <div className="text-center">
                <img
                  src={signInImage}
                  alt="Sign In"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="md:w-1/3 flex flex-col text-white items-center justify-center text-center">
              <div className="w-full text-center">
                {status === "loading" && (
                  <>
                    <h5 className="text-2xl font-semibold mb-6">
                      {t("loadingTitle")}
                    </h5>
                    <p className="text-gray-300">{t("loadingMessage")}</p>
                  </>
                )}

                {status === "success" && (
                  <>
                    <h5 className="text-2xl font-semibold mb-6">
                      {t("successTitle")}
                    </h5>
                    <p className="text-gray-300 mb-8">{t("successMessage")}</p>
                    <div>
                      <Link to="/authen">
                        <button className="w-1/3 bg-white/55 text-white py-2 hover:bg-gray-600 duration-500">
                          {t("signInButton")}
                        </button>
                      </Link>
                    </div>
                  </>
                )}

                {status === "error" && (
                  <>
                    <h5 className="text-2xl font-semibold mb-6 text-red-500">
                      {t("errorTitle")}
                    </h5>
                    <p className="text-gray-300 mb-4">{t("errorMessage")}</p>
                    <p className="text-gray-300 mb-8">{t("errorHint")}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
