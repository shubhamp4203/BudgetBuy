// ProductCard.js
import React from "react";
import styles from "./productCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className={styles.price}>${product.price}</p>
    </div>
  );
};

export default ProductCard;
