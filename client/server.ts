// server.ts
import next from "next";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import type { IncomingMessage, ServerResponse } from "http";

type BotMessage = {
  type: "chat-message";
  body: string;
  user: { id: string; name: string; color: string };
  timestamp: number;
};

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const makeUserMessage = (body: string): BotMessage => ({
  type: "chat-message",
  body,
  user: {
    id: "hardcoded-user",
    name: "You",
    color: "#ffb703",
  },
  timestamp: Date.now(),
});

app.prepare().then(() => {
  const httpServer = createServer(
    (req: IncomingMessage, res: ServerResponse) => {
      handle(req, res);
    }
  );

  const io = new SocketIOServer(httpServer, {
    path: "/api/socket",
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("message", (msg) => {
      console.log("Received from client:", msg);
      socket.emit("message", makeUserMessage(msg)); // echo back
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  // -----------------------------
  // 🌈 Hardcoded creative messages
  // -----------------------------

  const messages: BotMessage[] = [
    {
      type: "chat-message",
      body: "✨ Greetings, LUL traveler! I bring tidings from the digital realm.",
      user: {
        id: "bot-astrid",
        name: "Astrid the Algorithm",
        color: "#7f5af0",
      },
      timestamp: Date.now(),
    },
    {
      type: "chat-message",
      body: "☕ Anyone else feel like time LULz loops every Monday?",
      user: { id: "bot-sammy", name: "Sammy Syntax", color: "#ff6b6b" },
      timestamp: Date.now(),
    },
    {
      type: "chat-message",
      body: "🌱 I planted a bug today LUL . Turns out it was a feature.",
      user: { id: "bot-luna", name: "Luna Loop", color: "#20a4f3" },
      timestamp: Date.now(),
    },
    {
      type: "chat-message",
      body: "🧩 Fun fact: arrays start at zero because programmers like suffering.",
      user: { id: "bot-kai", name: "Kai Compiler", color: "#2ec4b6" },
      timestamp: Date.now(),
    },
  ];

  // -----------------------------
  // 🔁 Emit a random message every 2 seconds
  // -----------------------------
  setInterval(() => {
    const random = messages[Math.floor(Math.random() * messages.length)];

    // Update timestamp each send
    const outgoing = { ...random, timestamp: Date.now() };

    io.emit("message", outgoing);
    console.log("Sent:", outgoing);
  }, 2000);

  const PORT = Number(process.env.PORT) || 3000;

  httpServer.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
