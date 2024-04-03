import React from "react";
import styles from "./FeedCard.module.css";

const FeedCard = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className={styles.price}>${product.price}</p>
    </div>
  );
};

export default FeedCard;
