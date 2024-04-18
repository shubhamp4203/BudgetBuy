import { useState } from "react";
import styles from "./EditSellerAddress.module.css";
import { useNavigate } from "react-router-dom";
import {toast, Toaster} from "sonner";

export default function EditSellerAddress() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [building_name, setBuild_no] = useState("");
  const [landmark, setlandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city || !state || !street || !building_name || !pincode) {
      toast.error("Please fill all the required fields.");
      return;
    }
    const data = {
      city,
      state,
      street,
      building_name,
      landmark,
      pincode,
    };
    try {
      const resp = await fetch(
        process.env.REACT_APP_URL_AUTHENTICATION + "/editselleraddress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );
      if (resp.status === 201) {
        toast.success("Address added successfully.");
        navigate(-1);
      } else {
        toast.error("Something went wrong.");  
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className={styles.addresscontainer}>
      <Toaster richColors position="top-center"/>
      <h1>New Address</h1>
      <div className={styles.addressform}>
        <label htmlFor="building_name">Flat no / Building Name</label>
        <input
          className={styles.input}
          type="text"
          id="building_name"
          value={building_name}
          onChange={(e) => setBuild_no(e.target.value)}
        />

        <label htmlFor="street">Locality / Area / Street</label>
        <input
          className={styles.input}
          type="text"
          id="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        {/* <br /> */}

        <label htmlFor="city">City</label>
        <input
          className={styles.input}
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {/* <br /> */}
        <label htmlFor="pincode">Pincode</label>
        <input
          className={styles.input}
          type="text"
          id="pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <label htmlFor="state">State</label>
        <input
          className={styles.input}
          type="text"
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <label htmlFor="landmark">Landmark (Optional)</label>
        <input
          className={styles.input}
          type="text"
          id="landmark"
          value={landmark}
          onChange={(e) => setlandmark(e.target.value)}
        />
        <button className={styles.addressbutton} onClick={handleSubmit}>
          Edit Address
        </button>
      </div>
    </div>
  );
}
