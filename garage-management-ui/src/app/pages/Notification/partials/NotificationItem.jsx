import React from "react";
import { useTranslation } from "react-i18next";
import { TiTickOutline } from "react-icons/ti";

const NotificationItem = ({ notification, onClick }) => {
  const { t } = useTranslation("notifications");

  return (
    <div
      className="flex items-start p-4 hover:bg-gray-100 border-b"
      onClick={onClick}
    >
      {notification.senderId.imageLink !== "N/A" ? (
        <img
          src={notification.senderId.imageLink}
          alt="notification"
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
      ) : (
        <div className="mr-3 ">📩</div>
      )}
      <div className="flex-1">
        <p className="text-sm text-gray-800">
          <span className="font-semibold">{t(notification.message)}</span>
          <span className="text-gray-500 ml-2 text-xs">
            <i className="feather icon-clock mr-1"></i>
            {notification.time}
          </span>
        </p>
        <p className="text-xs text-gray-600">
          {t("from")}: {notification.senderId.firstName}{" "}
          {notification.senderId.lastName}
        </p>
      </div>
    </div>
  );
};

export default NotificationItem;
