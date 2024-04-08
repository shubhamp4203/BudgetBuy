import React from "react";
import styles from "./resetpassword.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setuserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleforgotpassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const data = {
      email,
    };
    console.log(data);
    if (!email) {
      alert("Please enter a registered email");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email");
      return;
    }
    try {
      const response = await fetch(
        process.env.REACT_APP_URL_AUTHENTICATION + "/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      setIsLoading(false);
      if (response.status === 200) {
        alert("Reset link sent to your email");
        navigate("/signin");
      } else if (response.status === 400) {
        alert("Please enter a registered email");
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Forgot Password</h1>
        <form>
          <div className={styles.inputContainer}>
            <label htmlFor="password">New Password</label>
            <input type="password" id="passowrd" name="password" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="confirm password">Confirm Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className={styles.buttonContainer}>
            {isLoading ? (
              <Button sx={{ marginTop: "20px" }} loading variant="plain">
                Plain
              </Button>
            ) : (
              <button onClick={handleforgotpassword}>Reset Password</button>
            )}
          </div>
        </form>
        <div className={styles.linkContainer}>
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
}
