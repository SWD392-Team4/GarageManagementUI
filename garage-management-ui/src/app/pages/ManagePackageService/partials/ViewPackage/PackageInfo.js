import React, { useEffect, useState } from "react";
import {
    getPackageType,
    getPackageStatus,
    getPakageTimeUnit,
    getAllServiceCategory,
    getAllCarCategory,
} from "../../services/PackageServiceAPI";

export default function PackageInfo({ register, packageData, isEditing }) {
    const [packageTypes, setPackageTypes] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [timeUnits, setTimeUnits] = useState([]);
    const [serviceCategories, setServiceCategories] = useState([]);
    const [carCategories, setCarCategories] = useState([]);

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
        <div className="border p-6 rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-4">Thông tin gói dịch vụ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    {
                        label: "Tên gói",
                        name: "packageName",
                        type: "text",
                    },
                    {
                        label: "Danh mục dịch vụ",
                        name: "serviceCategory",
                        type: "select",
                        options: serviceCategories.map((item, index) => ({
                            key: `serviceCategory-${index}`,
                            value: item.serviceCategory,
                            label: item.serviceCategory,
                        })),
                    },
                    {
                        label: "Loại xe",
                        name: "category",
                        type: "select",
                        options: carCategories.map((item, index) => ({
                            key: `carCategory-${index}`,
                            value: item.category,
                            label: item.category,
                        })),
                    },
                    {
                        label: "Loại gói",
                        name: "type",
                        type: "select",
                        options: packageTypes.map((item, index) => ({
                            key: `packageType-${index}`,
                            value: item,
                            label: item,
                        })),
                    },
                    {
                        label: "Giá",
                        name: "packagePrice",
                        type: "text",
                    },
                    {
                        label: "Thời hạn",
                        name: "validityPeriod",
                        type: "text",
                    },
                    {
                        label: "Đơn vị thời gian",
                        name: "timeUnit",
                        type: "select",
                        options: timeUnits.map((item, index) => ({
                            key: `timeUnit-${index}`,
                            value: item,
                            label: item,
                        })),
                    },
                    {
                        label: "Giới hạn sử dụng",
                        name: "usageLimit",
                        type: "text",
                    },
                    {
                        label: "Trạng thái",
                        name: "status",
                        type: "select",
                        options: [
                            { key: "status-0", value: "Inactive", label: "Inactive" },
                            { key: "status-1", value: "Active", label: "Active" },
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
            </div>
        </div>
    );
}
