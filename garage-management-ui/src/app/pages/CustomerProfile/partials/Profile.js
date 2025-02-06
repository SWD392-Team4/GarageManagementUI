import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { FaEdit, FaTimes, FaSave } from 'react-icons/fa';

const userData = {
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Nguyễn Thị Anh",
    role: "Khách Hàng VIP",
    email: "nguyenthi.anh@example.com",
    phone: "+84 987 654 321",
    address: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
    transactions: [
        "Mua MacBook Pro 2023 - 35.000.000đ",
        "Mua iPhone 15 Pro Max - 30.000.000đ",
        "Mua AirPods Pro 2 - 5.000.000đ"
    ]
};

export default function Profile() {
    const { t } = useTranslation("customer_profile");
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(userData);

    const handleEdit = () => setIsEditing(!isEditing);

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{t("title")}</h2>
                <button
                    onClick={handleEdit}
                    className="bg-gradient-to-r from-[#435D76] to-[#D4D4D5] hover:from-[#D4D4D5] hover:to-[#435D76] text-white py-2 px-4 rounded-lg flex items-center gap-2"
                >
                    {isEditing ? <><FaTimes /> {t("cancel_button")}</> : <><FaEdit /> {t("edit_button")}</>}
                </button>
            </div>

            <div className="flex flex-col items-center mb-6">
                <img
                    src={user.avatar}
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0 border-4 border-gray-400"
                    alt="Profile"
                />
                <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-gray-600">{t("profile.role")}</p>
            </div>
            <hr className="my-6 border-t border-gray-400" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{t("personal_info.title")}</h3>
                    {isEditing ? (
                        <div className="flex flex-col gap-2">
                            <input className="border p-2 rounded" type="email" defaultValue={user.email} />
                            <input className="border p-2 rounded" type="tel" defaultValue={user.phone} />
                            <input className="border p-2 rounded" type="text" defaultValue={user.address} />
                            <button className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-500 text-white py-2 px-4 rounded-lg flex items-center gap-2">
                                <FaSave /> {t("update_button")}
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-700"><strong>{t("personal_info.email")}:</strong> {user.email}</p>
                            <p className="text-gray-700"><strong>{t("personal_info.phone")}:</strong> {user.phone}</p>
                            <p className="text-gray-700"><strong>{t("personal_info.address")}:</strong> {user.address}</p>
                        </div>
                    )}
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{t("transaction_history.title")}</h3>
                    <ul className="list-disc pl-6 text-gray-700">
                        {user.transactions.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
