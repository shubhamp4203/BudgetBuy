// Navbar.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingBag,
  faHeart,
  faUser,
  faBottleDroplet,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./NavBar.module.css";

const Navbar = () => {
  return (  
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <a href="/">
        <li className={styles.navbarItem}>
          <FontAwesomeIcon icon={faHome} />
        </li>
        </a>
        <a href="/cart">
        <li className={styles.navbarItem}>
          <FontAwesomeIcon icon={faShoppingBag} />
        </li>
        </a>
        <li className={styles.navbarItem}>
          {/* Replace this with your custom logo component */}
          Logo
        </li>
        <li className={styles.navbarItem}>
          <FontAwesomeIcon icon={faHeart} />
        </li>
        <a href="/userprofile">
        <li className={styles.navbarItem} >
          <FontAwesomeIcon icon={faUser} />
        </li>
        </a>
      </ul>
    </nav>
  );
};

export default Navbar
