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
          <Link to={{
            pathname: `/product/${product._id}`,
            state: { product: product },
          }} key={product._id}>
            <FeedCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Feedlist;
