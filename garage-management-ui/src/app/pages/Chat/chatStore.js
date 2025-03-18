// pages/Chat/chatStore.js
import { signify } from "react-signify";

export const chatStore = signify(
  {
    friendList: "",
    activeChatId: null,
    messages: "",
    loadMessages: false,
    imageLink: "",
    selectFullName: "",
    typeChatOfCashier: "type-1",
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
