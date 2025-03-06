import React from "react";

export default function UpdateEmployeeModal({ isOpen, onClose, employee, onEmployeeUpdated }) {
  if (!isOpen) return null;
  console.log("check thông tin : ", employee);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Thông tin nhân viên</h2>
        <div className="space-y-2">
          <p><strong>Họ và tên:</strong> {employee.name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Số điện thoại:</strong> {employee.phone}</p>
          <p><strong>Chức vụ:</strong> {employee.position}</p>
        </div>
        <button
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
