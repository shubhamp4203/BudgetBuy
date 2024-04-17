// Navbar.js
import React from "react";
import styles from "./NavBar.module.css";
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';

const SellerNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <a href="/">
          <li className={styles.navbarItem}>
            <InventoryIcon sx={{ color: "black" }} />
          </li>
        </a>
        <a href="/addproduct">
          <li className={styles.navbarItem}>
            <AddIcon sx={{ color: "black" }} />
          </li>
        </a>
        <li className={styles.navbarItem}>
          <ChatIcon sx={{color: "black"}}/>
        </li>
        <li className={styles.navbarItem}>
          <FavoriteIcon sx={{color: "black"}}/>
        </li>
        <a href="/selleraccount">
          <li className={styles.navbarItem}>
            <AccountCircleIcon sx={{ color: "black" }} />
          </li>
        </a>
      </ul>
    </nav>
  );
};

export default SellerNavbar;
