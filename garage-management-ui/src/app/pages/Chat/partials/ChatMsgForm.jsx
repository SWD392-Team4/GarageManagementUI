// pages/Chat/partials/ChatMsgForm.jsx
import React, { useState } from "react";
import { chatStore } from "../chatStore";
import { RiSendPlane2Fill } from "react-icons/ri";

function ChatMsgForm() {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    const activeChatId = chatStore.value.activeChatId;
    const oldMsgs = chatStore.value.messages[activeChatId] || [];

    chatStore.set((state) => {
      state.value.messages = {
        ...state.value.messages,
        [activeChatId]: [...oldMsgs, { from: "Me", text }],
      };
    });

    setText("");
  };

  return (
    <div className="border-t border-red-950  pt-3 text-center text-gray-500 text-sm  ">
      <div className="flex">
        <input
          className="border flex-1 rounded-l-sm p-2 text-sm outline-none"
          placeholder="Text . . ."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-r-sm"
          onClick={handleSend}
        >
          <RiSendPlane2Fill />
        </button>
      </div>
    </div>
  );
}

export default ChatMsgForm;
