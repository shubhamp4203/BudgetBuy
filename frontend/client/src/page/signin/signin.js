import { useState } from "react";
import styles from "./signin.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { SignInButton,  } from "@clerk/clerk-react";

export default function SignIn() {
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = () => {
    // Redirect to the "/" route after successful sign-in
    // navigate("/");
    window.location.href = "/";
    console.log("Sign in successful");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    console.log(data);

    try {
      const response = await fetch(
        "https://84f2-202-129-240-131.ngrok-free.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      console.log("Success:", responseData);
      const resjwtcookie = responseData.token.jwt;

      if (response.ok) {
        // Cookies.set("jwt", resjwtcookie, {
        //   sameSite: "None",
        //   secure: true,
        // });
        console.log("jwt:", resjwtcookie);
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleforgotpassword = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email,
      };
      const response = await fetch(
        "https://84f2-202-129-240-131.ngrok-free.app/forgetpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      console.log("Success:", responseData);
      if (responseData.status === 200) {
        navigate("/forgotpassword");
      } else {
        alert("Email not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.signincontainer}>
      <h1>Sign In</h1>
      <div onSubmit={handleSubmit} className={styles.signinform}>
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

        <button onClick={handleSubmit}>Sign In</button>
      </div>

      <div className={styles.socialSignUp}>
        <div className={styles.orText}>OR</div>
        <div className={styles.socialIcons}>
          {/* <a href="http://surl.li/rqecf">
            <i className="fab fa-facebook-f"></i>
  </a>*/}

          <SignInButton provider="google" afterSignin={handleSignIn} />
          {/* <a href="https://github.com/topics/login">
            <i className="fab fa-github"></i>
          </a> */}
        </div>
      </div>

      <div className={styles.privacyPolicy}>
        Don't remember your password?{" "}
        <a href="#" onClick={handleforgotpassword}>
          forgot password
        </a>
      </div>
    </div>
  );
}
