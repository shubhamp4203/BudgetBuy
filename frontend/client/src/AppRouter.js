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
import EditBank from "./page/Sellerbank/EditBank";
import SellerAccount from "./page/SellerAccount/SellerAccount";
import AddProduct from "./page/AddProduct/AddProduct";
import AdvertiseProduct from "./page/AdvertiseProduct/AdvertiseProduct";
import YourProduct from "./page/YourProduct/YourProduct";
import EditProduct from "./page/EditProduct/EditProduct";
import SellerOrder from "./page/SellerOrder/SellerOrder";
import OrderDetails from "./page/orderdetails/orderdetails";
import SellerBank from "./page/Sellerbank/bank";
import SellerResetPassword from "./page/Seller Reset Password/resetpassword";
import Splash from "./page/Splash/splash";
import EditSellerAddress from "./page/Selleraddress/EditSellerAddress";
import ChatApp from "./page/ChatApp/ChatApp";
import ChatGroup from "./page/ChatApp/ChatGroup";
import WishList from "./page/WishList/WishList";
import SellerChatGroup from "./page/ChatApp/SellerChatGroup";
import SellerOrderDetails from "./page/sellerorderdetails/orderdetails";
import Geofencing from "./page/Geofencing/geofencing";

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
        <Route
          path="/user/reset-password/:uid/:token"
          element={<ResetPassword />}
        />
        <Route
          path="/seller/reset-password/:uid/:token"
          element={<SellerResetPassword />}
        />
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
        <Route
          path="/seller/orderdetails/:orderId"
          element={<SellerOrderDetails />}
        />
        <Route path="/sellerbank" element={<SellerBank />} />

        <Route path="/editselleraddress" element={<EditSellerAddress />} />
        <Route path="/editbank" element={<EditBank />} />

        <Route path="/yourproducts" element={<YourProduct />} />
        <Route path="/editproduct" element={<EditProduct />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/chatgroup" element={<ChatGroup />} />
        <Route path="/sellerchatgroup" element={<SellerChatGroup />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/orders" element={<SellerOrder />} />
        <Route path="/map" element={<Geofencing />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

// import React, { Suspense, lazy } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// // Lazy load components
// const Splash = lazy(() => import("./page/Splash/splash"));
// const ProductDetail = lazy(() => import("./component/productDetail/productDetail"));
// const CustomerHome = lazy(() => import("./page/CustomerHome/CustomerHome"));
// const Orders = lazy(() => import("./page/MyOrders/OrdersTabs"));
// const SignIn = lazy(() => import("./page/signin/signin"));
// const Signup = lazy(() => import("./page/signup/signup"));
// const Cart = lazy(() => import("./page/cart/Cart"));
// const UserProfile = lazy(() => import("./page/UserProfile/UserProfile"));
// const ResetPassword = lazy(() => import("./page/Reset Password/resetpassword"));
// const Payment = lazy(() => import("./page/Payment/Payment"));
// const SellerSignup = lazy(() => import("./page/SellerSignup/SellerSignup"));
// const SellerSignin = lazy(() => import("./page/sellerSignin/SellerSignin"));
// const SellerProfile = lazy(() => import("./page/SellerProfile/SellerProfile"));
// const Address = lazy(() => import("./page/Address/address"));
// const SellerAddress = lazy(() => import("./page/Selleraddress/address"));
// const UserAccount = lazy(() => import("./page/useraccount/useraccount"));
// const Card = lazy(() => import("./page/Card/card"));
// const EditBank = lazy(() => import("./page/Sellerbank/EditBank"));
// const SellerAccount = lazy(() => import("./page/SellerAccount/SellerAccount"));
// const AddProduct = lazy(() => import("./page/AddProduct/AddProduct"));
// const AdvertiseProduct = lazy(() => import("./page/AdvertiseProduct/AdvertiseProduct"));
// const YourProduct = lazy(() => import("./page/YourProduct/YourProduct"));
// const EditProduct = lazy(() => import("./page/EditProduct/EditProduct"));
// const SellerOrder = lazy(() => import("./page/SellerOrder/SellerOrder"));
// const OrderDetails = lazy(() => import("./page/orderdetails/orderdetails"));
// const SellerBank = lazy(() => import("./page/Sellerbank/bank"));
// const SellerResetPassword = lazy(() => import("./page/Seller Reset Password/resetpassword"));
// const EditSellerAddress = lazy(() => import("./page/Selleraddress/EditSellerAddress"));

// const AppRouter = () => {
//   return (
//     <Router>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           <Route path="/" element={<Splash />} />
//           <Route path="/product/:productId" element={<ProductDetail />} />
//           <Route path="/home" element={<CustomerHome />} />
//           <Route path="/myorders" element={<Orders />} />
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/userprofile" element={<UserProfile />} />
//           <Route path="/user/reset-password/:uid/:token" element={<ResetPassword />} />
//           <Route path="/seller/reset-password/:uid/:token" element={<SellerResetPassword />} />
//           <Route path="/payment" element={<Payment />} />
//           <Route path="/sellersignup" element={<SellerSignup />} />
//           <Route path="/selleraddress" element={<SellerAddress />} />
//           <Route path="/sellersignin" element={<SellerSignin />} />
//           <Route path="/sellerprofile" element={<SellerProfile />} />
//           <Route path="/selleraccount" element={<SellerAccount />} />
//           <Route path="/addaddress" element={<Address />} />
//           <Route path="/myaccount" element={<UserAccount />} />
//           <Route path="/addcard" element={<Card />} />
//           <Route path="/addproduct" element={<AddProduct />} />
//           <Route path="/advertiselist" element={<AdvertiseProduct />} />
//           <Route path="/orderdetails/:orderId" element={<OrderDetails />} />
//           <Route path="/sellerbank" element={<SellerBank />} />
//           <Route path="/editselleraddress" element={<EditSellerAddress />} />
//           <Route path="/editbank" element={<EditBank />} />
//           <Route path="/yourproducts" element={<YourProduct />} />
//           <Route path="/editproduct" element={<EditProduct />} />
//           <Route path="/sellerorder" element={<SellerOrder />} />
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// };

// export default AppRouter;
