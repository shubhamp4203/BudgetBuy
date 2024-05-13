import React, { useEffect, useState } from "react";
import SearchBar from "../../component/searchBar/searchBar";
import Navbar from "../../component/NavBar/NavBar";
import Feedlist from "../../component/CustomerHomePage/Feedlist";
import FeedCard from "../../component/CustomerHomePage/FeedCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from "./CustomerHome.module.css";
import { useNavigate } from "react-router-dom";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

function CustomerHome() {
  const [nearby, setnearby] = useState([]);
  const [products, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState("l")
  const [loggedIn, setLoggedin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      const resp = await fetch(process.env.REACT_APP_URL_AUTHENTICATION + "/getAll",{
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      console.log("data:", data);
      setData(data.result.result);
      setUserId(data.userId)
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const resp = await fetch(process.env.REACT_APP_URL_AUTHENTICATION + "/authenticate", {
        credentials: "include",
      });
      if(resp.ok) {
        const data = await resp.json();
        const user_id = data.user_id;
        setLoggedin(true);
        const response = await fetch(process.env.REACT_APP_URL_GEOFENCING + "/getNearbyProducts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id }),
        });
        const prod_list = await response.json();
        setnearby(prod_list.products);
      }
      else {
        setLoggedin(false);
      }
    };
    fetchdata();
  }, []);

  
  const productDetails = async (product) => {
    navigate(`/product/${product._id}`, { state: { product: product } });
  };

  return (
    <>
      <SearchBar onSearch={setSearchTerm} />
      {nearby.length == 0 && loggedIn ? "" : (<><h2 style={{textAlign: "center"}}>Nearby Products</h2>
      <Carousel
        autoPlay
        interval={3000}
        infiniteLoop
        // useKeyboardArrows
        // dynamicHeight
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => {
          return (
            <div
              className={`${style.arrow} ${hasPrev ? "" : style.hidden} ${style.left}`}
              onClick={clickHandler}
            >
              <ArrowLeftIcon className={style.icon} />
            </div>
          );
        }}
        renderArrowNext={(clickHandler, hasNext) => {
          return (
            <div
              className={`${style.arrow} ${hasNext ? "" : style.hidden} ${style.right}`}
              onClick={clickHandler}
            >
              <ArrowRightIcon className={style.icon} />
            </div>
          );
        }}
        // style={{ width: '500px', height: '300px' }}
      >
        {nearby.map((product) => (
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
      <Feedlist products={products} searchTerm={searchTerm} userId={userId} />
      <Navbar />
    </>
  );
}
export default CustomerHome;
