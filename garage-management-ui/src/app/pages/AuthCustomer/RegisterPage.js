import React from "react";
import UserService from "../../hooks/services/UserService";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "./services/api";

export default function RegisterPage() {
  document.title = "REGISTER | CLCA | 2KS1.NET";

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const userService = new UserService();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // const email = data.email.toLowerCase(); // Chuyển email thành chữ thường
    // const password = data.password;
    // try {
    //   const response = await registerUser(email, password);
    //   if (response.status === 200) {
    //     // Thông báo khi đăng ký thành công
    //     userService.showToast(response.status, response.data.msg);
    //     navigate("/authen");
    //   }
    // } catch (error) {
    //   if (error.status === 400) {
    //     userService.showToast(error.status, "Email used already.");
    //   }
    // }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-[67vh] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-pink-600 md:text-2xl text-left">
              Say Hi!
            </h1>
            <h1 className="text-gray-500 text-xl">
              We’d like to talk with you.
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email<span className="text-red-800">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email", { required: "Email is required" })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password<span className="text-red-800">* </span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm password<span className="text-red-800">* </span>
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match", // Kiểm tra khớp với trường password
                  })}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <button
                type="submit" // Đảm bảo rằng form sẽ được gửi khi nhấn nút
                className="w-full text-white bg-pink-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/authen"
                  className="font-medium text-primary-600 hover:underline hover:text-blue-800"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
