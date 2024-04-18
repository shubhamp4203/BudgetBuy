// Cart.js
import React, { useEffect, useState } from "react";
import CartItem from "../../component/CartItem/CartItem";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/NavBar/NavBar";
import SearchBar from "../../component/searchBar/searchBar";
import { ReactComponent as EmptyCart } from "../../assest/emptycart.svg";

const Cart = () => {
  const navigate = useNavigate();
  const [frontcart, setfrontcart] = useState({});
  const [cartItem, setcartItem] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getcart = async () => {
      try {
        const data = await fetch(
          process.env.REACT_APP_URL_AUTHENTICATION + "/getCart",
          {
            credentials: "include",
          }
        );
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
      } catch (error) {
        console.error("An error occurred while fetching the cart:", error);
      }
    };
    getcart();
  }, []);

  const handleCheckout = async () => {
    navigate("/payment");
  };


  return (
    <>
      {/* <SearchBar /> */}
      <div className={styles.container}>
        {isEmpty ? (
          <>
            <div className={styles.logo}>
              <EmptyCart className={styles.cartsvg} />{" "}
              <h1> Nothing to show here!!</h1>
            </div>{" "}
          </>
        ) : (
          <>
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
              <button disabled={!frontcart.status} className={frontcart.status ? styles.cartbutton : styles.disabledbut} onClick={handleCheckout}>
                Procced to Payment
              </button>
            </div>
          </>
        )}
        <Navbar />
      </div>
    </>
  );
};

export default Cart;
