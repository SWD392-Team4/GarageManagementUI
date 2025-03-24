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
            const currentMessages = chatStore.value.messages || [];
            const currentUserId = sAccount.value.id;
            const currentRole = sAccount.value.role;
            const chatType = v.value.typeChatOfCashier; // "type-1" cho hỗ trợ, "type-2" cho chat cá nhân
            const activeChatId = v.value.activeChatId;
            const isNull = currentMessages.some(
              (message) => message.receiverId === null
            );

            if (message.receiverId === null) {
              // ---- Trường hợp tin hỗ trợ ban đầu ----
              // Khi khách hàng gửi hỗ trợ: senderId là khách hàng, receiverId === null.
              // Cả khách hàng (người gửi) và Cashier (ở mode type-1) đều nhận được tin.
              if (
                currentUserId === message.senderId.id ||
                (currentRole === "Cashier" &&
                  chatType === "type-1" &&
                  activeChatId === message.senderId.id)
              ) {
                v.value.messages = [...currentMessages, message];
              }
            } else {
              // ---- Trường hợp tin nhắn có receiverId (reply trong hỗ trợ hoặc chat cá nhân) ----

              // Nếu đang là Cashier
              if (currentRole === "Cashier") {
                if (chatType === "type-1") {
                  // Trong hỗ trợ (type-1):
                  // - Khi Cashier gửi tin trả lời: activeChatId cần trùng với id khách hàng (message.receiverId.id)
                  // - Khi Cashier nhận tin trả lời từ khách hàng: activeChatId cần trùng với id khách hàng (message.senderId.id)
                  if (
                    (message.senderId.id === currentUserId &&
                      activeChatId === message.receiverId.id) ||
                    (message.senderId.id !== currentUserId &&
                      activeChatId === message.senderId.id)
                  ) {
                    v.value.messages = [...currentMessages, message];
                  }
                } else if (chatType === "type-2") {
                  // Trong chat cá nhân (type-2):
                  // - Khi Cashier gửi tin: activeChatId phải khớp với receiver.
                  // - Khi nhận tin: activeChatId phải khớp với sender.
                  if (message.senderId.id === currentUserId) {
                    if (activeChatId === message.receiverId.id) {
                      v.value.messages = [...currentMessages, message];
                    }
                  } else if (message.receiverId.id === currentUserId) {
                    if (activeChatId === message.senderId.id) {
                      v.value.messages = [...currentMessages, message];
                    }
                  }
                }
              }
              // Nếu đang là Customer (luôn ở chế độ chat cá nhân)
              else {
                // - Khi Customer gửi tin: activeChatId cần trùng với receiver.
                // - Khi Customer nhận tin: activeChatId cần trùng với sender.
                if (message.senderId.id === currentUserId) {
                  if (activeChatId === message.receiverId.id) {
                    v.value.messages = [...currentMessages, message];
                  }
                } else if (message.receiverId.id === currentUserId) {
                  console.log(" message.senderId.id");
                  if (activeChatId === message.senderId.id) {
                    console.log(" message.senderId.id");
                    v.value.messages = [...currentMessages, message];
                  } else if (activeChatId === null && isNull) {
                    v.value.messages = [...currentMessages, message];
                  }
                }
              }
            }

            if (
              message.receiverId === null &&
              message.senderId.id === currentUserId
            ) {
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
    <div className="relative hidden md:block">
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
