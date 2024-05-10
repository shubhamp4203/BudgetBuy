import SellerNavbar from "../../component/Seller Navbar/NavBar";
import styles from "./orderdetails.module.css";
import { useLocation } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { toast, Toaster } from "sonner";
import ChatIcon from "@mui/icons-material/Chat";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function SellerOrderDetails() {
  const [orderitems, setorderitems] = useState([]);
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state.orderdet;
  

  const handleClickOpen = async() => {
    const data = {
      order_id: order.user_order_id,
      seller_id: order.seller_id,
      email: order.user_email,

    }
    const resp = await fetch(process.env.REACT_APP_URL_EMAIL +  "/sendotp/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if(resp.ok) {
      setOpen(true);
    }
    else {
      toast.error("Something went wrong.");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        toast.error("Something went wrong.");
        navigate("/myorders");
      }
    };
    fetchorderitem();
  }, []);

  const handleConfirm = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      const otp = formJson.OTP;
      const data = {
        otp,
        email: order.user_email,
        seller_id: order.seller_id,
        order_id: order.user_order_id
      }
      const resp = await fetch(process.env.REACT_APP_URL_EMAIL + "/verifyotp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if(resp.ok) {
        handleClose();
        toast.success("Order Delivered Successfully.");
        setTimeout(() => {navigate("/orders")}, 1500);
      }
      else {
        const response = await resp.json();
        if(response.error === "Invalid OTP") {
          toast.error("Invalid OTP. Please try again.");
        }
        else {
          toast.error("Something went wrong.");
          handleClose();
        }
      }
  };

  return (
    <div className={styles.ordercontainer}>
      <Toaster richColors position="top-center" />
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
            <div>{order.user_order_id}</div>
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
      {order.order_status == "Pending" && <div className={styles.placeorder}>
        <button
          className={styles.buybut}
          style={{
            backgroundColor: "#221f1f",
            color: "white",
          }}
        >
          <ChatIcon sx={{ fontSize: 25, color: "white" }} />
        </button>
          
        <button
          className={styles.buybut}
          onClick={handleClickOpen}
          style={{
            textDecoration: "none",
            width: "100%",
            flex: 3,
            padding: "0.6rem",
            backgroundColor: "#221f1f",
            color: "white",
            // backgroundColor: isClicked ? "white" : "#221f1f",
            // color: isClicked ? "#221f1f" : "white",
          }}
        >
          Confirm Delivery
        </button>
        <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => handleConfirm(event)
        }}
      >
        <DialogTitle>Confirm Delivery</DialogTitle>
        <DialogContent>
          <DialogContentText>
            OTP has been sent. <br/> Please enter the OTP to confirm delivery.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="OTP"
            placeholder="Enter OTP"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Confirm</Button>
        </DialogActions>
      </Dialog>
      </div>}
      <SellerNavbar />
    </div>
  );
}

export default SellerOrderDetails;
