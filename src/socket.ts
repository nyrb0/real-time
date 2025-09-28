import { io, Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:3000";

export const socket: Socket = io(SERVER_URL, {
  autoConnect: false, // мы будем подключаться вручную после ввода имени
});
