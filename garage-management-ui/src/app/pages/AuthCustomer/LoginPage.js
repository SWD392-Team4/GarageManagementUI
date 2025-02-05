import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import UserService from "../../hooks/services/UserService";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/common/PageTitle";
import LoaddingPage from "../../layouts/LoadingPage";

export default function LoginPage() {
  document.title = "LOGIN | CLCA | 2KS1.NET";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userService = new UserService();
  const navigate = useNavigate();
  const isLoading = useRef(false);
  const onSubmit = async (data) => {
    // const email = data.email.toLowerCase(); // Chuyển email thành chữ thường
    // const password = data.password;
    // isLoading.current = true;
    // const result = await userService.login(email, password);
    // isLoading.current = false;
    // if (result.success) {
    //   userService.showToast(200, result.message);
    //   navigate(userService.navigateBasedOnRole());
    // } else {
    //   userService.showToast(400, "Invalid login or password.", "top-center");
    // }
  };

  return (
    <section className="bg-gray-50 ">
      <PageTitle />

      {isLoading.current && <LoaddingPage />}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-[45vh] lg:py-0">
        <div className="w-full bg-gray-200   shadow-md md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  UserName:
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="name@company.com"
                  autoComplete="username"
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
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2 hover:bg-gray-600 duration-300 "
              >
                Sign in
              </button>

              <p className="text-sm font-light text-gray-500">
                New member?{" "}
                <Link
                  to="register"
                  className="font-medium text-primary-600 hover:underline hover:text-blue-800"
                >
                  Sign up
                </Link>
              </p>
              <div className="flex items-center justify-between">
                <Link
                  to="reset"
                  className="font-medium text-primary-600 hover:underline hover:text-blue-800"
                >
                  Forgot password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
