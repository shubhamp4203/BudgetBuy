import React from "react";
import styles from "./FeedCard.module.css";

const FeedCard = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <img src={"https://res.cloudinary.com/dt0mkdvqx/image/upload/f_auto,q_auto/v1/product_images/"+ product._id}  alt={product.name} />
      <h3> {product.newProduct.name} </h3>
      <p> {product.newProduct.price} </p>
      <p> {product.newProduct.likes} </p>
    </div>
  );
};

export default FeedCard;
