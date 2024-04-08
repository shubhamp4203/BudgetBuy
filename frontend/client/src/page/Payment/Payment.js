import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Payment.module.css";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PaymentsIcon from "@mui/icons-material/Payments";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function Payment() {
  const [address, setAddress] = useState([]);
  const [cards, setCard] = useState([]);
  const location = useLocation();
  const [addressId, setAddressId] = useState("");
  const [cardId, setCardId] = useState("");
  const cartdata = location.state.frontcart;
  const cartitems = location.state.cartItem;
  const [codselected, setCodselected] = useState(false);
  const navigate = useNavigate();

  const fetchinfo = async () => {
    console.log(cartdata, cartitems);
    try {
      const resp = await fetch(
        process.env.REACT_APP_URL_AUTHENTICATION + "/getuser",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (resp.status == 200) {
        const data = await resp.json();
        const address_array = data.user.address;
        const card_array = data.user.card_details;
        setAddress(address_array);
        setCard(card_array);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchinfo();
  }, []);

  const handleselectaddress = (address) => {
    setAddressId(address._id);
  };

  const handleselectcard = (card) => {
    setCardId(card._id);
    setCodselected(false);
  };
  const handleselectcod = () => {
    setCodselected(true);
    setCardId("");
  };
  function handleSubmit(e) {
    e.preventDefault();
  }

  const handleaddaddress = () => {
    navigate("/addaddress");
  };
  const handleaddcard = () => {
    navigate("/addcard");
  };

  return (
    <>
      <div className={styles.paymentcontainer}>
        <div className={styles.verifyaddress}>
          <div className={styles.heading}>Select Address</div>
          {address.map((add) => (
            <>
              <div
                className={`${styles.address} ${
                  addressId === add._id ? styles.selected : ""
                }`}
                onClick={() => handleselectaddress(add)}
              >
                <HomeIcon
                  sx={{ color: addressId === add._id ? "white" : "black" }}
                />
                <div className={styles.addressinfo}>
                  <div className={styles.address1}>
                    {add.building_name}, {add.street}, {add.landmark}
                  </div>
                  <div className={styles.address2}>
                    {add.city}, {add.state}, {add.pincode}
                  </div>
                </div>
              </div>
              <Divider />
            </>
          ))}
          <div className={styles.addAddress} onClick={handleaddaddress}>
            <AddIcon sx={{ color: "white" }} />
            <span>Add New Address</span>
          </div>
        </div>
        <div className={styles.payment}>
          <div className={styles.heading}> Select Payment Method </div>
          {cards.map((card) => (
            <>
              <div
                className={`${styles.card} ${
                  cardId === card._id ? styles.selected : ""
                }`}
                onClick={() => handleselectcard(card)}
              >
                <PaymentsIcon
                  sx={{ color: cardId === card._id ? "white" : "black" }}
                />
                <div className={styles.cardinfo}>
                  <div className={styles.card1}>{card.card_no}</div>
                  <div className={styles.card2}>{card.cardExpiryDate}</div>
                </div>
              </div>
              <Divider />
            </>
          ))}
          <div
            className={`${styles.card} ${codselected ? styles.selected : ""}`}
            onClick={() => handleselectcod()}
          >
            <CurrencyRupeeIcon
              sx={{ color: codselected ? "white" : "black" }}
            />
            <div className={styles.cardinfo}>
              <div className={styles.card1}>Cash On Delivery</div>
            </div>
          </div>
          <div className={styles.addcard} onClick={handleaddcard}>
            <AddIcon sx={{ color: "white" }} />
            <span>Add New Card</span>
          </div>
        </div>
        <div className={styles.cart}>
          <div className={styles.heading}> Order Summary </div>
          {cartitems.map((item) => (
            <div className={styles.cartitems}>
              <img
                src={
                  "https://res.cloudinary.com/dt0mkdvqx/image/upload/c_scale,w_90,h_87,q_auto,f_auto/v1/product_images/" +
                  item.product_id
                }
                alt={item.name}
                // className={styles.productImage}
              />
              <div className={styles.iteminfo}>
                <div className={styles.itemname}>{item.name} x {item.amount}</div>
                <div className={styles.itemprice}>₹{" "}
              {new Intl.NumberFormat("en-US", {
                style: "decimal",
                minimumFractionDigits: 2,
              }).format(item.product_price)}{" "}</div>
              </div>
            </div>
          ))}
          <div className={styles.total}>
            <div className={styles.totaltext}>Total</div>
            <div className={styles.itemprice}>₹{" "}
              {new Intl.NumberFormat("en-US", {
                style: "decimal",
                minimumFractionDigits: 2,
              }).format(cartdata.total_value)}{" "}
            </div>
          </div>
        </div>
        <div className={styles.placeorder}>
          <button onClick={handleSubmit}>Place Order</button>
        </div>
      </div>
    </>
  );
}

export default Payment;
