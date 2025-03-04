// pages/Chat/partials/ChatList.jsx
import React from "react";
import { chatStore } from "../chatStore";

function ChatList({ activeChatId, onSwitchChat }) {
  return (
    <div className="space-y-1">
      {chatStore.value.friendList.map((friend) => (
        <div
          key={friend.id}
          className={`p-2 rounded cursor-pointer ${
            friend.id === chatStore.value.activeChatId
              ? "bg-blue-100"
              : "hover:bg-gray-100"
          }`}
          onClick={() => onSwitchChat(friend.id)}
        >
          {friend.name}
        </div>
      ))}
    </div>
  );
}

export default ChatList;
