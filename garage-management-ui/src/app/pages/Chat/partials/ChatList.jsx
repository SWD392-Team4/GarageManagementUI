// pages/Chat/partials/ChatList.jsx
import React from "react";
import { chatStore } from "../chatStore";
import { FaUserCircle } from "react-icons/fa";

function ChatList() {
  const handleSwitchChat = (id) => {
    chatStore.set((v) => {
      v.value.activeChatId = id;
    });
  };

  return (
    <div className="space-y-1">
      {chatStore.value.friendList.map((friend) => (
        <div className="group">
          <div
            key={friend.id}
            className={`p-2  cursor-pointer group ${
              friend.id === chatStore.value.activeChatId
                ? "bg-blue-100/50"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleSwitchChat(friend.id)}
          >
            <div className="flex items-center text-2xl font-shadows">
              <img
                src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover cursor-pointer mr-2 "
              />
              {friend.name}
            </div>
          </div>

          <div className="border-t border-gray-700 h-1 transition-all duration-500 w-0 group-hover:w-full"></div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
