import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import style from "./ChatApp.module.css";
import SendIcon from "@mui/icons-material/Send";
import { useLocation } from "react-router-dom";

const ChatApp = () => {
  const location = useLocation();
  const [userId, setUserId] = useState(location.state.userId);
  const [groupId, setGroupId] = useState(location.state.groupId);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    console.log("groupID:", groupId);
    fetch(`http://localhost:5000/messages?groupId=${groupId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Received messages:", data);
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });

    socket.current = io("http://localhost:5000");

    socket.current.on("connect", () => {
      console.log("Connected to server");
    });
    socket.current.emit("joinRoom", { groupId });
    // socket.current.on("groupCreated", ({ groupId }) => {
    //   console.log("Group created with ID:", groupId);
    //   setGroupId(groupId);
    // });
    // console.log("updated groupId:", groupId);

    socket.current.on("message", (message) => {
      console.log("Received message taken:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.current.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Clean up the effect
    return () => {
      socket.current.disconnect();
      console.log("Disconnected from server");
    };
  }, []);

  const sendMessage = () => {
    if (!groupId || !userId || !message) {
      console.error("Missing required data");
      return;
    }
    socket.current.emit("message", { groupId, userId, text: message });
    console.log({ groupId, userId, message });
    setMessage("");
  };

  return (
    console.log("userId:", userId),
    (
      <div className={style.container}>
        <div className={style.header}>
          <h1>Chat App</h1>
        </div>
        <div className={style.list}>
          {messages.map(
            (message) => (
              console.log("messageId:", message.messageId),
              (
                <div
                  className={
                    message.userId === userId
                      ? style.messageright
                      : style.messageleft
                  }
                  key={message.messageId}
                >
                  <div>{message.text}</div>
                </div>
              )
            )
          )}
        </div>
        <div className={style.done}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="message"
          />
          <button onClick={sendMessage}>
            <SendIcon />
          </button>
        </div>
      </div>
    )
  );
};

export default ChatApp;
