import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiAccessibility, BiRename, BiWrench } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { FaSyncAlt } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import { sServiceHome } from "../services/SignifyServiceHome";
import CarCategoriesSearch from "./CarCategoriesSearch";
import CarPartSearch from "./CarPartSearch";

export default function ServiceSearchOptions() {
  const { t } = useTranslation("Service_Home");
  // Các state cho các trường tìm kiếm
  const [serviceName, setServiceName] = useState(
    sServiceHome.value.serviceName
  );
  const [serviceCategory, setServiceCategory] = useState(
    sServiceHome.value.serviceCategory
  );
  const [workNature, setWorkNature] = useState("");
  const [action, setAction] = useState(sServiceHome.value.action);

  // Sử dụng useMemo để tính toán lại các mảng option chỉ khi hàm t thay đổi
  const serviceCategories = useMemo(
    () => [
      { value: "repair", label: t("service_category_repair") },
      { value: "maintenance", label: t("service_category_maintenance") },
      { value: "upgrade", label: t("service_category_upgrade") },
      { value: "car_wash", label: t("service_category_car_wash") },
      { value: "detailing", label: t("service_category_detailing") },
    ],
    [t]
  );

  const actions = useMemo(
    () => [
      { value: "inspect", label: t("action_inspect") },
      { value: "replace", label: t("action_replace") },
      { value: "lubricate", label: t("action_lubricate") },
      { value: "align", label: t("action_align") },
      { value: "refill", label: t("action_refill") },
      { value: "repair", label: t("action_repair") },
      { value: "clean", label: t("action_clean") },
      { value: "upgrade", label: t("action_upgrade") },
      { value: "restore", label: t("action_restore") },
      { value: "update", label: t("action_update") },
      { value: "polish", label: t("action_polish") },
      { value: "protect", label: t("action_protect") },
      { value: "deodorize", label: t("action_deodorize") },
      { value: "condition", label: t("action_condition") },
      { value: "remove", label: t("action_remove") },
      { value: "restore_lighting", label: t("action_restore_lighting") },
    ],
    [t]
  );

  const workNatures = useMemo(
    () => [
      { value: "preventive", label: t("work_nature_preventive") },
      { value: "corrective", label: t("work_nature_corrective") },
      { value: "enhancement", label: t("work_nature_enhancement") },
      { value: "digital", label: t("work_nature_digital") },
      { value: "aesthetic", label: t("work_nature_aesthetic") },
    ],
    [t]
  );

  // Xử lý tìm kiếm: gọi callback onSearch với các giá trị đã chọn
  const handleSearch = () => {
    sServiceHome.set((v) => (v.value.search = !v.value.search));
  };
  // Xóa các bộ lọc
  const clearFilters = () => {
    setServiceName("");

    setServiceCategory("");
    setWorkNature("");
    setAction("");
    sServiceHome.set((v) => {
      v.value.serviceName = "";
      v.value.category = "";
      v.value.carPartName = "";
      v.value.serviceCategory = "";
      v.value.workNature = "";
      v.value.action = "";
    });
  };

  return (
    <div className="bg-white shadow-md rounded-md p-5 mb-12">
      {/* Header */}
      <div className="flex text-center justify-center border-b pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          {t("search_services")}
        </h2>
      </div>

      {/* Form tìm kiếm theo chiều dọc */}
      <div className="space-y-4">
        {/* Service Name input */}
        <div className="relative">
          <BiRename className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder={t("search_placeholder") || "Search by service name..."}
            value={serviceName}
            onChange={(e) => {
              setServiceName(e.target.value);
              sServiceHome.set((v) => {
                v.value.serviceName = e.target.value;
              });
            }}
          />
        </div>
        <CarPartSearch />
        <CarCategoriesSearch />

        {/* Service Category select */}
        <div className="relative">
          <GrServices className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
          <select
            className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={serviceCategory}
            onChange={(e) => {
              setServiceCategory(e.target.value);
              sServiceHome.set((v) => {
                v.value.serviceCategory = e.target.value;
              });
            }}
          >
            <option value="">{t("all_services") || "All Services"}</option>
            {serviceCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Work Nature select */}
        <div className="relative">
          <BiWrench className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
          <select
            className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={workNature}
            onChange={(e) => {
              setWorkNature(e.target.value);
              sServiceHome.set((v) => {
                v.value.workNature = e.target.value;
              });
            }}
          >
            <option value="">
              {t("all_work_natures") || "All Work Natures"}
            </option>
            {workNatures.map((nature) => (
              <option key={nature.value} value={nature.value}>
                {nature.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action select */}
        <div className="relative">
          <BiAccessibility className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
          <select
            className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={action}
            onChange={(e) => {
              setAction(e.target.value);
              sServiceHome.set((v) => {
                v.value.action = e.target.value;
              });
            }}
          >
            <option value="">{t("all_actions") || "All Actions"}</option>
            {actions.map((act) => (
              <option key={act.value} value={act.value}>
                {act.label}
              </option>
            ))}
          </select>
        </div>

        {/* Nút Search */}
        <div>
          <button
            onClick={clearFilters}
            className="flex items-center text-red-500 font-semibold hover:underline"
          >
            <FaSyncAlt className="my-2 mr-2" />
            {t("clear_filters")}
          </button>
          <button
            className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all focus:outline-none"
            onClick={handleSearch}
          >
            <CiSearch className="mr-2" />
            {t("search")}
          </button>
        </div>
      </div>

      {/* Hiển thị các tiêu chí đã chọn sau khi bấm Search */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          {t("selected_filters") || "Selected Filters"}
        </h3>
        <ul className="space-y-1">
          {serviceName && (
            <li>
              Service Name: <span className="font-medium">{serviceName}</span>
            </li>
          )}
          {sServiceHome.value.carPartName && (
            <li>
              Car Part Name:{" "}
              <span className="font-medium">
                {sServiceHome.value.carPartName}
              </span>
            </li>
          )}
          {serviceCategory && (
            <li>
              Service Category:{" "}
              <span className="font-medium">
                {
                  serviceCategories.find((c) => c.value === serviceCategory)
                    ?.label
                }
              </span>
            </li>
          )}
          {workNature && (
            <li>
              Work Nature:{" "}
              <span className="font-medium">
                {workNatures.find((w) => w.value === workNature)?.label}
              </span>
            </li>
          )}
          {action && (
            <li>
              Action:{" "}
              <span className="font-medium">
                {actions.find((a) => a.value === action)?.label}
              </span>
            </li>
          )}
          {!(
            serviceName ||
            sServiceHome.value.carPartName ||
            serviceCategory ||
            workNature ||
            action
          ) && (
            <li className="text-gray-500">
              {t("no_filters_selected") || "No filters selected."}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
