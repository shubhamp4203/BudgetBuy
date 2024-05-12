// Navbar.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingBag,
  faHeart,
  faUser,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./NavBar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const myaccount = async() => {
    const resp = await fetch(process.env.REACT_APP_URL_AUTHENTICATION + "/authenticate", {
      credentials: "include",
    })
    if(resp.ok) {
      navigate("/myaccount");
    }
    else {
      navigate("/signin")
    }
  };

  const handleChat = async() => {
    const resp = await fetch(process.env.REACT_APP_URL_AUTHENTICATION + "/authenticate", {
      credentials: "include",
    })
    if(resp.ok) {
      navigate("/chatgroup");
    }
    else {
      navigate("/signin")
    }
  }
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <a href="/home">
          <li className={styles.navbarItem}>
            <HomeIcon sx={{ color: "black" }} />
          </li>
        </a>
        <a href="/cart">
          <li className={styles.navbarItem}>
            <ShoppingCartIcon sx={{ color: "black" }} />
          </li>
        </a>
        <li className={styles.navbarItem} onClick={handleChat}>
          <ChatIcon sx={{ color: "black" }} />
        </li>
        <li className={styles.navbarItem}>
          <FavoriteIcon sx={{ color: "black" }} />
        </li>
        <li className={styles.navbarItem} onClick={myaccount}>
          <AccountCircleIcon sx={{ color: "black" }} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
