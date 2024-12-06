import { Server } from "socket.io";

const io = new Server(3001, {
  cors: {
    origin: "*", // Allow all origins for simplicity
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Listen for messages from the client
  socket.on("sendMessage", (message) => {
    console.log("Message received:", message);

    // Broadcast the message to all other connected clients
    socket.broadcast.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

console.log("Socket.IO server running on port 3001");
