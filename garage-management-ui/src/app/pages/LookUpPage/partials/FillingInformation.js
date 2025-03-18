import React, { useEffect, useState } from "react";
import { PiSteeringWheel } from "react-icons/pi";
import Navigation from "./Navigation";
import { sLookUp } from "../services/LookUpSignify";
import { useNavigate } from "react-router-dom";

export default function FillingInformation() {
    // State lưu trữ dữ liệu nhập vào
    const [formData, setFormData] = useState({
        verifyCode: "",
        customerEmail: "",
        customerPhone: "",
        estimatedTime: "",
    });
    const navigation = useNavigate();

    useEffect(() => {
        if (sLookUp.value.garareId == "") {
            navigation("/look-up/select-garage");
        }
        sLookUp.set((v) => {
            // v.value.garareId == "";
            v.value.VerifyCode = "";
            v.value.CustomerEmail = "";
            v.value.CustomerPhoneNumber = "";
            v.value.EstimatedTime = "";
        });
    }, []);

    // State kiểm soát việc xác nhận
    const [isConfirmed, setIsConfirmed] = useState(false);

    // State lưu lỗi
    const [errorMessage, setErrorMessage] = useState("");

    // Hàm xử lý thay đổi dữ liệu
    const handleChange = (e) => {
        if (isConfirmed) return;
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        sLookUp.set((pre) => {
            pre.value.VerifyCode = "";
            pre.value.CustomerEmail = "";
            pre.value.CustomerPhoneNumber = "";
            pre.value.EstimatedTime = "";
        });

        setErrorMessage("");
    };

    // Hàm xác nhận thông tin
    const handleConfirm = () => {
        if (!formData.verifyCode || !formData.customerEmail || !formData.customerPhone || !formData.estimatedTime) {
            setErrorMessage("Please fill in all fields before proceeding.");
            return;
        }

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.customerEmail)) {
            setErrorMessage("Invalid email format.");
            return;
        }

        // Kiểm tra định dạng số điện thoại (chấp nhận số điện thoại có 10-11 chữ số)
        const phoneRegex = /^(?:\+?\d{1,3}[-.\s]?)?\d{10,11}$/;
        if (!phoneRegex.test(formData.customerPhone)) {
            setErrorMessage("Invalid phone number format.");
            return;
        }

        // Chuyển đổi ngày theo định dạng yyyy-mm-dd
        const estimatedTime = new Date(formData.estimatedTime).toISOString().split('T')[0];

        sLookUp.set((pre) => {
            pre.value.VerifyCode = formData.verifyCode;
            pre.value.CustomerEmail = formData.customerEmail;
            pre.value.CustomerPhoneNumber = formData.customerPhone;
            pre.value.EstimatedTime = estimatedTime;
        });

        setIsConfirmed(true);
        setErrorMessage("");
    };

    // Hàm huỷ xác nhận và reset dữ liệu
    const handleCancel = () => {
        setIsConfirmed(false);
        setFormData({
            verifyCode: "",
            customerEmail: "",
            customerPhone: "",
            estimatedTime: "", // Reset giá trị estimatedTime
        });
        setErrorMessage("");
    };

    return (
        <div className="font-extrabold font-space relative pb-10 ">
            {/* Container chính */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto p-8 relative border-2 border-gray-300 rounded-lg overflow-hidden">
                {/* Cột Trái - Form Nhập Thông Tin */}
                <div className="space-y-6">
                    <h2 className="text-4xl font-bold uppercase tracking-wide text-gray-700 mb-6">
                        Fill Your Information
                    </h2>

                    {/* Hiển thị lỗi nếu có */}
                    {errorMessage && (
                        <div className="text-red-500 bg-red-100 border border-red-400 p-3 rounded">
                            {errorMessage}
                        </div>
                    )}

                    {/* Input Fields */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-lg mb-1">Verify Code</label>
                            <input
                                type="text"
                                name="verifyCode"
                                value={formData.verifyCode}
                                onChange={handleChange}
                                disabled={isConfirmed}
                                className={`w-full bg-transparent border-b p-2 outline-none text-white placeholder-gray-400 ${errorMessage && !formData.verifyCode ? "border-red-500" : "border-gray-500"} ${isConfirmed ? "cursor-not-allowed" : "focus:border-orange-500"}`}
                                placeholder="Enter your verify code"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-lg mb-1">Customer Email</label>
                            <input
                                type="email"
                                name="customerEmail"
                                value={formData.customerEmail}
                                onChange={handleChange}
                                disabled={isConfirmed}
                                className={`w-full bg-transparent border-b p-2 outline-none text-white placeholder-gray-400 ${errorMessage && !formData.customerEmail ? "border-red-500" : "border-gray-500"} ${isConfirmed ? "cursor-not-allowed" : "focus:border-orange-500"}`}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-lg mb-1">Customer Phone Number</label>
                            <input
                                type="tel"
                                name="customerPhone"
                                value={formData.customerPhone}
                                onChange={handleChange}
                                disabled={isConfirmed}
                                className={`w-full bg-transparent border-b p-2 outline-none text-white placeholder-gray-400 ${errorMessage && !formData.customerPhone ? "border-red-500" : "border-gray-500"} ${isConfirmed ? "cursor-not-allowed" : "focus:border-orange-500"}`}
                                placeholder="Enter your phone number"
                            />
                        </div>

                        {/* Trường EstimatedTime */}
                        <div>
                            <label className="block text-gray-700 text-lg mb-1">Estimated Time</label>
                            <input
                                type="date"
                                name="estimatedTime"
                                value={formData.estimatedTime}
                                onChange={handleChange}
                                disabled={isConfirmed}
                                className={`w-full bg-transparent border-b p-2 outline-none text-white placeholder-gray-400 ${errorMessage && !formData.estimatedTime ? "border-red-500" : "border-gray-500"} ${isConfirmed ? "cursor-not-allowed" : "focus:border-orange-500"}`}
                            />
                        </div>

                        {/* Nút xác nhận và huỷ */}
                        <div className="flex justify-between mt-4">
                            {isConfirmed && (
                                <button
                                    onClick={handleCancel}
                                    className="group/link px-6 py-2 text-gray-700 border border-gray-700 rounded hover:bg-gray-700 hover:text-white transition relative"
                                >
                                    Cancel
                                    <span className="block border-b border-orange-700 h-1 w-5 ml-auto group-hover/link:w-[60px] transition-all duration-300"></span>
                                </button>
                            )}

                            {!isConfirmed && (
                                <button
                                    onClick={handleConfirm}
                                    className="group/link px-6 py-2 text-gray-700 border border-gray-700 rounded hover:bg-gray-700 hover:text-white transition relative"
                                >
                                    Confirm
                                    <span className="block border-b border-orange-700 h-1 w-5 ml-auto group-hover/link:w-[60px] transition-all duration-300"></span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Cột Phải - Slogan + Animation */}
                <div className="flex flex-col items-center text-center text-gray-700 space-y-6 relative">
                    <h3 className="text-3xl font-bold uppercase">Drive with Confidence</h3>
                    <p className="text-lg text-gray-700 max-w-md">
                        We ensure your car gets the best service, keeping you safe on every journey.
                    </p>

                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <PiSteeringWheel className="text-gray-700 w-full h-full animate-spin-slow" />
                    </div>

                    <Navigation
                        prevLink="/look-up/select-garage"
                        {...(formData ? { nextLink: "/look-up/view-appointment" } : {})}
                    />
                </div>
            </div>
        </div>
    );
}
