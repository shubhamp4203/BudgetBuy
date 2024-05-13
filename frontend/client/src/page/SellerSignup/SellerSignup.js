import { useState } from "react";
import styles from "./SellerSignup.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {toast, Toaster} from "sonner";

const options = [
  { value: "clothes", label: "clothes" },
  { value: "shoes", label: "shoes" },
  { value: "electronic item", label: "elctronic item" },
  { value: "jewellery", label: "jewellery" },
  { value: "cosmetics", label: "cosmetics" },
  { value: "electronic item", label: "elctronic item" },
  { value: "grocery", label: "grocery" },
  { value: "stationary", label: "stationary" },
  { value: "books", label: "books" },
  { value: "toys", label: "toys" },
  { value: "sports", label: "sports" },
  { value: "kitchen", label: "kitchen" },
  { value: "home", label: "home" },
  { value: "accessories", label: "accessories" },
  { value: "bags", label: "bags" },
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
  const [categories, setCategories] = useState([]);
  const [phone_number, setPhone_number] = useState("");
  const [aadhar_card, setAadhar_card] = useState("");
  const [GSTnumber, setGSTnumber] = useState("");

  const navigate = useNavigate();

  const handleCategories = (selectedOptions) => {
    setCategories(selectedOptions);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!name || !email || !password || !phone_number || !aadhar_card || !categories) {
      toast.error("Please fill all the required fields.");
      return;
    }
    
    // Prepare the data to be sent
    const Seller_data = {
      name,
      email,
      password,
      categories,
      phone_number,
      aadhar_card,
      GSTnumber,
    };
    
    navigate("/selleraddress", { state: {sellerdata: Seller_data }});
  };

  return (
    <div className={styles.signupcontainer}>
      <Toaster richColors position="top-center"/>
      <h1>Seller Details</h1>
      <div className={styles.signupform}>
        <label htmlFor="name">Name*</label>
        <input
          className={styles.input}
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email*</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setuserEmail(e.target.value)}
        />
        {/* <br /> */}

        <label htmlFor="password">Password*</label>
        <input
          className={styles.input}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <br /> */}
        <label htmlFor="phone_number">Phone Number*</label>
        <input
          className={styles.input}
          type="tel"
          id="phone_number"
          value={phone_number}
          onChange={(e) => setPhone_number(e.target.value)}
        />
        <label htmlFor="aadhar_card">Aadhar Card*</label>
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
        <label htmlFor="Select Categories">Select Categories*</label>
        <Select
          isMulti
          options={options}
          value={categories}
          styles={customStyles}
          onChange={handleCategories}
        />

        {/* <div>
          Selected Tags:
          {selectedTags.map((tag) => (
            <span key={tag.value}>{tag.label}, </span>
          ))}
        </div> */}

        <button className={styles.signupbutton} onClick={handleSubmit}>
          Continue
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
