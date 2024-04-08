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

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <a href="/">
          <li className={styles.navbarItem}>
            <FontAwesomeIcon icon={faHome} size="lg" />
          </li>
        </a>
        <a href="/cart">
          <li className={styles.navbarItem}>
            <FontAwesomeIcon icon={faShoppingBag} size="lg" />
          </li>
        </a>
        <li className={styles.navbarItem}>
          <FontAwesomeIcon icon={faCommentDots} size="lg" />
        </li>
        <li className={styles.navbarItem}>
          <FontAwesomeIcon icon={faHeart} size="lg" />
        </li>
        <a href="/userprofile">
          <li className={styles.navbarItem}>
            <FontAwesomeIcon icon={faUser} size="lg" />
          </li>
        </a>
      </ul>
    </nav>
  );
};

export default Navbar;
