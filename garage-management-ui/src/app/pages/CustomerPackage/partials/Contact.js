import React from "react";
import { useTranslation } from "react-i18next";
import { IoChevronForward, IoLocationSharp, IoCall, IoMail } from "react-icons/io5";
const Contact = () => {
  const { t } = useTranslation("customer_package_contact");
  return (
    <div className=" p-6 ">
      <h3 className="text-2xl font-semibold mb-2 relative pb-2 border-b-4 border-red-500 inline-block">
      {t("customer_package_contact.title")}
      </h3>
      <ul className="text-lg space-y-2 mt-3 text-gray-700">
        <li className="flex items-center space-x-2">
          <IoLocationSharp className="text-red-500" />
          <span>{t("customer_package_contact.address")}</span>
        </li>
        <li className="flex items-center space-x-2">
          <IoCall className="text-red-500" />
          <a href="tel:+880123456789" className="hover:underline">
            1-800-915-6271
          </a>
        </li>
        <li className="flex items-center space-x-2">
          <IoMail className="text-red-500" />
          <a href="mailto:info@example.com" className="hover:underline">
            email@email.com
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Contact;
