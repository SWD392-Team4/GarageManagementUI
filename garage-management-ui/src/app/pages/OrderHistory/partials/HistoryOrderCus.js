import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaClock, FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';

const orders = [
    { id: "#12345", status: "pending", date: "2025-02-06", amount: "$250.00", icon: <FaClock className="text-yellow-500" /> },
    { id: "#12346", status: "completed", date: "2025-02-05", amount: "$180.00", icon: <FaCheckCircle className="text-green-500" /> },
    { id: "#12347", status: "cancelled", date: "2025-02-04", amount: "$90.00", icon: <FaTimesCircle className="text-red-500" /> },
    { id: "#12348", status: "completed", date: "2025-02-03", amount: "$120.00", icon: <FaCheckCircle className="text-green-500" /> },
    { id: "#12349", status: "pending", date: "2025-02-02", amount: "$300.00", icon: <FaClock className="text-yellow-500" /> },
];

export default function HistoryOrderCus() {
    const { t } = useTranslation("order_history_customer");

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{t("title")}</h2>
            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="p-4 flex items-center justify-between border border-gray-300 rounded-lg shadow-sm bg-gray-50">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-100 rounded-full text-xl">{order.icon}</div>
                            <div>
                                <p className="text-gray-800 font-medium">{order.id}</p>
                                <p className="text-sm text-gray-500">{order.date}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "completed" ? "bg-green-200 text-green-800" : order.status === "pending" ? "bg-yellow-200 text-yellow-800" : "bg-red-200 text-red-800"}`}>
                                {t(`status.${order.status}`)}
                            </span>
                            <p className="text-gray-700 font-semibold">{order.amount}</p>
                            <button className="p-2 text-gray-500 hover:text-gray-700">
                                <FaEye size={20} /> {t("order.view")}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
