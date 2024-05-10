import React from "react";
import styles from "./WishList-List.module.css";
import WishListCard from "./WishListCard";
const WishListStack = ({ products }) => {
  return (
    <div className={styles.container}>
      <div className={styles.productList}>
        {products.map((product) => (
          <WishListCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default WishListStack;
