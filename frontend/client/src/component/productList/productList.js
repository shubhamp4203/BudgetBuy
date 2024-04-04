// ProductList.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./productList.module.css";
import ProductCard from "./productCard"; // Update the import path

const ProductList = ({ products }) => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.productList}> */}
      {products.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
    // </div>
  );
};

export default ProductList;
