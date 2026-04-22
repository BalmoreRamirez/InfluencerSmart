import { io, type Socket } from "socket.io-client";

type ChatRole = "influencer" | "empresa";

type ServerChatMessage = {
  id: string;
  roomId: string;
  by: ChatRole;
  text: string;
  at: string;
};

type JoinRoomPayload = {
  roomId: string;
  userId: string;
  role: ChatRole;
};

let socket: Socket | null = null;
let socketDisabled = false;

function getSocketServerUrl() {
  const configured = process.env.NEXT_PUBLIC_CHAT_SOCKET_URL?.trim();
  if (configured) return configured;

  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "http://localhost:4001";
  }

  return null;
}

function ensureSocket() {
  if (socketDisabled) return null;

  const serverUrl = getSocketServerUrl();
  if (!serverUrl) return null;
  if (socket) return socket;

  socket = io(serverUrl, {
    transports: ["websocket"],
    autoConnect: true,
    reconnectionAttempts: 1,
    timeout: 2000,
  });

  socket.on("connect_error", () => {
    socketDisabled = true;
    socket?.disconnect();
    socket = null;
  });

  return socket;
}

export function createRoomId(a: string, b: string) {
  return [a.trim().toLowerCase(), b.trim().toLowerCase()].sort().join("::");
}

export function joinChatRoom(payload: JoinRoomPayload) {
  const client = ensureSocket();
  if (!client) return null;
  client.emit("join_room", payload);
  return client;
}

export function leaveChatRoom(roomId: string) {
  if (!socket) return;
  socket.emit("leave_room", { roomId });
}

export function onChatHistory(cb: (messages: ServerChatMessage[]) => void) {
  const client = ensureSocket();
  if (!client) return () => undefined;
  client.on("chat_history", cb);

  return () => {
    client.off("chat_history", cb);
  };
}

export function onChatMessage(cb: (message: ServerChatMessage) => void) {
  const client = ensureSocket();
  if (!client) return () => undefined;
  client.on("chat_message", cb);

  return () => {
    client.off("chat_message", cb);
  };
}

export function onSocketStatusChange(cb: (connected: boolean) => void) {
  const client = ensureSocket();
  if (!client) {
    // Sin servidor de socket configurado, el chat sigue funcionando via Firestore.
    cb(true);
    return () => undefined;
  }
  const onConnect = () => cb(true);
  const onDisconnect = () => cb(false);

  cb(client.connected);
  client.on("connect", onConnect);
  client.on("disconnect", onDisconnect);

  return () => {
    client.off("connect", onConnect);
    client.off("disconnect", onDisconnect);
  };
}

export function sendChatMessage(payload: {
  roomId: string;
  senderId: string;
  senderRole: ChatRole;
  text: string;
}) {
  const client = ensureSocket();
  if (!client) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    client.emit("chat_message", payload, (ack?: { ok: boolean; error?: string }) => {
      if (ack?.ok) {
        resolve();
        return;
      }

      reject(new Error(ack?.error ?? "No se pudo enviar el mensaje."));
    });
  });
}

export function disconnectChatSocket() {
  if (!socket) return;
  socket.disconnect();
  socket = null;
  socketDisabled = false;
}
