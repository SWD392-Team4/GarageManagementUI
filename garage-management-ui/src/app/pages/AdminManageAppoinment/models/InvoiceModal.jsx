import React, { useRef } from "react";

const formatCurrency = (value) => {
  if (!value) return "0 VND";
  return value.toLocaleString("vi-VN") + " VND";
};

const formatDate = (dateString) => {
  if (!dateString) return "--/--/---- --:--";
  const date = new Date(dateString);
  const pad = (n) => n.toString().padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

function InvoiceModal({ isOpen, onClose, appointmentData }) {
  const invoiceRef = useRef(null);

  if (!isOpen || !appointmentData) return null;

  const appointment = appointmentData;
  const packageInfo = appointment.appointmentDetailPackages?.[0] || null;
  const services = appointment.appointmentDetails || [];
  const totalPrice = appointment.price
    ? formatCurrency(appointment.price)
    : "0 VND";

  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 0);
  };

  const handleSendEmail = () => {
    alert("Chức năng gửi email chưa được triển khai.");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 print-none">
      <div className="bg-white w-full max-w-4xl p-6 rounded shadow-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black print-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Phần in hoá đơn */}
        <div ref={invoiceRef} id="invoice" className="px-2 py-4">
          <h1 className="text-2xl font-bold mb-4 text-center">
            HÓA ĐƠN DỊCH VỤ
          </h1>

          {/* Thông tin cơ bản */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <div className="font-semibold">Appointment ID:</div>
              <div>{appointment.id}</div>
            </div>
            <div>
              <div className="font-semibold">Trạng thái:</div>
              <div>{appointment.status}</div>
            </div>
            <div>
              <div className="font-semibold">Loại:</div>
              <div>{appointment.appointmentType}</div>
            </div>
            <div>
              <div className="font-semibold">Ngày tạo:</div>
              <div>{formatDate(appointment.createdAt)}</div>
            </div>
            <div>
              <div className="font-semibold">Ngày cập nhật:</div>
              <div>{formatDate(appointment.updatedAt)}</div>
            </div>
            <div>
              <div className="font-semibold">Nhân viên duyệt:</div>
              <div>{appointment.approveByEmployee || "N/A"}</div>
            </div>
          </div>

          {/* Thông tin xe & khách hàng */}
          <div className="border-t pt-4 mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Thông tin xe & khách hàng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="font-semibold">Biển số:</div>
                <div>{appointment.carLicensePlateNumber}</div>
              </div>
              <div>
                <div className="font-semibold">Quãng đường (mileage):</div>
                <div>{appointment.mileage}</div>
              </div>
              <div>
                <div className="font-semibold">Khách hàng:</div>
                <div>{appointment.customerName}</div>
              </div>
              <div>
                <div className="font-semibold">Số điện thoại:</div>
                <div>{appointment.customerPhoneNumber}</div>
              </div>
              <div>
                <div className="font-semibold">Email:</div>
                <div>{appointment.customerEmail}</div>
              </div>
              <div>
                <div className="font-semibold">Verification Code:</div>
                <div>{appointment.verificationCode}</div>
              </div>
            </div>
          </div>

          {/* Thông tin thời gian */}
          <div className="border-t pt-4 mb-6">
            <h2 className="text-lg font-semibold mb-2">Thời gian</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Dự kiến bắt đầu:</div>
                <div>{formatDate(appointment.estimatedAppointmentTime)}</div>
              </div>
              <div>
                <div className="font-semibold">Dự kiến kết thúc:</div>
                <div>{formatDate(appointment.estimatedEndTime)}</div>
              </div>
            </div>
          </div>

          {/* Gói dịch vụ (nếu có) */}
          {packageInfo && (
            <div className="border-t pt-4 mb-6">
              <h2 className="text-lg font-semibold mb-2">Gói dịch vụ</h2>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold mr-2">Tên gói:</span>
                  <span>{packageInfo.packageName}</span>
                </div>
                <div>
                  <span className="font-semibold mr-2">Giá gói:</span>
                  <span>{formatCurrency(packageInfo.packagePrice)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Chi tiết dịch vụ */}
          <div className="border-t pt-4 mb-6">
            <h2 className="text-lg font-semibold mb-2">Chi tiết dịch vụ</h2>
            <div className="space-y-4">
              {services.map((svc) => {
                const isInPackage = svc.isFromPackage === true;
                const displayPrice = isInPackage
                  ? "(Included in package)"
                  : formatCurrency(svc.price || 0);
                const parts = svc.appointmentReplacementParts || [];
                return (
                  <div
                    key={svc.id}
                    className="border rounded-md p-4 shadow-sm bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-semibold">Dịch vụ:</span>{" "}
                        <span>{svc.serviceName}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">Giá:</span>{" "}
                        <span>{displayPrice}</span>
                      </div>
                    </div>
                    {parts.length > 0 && (
                      <div className="ml-4 mt-2">
                        <div className="font-semibold mb-1">
                          Linh kiện thay thế:
                        </div>
                        <table className="w-full text-sm bg-white">
                          <thead>
                            <tr className="border-b text-left">
                              <th className="p-2">Tên linh kiện</th>
                              <th className="p-2">Số lượng</th>
                              <th className="p-2">Đơn giá</th>
                              <th className="p-2">Thành tiền</th>
                            </tr>
                          </thead>
                          <tbody>
                            {parts.map((part) => {
                              const cost = part.quantity * part.productPrice;
                              return (
                                <tr key={part.id} className="border-b">
                                  <td className="p-2">{part.productName}</td>
                                  <td className="p-2">{part.quantity}</td>
                                  <td className="p-2">
                                    {formatCurrency(part.productPrice)}
                                  </td>
                                  <td className="p-2">
                                    {formatCurrency(cost)}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tổng tiền */}
          <div className="border-t pt-4 mb-6 flex justify-end">
            <div className="text-right">
              <div className="text-xl font-semibold">
                Tổng tiền: {totalPrice}
              </div>
              <div className="text-gray-500 text-sm">
                (Đã bao gồm các dịch vụ và gói nếu có)
              </div>
            </div>
          </div>
        </div>

        {/* Nút in và gửi email – chỉ hiển thị trên màn hình */}
        <div className="flex justify-end space-x-4 mt-4 print-none">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow"
          >
            In hoá đơn
          </button>
          <button
            onClick={handleSendEmail}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow"
          >
            Gửi Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvoiceModal;
