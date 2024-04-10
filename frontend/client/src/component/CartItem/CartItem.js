// CartItem.js
import React from "react";
import styles from "./CartItem.module.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const CartItem = ({ product }) => {
  // const handleRemove = () => {
  //   onRemove(product.product_id);
  // }
  return (
    <div className={styles.cartItem}>
      <img
        src={
          "https://res.cloudinary.com/dt0mkdvqx/image/upload/c_scale,w_90,h_87,q_auto,f_auto/v1/product_images/" +
          product.product_id
        }
        alt={product.name}
        className={styles.productImage}
      />
      <div className={styles.productDetails}>
        <p className={styles.productName}>{product.name}</p>
        <p
          style={{
            fontSize: "0.75rem",
            color: "green",
            margin: "0rem",
            paddingTop: '0.25rem',
            paddingBottom: '0.25rem',
          }}
        >
          {" "}
          ₹{" "}
          {new Intl.NumberFormat("en-US", {
            style: "decimal",
            minimumFractionDigits: 2,
          }).format(product.product_price)}{" "}
        </p>
        <p
          style={{
            margin: "0rem",
            width: "fit-content",
            fontSize: "0.5rem",
            backgroundColor: product.status != "available" ? "red" : "green",
            borderRadius: "5px",
            padding: "0.25rem",
            color: "white",
            
          }}
        >
          {product.status == "available" ? "🟢 Available" : "🔴 Unavailable"}
        </p>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",

          margin:"0rem"
        }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "50%",
            margin: "0.5rem 0rem",
            padding: "0.25rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <RemoveIcon />
          <span>{product.amount}</span>
          <AddIcon />
        
        
        </div>
          <button className={styles.removeButton} >Remove</button>
        </div>
      </div>
      {/* <div className={styles.quantity}>
        <button>-</button>
        <span>{product.quantity}</span>
        <button>+</button>
      </div> */}
    </div>
  );
};

export default CartItem;
