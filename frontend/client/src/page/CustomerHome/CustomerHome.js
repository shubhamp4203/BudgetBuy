import React, { useEffect, useState } from "react";
import SearchBar from "../../component/searchBar/searchBar";
import Navbar from "../../component/NavBar/NavBar";
import Feedlist from "../../component/CustomerHomePage/Feedlist";
import FeedCard from "../../component/CustomerHomePage/FeedCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from "./CustomerHome.module.css";
import { useNavigate } from "react-router-dom";

function CustomerHome() {
  const [products, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      const resp = await fetch(process.env.REACT_APP_URL_PRODUCT + "/getAll");
      const data = await resp.json();
      setData(data.result);
    };
    fetchdata();
  }, []);

  
  const productDetails = async (product) => {
    navigate(`/product/${product._id}`, { state: { product: product } });
  };

  return (
    <>
      <SearchBar onSearch={setSearchTerm} />
      {products.length == 0 ? "" : (<><h2 style={{textAlign: "center"}}>Nearby Products</h2>
      <Carousel
        autoPlay
        interval={3000}
        infiniteLoop
        // useKeyboardArrows
        // dynamicHeight
        showIndicators={false}
        showThumbs={false}
        // style={{ width: '500px', height: '300px' }}
      >
        {products.map((product) => (
          <div key={product._id} className={style.Carousel} onClick={() => productDetails(product)}>
            <img
              src={
                "https://res.cloudinary.com/dt0mkdvqx/image/upload/f_auto,q_auto/v1/product_images/" +
                product._id
              }
              alt={product.newProduct.name}
            />
            <b>{product.newProduct.name}</b>
            <p>₹  {new Intl.NumberFormat("en-US", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                  }).format(product.newProduct.price)}</p>
            <hr style={{ border: "none", borderTop: "2px solid #221f1f" }} />{" "}
          </div>
        ))}
      </Carousel></>)}
      <Feedlist products={products} searchTerm={searchTerm} />
      <Navbar />
    </>
  );
}
export default CustomerHome;
