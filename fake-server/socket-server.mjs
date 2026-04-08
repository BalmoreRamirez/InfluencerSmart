import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "fake-chat-server" });
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const roomHistories = new Map();
const roomMembers = new Map();

function nowLabel() {
  return new Date().toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function pushMessage(roomId, message) {
  const current = roomHistories.get(roomId) ?? [];
  current.push(message);

  if (current.length > 100) {
    current.shift();
  }

  roomHistories.set(roomId, current);
}

io.on("connection", (socket) => {
  socket.on("join_room", ({ roomId, userId, role }) => {
    if (!roomId || !userId || !role) return;

    socket.join(roomId);

    const members = roomMembers.get(roomId) ?? new Map();
    members.set(socket.id, { userId, role });
    roomMembers.set(roomId, members);

    const history = roomHistories.get(roomId) ?? [];
    socket.emit("chat_history", history);
  });

  socket.on("leave_room", ({ roomId }) => {
    if (!roomId) return;
    socket.leave(roomId);
  });

  socket.on("chat_message", ({ roomId, senderId, senderRole, text }, ack) => {
    const members = roomMembers.get(roomId);
    const isMember = members?.get(socket.id)?.userId === senderId;

    if (!roomId || !senderId || !senderRole || !text?.trim() || !isMember) {
      ack?.({ ok: false, error: "Invalid chat payload" });
      return;
    }

    const message = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      roomId,
      by: senderRole,
      text: text.trim(),
      at: nowLabel(),
    };

    pushMessage(roomId, message);
    io.to(roomId).emit("chat_message", message);
    ack?.({ ok: true });
  });

  socket.on("disconnect", () => {
    for (const [roomId, members] of roomMembers.entries()) {
      members.delete(socket.id);
      if (members.size === 0) {
        roomMembers.delete(roomId);
      }
    }
  });
});

const port = Number(process.env.CHAT_SOCKET_PORT ?? 4001);

httpServer.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`\n[chat:server] El puerto ${port} ya esta en uso.`);
    console.error("[chat:server] Cierra el proceso anterior o usa otro puerto.");
    console.error("[chat:server] Ejemplo: CHAT_SOCKET_PORT=4002 npm run chat:server\n");
    process.exit(1);
  }

  console.error("[chat:server] Error al iniciar el servidor:", error.message);
  process.exit(1);
});

httpServer.listen(port, () => {
  console.log(`Fake chat socket server running on http://localhost:${port}`);
});

function shutdown() {
  io.close();
  httpServer.close(() => {
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

