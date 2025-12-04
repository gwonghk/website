"use client";

import { useEffect, useState, useRef, use } from "react";
import { io } from "socket.io-client";
import Image from "next/image";

const socket = io({
  path: "/api/socket",
});

type MessageT = {
  body: string;
  user: {
    id: string;
    name: string;
    color: string;
  };
  timestamp: number;
};

const Username = ({
  user,
  isColorBlindMode,
}: {
  user: MessageT["user"];
  isColorBlindMode: boolean;
}) => {
  const color = isColorBlindMode ? "white" : user.color;
  return (
    <span className="font-bold" style={{ color: color }}>
      {user.name}:
    </span>
  );
};

const ColorBlindModeToggle = ({
  isColorBlindMode,
  setIsColorBlindMode,
}: {
  isColorBlindMode: boolean;
  setIsColorBlindMode: (val: boolean) => void;
}) => {
  return (
    <button
      className="mb-4 p-2 bg-gray-800 text-white rounded"
      onClick={() => setIsColorBlindMode(!isColorBlindMode)}
    >
      {isColorBlindMode ? "Disable" : "Enable"} Color Blind Mode
    </button>
  );
};

const formatMessage = (body: string) => {
  const fragments = body.split(" LUL ");
  const result = [];
  for (let i = 0; i < fragments.length; i++) {
    const fragment = fragments[i];
    if (i > 0) {
      result.push(
        <Image
          width={20}
          height={20}
          key={i + fragment}
          src="/awesome.svg"
          alt="awesome"
          className="inline w-5 h-5 mx-1"
        />
      );
    }
    result.push(fragment);
  }

  return result;
};

const ChatPage = () => {
  const [messages, setMessages] = useState<MessageT[]>([]);
  const [isColorBlindMode, setIsColorBlindMode] = useState<boolean>(false);
  const chatListRef = useRef<HTMLUListElement>(null);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.onAny((t, { type, body, user, timestamp }) => {
      if (type === "chat-message") {
        setMessages((prev) => [
          ...prev,
          {
            body,
            user,
            timestamp,
          },
        ]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!chatListRef.current || !isAutoScrollEnabled) return;
    chatListRef.current.scrollTo({
      top: chatListRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [isAutoScrollEnabled, messages]);

  const handleScroll = () => {
    if (!chatListRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatListRef.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20; // 10px threshold

    setIsAutoScrollEnabled(isAtBottom);
  };

  const handleSendMessage = () => {
    if (text === "") return;
    socket.emit("message", text.trim());
    setText("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") return;
    setText(value);
  };

  const handleInputboxKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-950 p-2">
      <h1 className="text-white text-2xl mb-4">Chat Page</h1>
      <ColorBlindModeToggle
        isColorBlindMode={isColorBlindMode}
        setIsColorBlindMode={setIsColorBlindMode}
      />
      <ul
        ref={chatListRef}
        onScroll={handleScroll}
        className="overflow-y-scroll h-full"
      >
        {messages.map((msg, i) => (
          <li key={i} className="text-white mb-2">
            <Username user={msg.user} isColorBlindMode={isColorBlindMode} />{" "}
            {formatMessage(msg.body)}
          </li>
        ))}
      </ul>
      <form
        className="send-message-container flex flex-row mt-2 p-2 w-full"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full ml-12 mr-2 p-2 border border-blue-600 rounded focus:ring-blue-400 hover:bg-blue-900 transition"
          onChange={(e) => handleInputChange(e)}
          onKeyDown={handleInputboxKeyDown}
          value={text}
        ></input>
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 btn"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
