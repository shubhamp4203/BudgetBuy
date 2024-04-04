// ProductDetail.js
import React from "react";
import { useParams } from "react-router-dom";
import products from "../../data/products";

const ProductDetail = () => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <img src={product.image} alt={product.name} />
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
