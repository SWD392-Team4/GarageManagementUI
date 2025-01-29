import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) // Dùng HttpApi để load file JSON
  .use(LanguageDetector) // Phát hiện ngôn ngữ
  .use(initReactI18next) // Tích hợp với React
  .init({
    fallbackLng: "en", // Ngôn ngữ mặc định
    debug: true, // Hiển thị log để debug
    interpolation: {
      escapeValue: false, // Không cần escape ký tự HTML
    },
    backend: {
      // Đường dẫn tới file JSON dịch
      loadPath: "/locales/{{lng}}/{{lng}}.json",
    },
    detection: {
      // Phương thức phát hiện ngôn ngữ
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage"], // Lưu ngôn ngữ trong localStorage
    },
  });

export default i18n;
