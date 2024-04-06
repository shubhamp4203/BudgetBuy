// CartItem.js
import React from "react";
import styles from "./CartItem.module.css";

const CartItem = ({ product }) => {
  return (
    <div className={styles.cartItem}>
      <img
        src={"https://res.cloudinary.com/dt0mkdvqx/image/upload/f_auto,q_auto/v1/product_images/" + product.product_id}
        alt={product.name}
        className={styles.productImage}
      />
      <div className={styles.productDetails}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p>Amount: {product.amount} </p>
        <p>Price: ₹{product.product_price}</p>
      </div>
      <div className={styles.quantity}>
        <button>-</button>
        <span>{product.quantity}</span>
        <button>+</button>
      </div>
    </div>
  );
};

export default CartItem;
