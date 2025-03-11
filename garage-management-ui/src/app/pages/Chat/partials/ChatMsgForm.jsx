import React from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { ConnectionSignify } from "../../Notification/services/connectionSignify";
import { chatStore } from "../chatStore";
import * as signalR from "@microsoft/signalr";
import { useForm } from "react-hook-form";
import {
  notificationTypes,
  sendNotification,
} from "../../Notification/services/sendNotification";

function ChatMsgForm() {
  const connection = ConnectionSignify.use().connection;

  const { register, handleSubmit, reset, watch } = useForm();

  const messageValue = watch("message", "");

  async function sendMessage(data) {
    if (connection.state === signalR.HubConnectionState.Connected) {
      if (
        chatStore.value.activeChatId !== 1 &&
        chatStore.value.activeChatId !== null
      ) {
        await connection.invoke(
          "NewMessage",
          data.message,
          chatStore.value.activeChatId
        );
        await sendNotification(
          connection,
          notificationTypes.MESSAGE_SENT,
          chatStore.value.activeChatId
        );
      } else {
        await connection.invoke("SendMessageToManagers", data.message, null);
      }
      reset();
    } else {
      console.error("SignalR is not connected!");
    }
  }

  return (
    <div className="border-t border-red-950 md:pt-3 text-center text-gray-500 text-sm">
      <form onSubmit={handleSubmit(sendMessage)} className="flex">
        <input
          {...register("message", { required: true })}
          className="border flex-1 rounded-l-sm p-2 text-sm outline-none"
          placeholder="Text . . ."
        />
        <button
          type="submit"
          disabled={!messageValue && chatStore.value.activeChatId !== null}
          className={`px-4 py-2 bg-blue-500 text-white rounded-r-sm ${
            !messageValue ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <RiSendPlane2Fill />
        </button>
      </form>
    </div>
  );
}

export default ChatMsgForm;
