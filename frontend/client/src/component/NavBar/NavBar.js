// Navbar.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingBag,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./NavBar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem}>
          <FontAwesomeIcon icon={faHome} />
        </li>
        <li className={styles.navbarItem}>
          <FontAwesomeIcon icon={faShoppingBag} />
        </li>
        <li className={styles.navbarItem}>
          {/* Replace this with your custom logo component */}
          <div>Logo</div>
        </li>
        <li className={styles.navbarItem}>
          <FontAwesomeIcon icon={faHeart} />
        </li>
        <li className={styles.navbarItem}>
          <FontAwesomeIcon icon={faUser} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
