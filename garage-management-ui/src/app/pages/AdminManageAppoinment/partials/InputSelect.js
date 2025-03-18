import React from "react";
import Select from "react-select";

// Custom styles cho react-select
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled ? "#e5e7eb" : "#fff",
    borderColor: "#d1d5db",
    minHeight: "36px",
    height: "36px",
    boxShadow: state.isFocused ? "0 0 0 1px #2563eb" : provided.boxShadow,
    "&:hover": {
      borderColor: "#2563eb",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "36px",
    padding: "0 6px",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "36px",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
};

const LabelReactSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  editable = false,
}) => {
  // Tìm option được chọn dựa theo value (carModelId)
  const selectedOption = options.find((opt) => opt.id === value) || null;
  // Chuyển đổi options thành dạng react-select (value, label)
  const selectOptions = options.map((opt) => ({
    id: opt.id,
    value: opt.id,
    label: opt.name || opt.modelName,
  }));

  const handleSelectChange = (selected) => {
    onChange(selected); // Truyền giá trị đã chọn cho hàm xử lý của component cha
  };

  return (
    <div className="flex items-center gap-2 mb-2">
      {/* Custom label: đảm bảo khi xổ xuống không bị phá cấu trúc */}
      <label className="text-sm font-medium text-gray-600 w-1/3 whitespace-nowrap">
        {label}
      </label>
      <div className="w-2/3">
        <Select
          name={name}
          value={
            selectedOption
              ? {
                  id: selectedOption.id,
                  value: selectedOption.id,
                  label: selectedOption.name || selectedOption.modelName,
                }
              : null
          }
          onChange={handleSelectChange}
          options={selectOptions}
          styles={customStyles}
          isDisabled={!editable}
          isSearchable
          menuPortalTarget={document.body}
        />
      </div>
    </div>
  );
};
// Component Input linh hoạt
const LabelInput = ({
  label,
  name,
  value,
  onChange,
  editable = false,
  readOnly = false,
  bg = "bg-gray-200",
}) => (
  <div className="flex items-center gap-2 mb-2">
    <label className="text-sm font-medium text-gray-600 w-1/3">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly || !editable}
      className={`w-2/3 border border-gray-300 rounded-sm px-2 py-1 text-sm ${
        editable ? "bg-white" : bg
      }`}
    />
  </div>
);

// Component Select thông thường
const LabelSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  editable = false,
}) => (
  <div className="flex items-center gap-2 mb-2">
    <label className="text-sm font-medium text-gray-600 w-1/3">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={!editable}
      className="w-2/3 border border-gray-300 rounded-sm px-2 py-1 text-sm bg-gray-200"
    >
      {options.map((option) =>
        typeof option === "object" ? (
          <option key={option.id} value={option.id}>
            {option.name || option.modelName}
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

const LabelDateTime = ({
  label,
  name,
  value,
  onChange,
  editable = false,
  readOnly = false,
}) => (
  <div className="flex items-center gap-2 mb-2">
    <label className="text-sm font-medium text-gray-600 w-1/3">{label}</label>
    <input
      type="datetime-local"
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly || !editable}
      className={`w-2/3 border border-gray-300 rounded-sm px-2 py-1 text-sm ${
        editable ? "bg-white" : "bg-gray-200"
      }`}
    />
  </div>
);

export { LabelReactSelect, LabelDateTime, LabelSelect, LabelInput };
