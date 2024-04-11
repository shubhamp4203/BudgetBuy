import React from "react";
import styles from "./AdvertiseCard.module.css";

function AdvertiseCard({ product }) {
  return (
    <div className={styles.advertiseCard}>
      <img
        className={styles.img}
        src={
          "https://res.cloudinary.com/dt0mkdvqx/image/upload/f_auto,q_auto/v1/product_images/" +
          product._id
        }
        alt={product.name}
      />
      <h3 className={styles.name}>{product.name}</h3>
      <p className="sku">{product.sku}</p>
      <p className="price">{product.price}</p>
      <p className="likes">{product.likes}</p>
      <button>Select</button>
    </div>
  );
}

export default AdvertiseCard;
