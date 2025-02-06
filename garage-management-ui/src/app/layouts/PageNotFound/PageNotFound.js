import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import Error404Image from "../../assets/404-NotFound/404.png";

export default function PageNotFound() {
  const { t } = useTranslation("ver1"); // Hook dịch để cập nhật ngôn ngữ

  document.title = "Error 404 | Gara | TURBO TRACK";

  return (
    <div className="main-content mt-20">
      <div className="page-content">
        <section className="bg-error bg-auth text-dark">
          <div className="container mx-auto">
            <div className="flex justify-center">
              <div className="lg:w-1/2 text-center">
                <img
                  src={Error404Image}
                  alt="404 Not Found"
                  className="mx-auto mb-5 max-w-full h-auto"
                />
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
                  {t("page_not_found.title")}
                </p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                  {t("page_not_found.description")}
                </p>
                <a
                  href="/"
                  className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
                >
                  {t("page_not_found.go_back")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
