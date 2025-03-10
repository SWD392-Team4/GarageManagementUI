import React from "react";

export default function InvoiceModal({ invoice, onClose }) {
    if (!invoice) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white shadow-2xl rounded-lg px-10 pt-8 pb-10 w-full max-w-4xl border border-gray-300 relative">
                <h1 className="text-2xl font-bold mb-4 text-center">Chi tiết hóa đơn dịch vụ</h1>
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    ✕
                </button>
                <div className="grid grid-cols-2 gap-6 border-b pb-6 mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Thông tin hóa đơn</h2>
                        <p className="text-gray-500">Mã hóa đơn: <span className="text-gray-800 font-medium">#{invoice.id}</span></p>
                        <p className="text-gray-500">Dịch vụ: <span className="text-gray-800 font-medium">{invoice.serviceType}</span></p>
                    </div>
                    <div className="text-right text-gray-600">
                        <p><strong>Ngày tạo:</strong> {new Date(invoice.createdAt).toLocaleString()}</p>
                        <p><strong>Ngày cập nhật:</strong> {new Date(invoice.updatedAt).toLocaleString()}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg shadow-inner mb-6">
                    <div>
                        <p><strong>Khách hàng:</strong> {invoice.customer.name}</p>
                        <p><strong>Số điện thoại:</strong> {invoice.customer.phone}</p>
                        <p><strong>Địa chỉ:</strong> {invoice.customer.address}</p>
                    </div>
                    <div>
                        <p><strong>Kỹ thuật viên phụ trách:</strong> {invoice.technician.name}</p>
                        <p><strong>Số điện thoại:</strong> {invoice.technician.phone}</p>
                    </div>
                </div>

                <h3 className="text-xl font-bold mb-4">Dịch vụ đã sử dụng</h3>
                <table className="w-full border-collapse border border-gray-300 text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Tên dịch vụ</th>
                            <th className="border border-gray-300 p-2 text-center">Số lượng</th>
                            <th className="border border-gray-300 p-2 text-right">Đơn giá</th>
                            <th className="border border-gray-300 p-2 text-right">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.services.map((service, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 p-2">{service.name}</td>
                                <td className="border border-gray-300 p-2 text-center">{service.quantity}</td>
                                <td className="border border-gray-300 p-2 text-right">{service.price.toLocaleString()} VND</td>
                                <td className="border border-gray-300 p-2 text-right">{(service.quantity * service.price).toLocaleString()} VND</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between items-center mt-4 p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-xl font-bold">Tổng tiền:</h3>
                    <h3 className="text-xl font-bold text-green-600">{invoice.total.toLocaleString()} VND</h3>
                </div>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p><strong>TurboTrack</strong> - Dịch vụ sửa chữa và chăm sóc xe chuyên nghiệp</p>
                    <p>Địa chỉ: 123 Đường ABC, TP.HCM | Hotline: 0909 123 456</p>
                    <p>Cảm ơn quý khách đã tin tưởng dịch vụ của chúng tôi!</p>
                </div>

                <div className="flex justify-end mt-4 space-x-2 border-t pt-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
}
