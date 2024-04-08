import { useState } from "react";
import styles from "./card.module.css";
import { useNavigate } from "react-router-dom";

export default function Card() {
    const [cardnumber, setCardnumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [confirmnum, setConfirm] = useState("");
    const [cvv, setCvv] = useState("");
    const navigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();
        if(!cardnumber || !expiry || !cvv || !confirmnum) {
            alert("Please fill all the required fields");
            return;
        }
        if(cardnumber !== confirmnum) {
            alert("Card number and confirm card number do not match");
            return;
        }
        console.log(confirmnum)
        const data = {
            card_number: confirmnum,
            expiry_date: expiry,
            cardcvv: cvv
        }
        const resp = await fetch(process.env.REACT_APP_URL_AUTHENTICATION + "/addcard", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        if(resp.status === 201) {
            alert("Card added successfully");
            navigate(-1);
        }
        else if(resp.status === 401) {
            alert("Card already exists");
        }
        else {
            alert("Something went wrong");
        }
    }
    return (
        <div className={styles.cardcontainer}>
        <h1>New Card</h1>
        <div className={styles.cardform}>
          <label htmlFor="Card Number">Card Number</label>
          <input
            className={styles.input}
            type="password"
            id="cardnumber"
            value={cardnumber}
            onChange={(e) => setCardnumber(e.target.value)}
          />
  
          <label htmlFor="Confirm Number">Confirm Card Number</label>
          <input
            className={styles.input}
            type="text"
            id="confirmcardnumber"
            value={confirmnum}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {/* <br /> */}
  
          <label htmlFor="expiry">Expiry Date (MM/YYYY)</label>
          <input
            className={styles.input}
            type="text"
            id="expiry"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
          {/* <br /> */}
          <label htmlFor="cvv">CVV</label>
          <input
            className={styles.input}
            type="password"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
          <button className={styles.addressbutton} onClick={handlesubmit}>
            Add Card
          </button>
        </div>
      </div>
    )
}