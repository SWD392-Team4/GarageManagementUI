import React from "react";

const NotificationItem = ({ notification }) => {
  return (
    <div className="flex items-start p-4 hover:bg-gray-100 border-b">
      <img
        src={notification.avatar}
        alt="notification"
        className="w-10 h-10 rounded-full object-cover mr-3"
      />
      <div className="flex-1">
        <p className="text-sm text-gray-800">
          <strong>{notification.sender}</strong>
          <span className="text-gray-500 ml-2 text-xs">
            <i className="feather icon-clock mr-1"></i>
            {notification.time}
          </span>
        </p>
        <p className="text-xs text-gray-600">{notification.message}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
