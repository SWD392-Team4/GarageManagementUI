// pages/Chat/partials/ChatContent.jsx
import React, { useEffect, useRef } from "react";
import { chatStore } from "../chatStore";
import "./ChatContent.css"; // import file CSS thuần
import { ConnectionSignify } from "../../Notification/services/connectionSignify";
import { sAccount } from "../../AuthCustomer/services/store";

// SkeletonCard mô phỏng bố cục chat khi dữ liệu chưa load
const SkeletonCard = () => (
  <div className="h-[503px] space-y-3 animate-pulse p-4">
    {/* Tin nhắn từ người khác (căn trái) */}
    <div className="flex items-end justify-start">
      <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
      <div className="flex flex-col space-y-1">
        <div className="w-40 h-4 bg-gray-300 rounded"></div>
        <div className="w-56 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
    {/* Tin nhắn của mình (căn phải) */}
    <div className="flex items-end justify-end">
      <div className="flex flex-col space-y-1 items-end">
        <div className="w-48 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="w-6 h-6 bg-gray-300 rounded-full ml-2"></div>
    </div>
    {/* Một tin nhắn khác từ người khác */}
    <div className="flex items-end justify-start">
      <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
      <div className="flex flex-col space-y-1">
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
        <div className="w-40 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
    {/* Tin nhắn từ người khác (căn trái) */}
    <div className="flex items-end justify-start">
      <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
      <div className="flex flex-col space-y-1">
        <div className="w-40 h-4 bg-gray-300 rounded"></div>
        <div className="w-56 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
    {/* Tin nhắn của mình (căn phải) */}
    <div className="flex items-end justify-end">
      <div className="flex flex-col space-y-1 items-end">
        <div className="w-48 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="w-6 h-6 bg-gray-300 rounded-full ml-2"></div>
    </div>
    {/* Một tin nhắn khác từ người khác */}
    <div className="flex items-end justify-start">
      <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
      <div className="flex flex-col space-y-1">
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
        <div className="w-40 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
    {/* Tin nhắn từ người khác (căn trái) */}
    <div className="flex items-end justify-start">
      <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
      <div className="flex flex-col space-y-1">
        <div className="w-40 h-4 bg-gray-300 rounded"></div>
        <div className="w-56 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
    {/* Tin nhắn của mình (căn phải) */}
    <div className="flex items-end justify-end">
      <div className="flex flex-col space-y-1 items-end">
        <div className="w-48 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="w-6 h-6 bg-gray-300 rounded-full ml-2"></div>
    </div>
    {/* Một tin nhắn khác từ người khác */}
    <div className="flex items-end justify-start">
      <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
      <div className="flex flex-col space-y-1">
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
        <div className="w-40 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
    {/* Tin nhắn từ người khác (căn trái) */}
    <div className="flex items-end justify-start">
      <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
      <div className="flex flex-col space-y-1">
        <div className="w-40 h-4 bg-gray-300 rounded"></div>
        <div className="w-56 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
    {/* Tin nhắn của mình (căn phải) */}
    <div className="flex items-end justify-end">
      <div className="flex flex-col space-y-1 items-end">
        <div className="w-48 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="w-6 h-6 bg-gray-300 rounded-full ml-2"></div>
    </div>
    <div className="flex items-end justify-end">
      <div className="flex flex-col  items-end">
        <div className="w-36 h-3 bg-gray-300 rounded"></div>
      </div>
    </div>
    {/* Một tin nhắn khác từ người khác */}
  </div>
);

function ChatContent2() {
  const state = chatStore.use();
  const connection = ConnectionSignify.use().connection;
  const messagesEndRef = useRef(null);

  const getChatHistory = async () => {
    if (connection) {
      try {
        const chatHistory = await connection.invoke(
          "GetChatHistory",
          state.activeChatId
        );
        chatStore.set((v) => {
          v.value.messages = chatHistory;
        });
      } catch (error) {
        console.error("Error retrieving chat history:", error);
      }
    }
  };
  const GetManagerChatHistory = async () => {
    if (connection) {
      try {
        const chatHistory = await connection.invoke(
          "GetManagerChatHistory",
          null
        );
        chatStore.set((v) => {
          v.value.messages = chatHistory;
        });
      } catch (error) {
        console.error("Error retrieving chat history:", error);
      }
    }
  };

  useEffect(() => {
    if (connection) {
      if (state.activeChatId === null) {
        GetManagerChatHistory();
      } else {
        getChatHistory();
      }
    }
  }, [connection, state.activeChatId, state.loadMessages]);

  // // Sau mỗi lần state.messages thay đổi, scroll đến phần tử cuối cùng
  // useEffect(() => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [state.messages]);

  const myId = sAccount.value.id;

  if (!state.messages) {
    return (
      <div className="text-gray-400 h-[503px]">
        Enter something to talk with instructor
      </div>
    );
  }

  if (state.messages.length === 0) {
    return <div className="text-gray-400  h-[503px]">No messages</div>;
  }

  return (
    // Bọc danh sách tin nhắn trong div với chiều cao tối đa và overflow-y-auto
    <div className="min-h-[503px] max-h-[503px] h-[503px] overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ">
      {state.messages.map((msg, idx) => {
        // Xác định tin nhắn của mình dựa trên id của sender
        const isMe = msg.senderId.id === myId;
        // Kiểm tra tin nhắn này có phải là tin đầu tiên của nhóm không
        const isFirstInGroup =
          idx === 0 || msg.senderId.id !== state.messages[idx - 1].senderId.id;

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
            {/* Nếu tin nhắn không phải của mình, hiển thị avatar bên trái */}
            {!isMe && (
              <img
                src={
                  state.imageLink !== "N/A"
                    ? state.imageLink
                    : "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                }
                alt="Avatar"
                className="w-6 h-6 rounded-full object-cover mr-2"
              />
            )}
            {/* Hiển thị nội dung tin nhắn */}
            <div className={bubbleClass}>
              <span className="block">{msg.message}</span>
            </div>
            {/* Nếu tin nhắn của mình, hiển thị avatar bên phải */}
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
      {/* Dummy div dùng để scroll tới */}
      {/* <div ref={messagesEndRef} /> */}
    </div>
  );
}

export default ChatContent2;
