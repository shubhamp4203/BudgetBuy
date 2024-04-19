import styles from "./YourCard.module.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// toast.configure();

const YourCard = ({ product, onRemove }) => {
  // const navigate = useNavigate();

  const handleRemove = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_URL_PRODUCT}/delete/${product._id}`,
        {
          method: "DELETE",
        }
      );
      onRemove(product._id);
      toast.success("Product removed successfully");
    } catch (error) {
      toast.error("Failed to remove product");
    }
  };

  function getStockValueClass(stock) {
    return stock <= 10 ? styles.redstock : "";
  }

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
      <div className={styles.stock}>
        <div className={styles.stockdes}>Stock:</div>
        <div className={` ${getStockValueClass(product.newProduct.stock)}`}>
          {product.newProduct.stock}
        </div>
      </div>
      <div className={styles.infodiv}>
        <Link
          to={{
            pathname: "/editproduct",
            state: { product: product },
          }}
          style={{ textDecoration: "none", width: "100%" }}
        >
          <button
            className={`${styles.buybut} `}
            style={{
              backgroundColor: "#221f1f",
              color: "white",
            }}
          >
            Edit Product
          </button>
        </Link>
        <button
          className={`${styles.buybut} `}
          style={{
            backgroundColor: "#221f1f",
            color: "white",
          }}
          onClick={handleRemove}
        >
          Remove Item
        </button>
      </div>
    </div>
  );
};

export default YourCard;
