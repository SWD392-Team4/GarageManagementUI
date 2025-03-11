import React, { useEffect, useState } from "react";
import {
    getPackageConditionTypeById,
    updatePackageConditionType,
    createPackageConditionType
} from "../../services/PackageServiceAPI";
import { FaEdit, FaSave, FaTimes, FaPlus } from "react-icons/fa";

export default function PackageConditionType({ id }) {
    const [conditions, setConditions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editedValue, setEditedValue] = useState({});
    const [missingConditions, setMissingConditions] = useState([]);
    const [newCondition, setNewCondition] = useState(null); // Chứa điều kiện đang được tạo

    useEffect(() => {
        async function fetchConditionType() {
            setLoading(true);
            try {
                const response = await getPackageConditionTypeById(id);
                if (response?.data?.value) {
                    setConditions(response.data.value);

                    // Kiểm tra điều kiện nào chưa có
                    const existingTypes = response.data.value.map((c) => c.conditionType);
                    const requiredTypes = ["Days", "Mileage", "Months"];
                    const missing = requiredTypes.filter(type => !existingTypes.includes(type));

                    setMissingConditions(missing);
                }
            } catch (error) {
                console.error("Lỗi khi tải điều kiện gói dịch vụ:", error);
            }
            setLoading(false);
        }

        if (id) {
            fetchConditionType();
        }
    }, [id]);

    // Bắt đầu chỉnh sửa
    const handleEdit = (condition) => {
        setEditingId(condition.id);
        setEditedValue({ ...condition });
    };

    // Cập nhật giá trị chỉnh sửa
    const handleChange = (event) => {
        setEditedValue({ ...editedValue, conditionValue: event.target.value });
    };

    // Hủy chỉnh sửa
    const handleCancel = () => {
        setEditingId(null);
        setEditedValue({});
    };

    // Lưu cập nhật API
    const handleSave = async () => {
        try {
            await updatePackageConditionType(editedValue.packageId, editedValue.id, {
                conditionType: editedValue.conditionType,
                conditionValue: Number(editedValue.conditionValue),
            });

            setConditions((prev) =>
                prev.map((item) =>
                    item.id === editedValue.id ? { ...item, conditionValue: editedValue.conditionValue } : item
                )
            );

            setEditingId(null);
            setEditedValue({});
        } catch (error) {
            console.error("Lỗi khi cập nhật điều kiện gói dịch vụ:", error);
        }
    };

    // Khi nhấn "Create", hiển thị input để nhập conditionValue
    const handleCreateCondition = (type) => {
        setNewCondition({ conditionType: type, conditionValue: "" });
    };

    // Cập nhật giá trị mới khi nhập
    const handleNewConditionChange = (event) => {
        setNewCondition({ ...newCondition, conditionValue: event.target.value });
    };

    // Gửi API tạo điều kiện mới
    const handleSaveNewCondition = async () => {
        if (!newCondition.conditionValue) {
            alert("Vui lòng nhập giá trị cho điều kiện!");
            return;
        }

        try {
            const response = await createPackageConditionType(id, {
                conditionType: newCondition.conditionType,
                conditionValue: Number(newCondition.conditionValue),
            });

            if (response?.data) {
                setConditions([...conditions, response.data.value]);

                // Cập nhật lại điều kiện còn thiếu
                setMissingConditions(missingConditions.filter(missingType => missingType !== newCondition.conditionType));
            }

            setNewCondition(null); // Reset trạng thái
        } catch (error) {
            console.error("Lỗi khi tạo điều kiện gói dịch vụ:", error);
        }
    };

    // Hủy tạo điều kiện mới
    const handleCancelNewCondition = () => {
        setNewCondition(null);
    };

    if (loading) {
        return <p className="text-gray-500 text-center">Đang tải dữ liệu...</p>;
    }

    return (
        <div className="border p-4 rounded-lg bg-white shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Package Condition Type</h2>

            {/* Hiển thị nút tạo nếu còn thiếu điều kiện */}
            {missingConditions.length > 0 && (
                <div className="mb-4">
                    <p className="text-gray-600">Các điều kiện còn thiếu:</p>
                    <div className="flex gap-2">
                        {missingConditions.map((type) => (
                            <button
                                type="button"
                                key={type}
                                onClick={() => handleCreateCondition(type)}
                                className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-blue-600 transition"
                            >
                                <FaPlus /> {type}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Hiển thị ô nhập liệu khi tạo điều kiện mới */}
            {newCondition && (
                <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg mb-4">
                    <p className="text-gray-700 font-medium">{newCondition.conditionType}:</p>
                    <input
                        type="number"
                        value={newCondition.conditionValue}
                        onChange={handleNewConditionChange}
                        className="border rounded px-2 py-1 w-20"
                    />
                    <button
                        type="button"
                        onClick={handleSaveNewCondition}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                        <FaSave />
                    </button>
                    <button
                        type="button"
                        onClick={handleCancelNewCondition}
                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                    >
                        <FaTimes />
                    </button>
                </div>
            )}

            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 border border-gray-300 text-left">Condition Type</th>
                        <th className="p-3 border border-gray-300 text-left">Condition Value</th>
                        <th className="p-3 border border-gray-300 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {conditions.map((condition) => (
                        <tr key={condition.id} className="border border-gray-300">
                            <td className="p-3 border border-gray-300">{condition.conditionType}</td>
                            <td className="p-3 border border-gray-300">
                                {editingId === condition.id ? (
                                    <input
                                        type="number"
                                        value={editedValue.conditionValue}
                                        onChange={handleChange}
                                        className="border rounded px-2 py-1 w-20"
                                    />
                                ) : (
                                    condition.conditionValue
                                )}
                            </td>
                            <td className="p-3 border border-gray-300 text-center">
                                {editingId === condition.id ? (
                                    <button type="button" onClick={handleSave} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                                        <FaSave />
                                    </button>
                                ) : (
                                    <button type="button" onClick={() => handleEdit(condition)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                                        <FaEdit />
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
