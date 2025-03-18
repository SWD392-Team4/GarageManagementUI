import React from 'react';
import {
    FaCalendarAlt,
    FaCheckCircle,
    FaEnvelope,
    FaIdCard,
    FaPhone,
    FaTimesCircle,
    FaUser,
    FaUserShield
} from "react-icons/fa";
export default function CustomerInfo({ customer, loading }) {
    if (loading) {
        return (
            <div className="border border-gray-200 p-4 rounded-md bg-gray-50 mt-5 text-center">
                <p className="text-gray-500 text-lg">Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (!customer) {
        return (
            <div className="border border-gray-200 p-4 rounded-md bg-gray-50 mt-5 text-center">
                <p className="text-red-500 text-lg">Không tìm thấy thông tin khách hàng.</p>
            </div>
        );
    }

    return (
        <div className="border border-gray-200 p-4 rounded-md bg-gray-50 mt-5">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-4">
                <FaUser className="text-blue-500" /> Thông tin khách hàng
            </h2>

            <div className="flex items-center gap-4 mb-5">
                {/* Avatar */}
                {loading ? (
                    <div className="w-20 h-20 rounded-full bg-gray-300 animate-pulse"></div>
                ) : (
                    <img
                        src={customer?.imageLink !== "N/A" ? customer.imageLink : "/default-avatar.png"}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full border border-gray-300 object-cover"
                    />
                )}

                {/* Họ và tên */}
                <div>
                    <p className="text-lg font-semibold text-gray-700">
                        {loading ? <SkeletonText /> : `${customer?.firstName} ${customer?.lastName}`}
                    </p>
                    <p className="text-gray-500 text-sm">
                        {loading ? <SkeletonText width="w-24" /> : customer?.role}
                    </p>
                </div>
            </div>

            {/* Grid thông tin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                    icon={<FaEnvelope className="text-gray-600" />}
                    label="Email"
                    value={customer?.email}
                    loading={loading}
                />
                <InfoItem
                    icon={customer?.emailConfirmed ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
                    label="Email xác nhận"
                    value={customer?.emailConfirmed ? "Đã xác nhận" : "Chưa xác nhận"}
                    loading={loading}
                />
                <InfoItem
                    icon={<FaPhone className="text-gray-600" />}
                    label="Số điện thoại"
                    value={customer?.phoneNumber}
                    loading={loading}
                />
                <InfoItem
                    icon={customer?.phoneNumberConfirmed ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
                    label="Số điện thoại xác nhận"
                    value={customer?.phoneNumberConfirmed ? "Đã xác nhận" : "Chưa xác nhận"}
                    loading={loading}
                />
                <InfoItem
                    icon={<FaUserShield className="text-gray-600" />}
                    label="Trạng thái"
                    value={customer?.status}
                    loading={loading}
                />
                <InfoItem
                    icon={<FaIdCard className="text-gray-600" />}
                    label="CCCD"
                    value={customer?.citizenIdentification}
                    loading={loading}
                />
                <InfoItem
                    icon={<FaUser className="text-gray-600" />}
                    label="Giới tính"
                    value={customer?.gender ? "Nam" : "Nữ"}
                    loading={loading}
                />
                <InfoItem
                    icon={<FaCalendarAlt className="text-gray-600" />}
                    label="Ngày sinh"
                    value={customer?.dateOfBirth !== "0001-01-01" ? new Date(customer?.dateOfBirth).toLocaleDateString() : "Chưa cập nhật"}
                    loading={loading}
                />
                <InfoItem
                    icon={<FaCalendarAlt className="text-gray-600" />}
                    label="Ngày tạo"
                    value={customer?.createdAt}
                    loading={loading}
                />
                <InfoItem
                    icon={<FaCalendarAlt className="text-gray-600" />}
                    label="Ngày cập nhật"
                    value={customer?.updatedAt}
                    loading={loading}
                />
            </div>
        </div>
    );
}

// Component tái sử dụng cho từng thông tin
const InfoItem = ({ icon, label, value, loading }) => (
    <div className="flex items-center gap-3">
        {icon}
        <p className="text-gray-700">
            <span className="font-semibold">{label}:</span>{" "}
            {loading ? <SkeletonText width="w-24" /> : value}
        </p>
    </div>
);

// Skeleton Text Effect (dùng Tailwind)
const SkeletonText = ({ width = "w-32" }) => (
    <div className={`h-4 bg-gray-300 rounded-md animate-pulse ${width}`}></div>
);