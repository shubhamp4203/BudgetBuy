import React from "react";
import styles from "./forgetpassword.module.css";

export default function ForgotPassword() {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Reset Password</h1>
        <form>
          <div className={styles.inputContainer}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">New Password</label>
            <input type="password" id="passowrd" name="password" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="confirm password">Confirm Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit">Reset</button>
          </div>
        </form>
        <div className={styles.linkContainer}>
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
}
