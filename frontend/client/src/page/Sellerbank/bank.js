import { useState } from "react";
import styles from "./bank.module.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function SellerBank() {
    const [bankname, setBankname] = useState("");
    const [acc_no, setAcc_no] = useState("");
    const [confirmnumber, setconfirmnumber] = useState("");
    const [ifsc_code, setIfsc_code] = useState("");
    const [branch_name, setbranch_name] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const seller_data = location.state.sellerdata;
    const address = location.state.addressdata;
    const handlesubmit = async (e) => {
        e.preventDefault();
        if(!bankname || !acc_no || !ifsc_code || !confirmnumber || !branch_name) {
            alert("Please fill all the required fields");
            return;
        }
        if(acc_no !== confirmnumber) {
            alert("Card number and confirm card number do not match");
            return;
        }
        const bank_details = {
            bankname,
            acc_no,
            ifsc_code,
            branch_name
        }
        console.log(seller_data);
        const data = {
            ...seller_data,
            address,
            bank_details
        }
        const resp = await fetch(process.env.REACT_APP_URL_SELLER + "/sellersignup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if(resp.status === 201) {
            alert("Seller Sign Up successfully");
            navigate("/sellersignin");
        }
        else {
            alert("Something went wrong");
        }
    }
    return (
        <div className={styles.cardcontainer}>
        <h1>Add Bank</h1>
        <div className={styles.cardform}>
          <label htmlFor="Card Number">Bank Name*</label>
          <input
            className={styles.input}
            type="text"
            id="bankname"
            value={bankname}
            onChange={(e) => setBankname(e.target.value)}
          />
  
          <label htmlFor="Confirm Number">Account Number*</label>
          <input
            className={styles.input}
            type="password"
            id="Accountnumber"
            value={acc_no}
            onChange={(e) => setAcc_no(e.target.value)}
          />
          {/* <br /> */}
  
          <label htmlFor="expiry">Confirm Account Number*</label>
          <input
            className={styles.input}
            type="text"
            id="confirmnum"
            value={confirmnumber}
            onChange={(e) => setconfirmnumber(e.target.value)}
          />
          {/* <br /> */}
          <label htmlFor="cvv">IFSC Code*</label>
          <input
            className={styles.input}
            type="password"
            id="ifsc"
            value={ifsc_code}
            onChange={(e) => setIfsc_code(e.target.value)}
          />
          <label htmlFor="cvv">Branch Name*</label>
          <input
            className={styles.input}
            type="text"
            id="branchname"
            value={branch_name}
            onChange={(e) => setbranch_name(e.target.value)}
          />
          <button className={styles.addressbutton} onClick={handlesubmit}>
            Sign Up
          </button>
        </div>
      </div>
    )
}