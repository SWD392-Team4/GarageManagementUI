// pages/Chat/chatStore.js
import { signify } from "react-signify";

export const chatStore = signify(
  {
    friendList: [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ],
    activeChatId: 1,
    messages: {
      1: [{ from: "Alice", text: "Hi there!" }],
      2: [{ from: "Bob", text: "Hello!" }],
    },

    setActiveChat(id) {
      this.activeChatId = id;
    },

    sendMessage({ chatId, text }) {
      console.log("chat text:", chatId, text);
      const oldMsgs = this.messages[chatId] || [];
      const newMsg = { from: "Me", text };
      this.messages = {
        ...this.messages,
        [chatId]: [...oldMsgs, newMsg],
      };
    },
  },
  {
    cache: {
      key: "chat",
    },
  }
);
