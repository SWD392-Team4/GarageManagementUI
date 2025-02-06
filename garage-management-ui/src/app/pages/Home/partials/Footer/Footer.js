import React from "react";
import { useTranslation } from "react-i18next";
import { FaPhone } from "react-icons/fa6";

const Footer = () => {
  const { t } = useTranslation("ver1");

  return (
    <footer className="bg-black text-white py-12 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo và Mô tả */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{t("footer.logoTitle")}</h2>
          <p className="text-gray-400 text-sm mb-6">
            {t("footer.description")}
          </p>
          <div className="flex items-center gap-4">
            <div className="bg-orange-700 p-3 rounded-full">
              <FaPhone />
            </div>
            <span className="text-lg font-bold">{t("footer.phone")}</span>
          </div>
        </div>

        {/* Quick Links - 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {t("footer.quickLink1Title")}
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                {t("footer.quickLink1.about")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                {t("footer.quickLink1.services")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                {t("footer.quickLink1.pricing")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                {t("footer.quickLink1.team")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                {t("footer.quickLink1.contactUs")}
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links - 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {t("footer.quickLink2Title")}
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                {t("footer.quickLink2.appointment")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                {t("footer.quickLink2.faq")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                {t("footer.quickLink2.blogNews")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                {t("footer.quickLink2.team")}
              </a>
            </li>
          </ul>
        </div>

        {/* Location & Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {t("footer.locationContactTitle")}
          </h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center gap-3">
              <span>📍</span>
              <span>{t("footer.locationContact.address")}</span>
            </li>
            <li className="flex items-center gap-3">
              <span>📧</span>
              <span>{t("footer.locationContact.email")}</span>
            </li>
            <li className="flex items-center gap-3">
              <span>⏰</span>
              <span>{t("footer.locationContact.hours")}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-red-950 mt-12 pt-6 text-center text-gray-500 text-sm max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p>{t("footer.footerBottom.copyright")}</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white">
              {t("footer.footerBottom.socialLinks.facebook")}
            </a>
            <a href="#" className="hover:text-white">
              {t("footer.footerBottom.socialLinks.twitter")}
            </a>
            <a href="#" className="hover:text-white">
              {t("footer.footerBottom.socialLinks.instagram")}
            </a>
            <a href="#" className="hover:text-white">
              {t("footer.footerBottom.socialLinks.linkedin")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
