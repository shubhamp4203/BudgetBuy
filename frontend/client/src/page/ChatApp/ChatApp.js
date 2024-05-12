import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import style from "./ChatApp.module.css";
import SendIcon from "@mui/icons-material/Send";
import { useLocation } from "react-router-dom";

const ChatApp = () => {
  const location = useLocation();
  const [userId, setUserId] = useState(location.state.userId);
  const [groupId, setGroupId] = useState(location.state.groupId);
  const [groupData, setGroupData] = useState(location.state.groupData);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  console.log("groupdata:", groupData);
  useEffect(() => {
    console.log("groupID:", groupId);
    fetch(`${process.env.REACT_APP_URL_CHAT}/messages?groupId=${groupId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Received messages:", data);
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });

    socket.current = io(process.env.REACT_APP_URL_CHAT);

    socket.current.on("connect", () => {
      console.log("Connected to server");
    });
    socket.current.emit("joinRoom", { groupId });

    socket.current.on("message", (message) => {
      console.log("Received message taken:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.current.on("disconnect", () => {
      console.log("Disconnected from server");
    });

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
          <h1>
            {groupData.userId1 == userId ? groupData.name2 : groupData.name1}
          </h1>
        </div>
        <div className={style.list}>
          {messages.map(
            (message, index) => (
              console.log("messageId:", message.messageId),
              (
                <div
                  className={
                    message.userId === userId
                      ? style.messageright
                      : style.messageleft
                  }
                  key={message.messageId}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
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
