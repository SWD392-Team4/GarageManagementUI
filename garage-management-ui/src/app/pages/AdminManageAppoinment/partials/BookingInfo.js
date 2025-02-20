import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { GiConfirmed, GiCancel } from "react-icons/gi";

const BookingInfo = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [isEditing, setIsEditing] = useState(false);

  // 🟢 Dữ liệu giả lập từ Backend
  const garages = [
    { id: "1", name: "Gara A" },
    { id: "2", name: "Gara B" },
    { id: "3", name: "Gara C" },
  ];

  const statuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
  const types = ["Repair", "Maintenance", "Inspection"];

  // 🟢 Dữ liệu mặc định
  const defaultValues = {
    id: "#123",
    emp: "Huy Hanh",
    gara: "1",
    status: "Pending",
    model: "#123",
    mileage: "20000",
    licenser: "1",
    condition: "Good",
    estimatedTime: "2025-02-13T10:00",
    actualTime: "",
    estimatedEndTime: "2025-02-14T18:00",
    actualEndTime: "",
    expectedPrice: "300000000",
    dateCreated: "2025-02-13T05:00",
    dateUpdated: "",
    type: "Repair",
    customerName: "Tran Huy Hanh",
    phone: "0962147742",
    email: "huyhanhpopo@gmail.com",
  };

  // Khi component mount, đặt giá trị mặc định
  useEffect(() => {
    Object.keys(defaultValues).forEach((key) => {
      setValue(key, defaultValues[key]);
    });
  }, [setValue]);

  // 🟢 Nhấn "Edit" để vào chế độ chỉnh sửa
  const handleEdit = () => {
    setIsEditing(true);
  };

  // 🟢 Nhấn "Confirm" để lưu thay đổi
  const handleConfirm = (data) => {
    console.log("Updated Data:", data);
    setIsEditing(false);
  };

  // 🟢 Nhấn "Cancel" để hủy thay đổi
  const handleCancel = () => {
    reset(defaultValues);
    setIsEditing(false);
  };

  return (
    <form
      onSubmit={handleSubmit(handleConfirm)}
      className="border bg-white border-gray-300 shadow-md p-4 w-full overflow-auto"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5 sm:grid-cols-2">
        <div>
          <LabelInput label="Id" name="id" register={register} readOnly />
          <LabelInput
            label="Emp"
            name="emp"
            register={register}
            editable={isEditing}
          />
          <LabelSelect
            label="Gara"
            name="gara"
            register={register}
            options={garages}
            editable={isEditing}
          />
          <LabelSelect
            label="Status"
            name="status"
            register={register}
            options={statuses}
            editable={isEditing}
          />
        </div>

        <div>
          <LabelInput
            label="Model"
            name="model"
            register={register}
            editable={isEditing}
          />
          <LabelInput
            label="Mileage"
            name="mileage"
            register={register}
            editable={isEditing}
          />
          <LabelInput
            label="Licenser"
            name="licenser"
            register={register}
            editable={isEditing}
          />
          <LabelInput
            label="Condition"
            name="condition"
            register={register}
            editable={isEditing}
          />
        </div>

        <div>
          <LabelDateTime
            label="Estimated Time"
            name="estimatedTime"
            register={register}
            editable={isEditing}
          />
          <LabelDateTime
            label="Actual Time"
            name="actualTime"
            register={register}
            // editable={isEditing}
          />
          <LabelDateTime
            label="Estimated End Time"
            name="estimatedEndTime"
            register={register}
            editable={isEditing}
          />
          <LabelDateTime
            label="Actual End Time"
            name="actualEndTime"
            register={register}
            // editable={isEditing}
          />
        </div>

        <div>
          <LabelInput
            label="Expected Price"
            name="expectedPrice"
            register={register}
            editable={isEditing}
          />
          <LabelDateTime
            label="Date Created"
            name="dateCreated"
            register={register}
            readOnly
          />
          <LabelDateTime
            label="Date Updated"
            name="dateUpdated"
            register={register}
            // editable={isEditing}
          />
          <LabelSelect
            label="Type"
            name="type"
            register={register}
            options={types}
            editable={isEditing}
          />
        </div>

        <div>
          <LabelInput
            label="Customer Name"
            name="customerName"
            register={register}
            editable={isEditing}
          />
          <LabelInput
            label="Phone"
            name="phone"
            register={register}
            editable={isEditing}
          />
          <LabelInput
            label="Email"
            name="email"
            register={register}
            editable={isEditing}
          />
        </div>
      </div>

      {/* 🟢 Nút Hành Động */}
      <div className="flex justify-end mt-4">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleCancel}
              className="p-2 bg-red-300 rounded hover:bg-red-400 mr-2"
            >
              <GiCancel className="text-white" />
            </button>
            <button
              type="submit"
              className="p-2 bg-green-300 rounded hover:bg-green-400"
            >
              <GiConfirmed className="text-white" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleEdit}
            className="p-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            <FaEdit className="text-purple-700" />
          </button>
        )}
      </div>
    </form>
  );
};

// 🟢 Component Input Linh Hoạt
const LabelInput = ({
  label,
  name,
  register,
  editable = false,
  readOnly = false,
}) => (
  <div className="flex items-center gap-2 mb-2">
    <label className="text-sm font-medium text-gray-600 w-1/3">{label}</label>
    <input
      type="text"
      {...register(name)}
      readOnly={readOnly || !editable}
      className={`w-2/3 border border-gray-300 rounded-sm px-2 py-1 text-sm ${
        editable ? "bg-white" : "bg-gray-200"
      }`}
    />
  </div>
);

// Component Select
const LabelSelect = ({ label, name, register, options, editable }) => (
  <div className="flex items-center gap-2 mb-2">
    <label className="text-sm font-medium text-gray-600 w-1/3">{label}</label>
    <select
      {...register(name)}
      disabled={!editable}
      className={`w-2/3 border bg-gray-200  border-gray-300 rounded-sm px-2 py-1 text-sm ${
        editable ? "bg-white" : "bg-gray-200 "
      }`}
    >
      {options.map((option) =>
        typeof option === "object" ? (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ) : (
          <option key={option} value={option}>
            {option}
          </option>
        )
      )}
    </select>
  </div>
);

// 🟢 Component DateTime Picker
const LabelDateTime = ({ label, name, register, editable, readOnly }) => (
  <div className="flex items-center gap-2 mb-2">
    <label className="text-sm font-medium text-gray-600 w-1/3">{label}</label>
    <input
      type="datetime-local"
      {...register(name)}
      readOnly={readOnly || !editable}
      className={`w-2/3 border border-gray-300 rounded-sm px-2 py-1 text-sm ${
        editable ? "bg-white" : "bg-gray-200"
      }`}
    />
  </div>
);

export default BookingInfo;
