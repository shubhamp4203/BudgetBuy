// Cart.js
import React, { useEffect, useState } from "react";
import CartItem from "../../component/CartItem/CartItem";
import styles from "./Cart.module.css";
// import products from "../../data/products";

const Cart = () => {
  const[frontcart, setfrontcart] = useState({})
  const [cartItem, setcartItem] = useState([])
  useEffect(() => {
    const getcart = async() => {
      const data = await fetch(process.env.REACT_APP_URL_AUTHENTICATION+ "/getCart", {
        credentials: "include",
      });
      const resdata = await data.json();
      console.log(resdata);
      const fcart = resdata.cartItems.cart;
      const cartitems =  resdata.cartItems.products;
      setcartItem(cartitems);
      setfrontcart(fcart); 
    };
    getcart();
  },[]);
  return (
    <div className={styles.cartPage}>
      <h1>Cart Items</h1>
        {cartItem ? <div className={styles.cartItems}>
        {cartItem.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div> : "Loading..."}
      <div className={styles.cartSummary}>
        <h3>Total:</h3>
        <p>
          {frontcart.total_value}
        </p>
      </div>
      <button className={styles.cartbutton}>Checkout</button>
    </div>
  );
};

export default Cart;
