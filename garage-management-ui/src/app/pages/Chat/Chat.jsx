// pages/Chat/Chat.jsx
import React, { useEffect } from "react";
import { ChatSearch, ChatList, ChatContent, ChatMsgForm } from "./partials";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";
import { ConnectionSignify } from "../Notification/services/connectionSignify";
import { chatStore } from "./chatStore";

const Chat = () => {
  const connection = ConnectionSignify.use().connection;
  const sChat = chatStore.use();
  const getUsers = async () => {
    if (connection) {
      try {
        const chatHistory = await connection.invoke(
          chatStore.value.typeChatOfCashier === "type-1"
            ? "GetChattedUsersByCashierWithDetails"
            : "GetChattedUsersWithDetails"
        );
        chatStore.set((v) => {
          v.value.friendList = chatHistory;
        });
      } catch (error) {
        console.error("Error retrieving chat history:", error);
      }
    }
  };

  useEffect(() => {
    if (connection) {
      getUsers();
    }
  }, [connection, chatStore.value.typeChatOfCashier]);
  console.log("render: ", chatStore.value.typeChatOfCashier);
  return (
    <div className="w-full h-screen bg-blue-100/20 md:p-5 flex flex-col pt-6 ">
      {/* Breadcrumb */}
      <Breadcrumb />
      {/* Khu vực chat */}
      <div className="flex flex-row flex-1 bg-white h-5/6">
        {/* Cột trái: Danh sách friend */}
        <div className="w-3/12 border-r p-4 my-4">
          <div className="mb-4">
            <ChatSearch />
          </div>
          <ChatList />
        </div>
        {/* Cột phải: Nội dung chat */}
        <div className="w-9/12 md:p-4 flex flex-col">
          {/* Khu vực nội dung chat: chiếm không gian còn lại và có thanh cuộn khi cần */}
          <div className="flex-1 overflow-y-auto  bg-blue-200/25 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <div className="p-4">
              <ChatContent />
            </div>
          </div>
          {/* Form gửi tin */}
          <ChatMsgForm />
        </div>
      </div>
    </div>
  );
};

export default Chat;
