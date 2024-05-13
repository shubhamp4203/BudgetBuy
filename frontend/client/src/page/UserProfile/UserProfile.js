import { useState } from "react";
import styles from "./UserProfile.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/NavBar/NavBar";
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

export default function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [contact, setContact] = useState("");

  const navigate = useNavigate();

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "##221f1f",
      borderWidth: "2px",
      boxShadow: "none",
    }),
  };

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const jwtToken = Cookies.get("jwt");

    // Prepare the data to be sent
    const data = {
      name,
      email,
      tags: selectedTags,
      contact,
    };
    // console.log("jwt:", jwtToken);

    // Send a POST request to your server
    const res = await fetch(
      process.env.REACT_APP_URL_AUTHENTICATION + "/update",
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
      navigate("/home")
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
        <label htmlFor="Select Tags">Select Tags</label>
        <Select
          isMulti
          options={options}
          value={selectedTags}
          onChange={handleTagChange}
          styles={customStyles}
          // className= {styles.userprofileinput}
        />
        <label htmlFor="contact">Contact</label>
        <input
          className={styles.userprofileinput}
          type="tel"
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <button className={styles.userprofilebutton} onClick={handleSubmit}>
          update
        </button>
      </div>
      <Navbar />

      {/* <div className={styles.privacyPolicy}>
        By signing up, you agree to our <a href="#">Privacy Policy</a> and{" "}
        <a href="#">Terms of Service</a>
      </div> */}
    </div>
  );
}
