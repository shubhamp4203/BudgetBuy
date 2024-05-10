import React from "react";
import styles from "./YourProductList.module.css";
import YourCard from "./YourCard";
const YourProductList = ({ products, searchTerm, onRemove }) => {
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
        {/* {products.map((product) => (
          <FeedCard product={product} key={product._id}/> */}
        {filteredProducts.map((product) => (
          <YourCard product={product} key={product._id} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};

export default YourProductList;
