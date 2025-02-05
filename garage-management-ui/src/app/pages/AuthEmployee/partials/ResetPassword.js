import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import resetPasswordImage from "../../../assets/auth/reset-password.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetSchema } from "../schemas/signInSchema"; // Import schema

export default function ResetPasswordWorker() {
  document.title = "RESETPASS WORKER | CLCA | TURBO TRACK";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ResetSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    //   const email = data.email.toLowerCase();
    //   try {
    //     const response = await userService.sendAjax(
    //       "/worker/reset",
    //       "POST",
    //       { email },
    //       false
    //     );
    //     if (response.status === 200) {
    //       userService.showToast(response.status, response.data.msg);
    //       navigate("/worker");
    //     }
    //   } catch (error) {
    //     userService.showToast(error.status, error.message);
    //   }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center">
      <div className="container mx-auto relative z-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
          {/* Left Side with Logo and Image */}
          <div className="lg:w-1/2 flex items-center justify-center bg-gray-50 p-6">
            <div className="text-center">
              <Link to="/" className="text-3xl font-bold text-gray-800">
                TURBO TRACK
              </Link>
              <div className="mt-5">
                <img
                  src={resetPasswordImage}
                  alt="Reset Password"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side with Form */}
          <div className="lg:w-1/2 p-8 bg-[#5E57c3] text-white">
            <div className="text-center mb-6">
              <h5 className="text-2xl font-semibold">Reset Password</h5>
              <p className="text-gray-300">Reset your password with CLCA.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Alert */}
              <div className="text-center bg-yellow-300 text-yellow-900 p-4 rounded-lg">
                Enter your Email and instructions will be sent to you!
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:outline-none"
                  placeholder="name@company.com"
                />
                {errors.email && (
                  <p className="text-red-200 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-transform hover:translate-y-[-2px]"
                >
                  Send Request
                </button>
              </div>
            </form>

            {/* Go to Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-300">
                Remembered it?{" "}
                <Link
                  to="/worker"
                  className="text-white font-medium hover:text-gray-100 underline"
                >
                  Go to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
