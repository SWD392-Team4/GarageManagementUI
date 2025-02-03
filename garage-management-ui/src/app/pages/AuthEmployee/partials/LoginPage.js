import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import signInImage from "../../../assets/auth/sign-in.png";
import { signInSchema } from "../schemas/signInSchema"; // Import schema
import UserService from "../../../hooks/services/UserService";

export default function SignIn() {
  document.title = "Sign In | TURBO TRACK";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Chuyển từ useRef sang useState
  const userService = new UserService();
  // Sử dụng useForm với schema validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  // Hàm xử lý đăng nhập
  const onSubmit = async (data) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      // Giả lập request API (thay thế bằng API thực tế)
      console.log("Submitting:", data);
      const result = await userService.login(
        data.userName,
        data.password,
        "/api/auth/login"
      );

      setIsLoading(false);
      if (result.success) {
        navigate(userService.navigateBasedOnRole());
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      setIsLoading(false);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
        </div>
      )}
      <div className="container mx-auto relative z-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
          {/* Left Side */}
          <div className="lg:w-1/2 flex items-center justify-center bg-gray-50 p-6">
            <div className="text-center">
              <Link to="/" className="text-3xl font-bold text-gray-800">
                TURBO TRACK
              </Link>
              <div className="mt-5">
                <img
                  src={signInImage}
                  alt="Sign In"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className="lg:w-1/2 p-8 bg-[#5E57c3] text-white">
            <div className="text-center mb-6">
              <h5 className="text-2xl font-semibold">Welcome Back!</h5>
              <p className="text-gray-300">
                Sign in to continue to TURBO TRACK.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email/user name
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("userName")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none text-black"
                  placeholder="name@company.com"
                  autoComplete="username"
                />
                {errors.userName && (
                  <p className="text-red-200 text-sm">
                    {errors.userName.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none text-black"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p className="text-red-200 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex items-center justify-between">
                <Link
                  to="reset"
                  className="text-sm text-gray-300 hover:underline hover:text-gray-100"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Sign In Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-transform hover:translate-y-[-2px]"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
