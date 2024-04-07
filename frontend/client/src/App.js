// App.js
import React from "react";
import AppRouter from "./AppRouter";
import Navbar from "./component/NavBar/NavBar";
import styles from "./App.css";
import Cart from "./page/cart/Cart";
import CustomerHome from "./page/CustomerHome/CustomerHome";
// import Signup from "./page/SignUp/SignUp";
import SignIn from "./page/signin/signin";
import { Router, useNavigate } from "react-router-dom";
function App() {
  return (
    <div className={styles.app}>
        <AppRouter />
        <Navbar />
    </div>
  );
}
export default App;
