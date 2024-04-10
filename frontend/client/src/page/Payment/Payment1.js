import React from "react";
import { useState } from "react";
import styles from "./Payment.module.css";

function Payment() {
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [UPI, setUPI] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Order Placed");
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.vertifyaddress}>
          <h1>Verify Address</h1>
          <label htmlFor="address">Address</label>
          <input
            className={styles.input}
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor="pincode">Pincode</label>
          <input
            className={styles.input}
            type="tel"
            id="pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>

        <div className={styles.payment}>
          <div className={styles.cash}>
            <h3>Cash On Delivery</h3>
          </div>
          <div className={styles.card}>
            <label htmlFor="card">Card</label>
            <select>
              <option value="Bank Of Baroda">Bank Of Baroda</option>
              <option value="state Bank of India">state Bank of India</option>
              <option value="Bank of Punjab">Bank of Punjab</option>
            </select>
          </div>
          <div className={styles.upi}>
            <label htmlFor="upi">UPI</label>
            <input list="upidatalist" type="text" id="upi" value={UPI} />
            <datalist id="upidatalist">
              <option value="Google Pay"></option>
              <option value="PhonePe"></option>
              <option value="Paytm"></option>
            </datalist>
          </div>
        </div>
        <div className={styles.placeorder}>
          <button>Place Order</button>
        </div>
      </div>
    </>
  );
}

export default Payment;
