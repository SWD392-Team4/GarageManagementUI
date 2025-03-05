import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NotificationItem from "./partials/NotificationItem";
import { fetchNotifications } from "./services/notificationApi";
import { GoBell } from "react-icons/go";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    // Gọi API để lấy danh sách thông báo khi component được mount
    fetchNotifications().then((data) => {
      setNotifications(data);
    });

    // TODO: Tích hợp thông báo đẩy (push notifications) tại đây nếu cần,
    // ví dụ qua WebSocket hoặc Service Worker.
  }, []);

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="focus:outline-none">
        <GoBell className="text-xl" />
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h6 className="text-gray-800 font-semibold">Notifications</h6>
            <div className="space-x-2">
              <Link to="#" className="text-sm text-blue-500 hover:underline">
                mark as read
              </Link>
              <Link to="#" className="text-sm text-blue-500 hover:underline">
                clear all
              </Link>
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            <div className="px-4 py-2 text-xs text-gray-500 uppercase">New</div>
            {notifications
              .filter((item) => item.isNew)
              .map((item) => (
                <NotificationItem key={item.id} notification={item} />
              ))}
            <div className="px-4 py-2 text-xs text-gray-500 uppercase">
              Earlier
            </div>
            {notifications
              .filter((item) => !item.isNew)
              .map((item) => (
                <NotificationItem key={item.id} notification={item} />
              ))}
          </div>
          <div className="p-4 border-t text-center">
            <Link to="#" className="text-sm text-blue-500 hover:underline">
              show all
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
