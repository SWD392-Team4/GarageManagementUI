// pages/Chat/partials/ChatMsgForm.jsx
import React, { useState } from "react";
import { chatStore } from "../chatStore";

function ChatMsgForm() {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    chatStore.value.sendMessage(chatStore.value.activeChatId, text.trim());
    setText("");
  };

  return (
    <div className="flex">
      <input
        className="border flex-1 rounded px-2 py-1"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}

export default ChatMsgForm;
