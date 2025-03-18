import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowRight } from "react-icons/fi";
import { sLookUp } from "../services/LookUpSignify";

export default function StepLookUp() {
    // Lấy hàm t từ hook useTranslation với namespace "BookingOnline"
    const { t } = useTranslation("look_up_page");
    useEffect(() => {
        sLookUp.reset();
    }, []);
    return (
        <div>
            <div className="text-center md:mb-10 ">
                <h2 className="text-6xl font-semibold mb-2 font-handjet">
                    {t("look_up_page.step_page.title")}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">{t("look_up_page.step_page.description")}</p>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-6 relative">
                {/* Bước 1 */}
                <div className="flex-1 bg-white shadow rounded-sm p-4 text-center relative z-10">
                    <div className="mb-4">
                        <img
                            src="/assets/booking/icon-home-1.svg"
                            alt={t("look_up_page.step_page.find_garage")}
                            className="mx-auto w-16 h-16"
                        />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-red-800">
                        {t("look_up_page.step_page.find_garage")}
                    </h3>
                    <p className="text-gray-600">{t("look_up_page.step_page.column1Description")}</p>
                </div>

                {/* Arrow giữa bước 1 và bước 2 */}
                <div className="hidden lg:block -mx-8 z-20">
                    <FiArrowRight className="text-red-500 text-6xl p-4 bg-white rounded-full shadow-lg border" />
                </div>

                {/* Bước 2 */}
                <div className="flex-1 bg-white shadow rounded-sm p-4 text-center relative z-10">
                    <div className="mb-4">
                        <img
                            src="/assets/booking/icon-home-2.svg"
                            alt={t("look_up_page.step_page.column2Title")}
                            className="mx-auto w-16 h-16"
                        />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-red-800">
                        {t("look_up_page.step_page.column2Title")}
                    </h3>
                    <p className="text-gray-600">{t("look_up_page.step_page.column2Description")}</p>
                </div>

                {/* Arrow giữa bước 2 và bước 3 */}
                <div className="hidden lg:block -mx-8 z-20">
                    <FiArrowRight className="text-red-500 text-6xl p-4 bg-white rounded-full shadow-lg border" />
                </div>

                {/* Bước 3 */}
                <div className="flex-1 bg-white shadow rounded-sm p-4 text-center relative z-10">
                    <div className="mb-4">
                        <img
                            src="/assets/booking/icon-home-3.svg"
                            alt={t("look_up_page.step_page.column3Title")}
                            className="mx-auto w-16 h-16"
                        />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-red-800">
                        {t("look_up_page.step_page.column3Title")}
                    </h3>
                    <p className="text-gray-600">{t("look_up_page.step_page.column3Description")}</p>
                </div>
            </div>

            {/* Nút Find Garage */}
            <div className="text-center mt-10 ">
                <div className=" flex justify-center items-end ">
                    <div className="group/link">
                        <div className="border-b  border-orange-700 h-1 w-5 group-hover/link:w-[160px] transition-all duration-300"></div>

                        <Link
                            to={"select-garage"}
                            className="inline-flex items-center text-gray-700 font-semibold uppercase text-sm md:text-2xl  group-hover/link:text-rose-700 duration-300 transition-colors"
                        >
                            {t("look_up_page.step_page.buttonFindGarage")}
                        </Link>
                        <div className="border-t  border-orange-700 h-1 w-0 group-hover/link:w-[140px] transition-all duration-300"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
