import React, { useState, useRef, useEffect } from "react";
import { sAccount } from "../../../pages/AuthCustomer/services/store";
import UserService from "../../../hooks/services/UserService";
import { TbXboxX } from "react-icons/tb";
import { GiConfirmed } from "react-icons/gi";
import { fetchAccountProfile } from "../../AuthCustomer/services/authService";
import { useTranslation } from "react-i18next";

export default function ImageProfile() {
  const userService = new UserService();
  const fileInputRef = useRef(null);
  const selectedFileRef = useRef(null);
  const [preview, setPreview] = useState(""); // Hiển thị ảnh preview
  const [isEditing, setIsEditing] = useState(false); // Kiểm soát trạng thái chỉnh sửa ảnh
  const { t } = useTranslation("customer_profile");

  // Xử lý preview ảnh khi chọn file mới
  useEffect(() => {
    if (!selectedFileRef.current) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFileRef.current);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl); // Xóa URL để tránh memory leak
  }, [selectedFileRef.current]);

  // Khi chọn file mới
  const onFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 5000000) {
      userService.showToast(400, "File size exceeds the limit of 5MB.");
      return;
    }

    if (file && !file.type.startsWith("image/")) {
      userService.showToast(400, "Only image files are allowed.");
      return;
    }

    selectedFileRef.current = file; // Lưu file
    setIsEditing(true); // Kích hoạt chế độ chỉnh sửa
  };

  // Upload ảnh lên server
  const onSubmit = async () => {
    if (!selectedFileRef.current) return;

    const formData = new FormData();
    formData.append("fileDto", selectedFileRef.current);
    try {
      const userId = sAccount.value.id;
      const response = await userService.sendAjax(
        `/api/users/${userId}/image`,
        "POST",
        formData,
        true,
        true
      );

      if (response.status === 204) {
        userService.showToast(200, t("personal_info.imgSuccess"));
        await fetchAccountProfile(userService);

        setIsEditing(false);
        selectedFileRef.current = null;
      } else {
        userService.showToast(response.status, t("personal_info.imgError"));
      }
    } catch (error) {
      userService.showToast(500, t("personal_info.ErrorServer"));
    }
  };

  // Hủy thay đổi
  const handleCancel = () => {
    selectedFileRef.current = null;
    setPreview("");
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src={
          preview ||
          sAccount.value.imageLink ||
          "https://static-00.iconduck.com/assets.00/profile-major-icon-512x512-xosjbbdq.png"
        }
        alt="Avatar"
        className="w-24 h-24 rounded-full object-cover hover:scale-105 duration-200 cursor-pointer"
        onClick={() => fileInputRef.current.click()} // Click để chọn file mới
        onError={(e) =>
          (e.target.src =
            "https://static-00.iconduck.com/assets.00/profile-major-icon-512x512-xosjbbdq.png")
        }
      />

      {/* Input ẩn để chọn file */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={onFileChange}
      />

      {/* Nếu đang chỉnh sửa, hiển thị nút xác nhận hoặc hủy */}
      {isEditing && (
        <div className="flex gap-3 mt-2">
          <button
            onClick={handleCancel}
            className="bg-red-100 text-red-600 p-2 rounded-full"
          >
            <TbXboxX size={20} />
          </button>
          <button
            onClick={onSubmit}
            className="bg-green-100 text-green-600 p-2 rounded-full"
          >
            <GiConfirmed size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
