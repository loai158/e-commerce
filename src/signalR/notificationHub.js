import * as signalR from "@microsoft/signalr";

const createHubConnection = (token) => {
  return new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7247/hub/notifications", {
      accessTokenFactory: () => token
    })
    .withAutomaticReconnect()
    .build();
};

export default createHubConnection;
