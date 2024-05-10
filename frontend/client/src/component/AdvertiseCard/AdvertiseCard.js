import React from "react";
import styles from "./AdvertiseCard.module.css";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import InventoryIcon from '@mui/icons-material/Inventory';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useState } from "react";

function AdvertiseCard({ product, selected, onSelect }) {
  const buttontext = selected ? "Selected" : "Select";
  return (

    <div className={styles.productCard}>
      <img
        src={
          "https://res.cloudinary.com/dt0mkdvqx/image/upload/f_auto,q_auto/v1/product_images/" +
          product._id
        }
        alt={product.name}
      />
      <div className={styles.prodinfo}>
        <p> {product.newProduct.name} </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "0.5rem",
            gap: "0.2rem",
          }}
        >
          <ThumbUpIcon sx={{ fontSize: 25, color: "#221f1f" }} />
          {product.newProduct.likes}
        </div>
      </div>
      <div className={styles.prodstockandprice}>
        <div className={styles.prodstock}>
        <InventoryIcon sx={{ fontSize: 25, color: "#221f1f" }}/>
        <p>{product.newProduct.stock}</p>
        </div>
        <div className={styles.prodprice}>
          <CurrencyRupeeIcon sx={{ fontSize: 25, color: "#221f1f" }}/>
          <p>{product.newProduct.price}</p>
        </div>
      </div>
      <div>
        <button className={`${styles.selectbut} ${buttontext=="Selected" ? styles.selected : ""}`} onClick={()=>{onSelect(product)}}>{buttontext}</button>
      </div>
    </div>
  );
}

export default AdvertiseCard;
