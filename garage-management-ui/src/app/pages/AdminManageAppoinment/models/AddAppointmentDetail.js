import React, { useCallback, useEffect, useMemo, useState } from "react";
import Select from "react-select";
import {
  addAppointmentDetail,
  getAllService,
} from "../services/AppointmentService";
import { currentAppointment } from "../services/store/AppointmentSignify";
import { formatVietnameseCurrency } from "../../ManageGoodsIssued/schemas/GoodsIssuedSchemas";

export default function AddAppointmentDetail({ id }) {
  const [selectedServiceId, setSelectedServiceId] = useState("");
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

  // Đảm bảo appointmentDetails là một mảng
  const appointmentDetails = Array.isArray(
    currentAppointment.value.appointmentDetails
  )
    ? currentAppointment.value.appointmentDetails
    : [];

  const serviceOptions = useMemo(() => {
    return (services || [])
      .filter((s) => !appointmentDetails.includes(s.id))
      .map((s) => ({
        value: s.id,
        label: s.serviceName,
        price: s.price,
        carPartId: s.carPartId,
      }));
  }, [services, appointmentDetails]);
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
        serviceId: selectedServiceId,
        replacementParts: [],
      },
    ];
    setLoading(true);
    try {
      const response = await addAppointmentDetail(payload, id);
      if (response) {
        currentAppointment.set((v) => {
          v.value.load += 1;
        });
      }
    } catch (error) {
      console.error("Error addAppointmentDetail appointment:", error);
    } finally {
      setSelectedServiceId("");
      setLoading(false);
    }
  };
  return (
    <div className="md:flex items-center space-x-2">
      <Select
        options={serviceOptions}
        onChange={(option) => {
          setSelectedServiceId(option.value);
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
