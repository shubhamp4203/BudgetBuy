import React from "react";
import styles from "./forgetpassword.module.css";

export default function ForgotPassword() {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Forgot Password</h1>
        <form>
          <div className={styles.inputContainer}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit">Send Reset Link</button>
          </div>
        </form>
        <div className={styles.linkContainer}>
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
}
