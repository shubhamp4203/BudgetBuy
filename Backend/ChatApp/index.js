const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
require("dotenv").config({ path: "../.env" });

const chatGroupRoutes = require("./routes/chatGroupRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { createMessage } = require("./controllers/messageController");
const { createChatGroup } = require("./controllers/chatGroupController");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/chatgroups", chatGroupRoutes);
app.use("/messages", messageRoutes);

const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });


mongoose.connect(process.env.CHAT_DB_URL).then(() => {
  console.log("Connected to MongoDB");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", ({ groupId }) => {
    socket.join(groupId);
    console.log(`User joined group ${groupId}`);
  });

  socket.on("message", async ({ groupId, userId, text }) => {
    console.log("Received message:", { groupId, userId, text });
    console.log("Socket is in rooms:", socket.rooms);
    const savedMessage = await createMessage({ groupId, userId, text });

    if (savedMessage) {
      const messageId = savedMessage._id;
      console.log("Message saved to database", groupId);

      io.to(groupId).emit("message", {
        groupId,
        userId,
        text,
        messageId,
      });
      console.log("Message sent to group", { groupId, userId, text });
    } else {
      console.error("Error saving message to database");
    }
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

console.log("Chat Server running")
// server.listen(8007, process.env.CHAT.split("http://")[1].split(":")[0]);
server.listen(8007)
