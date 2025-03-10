// pages/Chat/chatStore.js
import { signify } from "react-signify";

export const chatStore = signify(
  {
    friendList: "",
    activeChatId: 1,
    messages: "",
    loadMessages: false,
    imageLink: "",
    selectFullName: "",
  },
  {
    cache: {
      key: "chat",
    },
  }
);
export const newChat = signify({
  id: "",
  imageLink: "",
  firstName: "",
  lastName: "",
});
