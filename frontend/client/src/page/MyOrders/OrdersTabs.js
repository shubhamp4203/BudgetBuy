import React, { useState } from "react";
import OrderList from "../../component/OrderPage/OrderList";
import styles from "./OrdersTabs.module.css";

const OrdersData = [
  {
    id: "1947034",
    status: "Delivered",
    trackingNumber: "IW3475453455",
    quantity: 3,
    date: "05-12-2019",
    totalAmount: 112,
  },
  // Add more order objects here
];

const OrdersTabs = () => {
  const [activeTab, setActiveTab] = useState("All");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getOrdersToDisplay = () => {
    switch (activeTab) {
      case "Delivered":
        return OrdersData.filter((order) => order.status === "Delivered");
      case "Processing":
        return OrdersData.filter((order) => order.status === "Processing");
      default:
        return OrdersData;
    }
  };

  return (
    <div>
      <div className={styles.heading}>
        <h2>My Orders</h2>
      </div>
      <div className={styles.tabs}>
        <button onClick={() => handleTabClick("All")}>All</button>
        <button onClick={() => handleTabClick("Delivered")}>Delivered</button>
        <button onClick={() => handleTabClick("Processing")}>Processing</button>
      </div>
      <OrderList orders={getOrdersToDisplay()} />
    </div>
  );
};

export default OrdersTabs;
