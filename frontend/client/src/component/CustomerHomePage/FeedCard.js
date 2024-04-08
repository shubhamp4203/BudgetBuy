import styles from "./FeedCard.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FeedCard = ({ product }) => {
  const navigate = useNavigate();
  const handleaddcart = async (e) => {
    e.preventDefault();
    const data = {
      product_id: product._id,
      seller_id: product.newProduct.seller_id,
      amount: 1,
      product_price: product.newProduct.price,
    };
    try {
      const resp = await fetch(
        process.env.REACT_APP_URL_AUTHENTICATION + "/addCart",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (resp.status == 201) {
        alert("Product added to cart");
      } else if (resp.status == 401) {
        navigate("/signin");
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };
  return (
    <div className={styles.productCard}>
      <Link
        to={{
          pathname: `/product/${product._id}`,
          state: { product: product },
        }}
        key={product._id}
        className={styles.productLink}
      >
        <img
          src={
            "https://res.cloudinary.com/dt0mkdvqx/image/upload/f_auto,q_auto/v1/product_images/" +
            product._id
          }
          alt={product.name}
        />
      </Link>
      <div className={styles.prodinfo}>
        <p> {product.newProduct.name} </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "0.5rem",
          }}
        >
          <FavoriteIcon sx={{ fontSize: 30, color: "black" }} />
          {product.newProduct.likes}
        </div>
      </div>
      <div className={styles.infodiv}>
        <button onClick={handleaddcart} className={styles.buybut}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
