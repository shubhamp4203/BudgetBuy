import React, { useState, useEffect } from "react";
import style from "./ChatGroup.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import SellerNavbar from "../../component/Seller Navbar/NavBar";

function SellerChatGroup() {
  const [group, setGroup] = useState([]);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const fetchChatgroup = async () => {
      const response = await fetch(
        process.env.REACT_APP_URL_SELLER + "/chatgroup",
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      // console.log("data:", data);
      setGroup(data.chatGroup);
      setUserId(data.userId);
    };
    fetchChatgroup();
  }, []);
  // console.log("chatgroup", group);
  // console.log("grouplength:", group.length);

  const navigate = useNavigate();

  const handleUserChat = (groupData) => {
    navigate("/chat", { state: { groupId:groupData._id, userId, groupData } });
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>Chat Groups</h1>
      </div>
      <div className={style.grouplist}>
        {group.length > 0 ? (
          group.map((groupItem) => (
            <div
              className={style.group}
              key={groupItem._id}
              onClick={() => handleUserChat(groupItem)}
            >
              <div className={style.icon}>
                <AccountCircleIcon sx={{ color: "black", fontSize: 50 }} />
              </div>
              <div className={style.groupname}>{groupItem.name1}</div>
            </div>
          ))
        ) : (
          <h1>No Chats</h1>
        )}
      </div>
      <SellerNavbar/>
    </div>
  );
}

export default SellerChatGroup;
