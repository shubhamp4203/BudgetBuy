const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const chatGroupRoutes = require("./routes/chatGroupRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { createMessage } = require("./controllers/messageController");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/chatgroups", chatGroupRoutes);
app.use("/messages", messageRoutes);

const server = http.createServer(app);
const io = socketIO(server);

const port = Process.env.PORT || 8080;

mongoose.connect(process.env.DB_URL);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", (groupId) => {
    socket.join(groupId);
    console.log(`User joined group ${groupId}`);
  });

  socket.on("message", async ({ groupId, userId, text }) => {
    const savedMessage = await createMessage({ groupId, userId, text });

    if (savedMessage) {
      io.to(groupId).emit("message", { groupId, userId, text });
    } else {
      console.error("Error saving message to database");
    }
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
