import { useState } from "react";
import styles from "./SellerProfile.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {toast, Toaster} from "sonner";

const options = [
  { value: "tag1", label: "Tag 1" },
  { value: "tag2", label: "Tag 2" },
  { value: "tag3", label: "Tag 3" },
  // Add more predefined tags as needed
];

export default function SellerProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "##221f1f",
      borderWidth: "2px",
      boxShadow: "none",
    }),
  };

  const handleCategoriesChange = (selectedOptions) => {
    setCategories(selectedOptions);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const jwtToken = Cookies.get("jwt");

    // Prepare the data to be sent
    const data = {
      name,
      email,
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
    console.log(data);

    const res = await fetch(
      process.env.REACT_APP_URL_AUTHENTICATION + "/sellerupdate",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (res.ok) {
      console.log("Success");
      toast.success("Profile updated successfully.");
    } else {
      console.log("Error");
      navigate("/signin");
    }
  };

  return (
    <div className={styles.container}>
      <Toaster richColors position="top-center"/>
      <h1>My Profile</h1>
      <div className={styles.form}>
        <label htmlFor="name">Name</label>
        <input
          className={styles.userprofileinput}
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          className={styles.userprofileinput}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <br /> */}

        {/* <br /> */}
        <label htmlFor="address">Address</label>
        <input
          className={styles.userprofileinput}
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="pincode">Pincode</label>
        <input
          className={styles.userprofileinput}
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
          onChange={handleCategoriesChange}
          styles={customStyles}
          // className= {styles.userprofileinput}
        />
        <label htmlFor="phone_number">phone Number</label>
        <input
          className={styles.userprofileinput}
          type="tel"
          id="phone_number"
          value={phone_number}
          onChange={(e) => setPhone_number(e.target.value)}
        />
        <label htmlFor="aadhar_card">aadhar Card</label>
        <input
          className={styles.userprofileinput}
          type="tel"
          id="aadhar_card"
          value={aadhar_card}
          onChange={(e) => setAadhar_card(e.target.value)}
        />
        <label htmlFor="GSTnumber">GST Number</label>
        <input
          className={styles.userprofileinput}
          type="tel"
          id="GSTnumber"
          value={GSTnumber}
          onChange={(e) => setGSTnumber(e.target.value)}
        />
        <label htmlFor="IFSC">IFSC</label>
        <input
          className={styles.userprofileinput}
          type="tel"
          id="IFSC"
          value={IFSC}
          onChange={(e) => setIFSC(e.target.value)}
        />
        <label htmlFor="accountNumber">account Number</label>
        <input
          className={styles.userprofileinput}
          type="tel"
          id="accountNumber"
          value={pincode}
          onChange={(e) => setAcountNumber(e.target.value)}
        />
        <label htmlFor="bankName">bank Name</label>
        <input
          className={styles.userprofileinput}
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

        <button className={styles.userprofilebutton} onClick={handleSubmit}>
          update
        </button>
      </div>

      {/* <div className={styles.privacyPolicy}>
        By signing up, you agree to our <a href="#">Privacy Policy</a> and{" "}
        <a href="#">Terms of Service</a>
      </div> */}
    </div>
  );
}
