// AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchProduct from "./page/searchProduct/searchProduct";
import ProductDetail from "./component/productDetail/productDetail";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" excat element={<SearchProduct />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
