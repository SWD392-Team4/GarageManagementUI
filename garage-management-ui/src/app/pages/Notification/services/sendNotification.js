export const notificationTypes = {
  MESSAGE_SENT: "messages.newMessage",
  APPOINTMENT_ASSIGNED: "messages.appointmentAssigned",
};

/**
 * Gửi thông báo thông qua SignalR.
 *
 * @param {object} connection - Kết nối SignalR được khởi tạo.
 * @param {string} notificationType - Key của thông báo cần gửi (ví dụ: notificationTypes.MESSAGE_SENT).
 * @param {number|string} chatId - Id của cuộc trò chuyện hoặc đối tượng liên quan.
 */
export const sendNotification = async (
  connection,
  notificationType,
  chatId
) => {
  if (!notificationType.trim()) return;
  console.log("helu");
  try {
    if (connection) {
      await connection.invoke("SendNotification", notificationType, chatId);
      console.log("Notification sent successfully");
    } else {
      console.error("Connection is not available in sendNotification");
    }
  } catch (error) {
    console.error("Send notification failed:", error);
  }
};

/** 
 * 
 *   // Ví dụ: Gọi hàm sendNotification khi cần gửi thông báo
  const handleSendNotification = async () => {
    // Giả sử nội dung và id lấy từ state hoặc từ các nguồn khác
    const content = "Nội dung thông báo mới";
    const chatId = chatStore.value.activeChatId;

    await sendNotification(sConnecttion.connection, content, chatId);
  };
 * 
 * 
 * 
 */
