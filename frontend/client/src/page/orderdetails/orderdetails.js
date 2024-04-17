import Navbar from "../../component/NavBar/NavBar";
import styles from "./orderdetails.module.css";
import { useLocation } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

function OrderDetails() {
  const [orderitems, setorderitems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state.orderdet;

  useEffect(() => {
    const fetchorderitem = async () => {
      const params = new URLSearchParams({ order_id: order.user_order_id });
      const resp = await fetch(
        `${
          process.env.REACT_APP_URL_ORDER
        }/getUserOrderItem/?${params.toString()}`,
        {
          method: "GET",
        }
      );
      if (resp.status === 200) {
        const data = await resp.json();
        setorderitems(data.items);
      } else {
        console.log("Error");
        alert("Something went wrong");
        navigate("/myorders");
      }
    };
    fetchorderitem();
  }, []);
  
  const handlecancelorder = async () => {
    const data = {
        order_id: order.user_order_id,
    }
    const resp = await fetch(process.env.REACT_APP_URL_ORDER + "/cancelOrder/", {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    })
    if(resp.status == 200) {
        navigate("/myorders");
    }
    else {
        alert("Something went wrong");
    }
  }

  return (
    <div className={styles.ordercontainer}>
      <h1>Order Details</h1>
      <div className={styles.order}>
        <div className={styles.heading}> Items Summary </div>
        {orderitems.map((item) => (
          <div className={styles.orderitems} key={item.product_id}>
            <img
              src={
                "https://res.cloudinary.com/dt0mkdvqx/image/upload/c_scale,w_90,h_87,q_auto,f_auto/v1/product_images/" +
                item.product_id
              }
              alt={item.name}
              // className={styles.productImage}
            />
            <div className={styles.iteminfo}>
              <div className={styles.itemname}>
                {item.name} x {item.amount}
              </div>
              <div className={styles.itemprice}>
                ₹{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                }).format(item.product_price)}{" "}
              </div>
            </div>
          </div>
        ))}
        <div className={styles.orderdet}>
          <div>
            <div className={styles.totaltext}>Total:</div>
            <div className={styles.itemprice}>
              ₹{" "}
              {new Intl.NumberFormat("en-US", {
                style: "decimal",
                minimumFractionDigits: 2,
              }).format(order.total_value)}{" "}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.orderSummary}>
        <div className={styles.heading}> Order Summary </div>
        <div className={styles.ordersummaryitems}>
        <div className={styles.inditem}>
            <h4> Order Id: </h4>
            <div>
              {order.user_order_id}
            </div>
          </div>
          <div className={styles.inditem}>
            <h4> Order Date: </h4>
            <div>
              {new Date(order.order_date).toLocaleString("default", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          <div className={styles.inditem}>
            <h4>Order Status:</h4>
            <div
              style={{
                color: order.order_status == "Pending" ? "red" : "green",
                fontWeight: "bold",
              }}
            >
              {order.order_status}
            </div>
          </div>
          <div className={styles.inditem}>
            <h4>Payment Mode:</h4>
            <div>{order.payment_method}</div>
          </div>
          <div className={styles.inditem}>
            <h4> Address:</h4>
            <div>{order.shipping_address}</div>
          </div>
        </div>
      </div>
      {order.order_status == "Pending" && <div className={styles.cancelbut}>
        <button onClick={handlecancelorder}>Cancel Order</button>
      </div> }
      <Navbar />
    </div>
  );
}

export default OrderDetails;
