// pages/Chat/partials/ChatContent.jsx
import React from "react";
import { chatStore } from "../chatStore";
import "./ChatContent.css"; // import file CSS thuần

function ChatContent() {
  const activeChatId = chatStore.value.activeChatId;
  const messages = chatStore.value.messages[activeChatId] || [];

  if (!messages || messages.length === 0) {
    return <div className="text-gray-400">No messages</div>;
  }

  return (
    <div className="space-y-3">
      {messages.map((msg, idx) => {
        // Xác định tin nhắn này là của "Me" hay của user khác
        const isMe = msg.from === "Me";

        const isFirstInGroup = idx === 0 || msg.from !== messages[idx - 1].from;

        let bubbleClass = `bubble ${isMe ? "bubble-me" : "bubble-other"}`;
        if (isFirstInGroup) {
          bubbleClass += ` ${isMe ? "arrow-right" : "arrow-left"}`;
        }

        return (
          <div
            key={idx}
            className={`flex items-end ${
              isMe ? "justify-end" : "justify-start"
            }`}
          >
            {/* Nếu là user khác, icon nằm bên trái */}
            {!isMe && (
              <img
                src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                alt="Avatar"
                className="w-6 h-6 rounded-full object-cover mr-2"
              />
            )}

            {/* Bubble chat */}
            <div className={bubbleClass}>
              <span className="block">{msg.text}</span>
            </div>

            {/* Nếu là mình, icon nằm bên phải */}
            {isMe && (
              <img
                src="https://as2.ftcdn.net/v2/jpg/09/37/40/83/1000_F_937408328_ZhK92JRrPqjUlFROdHqOyJQeoIorEvqM.jpg"
                alt="Avatar"
                className="w-6 h-6 rounded-full object-cover ml-2"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ChatContent;
