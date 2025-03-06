import React, { useEffect, useState, useMemo } from "react";
import { BiChevronDown } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";

const CustomSelect = ({
  name,
  value,
  onChange,
  resetFlag,
  clearErrors,
  optionsData, // Danh sách dữ liệu truyền vào nếu có
  fetchOptions, // Hàm fetch dữ liệu nếu không truyền optionsData
  placeholder = "Select an option",
}) => {
  // Sử dụng optionsData truyền vào nếu có, nếu không sẽ dùng dữ liệu fetch từ fetchOptions
  const [options, setOptions] = useState(optionsData || []);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || null);

  // Nếu không có dữ liệu truyền vào, fetch dữ liệu bằng fetchOptions
  useEffect(() => {
    if (!optionsData && fetchOptions) {
      const fetchData = async () => {
        const result = await fetchOptions();
        setOptions(result?.data || []);
      };
      fetchData();
    }
  }, [optionsData, fetchOptions]);

  // Đồng bộ giá trị bên ngoài với state trong component
  useEffect(() => {
    if (value !== selectedOption) {
      setSelectedOption(value);
    }
  }, [value]);

  // Xử lý reset khi có resetFlag
  useEffect(() => {
    if (resetFlag) {
      setSelectedOption(null);
      setInputValue("");
    }
  }, [resetFlag]);

  // Tối ưu lọc dữ liệu dựa trên input search
  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [options, inputValue]);

  const handleSelect = (id) => {
    setSelectedOption(id);
    setIsOpen(false);
    if (onChange) onChange(id);
    setInputValue("");
    if (clearErrors) clearErrors(name);
  };

  const selectedOptionName = options.find(
    (item) => item.id === selectedOption
  )?.name;

  return (
    <div className="w-full">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full p-2 flex items-center justify-between bg-neutral-200 rounded-t-lg py-4 px-4 ${
          !selectedOptionName && "text-gray-700"
        }`}
      >
        {selectedOptionName
          ? selectedOptionName.length > 25
            ? selectedOptionName.substring(0, 25) + "..."
            : selectedOptionName
          : placeholder}
        <BiChevronDown size={20} className={`${isOpen ? "rotate-180" : ""}`} />
      </div>
      <ul
        className={`bg-neutral-50 mt-2 overflow-y-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200 transition-all duration-300 ${
          isOpen ? "max-h-32" : "max-h-0"
        }`}
      >
        <div className="flex items-center px-2 sticky top-0 bg-neutral-50 gap-2.5">
          <CiSearch className="text-rose-500 text-xl" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter name to search"
            onBlur={() => setIsOpen(false)}
            className="text-sm flex-1 caret-rose-600 outline-none"
          />
        </div>
        {filteredOptions.map((option) => (
          <li
            key={option.id}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white cursor-pointer ${
              option.id === selectedOption ? "bg-sky-600 text-white" : ""
            }`}
            onClick={() => handleSelect(option.id)}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
