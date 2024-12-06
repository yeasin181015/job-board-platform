const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: {
    origin: "*", // Allow connections from any origin
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for incoming messages
  socket.on("sendMessage", (message) => {
    console.log("Message received:", message);
    // Broadcast the message to other clients
    socket.broadcast.emit("receiveMessage", message);
  });

  // Handle disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

console.log("Socket.IO server running on port 3001");
