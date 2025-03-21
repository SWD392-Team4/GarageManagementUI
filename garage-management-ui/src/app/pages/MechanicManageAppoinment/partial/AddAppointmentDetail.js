import React, { useCallback, useEffect, useMemo, useState } from "react";
import Select from "react-select";

import { formatVietnameseCurrency } from "../../ManageGoodsIssued/schemas/GoodsIssuedSchemas";
import { currentAppointment } from "../services/store/mechanic";
import { getAllService } from "../../AdminManageAppoinment/services/AppointmentService";
import { addAppointmentDetail } from "../services/AppointmentService";

export default function AddAppointmentDetail({ id }) {
  const [selectedService, setSelectedService] = useState({
    id: "",
    serviceName: "",
    status: "",
    estimatedHours: "",
    appointmentReplacementParts: "",
    createAt: "",
    employeeSchedules: "",
  });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDataService = useCallback(async () => {
    try {
      const servicesResponse = await getAllService();
      setServices(servicesResponse.data.value || []);
    } catch (error) {
      console.error("Error loading data", error);
    }
  }, []);

  useEffect(() => {
    fetchDataService();
  }, [fetchDataService]);
  const sCurrentAppointment = currentAppointment.use();

  // Đảm bảo appointmentDetails là một mảng
  const appointmentDetails = Array.isArray(
    currentAppointment.value.appointmentDetail.appointmentDetails
  )
    ? currentAppointment.value.appointmentDetail.appointmentDetails
    : [];

  // Lọc ra những service không có trong appointmentDetails (so sánh qua serviceId)
  const serviceOptions = useMemo(() => {
    return (services || [])
      .filter(
        (s) =>
          s.price !== 0 &&
          !appointmentDetails.some((detail) => detail.serviceId === s.id)
      )
      .map((s) => ({
        value: s.id,
        label: s.serviceName,
        price: s.price,
        carPartId: s.carPartId,
        estimatedHours: s.estimatedHours,
      }));
  }, [services, appointmentDetails, currentAppointment.value.load]);

  const formatOptionLabel = (option) => {
    return (
      <div className="items-center w-full overflow-hidden">
        <div className="overflow-hidden">
          <div className="font-semibold ">{option.label}</div>
          <div className="text-green-700 text-sm truncate">
            {formatVietnameseCurrency(option.price)}
          </div>
        </div>
      </div>
    );
  };

  const handleAddService = async () => {
    const payload = [
      {
        serviceId: selectedService.id,
        replacementParts: [],
      },
    ];
    setLoading(true);
    try {
      const response = await addAppointmentDetail(payload, id);
      if (response) {
        currentAppointment.set((v) => {
          const currentAppointmentDetails =
            v.value.appointmentDetail.appointmentDetails || [];
          v.value.appointmentDetail.appointmentDetails = [
            ...currentAppointmentDetails,
            selectedService,
          ];
        });
      }
    } catch (error) {
      console.error("Error addAppointmentDetail appointment:", error);
    } finally {
      // Reset lựa chọn sau khi thêm, dù thành công hay thất bại
      setSelectedService({
        id: "",
        serviceName: "",
        status: "",
        estimatedHours: "",
        createAt: "",
        employeeSchedules: "",
      });
      setLoading(false);
    }
  };

  return (
    <div className="md:flex items-center space-x-2">
      <Select
        options={serviceOptions}
        value={
          serviceOptions.find(
            (option) => option.value === selectedService.id
          ) || null
        }
        onChange={(option) => {
          setSelectedService({
            id: option.value,
            serviceName: option.label,
            status: "Required",
            estimatedHours: option.estimatedHours,
          });
        }}
        formatOptionLabel={formatOptionLabel}
        placeholder="Chọn Service"
        className="min-w-64"
        menuPortalTarget={document.body}
        menuPosition="fixed"
      />

      <button
        type="button"
        onClick={handleAddService}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {loading ? "Đang thêm..." : "Thêm"}
      </button>
    </div>
  );
}
