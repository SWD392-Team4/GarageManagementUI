import React from "react";
import UserService from "../../hooks/services/UserService";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPassword } from "./services/api";

export default function ResetPassword() {
  document.title = "RESETPASS | CLCA | 2KS1.NET";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userService = new UserService();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // const email = data.email.toLowerCase();
    // try {
    //   const response = await resetPassword(email);
    //   if (response.status === 200) {
    //     userService.showToast(response.status, response.data.msg);
    //     navigate("/authen");
    //   }
    // } catch (error) {
    //   userService.showToast(
    //     error.status,
    //     "User not exists or not activated",
    //     "top-center"
    //   );
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:min-h-[67vh] lg:mt-0 bg-gray-50">
      <a
        href="/"
        className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 text-gray-900"
      >
        <span>2KS1.NET</span>
      </a>
      {/* Card */}
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="w-full p-6 sm:p-8">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Forgot your password?
          </h2>
          <p className="text-base font-normal text-gray-500">
            Don't worry! Just enter your email and we'll send you an email to
            reset your password!
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-5 py-3 text-base font-medium text-center bg-pink-600 text-white rounded-lg hover:bg-pink-900 focus:ring-4 transition-opacity sm:w-auto"
            >
              Reset password
            </button>
          </form>
          <p className="text-sm font-light text-gray-500 mt-3 ">
            Do you have an account yet?{" "}
            <Link
              to="/authen"
              className="font-medium text-primary-600 hover:underline hover:text-blue-800"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
