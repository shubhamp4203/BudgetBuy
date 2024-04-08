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
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <a href="/">
          <li className={styles.navbarItem}>
            <HomeIcon sx={{ color: "black" }} />
          </li>
        </a>
        <a href="/cart">
          <li className={styles.navbarItem}>
            <ShoppingCartIcon sx={{ color: "black" }} />
          </li>
        </a>
        <li className={styles.navbarItem}>
          <ChatIcon sx={{color: "black"}}/>
        </li>
        <li className={styles.navbarItem}>
          <FavoriteIcon sx={{color: "black"}}/>
        </li>
        <a href="/userprofile">
          <li className={styles.navbarItem}>
            <AccountCircleIcon sx={{ color: "black" }} />
          </li>
        </a>
      </ul>
    </nav>
  );
};

export default Navbar;
