import { useState } from "react";
import styles from "./signin.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import {toast, Toaster} from "sonner";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const scope = "email profile openid";
  const redirectUrl =
    process.env.REACT_APP_URL_AUTHENTICATION + "/auth/google/callback";

  function generateAuthUrl(clientId, redirectUri, scope) {
    let authUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    authUrl += "?client_id=" + encodeURIComponent(clientId);
    authUrl += "&redirect_uri=" + encodeURIComponent(redirectUri);
    authUrl += "&response_type=code";
    authUrl += "&scope=" + encodeURIComponent(scope);
    authUrl += "&access_type=offline";
    return authUrl;
  }

  const authUrl = generateAuthUrl(clientId, redirectUrl, scope);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_URL_AUTHENTICATION + "/login",
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

      if (response.ok) {
        navigate("/home");
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
      return;
    }
    try {
      const data = {
        email,
      };
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
      const responseData = await response.json();
      setIsLoading(false);
      if (response.ok) {
        toast.success("Reset link sent to your email.");
        navigate("/signin");
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
      <h1>Sign In</h1>
      <div className={styles.signinform}>
        <label htmlFor="email">Email</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          className={styles.input}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.signin}onClick={handleSubmit}>Sign In</button>
      </div>

      <div className={styles.socialSignUp}>
        <div className={styles.orText}>OR</div>
        <div className={styles.socialIcons}>
          <a href={authUrl} style={{color: "black", textDecoration: "none", border: "1px solid black", borderRadius: "1rem", padding: "0.5rem"}}>
            <i className="fab fa-google" > </i> SignIn with Google
          </a>
        </div>
      </div>

      <div className={styles.privacyPolicy}>
        Don't remember your password?{" "}
        {isLoading ? (
          <span style={{ color: "blue" }}>Loading</span>
        ) : (
          <a href="#" onClick={handleforgotpassword}>
            Forgot Password
          </a>
        )}
      </div>
      <div className={styles.signup}>Login as a  <a href="/sellersignin">Seller</a> </div>
      <div className={styles.signup}>Create account <a href="/signup">SignUp</a> </div>
    </div>
  );
}
