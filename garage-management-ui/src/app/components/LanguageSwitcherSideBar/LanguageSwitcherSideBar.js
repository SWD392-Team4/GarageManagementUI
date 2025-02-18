import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "flag-icons/css/flag-icons.min.css"; // Import CSS của flag-icons

const LanguageSwitcherSideBar = ({ isSidebarOpen }) => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: "en", label: "English", flag: "us" },
        { code: "vi", label: "Tiếng Việt", flag: "vn" },
    ];

    const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center w-full p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-lg"
            >
                <span className={`fi fi-${currentLanguage.flag} w-6 h-6`}></span>
                {isSidebarOpen && <span className="ml-3">{currentLanguage.label}</span>}
            </button>

            {isOpen && (
                <div className="absolute bottom-full right-1 mb-3 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`flex items-center px-4 py-2 w-full text-left text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition rounded-md ${i18n.language === lang.code ? "font-bold" : ""
                                }`}
                        >
                            <span className={`fi fi-${lang.flag} w-6 h-6 mr-2`}></span>
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcherSideBar;
