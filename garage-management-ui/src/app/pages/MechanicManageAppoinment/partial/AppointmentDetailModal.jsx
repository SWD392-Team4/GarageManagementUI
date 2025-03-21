import React, { useEffect, useState, useRef } from "react";
import ServiceTasks from "./ServiceTasks";

function AppointmentDetailModal({ service, onClose, onUpdate }) {
  // Khởi tạo state với dữ liệu từ service (đảm bảo imagesBefore và imagesAfter là mảng)
  const [serviceData, setServiceData] = useState({
    ...service,
    imagesBefore: service.imagesBefore || [],
    imagesAfter: service.imagesAfter || [],
  });

  useEffect(() => {
    if (service) {
      setServiceData({
        ...service,
        imagesBefore: service.imagesBefore || [],
        imagesAfter: service.imagesAfter || [],
      });
    }
  }, [service]);

  const handleTaskStatusChange = (taskId, newStatus) => {
    setServiceData((prev) => ({
      ...prev,
      appointmentReplacementParts: (prev.appointmentReplacementParts || []).map(
        (task) => (task.id === taskId ? { ...task, Status: newStatus } : task)
      ),
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg p-5 rounded shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-800 text-center">
          {serviceData.serviceName || "Service Detail"}
        </h2>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <label className="font-semibold w-1/3">Tên dịch vụ:</label>
            <span className="w-2/3 text-right">{serviceData.serviceName}</span>
          </li>

          <li className="flex justify-between">
            <label className="font-semibold w-1/3">Estimated Hours:</label>
            <span className="w-2/3 text-right">
              {serviceData.estimatedHours}
            </span>
          </li>

          <li className="justify-between">
            <label className="font-semibold block">Ghi chú dịch vụ:</label>
            <textarea
              className="block w-full border rounded p-1 mt-1"
              value={serviceData.serviceNote}
              disabled
            />
          </li>
        </ul>
        {serviceData.appointmentReplacementParts && (
          <ServiceTasks
            tasks={serviceData.appointmentReplacementParts}
            onTaskStatusChange={handleTaskStatusChange}
            serviceDetailId={service.id}
          />
        )}
        {/* Phần ảnh */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            {serviceData.imagesBefore.length !== 0 && (
              <>
                <p className="font-semibold">Ảnh Before</p>
                <div className="flex flex-wrap gap-2">
                  {(serviceData.imagesBefore || []).map((url, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={url}
                        alt={`before-${idx}`}
                        className="w-20 h-20 border"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Ảnh After */}
          <div>
            {serviceData.imagesAfter.length !== 0 && (
              <>
                <p className="font-semibold">Ảnh After</p>
                <div className="flex flex-wrap gap-2">
                  {(serviceData.imagesAfter || []).map((url, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={url}
                        alt={`after-${idx}`}
                        className="w-20 h-20 border"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetailModal;
