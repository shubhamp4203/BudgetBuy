import React from "react";

function Payment() {
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
          <div className={cash}>
            <h1>Cash On Delivery</h1>
            <button>Pay</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
