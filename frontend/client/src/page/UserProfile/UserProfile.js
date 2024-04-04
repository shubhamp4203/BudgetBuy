import { useState } from "react";
import styles from "./UserProfile.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const options = [
  { value: "tag1", label: "Tag 1" },
  { value: "tag2", label: "Tag 2" },
  { value: "tag3", label: "Tag 3" },
  // Add more predefined tags as needed
];

export default function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [contact, setContact] = useState("");

  const navigate = useNavigate();

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "#ff2600",
      borderWidth: "1px",
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
      // password,
      address,
      pincode,
      tags: selectedTags,
      contact,
    };
    console.log(data);
    // console.log("jwt:", jwtToken);

    // Send a POST request to your server
    const res = await fetch(
      "https://e1e4-202-129-240-131.ngrok-free.app/update",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    res.ok
      ? alert("Profile updated successfully")
      : alert("Failed to update profile");
  };

  return (
    <div className={styles.container}>
      <h1>My Profile</h1>
      <div className={styles.form}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <br /> */}

        {/* <br /> */}
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="pincode">Pincode</label>
        <input
          type="tel"
          id="pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <label htmlFor="Select Tags">Select Tags</label>
        <Select
          isMulti
          options={options}
          value={selectedTags}
          onChange={handleTagChange}
          styles={customStyles}
        />
        <label htmlFor="pincode">Contact</label>
        <input
          type="tel"
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
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
