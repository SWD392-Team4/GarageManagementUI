import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcherSideBar = ({ isSidebarOpen }) => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: "en", label: "English", flag: "us" },
        { code: "vi", label: "Tiếng Việt", flag: "vn" },
    ];

    // Lấy ngôn ngữ hiện tại
    const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* ✅ Nút thay đổi ngôn ngữ */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center w-full p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-lg"
            >
                <span className="text-2xl">{currentLanguage.flag}</span>
                {isSidebarOpen && <span className="ml-3">{currentLanguage.label}</span>}
            </button>

            {/* ✅ Dropdown chọn ngôn ngữ */}
            {isOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`flex items-center px-4 py-2 w-full text-left text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition rounded-md ${i18n.language === lang.code ? "font-bold" : ""
                                }`}
                        >
                            <span className="text-2xl mr-2">{lang.flag}</span>
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcherSideBar;
