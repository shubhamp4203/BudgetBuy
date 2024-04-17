import React from "react";
import styles from "./SellerOrderList.module.css";
import YourCard from "./SellerOrderCard";
import SellerOrderCard from "./SellerOrderCard";
const SellerOrderList = ({ products, searchTerm }) => {
  console.log(searchTerm);
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
      <h1>Orders</h1>
      <div className={styles.productList}>
        {/* {products.map((product) => (
          <FeedCard product={product} key={product._id}/> */}
        {filteredProducts.map((product) => (
          <SellerOrderCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default SellerOrderList;
