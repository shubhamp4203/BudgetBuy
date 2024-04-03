import React from "react";
import { Link } from "react-router-dom";
import styles from "./OrderList.module.css";
import Order from "./Order";

const OrderList = ({ orders }) => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.productList}> */}
      {orders.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id}>
          <Order product={product} />
        </Link>
      ))}
    </div>
    // </div>
  );
};

export default OrderList;
