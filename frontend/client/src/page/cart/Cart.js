// Cart.js
import React, { useEffect, useState } from "react";
import CartItem from "../../component/CartItem/CartItem";
import styles from "./Cart.module.css";
import products from "../../data/products";

const Cart = () => {
  //   const [products, setProducts] = useState([]);

  //   useEffect(() => {
  //     fetch("path/to/your/json/file.json")
  //       .then((response) => response.json())
  //       .then((data) => setProducts(data));
  //   }, []);

  return (
    <div className={styles.cartPage}>
      <h1>Cart Items</h1>
      <div className={styles.cartItems}>
        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
      <div className={styles.cartSummary}>
        <h3>Total:</h3>
        <p>
          $
          {products.reduce(
            (total, product) => total + product.price * product.quantity,
            0
          )}
        </p>
      </div>
      <button>Checkout</button>
    </div>
  );
};

export default Cart;
