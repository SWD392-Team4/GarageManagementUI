import React from "react";
import { useTranslation } from "react-i18next";

export default function AdminProfile() {
  const { t } = useTranslation();

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-auto">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-6 text-center md:text-left">
        <img
          src="https://via.placeholder.com/150"
          alt="Admin Avatar"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <div className="mt-4 md:mt-0">
          <h2 className="text-2xl font-bold text-gray-800">{t("admin_profile.name")}</h2>
          <p className="text-gray-600">{t("admin_profile.role")}</p>
          <p className="text-gray-500">{t("admin_profile.email")}</p>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700">{t("admin_profile.stats.total_users")}</h3>
          <p className="text-3xl font-bold text-blue-500">1,250</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700">{t("admin_profile.stats.orders_processed")}</h3>
          <p className="text-3xl font-bold text-green-500">3,540</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700">{t("admin_profile.stats.revenue")}</h3>
          <p className="text-3xl font-bold text-red-500">$42,750</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{t("admin_profile.profile_details.title")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-semibold">{t("admin_profile.profile_details.full_name")}:</p>
            <p className="text-gray-800">{t("admin_profile.name")}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">{t("admin_profile.profile_details.email")}:</p>
            <p className="text-gray-800">{t("admin_profile.email")}</p>
          </div>
        </div>
      </div>

      {/* Biography */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{t("admin_profile.biography.title")}</h3>
        <p className="text-gray-700 break-words">{t("admin_profile.biography.content")}</p>
      </div>
    </div>
  );
}
