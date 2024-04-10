// Cart.js
import React, { useEffect, useState } from "react";
import CartItem from "../../component/CartItem/CartItem";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/NavBar/NavBar";
import SearchBar from "../../component/searchBar/searchBar";

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
        console.log(fcart);
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

  // const handleremove = async (productid) => {
  //   try {
  //     const resp = await fetch(process.env.REACT_APP_URL_ORDER + "/delCart/", {
  //       method: "DELETE",
  //       body: JSON.stringify({
  //         product_id: productid,
  //         user_id: frontcart.user_id,
  //         type: "remItem",
  //       }),
  //     });
  //     if(resp.status == 200) {
  //       setcartItem(cartItem.filter((item) => item.id !== productid))
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleCheckout = async () => {
    navigate("/payment", {state: { frontcart, cartItem}})
  }

  if (isLoading) {
    return "Loading...";
  }

  if (isEmpty) {
    return <div>Nothing to show here!!</div>;
  }

  return (
    <>
      <SearchBar />
      <div className={styles.container}>
        <h1>Cart Items</h1>
        {cartItem ? (
          <div>
            {cartItem.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          "Loading..."
        )}
        <div className={styles.cartSummary}>
          <div>
            <h3>
              Total: ₹{" "}
              {new Intl.NumberFormat("en-US", {
                style: "decimal",
                minimumFractionDigits: 2,
              }).format(frontcart.total_value)}{" "}
            </h3>
          </div>
          <button className={styles.cartbutton} onClick={handleCheckout}>Procced to Payment</button>
        </div>
        <Navbar />
      </div>
    </>
  );
};

export default Cart;
