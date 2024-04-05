// AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchProduct from "./page/searchProduct/searchProduct";
import ProductDetail from "./component/productDetail/productDetail";
import CustomerHome from "./page/CustomerHome/CustomerHome";
import OrdersTabs from "./page/MyOrders/OrdersTabs";
import SignIn from "./page/signin/signin";
import Signup from "./page/signup/signup";
import Cart from "./page/cart/Cart";
import UserProfile from "./page/UserProfile/UserProfile";
import ForgotPassword from "./page/forget Password/forgetpassword";
import Payment from "./page/Payment/Payment";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/searchproduct" excat element={<SearchProduct />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/" element={<CustomerHome />} />
        {/* <Route path="/myorders" element={<OrdersTabs />} /> */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        {/* <Route path="/payment" element={<Payment />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
