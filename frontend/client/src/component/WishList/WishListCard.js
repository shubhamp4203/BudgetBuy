import styles from "./WishListCard.module.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

// toast.configure();

const WishListCard = ({ product }) => {
  // const [isLiked, setIsLiked] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(true);

  const navigate = useNavigate();

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

  return (
    <div className={styles.productCard}>
      <Toaster richColors position="top-center" />
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
      </div>
      <div className={styles.prodescription}>
        <p>{product.newProduct.description}</p>
      </div>
      <div className={styles.infodiv}>
        <button className={styles.buybut} onClick={handleWishlist}>
          {isWishlisted ? <>Remove</> : <>Add to Wishlist</>}
        </button>
      </div>
    </div>
  );
};

export default WishListCard;
