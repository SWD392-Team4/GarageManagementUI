// pages/Chat/chatStore.js
import { signify } from "react-signify";

export const chatStore = signify({
  friendList: [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ],
  activeChatId: 1,
  messages: {
    1: [{ from: "Alice", text: "Hi there!" }],
    2: [{ from: "Bob", text: "Hello!" }],
  },
});
