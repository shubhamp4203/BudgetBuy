// App.js
import React from "react";
import AppRouter from "./AppRouter";
import Navbar from "./component/NavBar/NavBar";
import styles from "./App.css";
import Cart from "./page/cart/Cart";

function App() {
  // return <AppRouter />;
  return (
    // <div className={styles.app}>
    //   <AppRouter />
    //   <Navbar />
    // </div>
    <Cart />
  );
}

export default App;
