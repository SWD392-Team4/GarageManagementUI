// pages/Chat/partials/ChatList.jsx
import React from "react";
import { chatStore, newChat } from "../chatStore";
import { sAccount } from "../../AuthCustomer/services/store";

const SkeletonCard = () => (
  <div className="relative flex flex-col items-center animate-pulse">
    <div className="p-4    relative w-full">
      <div> You not have any messages</div>
      {sAccount.value.role === "Customer" ? (
        <div> New conversation</div>
      ) : (
        <div></div>
      )}
      <div className="flex justify-center  mt-5">
        <div className="  w-16 md:w-16 h-16 md:h-16 bg-gray-300 rounded-full mr-3" />
        <div className=" h-15 w-3/4 bg-gray-300 rounded" />
      </div>
      <div className="flex justify-center  mt-5">
        <div className="  w-16 md:w-16 h-16 md:h-16 bg-gray-300 rounded-full mr-3" />
        <div className=" h-15 w-3/4 bg-gray-300 rounded" />
      </div>
      <div className="flex justify-center  mt-5">
        <div className="  w-16 md:w-16 h-16 md:h-16 bg-gray-300 rounded-full mr-3" />
        <div className=" h-15 w-3/4 bg-gray-300 rounded" />
      </div>
      <div className="flex justify-center  mt-5">
        <div className="  w-16 md:w-16 h-16 md:h-16 bg-gray-300 rounded-full mr-3" />
        <div className=" h-15 w-3/4 bg-gray-300 rounded" />
      </div>
      <div className="flex justify-center  mt-5">
        <div className="  w-16 md:w-16 h-16 md:h-16 bg-gray-300 rounded-full mr-3" />
        <div className=" h-15 w-3/4 bg-gray-300 rounded" />
      </div>
      <div className="flex justify-center  mt-5">
        <div className="  w-16 md:w-16 h-16 md:h-16 bg-gray-300 rounded-full mr-3" />
        <div className=" h-15 w-3/4 bg-gray-300 rounded" />
      </div>
    </div>
  </div>
);

function ChatList() {
  const handleSwitchChat = (id, imageLink) => {
    chatStore.set((v) => {
      v.value.activeChatId = id;
      v.value.loadMessages = !v.value.loadMessages;
      v.value.messages = "";
      v.value.imageLink = imageLink;
    });
  };

  // Lấy state & actions từ store
  const state = chatStore.use();
  return (
    <div className="space-y-1 h-5/6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {newChat.value.firstName ? (
        <div className="group">
          <div
            className={`p-2 cursor-pointer group ${
              state.activeChatId === newChat.value.id
                ? "bg-blue-100/50"
                : "hover:bg-gray-100"
            }`}
            onClick={() =>
              handleSwitchChat(newChat.value.id, newChat.value.imageLink)
            }
          >
            <div className="flex items-center text-xl">
              <img
                src={
                  newChat.value.imageLink !== "N/A"
                    ? newChat.value.imageLink
                    : "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                }
                alt="Avatar"
                className=" h-12 rounded-full object-cover hidden md:block w-12 max-w-full cursor-pointer mr-2"
              />
              <div className="md:text-base text-xs max-w-full md:font-space md:font-semibold md:w-10/12 md:truncate">
                {newChat.value.firstName} {newChat.value.lastName}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 h-1 transition-all duration-500 w-0 group-hover:w-full"></div>
        </div>
      ) : (
        <div> </div>
      )}
      {state.friendList && state.friendList.length > 0 ? (
        state.friendList.map((friend) => (
          <div className="group" key={friend.id}>
            <div
              className={`p-2 cursor-pointer group ${
                state.activeChatId === friend.id
                  ? "bg-blue-100/50"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleSwitchChat(friend.id, friend.imageLink)}
            >
              <div className="flex items-center text-xl">
                <img
                  src={
                    friend.imageLink !== "N/A"
                      ? friend.imageLink
                      : "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                  }
                  alt="Avatar"
                  className=" h-12 rounded-full object-cover hidden md:block w-12 max-w-full cursor-pointer mr-2"
                />
                <div className="md:text-base text-xs max-w-full md:font-space md:font-semibold md:w-10/12 md:truncate">
                  {friend.firstName} {friend.lastName}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 h-1 transition-all duration-500 w-0 group-hover:w-full"></div>
          </div>
        ))
      ) : (
        <SkeletonCard />
      )}
    </div>
  );
}

export default ChatList;
