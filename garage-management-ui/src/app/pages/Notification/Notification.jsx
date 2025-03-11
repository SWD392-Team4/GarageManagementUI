import React, { useEffect, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { GoBell } from "react-icons/go";
import { Link } from "react-router-dom";
import { sAccount } from "../AuthCustomer/services/store";
import { chatStore } from "../Chat/chatStore";
import NotificationItem from "./partials/NotificationItem";
import { ConnectionSignify } from "./services/connectionSignify";
import { newConnection } from "./services/SignalRService";
import { useTranslation } from "react-i18next";

const Notification = () => {
  const { t } = useTranslation("notifications");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const sConnecttion = ConnectionSignify.use();
  const [notifications, setNotifications] = useState([]);
  const isMounted = useRef(true);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const connection = newConnection();

    const startConnection = async () => {
      try {
        await connection.start();
        console.log("✅ Connected to Azure SignalR!");

        connection.on("ReceiveMessage", (message) => {
          console.log("📩 New message received:", message);
          chatStore.set((v) => {
            const currentMessages = v.value.messages || [];
            v.value.messages = [...currentMessages, message];
            const currentUserId = sAccount.value.id;
            if (message.receiverId === null) {
              const friendCandidate = {
                id: null,
                firstName: "Cashier",
                lastName: "",
                imageLink: "",
              };
              v.value.friendList = [...v.value.friendList, friendCandidate];
            } else {
              const friendCandidate =
                message.senderId.id === currentUserId
                  ? message.receiverId
                  : message.senderId;
              const friendExists = v.value.friendList.some(
                (friend) => friend.id === friendCandidate.id
              );
              if (!friendExists) {
                v.value.friendList = [...v.value.friendList, friendCandidate];
              }
            }
          });
        });

        connection.on("ReceiveNotification", (notification) => {
          console.log("🔔 New notification:", notification);
          if (isMounted.current) {
            setNotifications((prevNotifications) => [
              ...prevNotifications,
              notification,
            ]);
          }
        });

        ConnectionSignify.set((v) => {
          v.value.connection = connection;
        });
      } catch (err) {
        console.error("❌ SignalR Connection Error:", err);
      }
    };

    startConnection();

    // Cleanup: hủy các sự kiện và dừng connection
    return () => {
      isMounted.current = false;
      connection.off("ReceiveMessage");
      connection.off("ReceiveNotification");
      if (connection.state === signalR.HubConnectionState.Connected) {
        console.log("⚠️ Disconnecting SignalR...");
        connection.stop();
      }
    };
  }, [sAccount]);

  const getNotificationHistory = async () => {
    if (sConnecttion.connection) {
      try {
        const notificationHistory = await sConnecttion.connection.invoke(
          "GetNotifications"
        );
        if (isMounted.current) {
          setNotifications(notificationHistory);
        }
      } catch (error) {
        console.error("Error retrieving notification history:", error);
      }
    }
  };

  const markNotificationsAsRead = async () => {
    if (sConnecttion.connection) {
      try {
        await sConnecttion.connection.send("MarkNotificationAsRead");
        console.log("Marked notifications as read.");
        await getNotificationHistory();
      } catch (error) {
        console.error("Failed to mark notifications as read:", error);
      }
    }
  };

  useEffect(() => {
    getNotificationHistory();
  }, [sConnecttion.connection]);

  // Tính số lượng thông báo chưa đọc
  const unreadCount = notifications.filter((item) => !item.isRead).length;

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="focus:outline-none relative">
        <GoBell className="text-3xl" />{" "}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-sm text-gray-200">
            {unreadCount}
          </span>
        )}
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-5 w-80 bg-white border rounded shadow-lg z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h6 className="text-gray-800 font-semibold">
              {t("notifications")}
            </h6>
            <div className="space-x-2">
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  markNotificationsAsRead();
                }}
                className="text-sm text-blue-500 hover:underline"
              >
                {t("markAsRead")}
              </Link>
              {/* <Link to="#" className="text-sm text-blue-500 hover:underline">
                {t("clearAll")}
              </Link> */}
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            <div className="px-4 py-2 text-xs text-gray-500 uppercase">
              {t("new")}
            </div>
            {notifications
              .filter((item) => !item.isRead)
              .map((item, index) => (
                <NotificationItem
                  key={index}
                  onClick={() => {
                    markNotificationsAsRead();
                  }}
                  notification={item}
                />
              ))}
            <div className="px-4 py-2 text-xs text-gray-500 uppercase">
              {t("earlier")}
            </div>
            {notifications
              .filter((item) => item.isRead)
              .map((item, index) => (
                <NotificationItem key={index} notification={item} />
              ))}
          </div>
          <div className="p-4 border-t text-center">
            {/* <Link to="#" className="text-sm text-blue-500 hover:underline">
              {t("showAll")}
            </Link> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
