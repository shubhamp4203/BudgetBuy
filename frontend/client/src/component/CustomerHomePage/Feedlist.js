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
          <Link to={`/product/${product.id}`} key={product.id}>
            <FeedCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Feedlist;
