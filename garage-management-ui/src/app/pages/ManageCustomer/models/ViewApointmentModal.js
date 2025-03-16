import React from 'react';

export default function ViewAppointmentModal({ isOpen, onClose, appointmentDetails }) {
  if (!isOpen) return null;

  console.log("check apointment Dewtails o component con: ", appointmentDetails);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>

        {/* Thông tin chính */}
        {/* <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4">
          <p><strong>ID:</strong> {appointmentDetails.appointmentId}</p>
          <p><strong>Created At:</strong> {appointmentDetails.createAt}</p>
          <p><strong>Estimated Hours:</strong> {appointmentDetails.estimatedHours}</p>
          <p><strong>Price:</strong> ${appointmentDetails.price}</p>
          <p><strong>Service History ID:</strong> {appointmentDetails.serviceHistoryId}</p>
          <p><strong>Service Name:</strong> {appointmentDetails.serviceName}</p>
          <p><strong>Service Note:</strong> {appointmentDetails.serviceNote}</p>
          <p><strong>Status:</strong> {appointmentDetails.status}</p>
          <p><strong>Updated At:</strong> {appointmentDetails.updatedAt}</p>
        </div> */}

        {/* Danh sách phụ tùng thay thế */}
        {/* {appointmentDetails.appointmentReplacementParts && appointmentDetails.appointmentReplacementParts.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Replacement Parts</h3>
            <table className="w-full border border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Part ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {appointmentDetails.appointmentReplacementParts.map((part, index) => (
                  <tr key={index} className="border">
                    <td className="border p-2">{part.partId}</td>
                    <td className="border p-2">{part.name}</td>
                    <td className="border p-2">{part.quantity}</td>
                    <td className="border p-2">${part.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )} */}

        {/* Nút đóng modal */}
        <div className="mt-4 text-right">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
