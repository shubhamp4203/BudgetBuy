import styles from "./FeedCard.module.css";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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

  const handleWishlist = async (e) => {
    e.preventDefault();
    const data = {
      product_id: product._id,
      seller_id: product.newProduct.seller_id,
      amount: 1,
      product_price: product.newProduct.price,
    };
    try {
      const resp = await fetch(
        process.env.REACT_APP_URL_AUTHENTICATION + "/wishlist",
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
        alert("Product added to wishlist");
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
            gap: "0.2rem",
          }}
        >
          <ThumbUpOutlinedIcon sx={{ fontSize: 25, color: "#221f1f" }} />
          {product.newProduct.likes}
        </div>
      </div>
      <div className={styles.prodescription}>
        <p>{product.newProduct.description}</p>
      </div>
      <div className={styles.infodiv}>
        <button
          onClick={handleaddcart}
          className={`${styles.buybut} ${styles.but1}`}
        >
          <ShoppingCartIcon sx={{ fontSize: 25, color: "##221f1f" }} />
        </button>
        <button
          className={`${styles.buybut} ${styles.but2}`}
          onClick={handleWishlist}
        >
          <FavoriteBorderIcon sx={{ fontSize: 25, color: "#221f1f" }} />
        </button>
        <Link
          to={{
            pathname: "/payment",
            state: { product: product },
          }}
          style={{ textDecoration: "none" }}
        >
          <button
            className={`${styles.buybut} ${styles.but3}`}
            style={{
              backgroundColor: "#221f1f",
              color: "white",
            }}
          >
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeedCard;
