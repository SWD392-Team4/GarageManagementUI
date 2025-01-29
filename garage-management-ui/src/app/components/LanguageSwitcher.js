import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Danh sách ngôn ngữ
  const languages = [
    { code: "en", label: "English", flag: "us" }, // Cờ Mỹ (us)
    { code: "vi", label: "Vietnamese", flag: "vn" }, // Cờ Việt Nam (vn)
  ];

  // Lấy ngôn ngữ hiện tại
  const currentLanguage = languages.find(
    (lang) => lang.code === i18n.language
  ) || { label: "English", flag: "us" };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false); // Đóng dropdown
  };

  return (
    <div className="relative inline-block text-left">
      {/* Nút chính */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2  bg-gray-100/20 text-white rounded-lg shadow-md hover:bg-gray-100/50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
      >
        <span className={`fi fi-${currentLanguage.flag} mr-2`}></span>
        <span>{currentLanguage.label}</span>
        <svg
          className="w-4 h-4 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white/20 rounded-lg shadow-lg z-50 border border-gray-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center px-4 py-2 w-full text-left rounded-md  text-white hover:bg-gray-100/50 transition duration-150 ${
                i18n.language === lang.code ? "font-bold" : ""
              }`}
            >
              <span className={`fi fi-${lang.flag} mr-2`}></span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
