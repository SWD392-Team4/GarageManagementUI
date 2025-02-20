import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { FaEdit, FaTimes, FaSave, FaLock, FaKey } from 'react-icons/fa';

const userData = {
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    firstName: "Nguyễn",
    lastName: "Anh",
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
    const [email, setEmail] = useState(user.email);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleEdit = () => setIsEditing(!isEditing);
    const handleSendResetLink = () => alert(`🔒 ${t("forgot_password.success")} ${email}`);
    const handlePasswordChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    const handleChangePassword = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert(t("change_password.error"));
            return;
        }
        alert(t("change_password.success"));
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    };

    return (
        <div className="bg-white text-black shadow-lg rounded-xl p-6 border border-gray-300">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{t("title")}</h2>
                <button
                    onClick={handleEdit}
                    className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center gap-2"
                >
                    {isEditing ? <><FaTimes /> {t("cancel_button")}</> : <><FaEdit /> {t("edit_button")}</>}
                </button>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                <img src={user.avatar} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-gray-500" />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {isEditing ? (
                        <>
                            <input className="border border-gray-400 bg-gray-100 p-2 rounded" type="text" defaultValue={user.firstName} placeholder={t("personal_info.first_name")} />
                            <input className="border border-gray-400 bg-gray-100 p-2 rounded" type="text" defaultValue={user.lastName} placeholder={t("personal_info.last_name")} />
                            <input className="border border-gray-400 bg-gray-100 p-2 rounded" type="email" defaultValue={user.email} />
                            <input className="border border-gray-400 bg-gray-100 p-2 rounded" type="text" defaultValue={user.address} />
                            <input className="border border-gray-400 bg-gray-100 p-2 rounded" type="tel" defaultValue={user.phone} />
                        </>
                    ) : (
                        <>
                            <p><strong>{t("personal_info.first_name")}:</strong> {user.firstName}</p>
                            <p><strong>{t("personal_info.last_name")}:</strong> {user.lastName}</p>
                            <p><strong>{t("personal_info.email")}:</strong> {user.email}</p>
                            <p><strong>{t("personal_info.address")}:</strong> {user.address}</p>
                            <p><strong>{t("personal_info.phone")}:</strong> {user.phone}</p>
                        </>
                    )}
                </div>
            </div>

            {isEditing && (
                <div className="mt-4 justify-start">
                    <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg">
                        <FaSave /> {t("update_button")}
                    </button>
                </div>
            )}

            <hr className="my-6 border-gray-300" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg shadow border border-gray-300">
                    <h3 className="text-lg font-semibold mb-2">{t("forgot_password.title")}</h3>
                    <p className="text-gray-600">{t("forgot_password.description")}</p>
                    <button
                        onClick={handleSendResetLink}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mt-4 flex items-center gap-2"
                    >
                        <FaLock /> {t("forgot_password.button")}
                    </button>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow border border-gray-300">
                    <h3 className="text-lg font-semibold mb-2">{t("change_password.title")}</h3>
                    <input type="password" name="currentPassword" className="border border-gray-400 bg-gray-100 p-2 w-full rounded mb-2" placeholder={t("change_password.current")} value={passwordData.currentPassword} onChange={handlePasswordChange} />
                    <input type="password" name="newPassword" className="border border-gray-400 bg-gray-100 p-2 w-full rounded mb-2" placeholder={t("change_password.new")} value={passwordData.newPassword} onChange={handlePasswordChange} />
                    <input type="password" name="confirmPassword" className="border border-gray-400 bg-gray-100 p-2 w-full rounded mb-2" placeholder={t("change_password.confirm")} value={passwordData.confirmPassword} onChange={handlePasswordChange} />
                    <button onClick={handleChangePassword} className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-lg mt-2 flex items-center gap-2">
                        <FaKey /> {t("change_password.button")}
                    </button>
                </div>
            </div>
        </div>
    );
}
