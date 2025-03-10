import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NotificationItem from "./partials/NotificationItem";
import { GoBell } from "react-icons/go";
import { newConnection } from "./services/SignalRService";
import * as signalR from "@microsoft/signalr";
import { ConnectionSignify } from "./services/connectionSignify";
import { chatStore } from "../Chat/chatStore";
import { sAccount } from "../AuthCustomer/services/store";
const Notification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const sConnecttion = ConnectionSignify.use();
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const connection = newConnection();
    async function startConnection() {
      try {
        await connection.start();
        console.log("✅ Connected to Azure SignalR!");
        connection.on("ReceiveMessage", (message) => {
          console.log("📩 New message received:", message);

          chatStore.set((v) => {
            const currentMessages = v.value.messages || [];
            v.value.messages = [...currentMessages, message];
            const currentUserId = sAccount.value.id;
            const friendCandidate =
              message.senderId.id === currentUserId
                ? message.receiverId
                : message.senderId;

            // Nếu friendCandidate chưa có trong friendList thì add vào
            const friendExists = v.value.friendList.some(
              (friend) => friend.id === friendCandidate.id
            );
            if (!friendExists) {
              v.value.friendList = [...v.value.friendList, friendCandidate];
            }
          });
        });

        connection.on("ReceiveNotification", (notification) => {
          console.log("🔔 New notification:", notification);
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            notification,
          ]);
        });
        ConnectionSignify.set((v) => {
          v.value.connection = connection;
        });
      } catch (err) {
        console.error("❌ SignalR Connection Error:", err);
      }
    }

    startConnection();

    return () => {
      if (
        newConnection &&
        newConnection.state === signalR.HubConnectionState.Connected
      ) {
        console.log("⚠️ Disconnecting SignalR...");
        newConnection.stop();
      }
    };
  }, []);

  const getNotificationHistory = async () => {
    if (sConnecttion.connection) {
      try {
        const notificationHistory = await sConnecttion.connection.invoke(
          "GetNotifications"
        );
        setNotifications(notificationHistory);
      } catch (error) {
        console.error("Error retrieving chat history:", error);
      }
    }
  };

  const sendNotification = async () => {
    const notification = "content here";
    if (notification.trim() === "") return;
    try {
      if (sConnecttion.connection) {
        await sConnecttion.connection.invoke(
          "SendNotification",
          receiverId,
          notification
        );
      }
    } catch (error) {
      console.error("Send message failed:", error);
    }
  };

  const markNotificationsAsRead = async () => {
    if (sConnecttion.connection) {
      try {
        await sConnecttion.connection.send("MarkNotificationAsRead");
        console.log("Marked notifications as read.");
        await getNotificationHistory();
      } catch (error) {
        console.error("Failed to mark messages as read:", error);
      }
    }
  };
  useEffect(() => {
    getNotificationHistory();
  }, [sConnecttion.connection]);
  console.log("notifications: ", notifications);

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
              .filter((item) => !item.isRead)
              .map((item, index) => (
                <NotificationItem key={index} notification={item} />
              ))}
            <div className="px-4 py-2 text-xs text-gray-500 uppercase">
              Earlier
            </div>
            {notifications
              .filter((item) => item.isRead)
              .map((item, index) => (
                <NotificationItem key={index} notification={item} />
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
