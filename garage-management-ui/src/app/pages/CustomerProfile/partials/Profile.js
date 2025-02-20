import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import UserService from "../../../hooks/services/UserService";
import { sAccount } from "../../../pages/AuthCustomer/services/store";
import { getUpdateUserSchema } from "../schemas/validationSchema";
import ImageProfile from "./ImageProfile";

export default function Profile() {
  const user = sAccount.use();
  const { t } = useTranslation("customer_profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Schema validation từ Yup
  const validationSchema = getUpdateUserSchema(t);
  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const userService = new UserService();

  // Xử lý Submit Form
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await userService.sendAjax(
        "/api/users",
        "PUT",
        data,
        true
      );
      if (response.status === 204) {
        userService.showToast(response.status, t("personal_info.success"));
        setIsEditing(false);

        sAccount.set((v) => {
          v.value.FirstName = data.firstName;
          v.value.LastName = data.lastName;
        });
      } else {
        userService.showToast(
          response.status,
          response.message || t("personal_info.error")
        );
      }
    } catch (error) {
      userService.showToast(error.status, error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white text-black shadow-lg rounded-md p-6 border border-gray-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            reset();
            setValue("firstName", sAccount.value.FirstName);
            setValue("lastName", sAccount.value.LastName);
          }}
          className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md flex items-center gap-2"
        >
          {isEditing ? (
            <>
              <FaTimes /> {t("cancel_button")}
            </>
          ) : (
            <>
              <FaEdit /> {t("edit_button")}
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <ImageProfile />

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Khi ở chế độ chỉnh sửa */}
          {isEditing ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 col-span-2"
            >
              {/* First Name */}
              <div>
                <label className="block font-medium text-gray-700 mb-1 w-full">
                  {t("personal_info.first_name")}
                </label>
                <input
                  {...register("firstName")}
                  className="border border-gray-400 bg-gray-100 p-2 rounded w-full"
                  placeholder={t("personal_info.first_name")}
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName.message}</p>
                )}
              </div>

              {/* Email (không thay đổi) */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  {t("personal_info.email")}
                </label>
                <p className="  p-2 rounded w-full">{user.Email}</p>
              </div>
              {/* Last Name */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  {t("personal_info.last_name")}
                </label>
                <input
                  {...register("lastName")}
                  className="border border-gray-400 bg-gray-100 p-2 rounded w-full"
                  placeholder={t("personal_info.last_name")}
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName.message}</p>
                )}
              </div>
              {/* Phone Number (không thay đổi) */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  {t("personal_info.phone")}
                </label>
                <p className="   p-2 rounded w-full">{user.PhoneNumber}</p>
              </div>

              {/* Nút Lưu */}
              <div className="w-1/3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 flex justify-center items-center text-white py-2 px-4 rounded-md w-full"
                >
                  <FaSave className="mr-2" />
                  {isLoading ? t("loading") : t("update_button")}
                </button>
              </div>
            </form>
          ) : (
            // Khi không chỉnh sửa - hiển thị thông tin dạng văn bản
            <>
              <div>
                <p>
                  <strong>{t("personal_info.first_name")}:</strong>{" "}
                  {user.FirstName}
                </p>
              </div>

              <div>
                <p>
                  <strong>{t("personal_info.email")}:</strong> {user.Email}
                </p>
              </div>
              <div>
                <p>
                  <strong>{t("personal_info.last_name")}:</strong>{" "}
                  {user.LastName}
                </p>
              </div>
              <div>
                <p>
                  <strong>{t("personal_info.phone")}:</strong>{" "}
                  {user.PhoneNumber}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
