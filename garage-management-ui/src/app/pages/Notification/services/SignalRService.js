import * as signalR from "@microsoft/signalr";
export const newConnection = () => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:5001/chatHub", {
      accessTokenFactory: () => localStorage.getItem("at"),
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    .build();

  return connection;
};
