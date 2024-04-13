// ProductList.js
import React from "react";
import styles from "./Feedlist.module.css";
import FeedCard from "./FeedCard";
const Feedlist = ({ products, searchTerm }) => {
  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.newProduct.name
          ? product.newProduct.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          : false
      )
    : products;
  return (
    <div className={styles.container}>
      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <FeedCard product={product} key={product._id}/>
        ))}
      </div>
    </div>
  );
};

export default Feedlist;
