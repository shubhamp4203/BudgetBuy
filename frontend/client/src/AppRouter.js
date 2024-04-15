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
import SellerAddress from "./page/Selleraddress/address";
import UserAccount from "./page/useraccount/useraccount";
import Card from "./page/Card/card";
import SellerAccount from "./page/SellerAccount/SellerAccount";
import AddProduct from "./page/AddProduct/AddProduct";
import AdvertiseProduct from "./page/AdvertiseProduct/AdvertiseProduct";
import OrderDetails from "./page/orderdetails/orderdetails";
import SellerBank from "./page/Sellerbank/bank";
import SellerResetPassword from "./page/Seller Reset Password/resetpassword";
import Splash from "./page/Splash/splash";

const AppRouter = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/home" element={<CustomerHome />} />
          <Route path="/myorders" element={<Orders />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/user/reset-password/:uid/:token" element={<ResetPassword />} />
          <Route path="/seller/reset-password/:uid/:token" element={<SellerResetPassword />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/sellersignup" element={<SellerSignup />} />
          <Route path="/selleraddress" element={<SellerAddress />} />
          <Route path="/sellersignin" element={<SellerSignin />} />
          <Route path="/sellerprofile" element={<SellerProfile />} />
          <Route path="/selleraccount" element={<SellerAccount />} />
          <Route path="/addaddress" element={<Address />} />
          <Route path="/myaccount" element={<UserAccount />} />
          <Route path="/addcard" element={<Card />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/advertiselist" element={<AdvertiseProduct />} />
          <Route path="/orderdetails/:orderId" element={<OrderDetails />} />
          <Route path="/sellerbank" element={<SellerBank />} />
        </Routes>
    </Router>
  );
};

export default AppRouter;
