import React from "react";
import styles from "./SellerOrderList.module.css";
import YourCard from "./SellerOrderCard";
import SellerOrderCard from "./SellerOrderCard";
const SellerOrderList = ({ products }) => {

  return (
    <div className={styles.container}>
      <div className={styles.productList}>
        {products.map((product) => (
          <SellerOrderCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default SellerOrderList;
