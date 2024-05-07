import { useState } from "react";
import styles from "./SellerSignin.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import {toast, Toaster} from "sonner";

export default function SellerSignin() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_URL_SELLER + "/sellerlogin",
        {
          method: "POST",
          credentials: "include", // "same-origin", "include", "omit"
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      console.log("Success:", responseData);
      // const resjwtcookie = responseData.token.jwt;

      if (response.ok) {
        // Cookies.set("jwt", resjwtcookie, {
        //   sameSite: "None",
        //   secure: true,
        // });
        // console.log("jwt:", resjwtcookie);
        navigate("/yourproducts");
      } else {
        toast.error("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleforgotpassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if(!email) {
      toast.error("Please enter email.");
      setIsLoading(false);
      return;
    }
    try {
      const data = {
        email,
      };
      const response = await fetch(
        process.env.REACT_APP_URL_SELLER + "/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      setIsLoading(false);
      if (response.ok) {
        toast.success("Reset link sent to your email.");
        navigate("/sellersignin");
      } else {
        toast.error("Email not found.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.signincontainer}>
      <Toaster richColors position="top-center"/>
      <h1>Seller Sign In</h1>
      <div className={styles.signinform}>
        <label htmlFor="email">Email</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <button className={styles.signin}onClick={handleSubmit}>Sign In</button>
      </div>

      <div className={styles.privacyPolicy}>
        Don't remember your password?{" "}
        {isLoading ? (
          <span style={{ color: "blue" }}>Loading</span>
        ) : (
          <a href="#" onClick={handleforgotpassword}>
            Forgot password
          </a>
        )}
      </div>
      <div className={styles.signup}>Create Seller account <a href="/sellersignup">SignUp</a> </div>
    </div>
  );
}
