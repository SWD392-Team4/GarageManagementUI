// pages/Chat/Chat.jsx
import React from "react";
import { chatStore } from "./chatStore";

// Import các partial từ file index.js trong partials
import { ChatSearch, ChatList, ChatContent, ChatMsgForm } from "./partials";

const Chat = () => {
  // Lấy state & actions từ store
  const state = chatStore.use();

  // Xử lý event chuyển chat
  const handleSwitchChat = (id) => {
    chatStore.set((v) => {
      v.value.activeChatId = id;
    });
  };

  // Xử lý event gửi tin
  const handleSend = (text) => {
    state.sendMessage({ chatId: state.activeChatId, text });
  };

  return (
    <div className="flex flex-row w-full h-full bg-white">
      {/* Cột trái: Danh sách friend */}
      <div className="w-3/12 border-r p-4">
        <div className="mb-4">
          <ChatSearch />
        </div>
        <ChatList
          friendList={state.friendList}
          activeChatId={state.activeChatId}
          onSwitchChat={handleSwitchChat}
        />
      </div>

      {/* Cột phải: Nội dung chat */}
      <div className="w-9/12 p-4 flex flex-col">
        <div className="flex-1 overflow-auto mb-2">
          <ChatContent messages={state.messages[state.activeChatId] || []} />
        </div>
        <ChatMsgForm onSend={handleSend} />
      </div>
    </div>
  );
};

export default Chat;
