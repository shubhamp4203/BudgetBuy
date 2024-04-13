import React, { useEffect, useState } from "react";
import OrderList from "../../component/OrderPage/OrderList";
import styles from "./OrdersTabs.module.css";
import SearchBar from "../../component/searchBar/searchBar";
import Navbar from "../../component/NavBar/NavBar";
import Divider from "@mui/material/Divider";

const Orders = () => {
  const [selected, setSelected] = useState("ALL");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      const data = {
        type: selected,
      };
      const resp = await fetch(
        process.env.REACT_APP_URL_AUTHENTICATION + "/getUserOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );
      if (resp.status === 200) {
        const res = await resp.json();
        setOrders(
          res.result.orders.sort(
            (a, b) => new Date(b.order_date) - new Date(a.order_date)
          )
        );
        setIsLoading(false);
        setIsEmpty(false);
      } else if (resp.status === 204) {
        setIsEmpty(true);
        setIsLoading(false);
      } else {
        console.log("Error");
      }
    };
    fetchdata();
  }, []);

  const handleSelected = async (selected) => {
    setSelected(selected);
    const data = {
      type: selected,
    };
    const resp = await fetch(
      process.env.REACT_APP_URL_AUTHENTICATION + "/getUserOrder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );
    if (resp.status === 200) {
      const res = await resp.json();
      setOrders(
        res.result.orders.sort(
          (a, b) => new Date(b.order_date) - new Date(a.order_date)
        )
      );
      setIsLoading(false);
      setIsEmpty(false);
    } else if (resp.status === 204) {
      setIsEmpty(true);
      setIsLoading(false);
    } else {
      console.log("Error");
    }
  };
  return (
    <div>
      {/* <SearchBar /> */}
      <div className={styles.parcontainer}>
        <div className={styles.tabContainer}>
          <div
            className={`${styles.all} ${
              selected === "ALL" ? styles.selected : ""
            }`}
            onClick={() => handleSelected("ALL")}
          >
            <h3>All</h3>
          </div>
          <div
            className={`${styles.all} ${
              selected === "Pending" ? styles.selected : ""
            }`}
            onClick={() => handleSelected("Pending")}
          >
            <h3> Pending</h3>
          </div>
          <div
            className={`${styles.all} ${
              selected === "Delivered" ? styles.selected : ""
            }`}
            onClick={() => handleSelected("Delivered")}
          >
            <h3> Delivered</h3>
          </div>
        </div>
        <div className={styles.orders}>
          {isEmpty ? (
            <h2>No order found</h2>
          ) : (
            <>
              {orders.map((order) => (
                <React.Fragment key={order.user_order_id}>
                  <div key={order.user_order_id} className={styles.orderitem}>
                    <div className={styles.inditem}>
                      <h4>Order ID:</h4>
                      <div>{order.user_order_id}</div>
                    </div>
                    <div className={styles.inditem}>
                      <h4>Order Date:</h4>
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
                      <h4>Payment Method:</h4>
                      <div>{order.payment_method}</div>
                    </div>
                    <div className={styles.inditem}>
                      <h4>Address:</h4>
                      <div>{order.shipping_address}</div>
                    </div>
                    <div className={styles.inditem}>
                      <h4>Order Total:</h4>
                      <div>{order.total_value}</div>
                    </div>
                    <div className={styles.inditem}>
                      <h4>Order Status:</h4>
                      <div
                        style={{
                          color:
                            order.order_status == "Pending" ? "red" : "green",
                          fontWeight: "bold",
                        }}
                      >
                        {order.order_status}
                      </div>
                    </div>
                  </div>
                  <Divider />
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Orders;
