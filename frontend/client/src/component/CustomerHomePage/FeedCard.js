import styles from "./FeedCard.module.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner'


// toast.configure();

const FeedCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

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
        toast.success("Product added to cart");
      } else if (resp.status == 401) {
        navigate("/signin");
      }
    } catch (error) {
      toast.error("Something went wrong.");
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
      let resp;
      if (isWishlisted) {
        resp = await fetch(
          `${process.env.REACT_APP_URL_AUTHENTICATION}/wishlist/${product._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
      } else {
        resp = await fetch(
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
      }
      if (resp.status == 201 || resp.status == 200) {
        setIsWishlisted(!isWishlisted);
        if (isWishlisted == false) {
          toast("Product removed from wishlist", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast("Product added to wishlist", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else if (resp.status == 401) {
        navigate("/signin");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  const handleLikes = async (e) => {
    e.preventDefault();
    const data = {
      product_id: product._id,
      like: isLiked ? -1 : 1,
    };
    try {
      const resp = await fetch(
        process.env.REACT_APP_URL_AUTHENTICATION + "/like",
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (resp.status == 200) {
        setIsLiked(!isLiked);
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  const handlebuynow = async (e) => {
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
        navigate("/payment");
      } else if (resp.status == 401) {
        navigate("/signin");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  const productDetails = async(product_id) => {
    navigate(`/product/${product_id}`, { state: { product: product } });
  }

  return (
    <div className={styles.productCard}>
      <Toaster richColors position="top-center"/>
        <img
          src={
            "https://res.cloudinary.com/dt0mkdvqx/image/upload/f_auto,q_auto/v1/product_images/" +
            product._id
          }
          alt={product.name}
          onClick={() => productDetails(product._id)}
        />
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
          {isLiked ? (
            <ThumbUpIcon
              sx={{ fontSize: 25, color: "#221f1f" }}
              onClick={handleLikes}
            />
          ) : (
            <ThumbUpOutlinedIcon
              sx={{ fontSize: 25, color: "#221f1f" }}
              onClick={handleLikes}
            />
          )}
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
          {isWishlisted ? (
            <FavoriteIcon sx={{ fontSize: 25, color: "#221f1f" }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 25, color: "#221f1f" }} />
          )}
        </button>
        <button
          className={`${styles.buybut} ${styles.but3}`}
          style={{
            backgroundColor: "#221f1f",
            color: "white",
          }}
          onClick={handlebuynow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
