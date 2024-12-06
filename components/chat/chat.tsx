"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3001"; // Replace with your Socket.IO server URL

interface Message {
  sender: string;
  text: string;
}

const ChatWidget = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  // Load chat history from localStorage and connect to the socket
  useEffect(() => {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory") || "[]");
    setMessages(chatHistory);

    // Connect to the Socket.IO server
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    // Listen for messages from the server
    newSocket.on("receiveMessage", (message: Message) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, message];
        localStorage.setItem("chatHistory", JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && socket) {
      const userMessage: Message = { sender: "You", text: message };
      const updatedMessages = [...messages, userMessage];

      // Update local state and localStorage
      setMessages(updatedMessages);
      localStorage.setItem("chatHistory", JSON.stringify(updatedMessages));

      // Emit the message to the server
      socket.emit("sendMessage", { sender: "You", text: message });
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border p-4 shadow-lg w-80">
      <h2 className="text-lg font-bold mb-2">Chat with Recruiter</h2>
      <div className="h-64 overflow-y-scroll border mb-2 p-2">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={msg.sender === "You" ? "text-blue-500" : "text-gray-700"}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 flex-grow"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 ml-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
