import { useState } from "react";
import styles from "./SellerSignup.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const options = [
  { value: "tag1", label: "Tag 1" },
  { value: "tag2", label: "Tag 2" },
  { value: "tag3", label: "Tag 3" },
  // Add more predefined tags as needed
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderColor: "#221f1f",
    borderWidth: "2px",
    boxShadow: "none",
  }),
};

export default function SellerSignup() {
  const [name, setName] = useState("");
  const [email, setuserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [catergories, setCategories] = useState([]);
  const [phone_number, setPhone_number] = useState("");
  const [aadhar_card, setAadhar_card] = useState("");
  const [GSTnumber, setGSTnumber] = useState("");
  const [IFSC, setIFSC] = useState("");
  const [accountNumber, setAcountNumber] = useState("");
  const [bankName, setBankName] = useState("");

  const navigate = useNavigate();

  const handleCategories = (selectedOptions) => {
    setCategories(selectedOptions);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const data = {
      name,
      email,
      password,
      address,
      pincode,
      catergories: catergories,
      phone_number,
      aadhar_card,
      GSTnumber,
      IFSC,
      accountNumber,
      bankName,
    };
    try {
      const resp = await fetch(
        process.env.REACT_APP_URL_AUTHENTICATION + "/sellersignup",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.status === 201) {
        navigate("/signin");
      } else if (resp.status === 400) {
        alert("Something went wrong");
      } else {
        alert("Email or Phone number already exists");
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className={styles.signupcontainer}>
      <h1>Sign Up</h1>
      <div className={styles.signupform}>
        <label htmlFor="name">Name</label>
        <input
          className={styles.input}
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setuserEmail(e.target.value)}
        />
        {/* <br /> */}

        <label htmlFor="password">Password</label>
        <input
          className={styles.input}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <br /> */}
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
        <label htmlFor="Select Categories">Select Categories</label>
        <Select
          isMulti
          options={options}
          value={catergories}
          styles={customStyles}
          onChange={handleCategories}
        />
        <label htmlFor="phone_number">Phone Number</label>
        <input
          className={styles.input}
          type="tel"
          id="phone_number"
          value={phone_number}
          onChange={(e) => setPhone_number(e.target.value)}
        />
        <label htmlFor="aadhar_card">aadhar Card</label>
        <input
          className={styles.input}
          type="tel"
          id="aadhar_card"
          value={aadhar_card}
          onChange={(e) => setAadhar_card(e.target.value)}
        />
        <label htmlFor="GSTnumber">GST Number</label>
        <input
          className={styles.input}
          type="tel"
          id="GSTnumber"
          value={GSTnumber}
          onChange={(e) => setGSTnumber(e.target.value)}
        />
        <label htmlFor="IFSC">IFSC</label>
        <input
          className={styles.input}
          type="tel"
          id="IFSC"
          value={IFSC}
          onChange={(e) => setIFSC(e.target.value)}
        />
        <label htmlFor="accountNumber">account Number</label>
        <input
          className={styles.input}
          type="tel"
          id="accountNumber"
          value={accountNumber}
          onChange={(e) => setAcountNumber(e.target.value)}
        />
        <label htmlFor="bankName">bank Name</label>
        <input
          className={styles.input}
          type="tel"
          id="bankName"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
        />

        {/* <div>
          Selected Tags:
          {selectedTags.map((tag) => (
            <span key={tag.value}>{tag.label}, </span>
          ))}
        </div> */}

        <button className={styles.signupbutton} onClick={handleSubmit}>
          Sign Up
        </button>
      </div>

      {/* <div className={styles.socialSignUp}>
        <div className={styles.orText}>OR</div>
        <div className={styles.socialIcons}>
          <a href="http://surl.li/rqecf">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://myaccount.google.com/?utm_source=sign_in_no_continue&pli=1">
            <i className="fab fa-google"></i>
          </a>
          <a href="https://github.com/topics/login">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div> */}

      <div className={styles.privacyPolicy}>
        By signing up, you agree to our <a href="#">Privacy Policy</a> and{" "}
        <a href="#">Terms of Service</a>
      </div>
    </div>
  );
}
