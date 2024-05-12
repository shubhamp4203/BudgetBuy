// Navbar.js
import React from "react";
import styles from "./NavBar.module.css";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";
import MapIcon from "@mui/icons-material/Map";


const SellerNavbar = () => {
  const navigate = useNavigate();
  const myaccount = async () => {
    const resp = await fetch(
      process.env.REACT_APP_URL_SELLER + "/authenticate",
      {
        credentials: "include",
      }
    );
    if (resp.ok) {
      navigate("/selleraccount");
    } else {
      navigate("/sellersignin");
    }
  };

  const myorders = async () => {
    navigate("/orders");
  };

  const inventory = async () => {
    navigate("/yourproducts");
  };

  const insertproduct = async () => {
    const resp = await fetch(
      process.env.REACT_APP_URL_SELLER + "/authenticate",
      {
        credentials: "include",
      }
    );
    if (resp.ok) {
      navigate("/addproduct");
    } else {
      navigate("/sellersignin");
    }
  };

  const handleAdvertise = () => {
    navigate("/advertiselist");
  }

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem} onClick={inventory}>
          <InventoryIcon sx={{ color: "black" }} />
        </li>
        <li className={styles.navbarItem} onClick={insertproduct}>
          <AddIcon sx={{ color: "black" }} />
        </li>
        <li className={styles.navbarItem} onClick={handleAdvertise}>
          <MapIcon sx={{ color: "black" }} />
        </li>
        <li className={styles.navbarItem} onClick={myorders}>
          <LocalShippingIcon sx={{ color: "black" }} />
        </li>
        <li className={styles.navbarItem} onClick={myaccount}>
          <AccountCircleIcon sx={{ color: "black" }} />
        </li>
      </ul>
    </nav>
  );
};

export default SellerNavbar;
