// AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchProduct from "./page/searchProduct/searchProduct";
import ProductDetail from "./component/productDetail/productDetail";
import CustomerHome from "./page/CustomerHome/CustomerHome";
import Orders from "./page/MyOrders/OrdersTabs";
import SignIn from "./page/signin/signin";
import Signup from "./page/signup/signup";
import Cart from "./page/cart/Cart";
import UserProfile from "./page/UserProfile/UserProfile";
import ResetPassword from "./page/Reset Password/resetpassword";
import Payment from "./page/Payment/Payment";
import SellerSignup from "./page/SellerSignup/SellerSignup";
import SellerSignin from "./page/sellerSignin/SellerSignin";
import SellerProfile from "./page/SellerProfile/SellerProfile";
import Address from "./page/Address/address";
import UserAccount from "./page/useraccount/useraccount";
import Card from "./page/Card/card";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/searchproduct" excat element={<SearchProduct />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/" element={<CustomerHome />} />
        <Route path="/myorders" element={<Orders />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/sellersignup" element={<SellerSignup />} />
        <Route path="sellersignin" element={<SellerSignin />} />
        <Route path="/sellerprofile" element={<SellerProfile />} />
        <Route path="/addaddress" element={<Address />} />
        <Route path="/myaccount" element={<UserAccount />} />
        <Route path="/addcard" element={<Card />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
