// Home.js

import React from 'react';
import './cust_home_page.css';
import Product from './Product';

const CustHomePage = () => {
  return (
    <div className="home">
      {/* Header */}
      <header className="home__header">
        <img
          className="home__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </header>

      {/* Banner */}
      <div className="home__banner">
        <img
          className="home__bannerImage"
          src="https://images-na.ssl-images-amazon.com/images/G/01/digital/video/merch/2021/TV/BRND/ACQ/GW/GW_BMVD_GEOGRAPHIC_3PANEL_3000x1200._CB655839572_.jpg"
          alt="Amazon Banner"
        />
      </div>

      {/* Product Section */}
      <div className="home__row">
        {/* Product 1 */}
        <Product
          id="123"
          title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
          price={11.96}
          rating={5}
          image="https://m.media-amazon.com/images/I/51N-u8AsmdL.jpg"
        />

        {/* Product 2 */}
        <Product
          id="456"
          title="Apple AirPods with Charging Case (Wired)"
          price={128.98}
          rating={4}
          image="https://m.media-amazon.com/images/I/71NTi82uBEL._AC_SL1500_.jpg"
        />
      </div>
    </div>
  );
};

export default CustHomePage;
