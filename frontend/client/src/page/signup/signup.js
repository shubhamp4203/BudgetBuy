import { useState } from "react";
import styles from "./signup.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send a request to your server
    console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);
  };

  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button type="submit">Sign Up</button>
      </form>

      <div className={styles.socialSignUp}>
        <div className={styles.orText}>OR</div>
        <div className={styles.socialIcons}>
          <a href="http://surl.li/rqecf">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://myaccount.google.com/?utm_source=sign_in_no_continue&pli=1">
            <i className="fab fa-google"></i>
          </a>
          <a href="https://github.com/topics/login">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>

      <div className={styles.privacyPolicy}>
        By signing up, you agree to our <a href="#">Privacy Policy</a> and{" "}
        <a href="#">Terms of Service</a>
      </div>
    </div>
  );
}
