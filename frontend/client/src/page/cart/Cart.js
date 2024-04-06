// Cart.js
import React, { useEffect, useState } from "react";
import CartItem from "../../component/CartItem/CartItem";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
// import products from "../../data/products";

const Cart = () => {
  const navigate = useNavigate();
  const [frontcart, setfrontcart] = useState({});
  const [cartItem, setcartItem] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getcart = async () => {
      const data = await fetch(
        process.env.REACT_APP_URL_AUTHENTICATION + "/getCart",
        {
          credentials: "include",
        }
      );
      console.log(data.status);
      if (data.status === 200) {
        const resdata = await data.json();
        const fcart = resdata.cartItems.cart;
        const cartitems = resdata.cartItems.products;
        setcartItem(cartitems);
        setfrontcart(fcart);
        setIsLoading(false);
      } else if (data.status === 204) {
        setIsEmpty(true);
        setIsLoading(false);
      } else {
        navigate("/signin");
      }
    };
    getcart();
  }, []);

  
  if (isLoading) {
    return "Loading...";
  }

  if (isEmpty) {
    return <div>Nothing to show here!!</div>;
  }
  
  return (
    <div className={styles.cartPage}>
      <h1>Cart Items</h1>
      {cartItem ? (
        <div className={styles.cartItems}>
          {cartItem.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        "Loading..."
      )}
      <div className={styles.cartSummary}>
        <h3>Total:</h3>
        <p>{frontcart.total_value}</p>
      </div>
      <button className={styles.cartbutton}>Checkout</button>
    </div>
  );
};

export default Cart;
