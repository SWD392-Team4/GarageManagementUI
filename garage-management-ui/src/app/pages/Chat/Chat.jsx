// pages/Chat/Chat.jsx
import React from "react";
import { chatStore } from "./chatStore";

// Import các partial từ file index.js trong partials
import { ChatSearch, ChatList, ChatContent, ChatMsgForm } from "./partials";
import Breadcrumb from "../AdminManageAppoinment/partials/Breadcrumb";

const Chat = () => {
  return (
    <>
      <div className="w-full h-screen bg-blue-100/20 p-5 flex flex-col">
        {/* Phần breadcrumb ở trên */}
        <Breadcrumb />

        {/* Phần chat bên dưới, chiếm hết không gian còn lại */}
        <div className="flex flex-row flex-1 bg-white">
          {/* Cột trái: Danh sách friend */}
          <div className="w-3/12 border-r p-4 my-4">
            <div className="mb-4">
              <ChatSearch />
            </div>
            <ChatList />
          </div>

          {/* Cột phải: Nội dung chat */}
          <div className="w-9/12 p-4 flex flex-col">
            {/* Nội dung chat, cho phép cuộn */}
            <div className="flex-1 overflow-auto mb-4 p-4 bg-blue-200/25">
              <ChatContent />
            </div>
            <ChatMsgForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
