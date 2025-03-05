import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import ImageProfile from "../../CustomerProfile/partials/ImageProfile";
import UserService from "../../../hooks/services/UserService";
import { sAccount } from "../../../pages/AuthCustomer/services/store";
import { FaUserEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { getUpdateUserSchema } from "../schemas/getUpdateUserSchema";

// Hàm helper format lại ngày để hiển thị dạng dd/MM/yyyy
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function PersonalInformation() {
  const { t } = useTranslation("employee_profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = getUpdateUserSchema(t);
  // Khởi tạo state profile với giá trị lấy từ store
  const [profile, setProfile] = useState({
    firstName: sAccount.value.firstName,
    lastName: sAccount.value.lastName,
    dateOfBirth: sAccount.value.dateOfBirth,
    citizenId: sAccount.value.citizenIdentification,
    gender: sAccount.value.gender, // giá trị boolean
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const userService = new UserService();

  // Xử lý submit: gọi API, cập nhật store và state
  const onSubmit = async (data) => {
    setIsLoading(true);
    // Chuyển đổi giá trị gender từ chuỗi sang boolean
    data.gender = data.gender === "true";
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
        // Cập nhật dữ liệu vào store
        sAccount.set((v) => {
          v.value.firstName = data.firstName;
          v.value.lastName = data.lastName;
          v.value.dateOfBirth = data.dateOfBirth;
          v.value.citizenId = data.citizenId;
          v.value.gender = data.gender;
        });
        // Cập nhật state nội bộ
        setProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          citizenId: data.citizenId,
          gender: data.gender,
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

  // Khi chuyển sang chế độ chỉnh sửa, reset form với giá trị hiện tại (chuyển gender sang chuỗi)
  const handleEditToggle = () => {
    if (!isEditing) {
      reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        dateOfBirth: profile.dateOfBirth,
        citizenId: profile.citizenId,
        gender: profile.gender,
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-gray-100 shadow-md rounded-md p-6 flex flex-col items-center border border-gray-300">
      <div className="w-full">
        <div className="flex items-center justify-between">
          {/* Thông tin người dùng bên trái */}
          <div className="flex items-center space-x-4 pb-4">
            <ImageProfile />
            <div>
              {/* Tên người dùng */}
              <h2 className="text-lg font-shadows font-bold text-gray-900">
                {sAccount.value.firstName} {sAccount.value.lastName}
              </h2>
              {/* Email hoặc vai trò */}
              <p className="text-sm font-title text-gray-800">
                {sAccount.value.email || "alexarowles@gmail.com"}
              </p>
              {/* Role */}
              <p className="text-sm font-title text-gray-800">
                {" "}
                {sAccount.value.role || "alexarowles@gmail.com"}
              </p>
            </div>
          </div>

          {/* Nút Edit / Cancel */}
          <button
            onClick={handleEditToggle}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            {isEditing ? (
              <>
                <MdCancel />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <FaUserEdit />
                <span>Edit</span>
              </>
            )}
          </button>
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="text-sm text-gray-600">
                  {t("personal_info.first_name")}
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  className="w-full p-2 border rounded-md mt-1 bg-gray-100 border-gray-500 focus:outline-none"
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              {/* Last Name */}
              <div>
                <label className="text-sm text-gray-600">
                  {" "}
                  {t("personal_info.last_name")}
                </label>
                <input
                  type="text"
                  {...register("lastName")}
                  className="w-full p-2 border rounded-md mt-1 bg-gray-100 border-gray-500 focus:outline-none"
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              {/* Contact Number - luôn read-only */}
              <div>
                <label className="text-sm text-gray-600">
                  {" "}
                  {t("personal_info.phone")}
                </label>
                <input
                  type="tel"
                  value={sAccount.value.phoneNumber}
                  className=" p-2 outline-none mt-1 rounded-md  border border-gray-200 w-full"
                  readOnly
                />
              </div>
              {/* Citizen ID - hiện read-only từ store */}
              <div>
                <label className="text-sm text-gray-600">
                  {" "}
                  {t("personal_info.email")}
                </label>
                <input
                  type="text"
                  value={sAccount.value.email}
                  className=" p-2 outline-none mt-1 rounded-md  border border-gray-200 w-full"
                  readOnly
                />
              </div>
              {/* Date of Birth */}
              <div className="col-span-2">
                <label className="text-sm text-gray-600">
                  {" "}
                  {t("personal_info.dateBirth")}
                </label>
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  className="w-full p-2 border rounded-md mt-1 bg-gray-100 border-gray-500 focus:outline-none"
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
              {/* Citizen ID Editable */}
              <div>
                <label className="text-sm text-gray-600">
                  {" "}
                  {t("personal_info.Citizen")}
                </label>
                <input
                  type="text"
                  {...register("citizenId")}
                  className="w-full p-2 border rounded-md mt-1 bg-gray-100 border-gray-500 focus:outline-none"
                  placeholder="Citizen ID"
                />
                {errors.citizenId && (
                  <p className="text-red-500 text-sm">
                    {errors.citizenId.message}
                  </p>
                )}
              </div>
              {/* Gender */}
              <div>
                <label className="text-sm text-gray-600">
                  {t("personal_info.Gender")}
                </label>
                <select
                  {...register("gender")}
                  className="w-full p-2 border rounded-md mt-1 bg-gray-100 border-gray-500 focus:outline-none"
                >
                  <option value=""> {t("personal_info.SGender")}</option>
                  <option value="true"> {t("personal_info.Male")}</option>
                  <option value="false"> {t("personal_info.Female")}</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex justify-center items-center"
              >
                <GiConfirmed className="mr-2" />
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <label className="text-sm text-gray-600">
                {t("personal_info.first_name")}
              </label>
              <input
                type="text"
                value={profile.firstName}
                className=" p-2 outline-none mt-1  rounded-md  border border-gray-200 w-full"
                readOnly
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">
                {t("personal_info.last_name")}
              </label>
              <input
                type="text"
                value={profile.lastName}
                className=" p-2 outline-none mt-1  rounded-md  border border-gray-200 w-full"
                readOnly
              />
            </div>
            {/* Contact Number - luôn read-only */}
            <div>
              <label className="text-sm text-gray-600">
                {t("personal_info.phone")}
              </label>
              <input
                type="tel"
                value={sAccount.value.phoneNumber}
                className=" p-2 outline-none mt-1  rounded-md  border border-gray-200 w-full"
                readOnly
              />
            </div>
            {/* Citizen ID - luôn read-only */}
            <div>
              <label className="text-sm text-gray-600">
                {t("personal_info.email")}
              </label>
              <input
                type="text"
                value={sAccount.value.email}
                className=" p-2 outline-none mt-1  rounded-md  border border-gray-200 w-full"
                readOnly
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-600">
                {t("personal_info.dateBirth")}
              </label>
              <input
                type="text"
                value={formatDate(sAccount.value.dateOfBirth)}
                className=" p-2 outline-none mt-1  rounded-md  border border-gray-200 w-full"
                readOnly
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">
                {t("personal_info.Citizen")}
              </label>
              <input
                type="text"
                value={profile.citizenId}
                className=" p-2 outline-none mt-1  rounded-md  border border-gray-200 w-full "
                readOnly
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">
                {t("personal_info.Gender")}
              </label>
              <input
                type="text"
                value={
                  profile.gender
                    ? t("personal_info.Male")
                    : t("personal_info.Female")
                }
                className=" p-2 outline-none mt-1  rounded-md  border border-gray-200 w-full"
                readOnly
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
