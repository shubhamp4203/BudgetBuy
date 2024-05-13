import { useState } from "react";
import styles from "./signup.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

const options = [
  { value: "clothes", label: "clothes" }, //done
  { value: "shoes", label: "shoes" }, //done
  { value: "electronic item", label: "elctronic item" }, //done
  { value: "jewellery", label: "jewellery" }, //done
  { value: "cosmetics", label: "cosmetics" }, //done
  { value: "showpiece", label: "showpiece" },
  { value: "grocery", label: "grocery" }, //done
  { value: "stationary", label: "stationary" }, //done
  { value: "books", label: "books" }, //done
  { value: "toys", label: "toys" },
  { value: "sports", label: "sports" },
  { value: "kitchen", label: "kitchen" },
  { value: "home", label: "home" },
  { value: "accessories", label: "accessories" },
  { value: "bags", label: "bags" },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderColor: "#221f1f",
    borderWidth: "2px",
    boxShadow: "none",
  }),
};

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setuserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [contact, setContact] = useState("");

  const navigate = useNavigate();

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const data = {
      name,
      email,
      password,
      tags: selectedTags,
      contact,
    };
    try {
      const resp = await fetch(
        process.env.REACT_APP_URL_AUTHENTICATION + "/signup",
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
        toast.error("Something went wrong.");
      } else {
        toast.error("Email or Phone number already exists.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <div className={styles.signupcontainer}>
      <Toaster richColors position="top-center" />
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
        <label htmlFor="Select Tags">Select Tags</label>
        <Select
          isMulti
          options={options}
          value={selectedTags}
          styles={customStyles}
          onChange={handleTagChange}
        />
        <label htmlFor="pincode">Contact</label>
        <input
          className={styles.input}
          type="tel"
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <button className={styles.signupbutton} onClick={handleSubmit}>
          Sign Up
        </button>
      </div>
      <div className={styles.signin}>
        Already have an account? <a href="/signin">Sign In</a>
      </div>
      <div className={styles.privacyPolicy}>
        By signing up, you agree to our <a href="#">Privacy Policy</a> and{" "}
        <a href="#">Terms of Service</a>
      </div>
    </div>
  );
}
