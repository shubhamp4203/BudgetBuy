import React from "react";
import styles from "./resetpassword.module.css";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import Button from "@mui/joy/Button";
import {toast, Toaster} from "sonner";

export default function SellerResetPassword() {
  const navigate = useNavigate();
  const {uid, token} = useParams();
  // const [isLoading, setIsLoading] = useState(false);

  const handlechangepassword = async (e) => {
    e.preventDefault();
    const newpassword = document.getElementById("password1").value;
    const confirmpassword = document.getElementById("password2").value;
    if(newpassword !== confirmpassword){
      toast.error("Password does not match.");
      return;
    }
    const data = {
      newpassword,
      token
    }
    const resp = await fetch(process.env.REACT_APP_URL_SELLER + "/resetpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if(resp.status === 200) {
      toast.success("Password changed Successfully.");
      navigate("/sellersignin");
    }
    else if(resp.status === 400) {
      toast.error("The reset link is invalid or expired. Please try again.");
      navigate("/sellersignin");
    }
    else {
      toast.error("Something went wrong.");
    }
  };
  return (
    <div className={styles.container}>
      <Toaster richColors position="top-center"/>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Forgot Password</h1>
        <form>
          <div className={styles.inputContainer}>
            <label htmlFor="password">New Password</label>
            <input type="password" id="password1" name="password1" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="confirm password">Confirm Password</label>
            <input type="password" id="password2" name="password2" />
          </div>
          <div className={styles.buttonContainer}>
          <button onClick={handlechangepassword}>Reset Password</button>
          </div>
        </form>
        <div className={styles.linkContainer}>
          <a href="/sellersignin">Back to Login</a>
        </div>
      </div>
    </div>
  );
}
