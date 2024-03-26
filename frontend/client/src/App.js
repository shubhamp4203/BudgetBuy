// App.js
import React from "react";
import AppRouter from "./AppRouter";
import Navbar from "./component/NavBar/NavBar";
import styles from "./App.css";
import Cart from "./page/cart/Cart";

function App() {
  // return <AppRouter />;
  return (
    <div className={styles.app}>
      <AppRouter />
      <Navbar />
    </div>
    // <Cart />
  );
}
// // import logo from "./logo.svg";
// import "./App.css";
// import CustHomePage from "../src/component/Customer Home Page/cust_home_page";
// import SignUp from "./component/signup";

// function App() {
//   return (<div><CustHomePage/></div>);
// }

export default App;
