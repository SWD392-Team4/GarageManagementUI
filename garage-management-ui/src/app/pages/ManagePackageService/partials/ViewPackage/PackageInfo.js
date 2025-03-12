import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MDEditor from "@uiw/react-md-editor";
import {
    getAllCarCategory,
    getAllServiceCategory,
    getPackageStatus,
    getPackageType,
    getPakageTimeUnit,
} from "../../services/PackageServiceAPI";

export default function PackageInfo({ register, setValue, watch, packageData, isEditing }) {
    const { t, i8ln } = useTranslation("manage_package");
    const [packageTypes, setPackageTypes] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [timeUnits, setTimeUnits] = useState([]);
    const [serviceCategories, setServiceCategories] = useState([]);
    const [carCategories, setCarCategories] = useState([]);

    // Lấy giá trị description từ form
    const description = watch("description", packageData?.description || "");

    useEffect(() => {
        async function fetchData() {
            try {
                const [
                    types,
                    statusRes,
                    timeUnitsRes,
                    serviceCategoriesRes,
                    carCategoriesRes,
                ] = await Promise.all([
                    getPackageType(),
                    getPackageStatus(),
                    getPakageTimeUnit(),
                    getAllServiceCategory(),
                    getAllCarCategory(),
                ]);

                setPackageTypes(types || []);
                setStatuses(statusRes?.data?.value || []);
                setTimeUnits(timeUnitsRes?.data?.value || []);
                setServiceCategories(serviceCategoriesRes?.data?.value || []);
                setCarCategories(carCategoriesRes?.data?.value || []);
            } catch (error) {
                console.error("Error loading select options:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="mt-6 border p-6 rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-4">{t("manage_package.info.title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    {
                        label: t("manage_package.info.fields.package_name"),
                        name: "packageName",
                        type: "text",
                    },
                    {
                        label: t("manage_package.info.fields.service_category"),
                        name: "serviceCategory",
                        type: "select",
                        options: serviceCategories.map((item, index) => ({
                            key: `serviceCategory-${index}`,
                            value: item.serviceCategory,
                            label: item.serviceCategory,
                        })),
                    },
                    {
                        label: t("manage_package.info.fields.category"),
                        name: "category",
                        type: "select",
                        options: carCategories.map((item, index) => ({
                            key: `carCategory-${index}`,
                            value: item.category,
                            label: item.category,
                        })),
                    },
                    {
                        label: t("manage_package.info.fields.type"),
                        name: "type",
                        type: "select",
                        options: packageTypes.map((item, index) => ({
                            key: `packageType-${index}`,
                            value: item,
                            label: item,
                        })),
                    },
                    {
                        label: t("manage_package.info.fields.package_price"),
                        name: "packagePrice",
                        type: "text",
                    },
                    {
                        label: t("manage_package.info.fields.validity_period"),
                        name: "validityPeriod",
                        type: "text",
                    },
                    {
                        label: t("manage_package.info.fields.time_unit"),
                        name: "timeUnit",
                        type: "select",
                        options: timeUnits.map((item, index) => ({
                            key: `timeUnit-${index}`,
                            value: item,
                            label: item,
                        })),
                    },
                    {
                        label: t("manage_package.info.fields.usage_limit"),
                        name: "usageLimit",
                        type: "text",
                    },
                    {
                        label: t("manage_package.info.fields.status"),
                        name: "status",
                        type: "select",
                        options: [
                            { key: "status-0", value: "Inactive", label: t("manage_package.info.status_options.inactive") },
                            { key: "status-1", value: "Active", label: t("manage_package.info.status_options.active") },
                        ],
                    },
                ].map((item, index) => (
                    <div key={`field-${index}`} className="flex flex-col">
                        <label className="text-gray-700 font-semibold mb-1">
                            {item.label}:
                        </label>
                        {isEditing ? (
                            item.type === "select" ? (
                                <select
                                    {...register(item.name)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                                    defaultValue={packageData[item.name]}
                                >
                                    {item.options.map((option) => (
                                        <option key={option.key} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    {...register(item.name)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                                    defaultValue={packageData[item.name]}
                                />
                            )
                        ) : (
                            <p className="text-gray-800 bg-gray-100 p-2 rounded-md">
                                {packageData[item.name]}
                            </p>
                        )}
                    </div>
                ))}


                {/* Trường Description với MDEditor */}
                <div className="col-span-1 md:col-span-2 flex flex-col" data-color-mode="light">
                    <label className="text-gray-700 font-semibold mb-1">
                        {t("manage_package.info.fields.description")}:
                    </label>
                    {isEditing ? (
                        <MDEditor
                            value={description}
                            onChange={(value) => setValue("description", value || "", { shouldValidate: true })}
                            className="border p-3 w-full"
                        />
                    ) : (
                        <div className="text-gray-800 bg-gray-100 p-2">
                            <MDEditor.Markdown source={packageData.description || ""} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
