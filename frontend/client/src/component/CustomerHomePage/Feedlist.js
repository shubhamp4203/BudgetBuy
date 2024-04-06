// ProductList.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Feedlist.module.css";
import FeedCard from "./FeedCard";

const Feedlist = ({ products }) => {
  return (
    <div className={styles.container}>
      <div className={styles.productList}>
        {products.map((product) => (
          <FeedCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default Feedlist;
