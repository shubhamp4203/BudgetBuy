// ProductDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./productDetail.module.css";
// import products from "../../data/products";

const ProductDetail = () => {
  const { productId } = useParams();
  // console.log(productId);
  const product_list = [productId];
  const [item, setproduct] = useState({});
  useEffect(() => {
    const getproduct = async () => {
      const resp = await fetch("http://localhost:8004" + "/getproduct/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({products: product_list}),
      });
      const data = await resp.json();
      const product = data.result['0'];
      console.log(product.newProduct);
      setproduct(product);  
    }
    getproduct();
  }, [])
  // const product = products.find((p) => p.id === parseInt(productId));

  // if (!product) {
  //   return <div>Product not found</div>;
  // }

  return (
    <div className={style.productDetails}>
      {item.newProduct ? <div>
        <img src={"https://res.cloudinary.com/dt0mkdvqx/image/upload/f_auto,q_auto/v1/product_images/" + item._id} alt={item.newProduct.name} />
        <p>Name: {item.newProduct.name}</p>
        <p>Price: {item.newProduct.price}</p>
        <p>Stock: {item.newProduct.stock}</p>
      </div> : "Loading..."}
    </div>
  );
};

export default ProductDetail;
/*
// ProductPage.js
import React from "react";
import styles from "./Cart.module.css";

const ProductPage = () => {
  const [selectedColor, setSelectedColor] = React.useState("black");
  const [selectedSize, setSelectedSize] = React.useState("M");

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className={styles.productPage}>
      <div className={styles.productPageHeader}>
        <div className={styles.productPageTitle}>Product Title</div>
        <div className={styles.productPageSubtitle}>Product Subtitle</div>
      </div>
      <div className={styles.productPageContent}>
        <img
          src="https://via.placeholder.com/600x400.png?text=Product+Image"
          alt="Product"
          className={styles.productPageImage}
        />
        <div className={styles.productPageDetails}>
          <div className={styles.productPageDetailsName}>Product Name</div>
          <div className={styles.productPageDetailsPrice}>$99.99</div>
          <div className={styles.productPageDetailsDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor.
          </div>
          <div className={styles.productPageDetailsColorSize}>
            <div className={styles.productPageDetailsColorSizeLabel}>
              Color:
            </div>
            <div
              className={`${styles.productPageDetailsColorSizeOption} ${
                selectedColor === "black"
                  ? styles.productPageDetailsColorSizeOptionActive
                  : styles.productPageDetailsColorSizeOptionInactive
              }`}
              style={{ backgroundColor: "black" }}
              onClick={() => handleColorClick("black")}
            ></div>
            <div
              className={`${styles.productPageDetailsColorSizeOption} ${
                selectedColor === "white"
                  ? styles.productPageDetailsColorSizeOptionActive
                  : styles.productPageDetailsColorSizeOptionInactive
              }`}
              style={{ backgroundColor: "white" }}
              onClick={() => handleColorClick("white")}
            ></div>
          </div>
          <div className={styles.productPageDetailsColorSize}>
            <div className={styles.productPageDetailsColorSizeLabel}>Size:</div>
            <div
              className={`${styles.productPageDetailsColorSizeOption} ${
                selectedSize === "S"
                  ? styles.productPageDetailsColorSizeOptionActive
                  : styles.productPageDetailsColorSizeOptionInactive
              }`}
              onClick={() => handleSizeClick("S")}
            >
              S
            </div>
            <div
              className={`${styles.productPageDetailsColorSizeOption} ${
                selectedSize === "M"
                  ? styles.productPageDetailsColorSizeOptionActive
                  : styles.productPageDetailsColorSizeOptionInactive
              }`}
              onClick={() => handleSizeClick("M")}
            >
              M
            </div>
            <div
              className={`${styles.productPageDetailsColorSizeOption} ${
                selectedSize === "L"
                  ? styles.productPageDetailsColorSizeOptionActive
                  : styles.productPageDetailsColorSizeOptionInactive
              }`}
              onClick={() => handleSizeClick("L")}
            >
              L
            </div>
          </div>
          <div className={styles.productPageActions}>
            <div className={styles.productPageActionsButton} onClick={() => {}}>
              Add to Cart
            </div>
            <div className={styles.productPageActionsButton} onClick={() => {}}>
              Buy Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

*/
