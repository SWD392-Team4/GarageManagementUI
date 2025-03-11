import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEdit, FaSave, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function FeedbackServiceModal({ isOpen, onClose, service }) {
    const { t } = useTranslation("manage_service");
    const [feedbackStatus, setFeedbackStatus] = useState({});
    const [editingStatus, setEditingStatus] = useState({});

    if (!isOpen) return null;

    const handleStatusChange = (id, newValue) => {
        setFeedbackStatus((prevStatus) => ({
            ...prevStatus,
            [id]: newValue,
        }));
    };

    const startEditing = (id) => {
        setEditingStatus((prev) => ({ ...prev, [id]: true }));
    };

    const saveStatus = (id) => {
        setEditingStatus((prev) => ({ ...prev, [id]: false }));
        // TODO: Call API to update status in backend
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2">{t("manage_service.service_feedback")}</h2>
                {service && service.length > 0 ? (
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                        {service.map((feedback) => (
                            <div key={feedback.id} className="p-4 border rounded-md bg-gray-50 shadow-sm flex flex-col">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-semibold text-sm">#{feedback.id}</p>
                                    <p className="text-sm text-gray-600">{t("manage_service.created_at")}: {feedback.createdAt}</p>
                                </div>
                                <div className="text-sm text-gray-800">
                                    <strong>{t("manage_service.feedback")}:</strong>
                                    <p className="bg-white border p-2 rounded-md max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
                                        {feedback.feedBack}
                                    </p>
                                </div>
                                <div className="mt-2 text-xs text-gray-500 flex justify-between">
                                    <p>{t("manage_service.customer_id")}: {feedback.customerId}</p>
                                    <p>{t("manage_service.service_id")}: {feedback.serviceId}</p>
                                </div>
                                <div className="mt-4 flex justify-between items-center">
                                    <p className="text-sm"><strong>{t("manage_service.emoji")}:</strong> {feedback.emoji}</p>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            {feedbackStatus[feedback.id] === "Active" || feedback.status === "Active" ? (
                                                <FaCheckCircle className="text-green-500" title="Active" />
                                            ) : (
                                                <FaTimesCircle className="text-red-500" title="Inactive" />
                                            )}
                                            <span className="text-sm font-semibold">{feedbackStatus[feedback.id] || feedback.status}</span>
                                        </div>
                                        {editingStatus[feedback.id] ? (
                                            <>
                                                <select
                                                    value={feedbackStatus[feedback.id] || feedback.status}
                                                    onChange={(e) => handleStatusChange(feedback.id, e.target.value)}
                                                    className="px-3 py-1 border rounded bg-white"
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                                <button
                                                    className="px-3 py-1 bg-green-500 text-white rounded flex items-center"
                                                    onClick={() => saveStatus(feedback.id)}
                                                >
                                                    <FaSave className="mr-1" /> {t("manage_service.common.save")}
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className="px-3 py-1 bg-gray-500 text-white rounded flex items-center"
                                                onClick={() => startEditing(feedback.id)}
                                            >
                                                <FaEdit className="mr-1" /> {t("manage_service.edit_status")}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-4">{t("manage_service.no_feedback")}</p>
                )}

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        {t("manage_service.common.close")}
                    </button>
                </div>
            </div>
        </div>
    );
}
