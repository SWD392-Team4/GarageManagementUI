import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserService from "../../hooks/services/UserService";
import PageTitle from "../../components/common/PageTitle";

export default function RegisterPage() {
  const { t } = useTranslation();
  document.title = t(`loginCustomer.pageTitle`);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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
      const response = await fetch("https://api.example.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: data.userName,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email.toLowerCase(),
          phoneNumber: data.phoneNumber,
          role: "Administrator",
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      const result = await response.json();
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
      userService.showToast(500, "Lỗi hệ thống, vui lòng thử lại");
    }
    setIsLoading(false);
  };

  const passwordRequirements = [
    { text: "Ít nhất 10 kí tự", regex: /.{10,}/ },
    { text: "Có ít nhất 1 chữ hoa", regex: /[A-Z]/ },
    { text: "Có ít nhất 1 chữ thường", regex: /[a-z]/ },
    { text: "Có ít nhất 1 kí tự đặc biệt", regex: /[!@#$%^&*(),.?":{}|<>]/ },
  ];

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <section className="bg-black">
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
                  Tên đăng nhập
                </label>
                <input
                  {...register("userName", {
                    required: "Vui lòng nhập tên đăng nhập",
                  })}
                  className="bg-black focus:bg-gray-50/10  text-white  block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                  placeholder="Tên đăng nhập"
                />
                {errors.userName && (
                  <p className="text-red-500 text-sm">
                    {errors.userName.message}
                  </p>
                )}
              </div>

              <div className="flex space-x-4">
                {/* First Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Họ
                  </label>
                  <input
                    {...register("firstName", { required: "Vui lòng nhập họ" })}
                    className="bg-black focus:bg-gray-50/10  text-white  block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                    placeholder="Họ"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Tên
                  </label>
                  <input
                    {...register("lastName", { required: "Vui lòng nhập tên" })}
                    className="bg-black focus:bg-gray-50/10  text-white  block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                    placeholder="Tên"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
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
                  {...register("email", { required: "Vui lòng nhập email" })}
                  className="bg-black focus:bg-gray-50/10  text-white  block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Số điện thoại
                </label>
                <input
                  {...register("phoneNumber", {
                    required: "Vui lòng nhập số điện thoại",
                  })}
                  className="bg-black focus:bg-gray-50/10  text-white  block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                  placeholder="Số điện thoại"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Vui lòng nhập mật khẩu",
                  })}
                  className="bg-black focus:bg-gray-50/10  text-white  block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Vui lòng nhập lại mật khẩu",
                  })}
                  className="bg-black focus:bg-gray-50/10  text-white  block w-full p-2.5 outline-none ring-2 ring-white/55 border-transparent focus:ring-0"
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-1/3 bg-white/55 text-white py-2 hover:bg-gray-600 duration-500 "
                >
                  {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                </button>
              </div>
            </form>

            {/* Password Requirements */}
            <div className="md:w-1/2 text-center md:text-left">
              <ul>
                {passwordRequirements.map((req, index) => (
                  <li
                    key={index}
                    className={
                      password.match(req.regex)
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {password.match(req.regex) ? "✔" : "❌"} {req.text}
                  </li>
                ))}
                <li
                  className={
                    password === confirmPassword
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {password === confirmPassword ? "✔" : "❌"} 2 mật khẩu đã
                  match
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
