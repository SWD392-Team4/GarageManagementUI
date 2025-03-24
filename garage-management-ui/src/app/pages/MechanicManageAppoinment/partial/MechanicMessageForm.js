import React from "react";
import { useForm } from "react-hook-form";
import { RiSendPlane2Fill } from "react-icons/ri";
import { ConnectionSignify } from "../../Notification/services/connectionSignify";
import * as signalR from "@microsoft/signalr";
import {
  sendNotification,
  notificationTypes,
} from "../../Notification/services/sendNotification";
import { chatStore } from "../../Chat/chatStore";

function MechanicMessageForm({ appointmentInfo }) {
  const connection = ConnectionSignify.use().connection;
  const { register, handleSubmit, reset, watch } = useForm();
  const messageValue = watch("message", "");

  async function Mechanic(data) {
    if (connection.state === signalR.HubConnectionState.Connected) {
      await connection.invoke(
        "NewMessage",
        data.message,
        appointmentInfo.customerId
      );
      await sendNotification(
        connection,
        notificationTypes.MESSAGE_SENT,
        chatStore.value.activeChatId
      );
      reset();
    } else {
      console.error("SignalR is not connected!");
    }
  }

  // Nếu không có customerId thì không render component
  if (!appointmentInfo?.customerId) {
    return null;
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit(Mechanic)} className="flex items-center">
        <input
          {...register("message", { required: true })}
          className="w-2/3 border border-gray-300 rounded-sm px-2 py-1 text-sm bg-gray-200"
          placeholder={`Nhập tin nhắn gửi tới ${
            appointmentInfo.customerName || "user"
          }`}
        />
        <button
          type="submit"
          disabled={!messageValue}
          className={`px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition duration-200 ${
            !messageValue ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <RiSendPlane2Fill size={20} />
        </button>
      </form>
    </div>
  );
}

export default MechanicMessageForm;
