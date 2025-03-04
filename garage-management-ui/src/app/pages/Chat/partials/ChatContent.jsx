// pages/Chat/partials/ChatContent.jsx
import React from "react";
import { chatStore } from "../chatStore";

function ChatContent({ messages }) {
  if (!messages || messages.length === 0) {
    return <div className="text-gray-400">No messages</div>;
  }

  return (
    <div className="space-y-2">
      {messages.map((msg, idx) => (
        <div key={idx} className="flex flex-col">
          <span className="font-semibold">{msg.from}:</span>
          <span>{msg.text}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatContent;
